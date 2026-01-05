const axios = require('axios')
const fs = require('fs')
const path = require('path')
const compareVersions = require('compare-versions')
const decompress = require('decompress')

// Global variables
const default_arch = 'universal'
const current_arch = process.env.npm_config_arch || process.arch
const arch = process.platform === 'darwin' ? default_arch : current_arch
const platform = process.env.npm_config_platform || process.platform
const channel = 'message'
const product = 'nim'
const savePath = path.join(__dirname, '..', 'temporary')

if (process.env.npm_config_ignoredownloadsdk) {
    console.log('[node-nim] Ignore download product')
    process.exit(0)
}
let version
if (process.env.npm_package_version) {
    version = process.env.npm_package_version.split('-')[0]
}
if (process.env.npm_config_nimsdkversion) {
    version = process.env.npm_config_nimsdkversion
}

// Simple logger that works with npm postinstall
// Use console.error to ensure output is visible when installed as dependency
// npm captures stdout but is less aggressive with stderr
function log(message) {
    console.error(message)
}

// Progress bar utility - real-time progress bar
function createProgressBar(total) {
    let lastUpdate = 0
    const updateInterval = 100 // Update every 100ms
    return (loaded) => {
        const now = Date.now()
        const percent = Math.floor((loaded * 100) / total)
        // Update based on time interval or when complete
        if (now - lastUpdate < updateInterval && loaded < total) {
            return
        }
        lastUpdate = now
        const size = formatBytes(loaded)
        const totalSize = formatBytes(total)
        // Create progress bar
        const barLength = 30
        const filledLength = Math.floor((barLength * loaded) / total)
        const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength)
        // Use \r to overwrite the same line
        process.stderr.write(`\r[node-nim] ⬇  ${bar} ${percent}% (${size}/${totalSize})`)
        // Print newline when complete
        if (loaded >= total) {
            process.stderr.write('\n')
            log(` ✅ Download complete`)
        }
    }
}

// Format bytes to human readable format
function formatBytes(bytes) {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

// Compatibility function for removing directories (supports older Node.js versions)
function removeDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
        return
    }

    // Use rmSync if available (Node.js >= 14.14.0)
    if (fs.rmSync) {
        fs.rmSync(dirPath, { recursive: true, force: true })
        return
    }

    // Fallback for older Node.js versions using rimraf-like logic
    const rimraf = (path) => {
        const stat = fs.lstatSync(path)

        if (stat.isDirectory()) {
            // Read directory contents
            const files = fs.readdirSync(path)

            // Recursively remove all contents
            files.forEach(file => {
                const fullPath = require('path').join(path, file)
                rimraf(fullPath)
            })

            // Remove the empty directory
            fs.rmdirSync(path)
        } else {
            // Remove file
            // Handle readonly files on Windows
            try {
                fs.unlinkSync(path)
            } catch (err) {
                if (err.code === 'EBUSY' || err.code === 'ENOTEMPTY' || err.code === 'EPERM') {
                    // Try to change permissions and retry
                    try {
                        fs.chmodSync(path, 0o666)
                        fs.unlinkSync(path)
                    } catch (retryErr) {
                        // If still fails, just log and continue
                        console.warn(`Warning: Could not remove file ${path}: ${retryErr.message}`)
                    }
                } else {
                    throw err
                }
            }
        }
    }

    try {
        rimraf(dirPath)
    } catch (err) {
        // If rmSync and rimraf both fail, try the legacy recursive option
        if (fs.rmdirSync && typeof fs.rmdirSync === 'function') {
            try {
                fs.rmdirSync(dirPath, { recursive: true })
            } catch (legacyErr) {
                console.warn(`Warning: Could not remove directory ${dirPath}: ${legacyErr.message}`)
            }
        } else {
            console.warn(`Warning: Could not remove directory ${dirPath}: ${err.message}`)
        }
    }
}

