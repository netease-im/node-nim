const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const compareVersions = require('compare-versions')
const download = require('download')

// Global variables
const default_arch = 'universal'
const current_arch = process.env.npm_config_arch || process.arch
const arch = process.platform === 'darwin' ? default_arch : current_arch
const platform = process.env.npm_config_platform || process.platform
const channel = 'message'
const product = 'nim'
const savePath = path.join(__dirname, '..', 'temporary')

if (process.env.npm_config_ignoredownloadsdk) {
    console.log('ignore download product')
    process.exit(0)
}
let version
let downloadUrl = process.env.npm_config_nimsdkurl
if (process.env.npm_package_version) {
    version = process.env.npm_package_version.split('-')[0]
}
if (process.env.npm_config_nimsdkversion) {
    version = process.env.npm_config_nimsdkversion
}
async function downloadSDK(custom_sdk_url) {
    if (custom_sdk_url) {
        downloadUrl = custom_sdk_url
    }
    // fetch publish list
    const res = await fetch('https://admin.netease.im/public-service/free/publish/list')
    const publish_json = await res.json()
    // get sdk list
    if (!downloadUrl) {
        let latestVersion = '0.0.0'
        let latestDownloadUrl = ''
        Object.keys(publish_json.data[channel]).forEach((temp) => {
            if (compareVersions.compare(latestVersion, temp, '<')) {
                publish_json.data[channel][temp].forEach((member) => {
                    if (member.filename.includes(product) && member.filename.includes(platform) && member.filename.includes(arch)) {
                        latestVersion = temp
                        latestDownloadUrl = member.cdnlink
                    }
                })
            }
            if (version === temp) {
                publish_json.data[channel][temp].forEach((member) => {
                    if (member.filename.includes(product) && member.filename.includes(platform) && member.filename.includes(arch)) {
                        downloadUrl = member.cdnlink
                    }
                })
            }
        })
        if (!downloadUrl || downloadUrl.length === 0) {
            console.log(`[node-nim] Product [${product}] version ${version} not found, use latest version ${latestVersion}`)
            downloadUrl = latestDownloadUrl
        }
        console.log(`[node-nim] Downloading product: ${product}, platform: ${platform}, arch: ${arch}`)
    }
    if (!downloadUrl) {
        console.error(`[node-nim] Downloading product: ${product}, platform: ${platform}, arch: ${arch} not found`)
        return
    }
    console.info(`[node-nim] Downloading prebuilt SDK from ${downloadUrl} to ${savePath}`)
    // remove temporary download folder and target folder
    const target = path.join(__dirname, '..', 'build', 'Release')
    if (fs.existsSync(savePath)) {
        fs.rmSync(savePath, { recursive: true })
    }
    if (fs.existsSync(target)) {
        fs.rmSync(target, { recursive: true })
    }
    // download sdk
    try {
        await download(downloadUrl, savePath, {
            extract: true,
            filter: (file) => {
                return !file.path.includes('._')
            }
        })
        // create build/Release folder
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target, { recursive: true })
        }
        // move sdk/* files to build/Release
        const from = path.join(savePath, platform === 'win32' ? 'bin' : 'lib')
        const files = fs.readdirSync(from)
        files.forEach((file) => {
            console.info(`[node-nim] move ${file} to ${target}`)
            fs.renameSync(path.join(from, file), path.join(target, file))
        })
        // remove temporary download folder
        fs.rmSync(savePath, { recursive: true })
        console.info(`[node-nim] Downloading prebuilt SDK complete`)
    } catch (err) {
        console.error(`[node-nim] Failed to download, error: ${err}`)
    }
}
exports.downloadSDK = downloadSDK
