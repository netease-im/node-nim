import fetch from 'node-fetch'
import compareVersions from 'compare-versions'
import download from 'download'

const arch = process.env.npm_config_arch || process.arch
const platform = process.env.npm_config_platform || process.platform
const sdk_group = "message"
const sdk_name = "nim"
const sdk_path = "sdk"
let sdk_url = process.env.npm_config_nim_sdk_url
let sdk_version = process.env.npm_package_version.split('-')[0]
if (process.env.npm_config_nim_sdk_version) {
    sdk_version = process.env.npm_config_nim_sdk_version
}
// fetch publish list
fetch('https://admin.netease.im/public-service/free/publish/list')
    .then((res) => res.json())
    .then((publish_json) => {
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
            console.log(`[node_pre_build] downloadSDK sdk_name:${sdk_name}, platform:${platform}, arch:${arch}`)
        }
        if (!sdk_url) {
            console.error(`[node_pre_build] downloadSDK sdk_name:${sdk_name}, platform:${platform}, arch:${arch} not found`)
            return
        }
        console.info(`[node_pre_build] Downloading prebuilt sdk from ${sdk_url} to ${sdk_path}`)
        // download sdk
        download(sdk_url, sdk_path, {
            extract: true,
            filter: (file) => {
                return !file.path.includes('._')
            }
        })
            .then(() => {
                console.info(`[node_pre_build] Downloading prebuilt sdk complete`)
            })
            .catch((err) => {
                console.error(`[node_pre_build] downloadSDK error:${err}`)
            })
    })