// Download and extract function using axios + decompress
async function downloadAndExtract(url, destination) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true })
    }
    // Determine archive file name from URL
    const urlPath = new URL(url).pathname
    const fileName = path.basename(urlPath) || 'temp-archive'
    const archivePath = path.join(destination, fileName)
    log(` 📥 Starting download...`)
    try {
        // Download with progress tracking
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'stream',
            timeout: 300000, // 5 minutes timeout
            onDownloadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const progressBar = createProgressBar(progressEvent.total)
                    progressBar(progressEvent.loaded)
                }
            }
        })
        // Save the downloaded file
        const writeStream = fs.createWriteStream(archivePath)
        response.data.pipe(writeStream)
        // Wait for download to complete
        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve)
            writeStream.on('error', reject)
            response.data.on('error', reject)
        })
        log(` 📦 Extracting archive...`)
        // Extract using decompress (auto-detects format)
        await decompress(archivePath, destination, {
            filter: (file) => {
                // Filter out macOS hidden files (._files) and __MACOSX folders
                const filePath = file.path
                return !filePath.includes('._') &&
                    !filePath.includes('__MACOSX') &&
                    !filePath.startsWith('._')
            },
            // Remove the map function to preserve original directory structure
            // This keeps the complete directory hierarchy from the archive
        })
        log(` ✅ Extraction complete`)
        // Clean up the temporary archive file
        fs.unlinkSync(archivePath)
    } catch (error) {
        // Clean up on error
        if (fs.existsSync(archivePath)) {
            fs.unlinkSync(archivePath)
        }
        throw error
    }
}
async function downloadSDK(customPackageUrl) {
    // Use custom URL if provided, otherwise fetch from official server
    let downloadUrl = customPackageUrl
    if (!downloadUrl) {
        // Fetch package list from official server
        const res = await axios.get('https://admin.netease.im/public-service/free/publish/list')
        const publishData = res.data.data[channel]
        // Find package URL for specified version or latest
        downloadUrl = findPackageUrl(publishData, version, platform, arch, product)
        if (!downloadUrl) {
            log(` ❌ ERROR: Package not found for ${platform} (${arch})`)
            return
        }
        log(` 🚀 Preparing to download package for ${platform} (${arch})`)
    }
    // remove temporary download folder and target folder
    const target = path.join(__dirname, '..', 'build', 'Release')
    removeDirectory(savePath)
    removeDirectory(target)
    // download sdk
    try {
        await downloadAndExtract(downloadUrl, savePath)
        // create build/Release folder
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target, { recursive: true })
        }
        // Debug: List all extracted contents
        log(` 🔍 Extracted contents in ${savePath}:`)
        const extractedItems = fs.readdirSync(savePath)
        extractedItems.forEach(item => {
            const itemPath = path.join(savePath, item)
            const isDir = fs.statSync(itemPath).isDirectory()
            log(`   ${isDir ? '📁' : '📄'} ${item}`)
        })

        // Find the package directory (should be the first directory that contains bin/lib)
        const expectedSubDir = platform === 'win32' ? 'bin' : 'lib'
        let packageDir = null
        let libraryDir = null

        // Look for the main package directory
        for (const item of extractedItems) {
            const itemPath = path.join(savePath, item)
            if (fs.statSync(itemPath).isDirectory()) {
                const subDirPath = path.join(itemPath, expectedSubDir)
                if (fs.existsSync(subDirPath)) {
                    packageDir = itemPath
                    libraryDir = subDirPath
                    log(` ✅ Found package directory: ${item}`)
                    log(` ✅ Found library directory: ${item}/${expectedSubDir}`)
                    break
                }
            }
        }

        // Fallback: look for library files in any subdirectory
        if (!libraryDir) {
            log(` ⚠️  Standard package structure not found, searching for library files...`)

            const searchForLibraryFiles = (searchPath, relativePath = '') => {
                const items = fs.readdirSync(searchPath)
                for (const item of items) {
                    const fullPath = path.join(searchPath, item)
                    const stat = fs.statSync(fullPath)

                    if (stat.isDirectory()) {
                        // Recursively search subdirectories
                        const found = searchForLibraryFiles(fullPath, path.join(relativePath, item))
                        if (found) return found
                    } else {
                        // Check if this directory contains library files
                        if (item.endsWith('.node')) {
                            return searchPath
                        }
                    }
                }
                return null
            }

            libraryDir = searchForLibraryFiles(savePath)
            if (libraryDir) {
                log(` ✅ Found library files in: ${path.relative(savePath, libraryDir)}`)
            }
        }

        if (!libraryDir) {
            throw new Error(`No library files found in extracted archive. Expected structure: packageDir/${expectedSubDir}/`)
        }

        // Install files from the found directory
        const files = fs.readdirSync(libraryDir)
        files.forEach((file) => {
            const filePath = path.join(libraryDir, file)
            if (fs.statSync(filePath).isFile()) {
                log(` 📁 Installing ${file}`)
                fs.renameSync(filePath, path.join(target, file))
            }
        })
        // remove temporary download folder
        removeDirectory(savePath)
        log(` ✅ Package installation complete!`)
    } catch (err) {
        log(` ❌ ERROR: ${err.message}`)
        throw err
    }
}
// Helper function to find package download URL from publish data
function findPackageUrl(publishData, targetVersion, platform, arch, product) {
    let latestVersion = '0.0.0'
    let latestDownloadUrl = ''
    let targetDownloadUrl = ''
    // Check if package matches current platform/arch
    const isMatchingPackage = (member) => {
        const basicMatch = member.filename.includes(product) &&
            member.filename.includes(platform) &&
            member.filename.includes(arch)
        // For win32 platform, also require 'multi-threaded' keyword
        if (platform === 'win32') {
            return basicMatch && member.filename.includes('multi-threaded')
        }
        return basicMatch
    }
    // Iterate through all versions
    Object.keys(publishData).forEach((versionKey) => {
        const versionSDKs = publishData[versionKey]
        // Track latest version
        if (compareVersions.compare(latestVersion, versionKey, '<')) {
            const latestPackage = versionSDKs.find(isMatchingPackage)
            if (latestPackage) {
                latestVersion = versionKey
                latestDownloadUrl = latestPackage.cdnlink
            }
        }
        // Find target version
        if (targetVersion === versionKey) {
            const targetPackage = versionSDKs.find(isMatchingPackage)
            if (targetPackage) {
                targetDownloadUrl = targetPackage.cdnlink
            }
        }
    })
    // Use target version if found, otherwise fallback to latest
    if (targetDownloadUrl) {
        return targetDownloadUrl
    }
    if (latestDownloadUrl) {
        log(` ⚠️  Version ${targetVersion} not found, using latest version ${latestVersion}`)
        return latestDownloadUrl
    }
    return null
}

