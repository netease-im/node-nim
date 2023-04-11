const fetch = require('node-fetch')
const fs = require('fs')
const compareVersions = require('compare-versions')
const download = require('download')
const arch = process.env.npm_config_arch || process.arch
const platform = process.env.npm_config_platform || process.platform
const sdk_group = 'message'
const sdk_name = 'nim'
const sdk_path = `${__dirname}/../sdk`
if (process.env.npm_config_ignoredownloadsdk) {
    console.log('ignore download sdk')
    process.exit(0)
}
let sdk_version
let sdk_url = process.env.npm_config_nimsdkurl
if (process.env.npm_package_version) {
    sdk_version = process.env.npm_package_version.split('-')[0]
}
if (process.env.npm_config_nimsdkversion) {
    sdk_version = process.env.npm_config_nimsdkversion
}
async function downloadSDK(custom_sdk_url) {
    if (custom_sdk_url) {
        sdk_url = custom_sdk_url
    }
    // fetch publish list
    const res = await fetch('https://admin.netease.im/public-service/free/publish/list')
    const publish_json = await res.json()
    // get sdk list
    if (!sdk_url) {
        let latest_version = '0.0.0'
        let latest_sdk_url = ''
        Object.keys(publish_json.data[sdk_group]).forEach((temp) => {
            if (compareVersions.compare(latest_version, temp, '<')) {
                publish_json.data[sdk_group][temp].forEach((member) => {
                    if (member.filename.includes(sdk_name) && member.filename.includes(platform) && member.filename.includes(arch)) {
                        latest_version = temp
                        latest_sdk_url = member.cdnlink
                    }
                })
            }
            if (sdk_version === temp) {
                publish_json.data[sdk_group][temp].forEach((member) => {
                    if (member.filename.includes(sdk_name) && member.filename.includes(platform) && member.filename.includes(arch)) {
                        sdk_url = member.cdnlink
                    }
                })
            }
        })
        if (!sdk_url || sdk_url.length === 0) {
            console.log(`${sdk_name} sdk version ${sdk_version} not found, use latest version ${latest_version}`)
            sdk_url = latest_sdk_url
        }
        console.log(`[node-nim] downloadSDK sdk_name:${sdk_name}, platform:${platform}, arch:${arch}`)
    }
    if (!sdk_url) {
        console.error(`[node-nim] downloadSDK sdk_name:${sdk_name}, platform:${platform}, arch:${arch} not found`)
        return
    }
    console.info(`[node-nim] Downloading prebuilt sdk from ${sdk_url} to ${sdk_path}`)
    // remove sdk_path
    if (fs.existsSync(sdk_path)) {
        fs.rmSync(sdk_path, { recursive: true, force: true })
    }
    // download sdk
    try {
        await download(sdk_url, sdk_path, {
            extract: true,
            filter: (file) => {
                return !file.path.includes('._')
            }
        })
        console.info(`[node-nim] Downloading prebuilt sdk complete`)
    } catch (err) {
        console.error(`[node-nim] downloadSDK error:${err}`)
    }
}
exports.downloadSDK = downloadSDK