// Parse directory listing from HTTP server
async function parseDirectoryListing(url) {
    try {
        const response = await axios.get(url)
        const html = response.data
        // Extract directory/file names from href attributes
        // Matches patterns like: href="dirname/" or href="filename.tar.gz"
        const hrefRegex = /href="([^"]+)"/g
        const items = []
        let match
        while ((match = hrefRegex.exec(html)) !== null) {
            const item = match[1]
            // Skip parent directory and absolute URLs
            if (item !== '../' && !item.startsWith('http') && !item.startsWith('/')) {
                items.push(item)
            }
        }
        return items
    } catch (error) {
        throw new Error(`Failed to parse directory listing from ${url}: ${error.message}`)
    }
}

// Find latest build number from directory listing
async function findLatestBuild(baseUrl, branch) {
    const branchUrl = `${baseUrl}/${branch}/`
    log(` 🔍 Searching for latest build in ${branchUrl}`)
    const items = await parseDirectoryListing(branchUrl)
    // Filter directories (end with /) and extract build numbers
    const buildNumbers = items
        .filter(item => item.endsWith('/'))
        .map(item => parseInt(item.replace('/', '')))
        .filter(num => !isNaN(num))
        .sort((a, b) => b - a) // Sort in descending order

    if (buildNumbers.length === 0) {
        throw new Error(`No build directories found in ${branchUrl}`)
    }
    // Return all build numbers sorted by latest first
    return buildNumbers
}

// Find latest build that contains the requested platform package
async function findLatestBuildWithPackage(baseUrl, branch, nodePlatform, nodeArch) {
    const buildNumbers = await findLatestBuild(baseUrl, branch)

    // Try builds from latest to oldest
    for (const buildNumber of buildNumbers) {
        try {
            const buildUrl = `${baseUrl}/${branch}/${buildNumber}/`
            log(` 🔍 Checking build ${buildNumber} for ${nodePlatform}-${nodeArch} package...`)

            // Try to find package in this build
            const packageUrl = await findPackage(buildUrl, nodePlatform, nodeArch)
            log(` ✅ Found package in build ${buildNumber}`)
            return { buildNumber, packageUrl }
        } catch (error) {
            log(` ⚠️  Build ${buildNumber} does not contain ${nodePlatform}-${nodeArch} package, trying previous build...`)
            // Continue to next build
        }
    }

    throw new Error(`No build found with ${nodePlatform}-${nodeArch} package for branch ${branch}`)
}

// Map Node.js platform/arch to SDK directory format
function getPlatformArchDir(nodePlatform, nodeArch) {
    // Normalize arch - default to x64 if not arm64
    const arch = nodeArch === 'arm64' ? 'arm64' : (nodeArch === 'ia32' ? 'ia32' : 'x64')
    // For win32, include multi-threaded suffix
    if (nodePlatform === 'win32') {
        return `win32-${arch}-multi-threaded/`
    }
    // For other platforms (darwin, linux)
    return `${nodePlatform}-${arch}/`
}

// Find package from directory listing
async function findPackage(buildUrl, nodePlatform, nodeArch) {
    const platformArchDir = getPlatformArchDir(nodePlatform, nodeArch)
    const fullUrl = `${buildUrl}${platformArchDir}`
    log(` 🔍 Searching for package in ${fullUrl}`)
    const items = await parseDirectoryListing(fullUrl)
    // Filter tar.gz files and exclude symbol files
    const packageFiles = items.filter(item => {
        if (!item.endsWith('.tar.gz') && !item.endsWith('.zip')) {
            return false
        }
        // Exclude symbol files based on platform
        if (nodePlatform === 'darwin' && item.includes('-dSYM')) {
            return false
        }
        if (nodePlatform === 'win32' && item.includes('-PDB')) {
            return false
        }
        if (nodePlatform === 'linux' && item.includes('-with-symbol')) {
            return false
        }
        // Must start with nim- prefix
        return item.startsWith('nim-')
    })
    if (packageFiles.length === 0) {
        throw new Error(`No package found in ${fullUrl}`)
    }
    // If multiple files, prefer the first one (they should be the same package, just different compression)
    const packageFile = packageFiles[0]
    log(` ✅ Found package: ${packageFile}`)
    return `${fullUrl}${packageFile}`
}

// Build package URL from branch name
async function buildPackageUrlFromBranch(branch, nodePlatform, nodeArch) {
    // Base64 encoded internal server URL (decode when needed)
    const encodedBaseUrl = 'aHR0cDovLzEwLjIxOS4yNS4xMjc6ODgvSU0tTmF0aXZlL0Rlc2t0b3A='
    const baseUrl = Buffer.from(encodedBaseUrl, 'base64').toString('utf-8')
    log(` 🌿 Resolving package URL for branch: ${branch}`)

    // Find latest build that contains the requested platform package
    // This will automatically fallback to previous builds if the latest doesn't have the package
    const { buildNumber, packageUrl } = await findLatestBuildWithPackage(baseUrl, branch, nodePlatform, nodeArch)

    return packageUrl
}

if (require.main === module) {
    const args = process.argv
    const urlIndex = args.indexOf('--nimSdkUrl')
    const branchIndex = args.indexOf('--branch')
    ;(async () => {
        try {
            let url
            let downloadUrl = process.env.npm_config_nimsdkurl
            let branch = process.env.npm_config_branch

            // 优先使用环境变量，然后才是命令行参数
            if (branch || (branchIndex !== -1 && args[branchIndex + 1])) {
                // Build URL from branch name
                branch = branch || args[branchIndex + 1]
                url = await buildPackageUrlFromBranch(branch, platform, process.arch)
            } else if (downloadUrl || (urlIndex !== -1 && args[urlIndex + 1])) {
                // Use provided URL directly
                url = downloadUrl || args[urlIndex + 1]
                // If URL is a directory path (ends with /), find the package
                if (url.endsWith('/')) {
                    url = await findPackage(url, platform, arch)
                }
            }
            // Pass undefined to downloadSDK when no custom URL is provided
            // This allows it to fetch the latest package from admin.netease.im
            await downloadSDK(url)
        } catch (error) {
            log(` ❌ ERROR: ${error.message}`)
            process.exit(1)
        }
    })()
}
exports.downloadSDK = downloadSDK
