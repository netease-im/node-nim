import fetch from 'node-fetch';
import compareVersions from 'compare-versions';
import download from 'download';

const arch = process.arch;
const platform = process.platform;
const sdk_group = "message";
const sdk_name = "nim";
const sdk_path = "sdk";
let sdk_url = process.env.NIM_SDK_URL;
let sdk_version = process.env.npm_package_version;
if (process.env.NIM_SDK_VERSION) {
    sdk_version = process.env.NIM_SDK_VERSION;
}
// fetch publish list
fetch('http://publish.netease.im/api/list').then((res) => res.json()).then((publish_json) => {
    // get sdk list
    if (!sdk_url) {
        let sdk_list = [];
        let latest_version = "0.0.0";
        let latest_sdk_list = [];
        Object.keys(publish_json[sdk_group]).forEach((temp) => {
            if (compareVersions.compare(latest_version, temp, '<')) {
                latest_version = temp;
                latest_sdk_list = publish_json[sdk_group][temp];
            }
            if (sdk_version === temp) {
                sdk_list = publish_json[sdk_group][temp];
            }
        });
        if (sdk_list.length === 0) {
            console.log(`${sdk_name} sdk version ${sdk_version} not found, use latest version ${latest_version}`);
            sdk_list = latest_sdk_list;
        }
        console.log(`[node_pre_build] downloadSDK sdk_name:${sdk_name}, platform:${platform}, arch:${arch}`)
        // use platform and arch to find the sdk
        sdk_list.forEach((member) => {
            if (member.filename.includes(sdk_name) && member.filename.includes(platform) && member.filename.includes(arch)) {
                sdk_url = member.cdnlink;
            }
        });
    }
    if (!sdk_url) {
        console.error(`[node_pre_build] downloadSDK sdk_name:${sdk_name}, platform:${platform}, arch:${arch} not found`);
        return;
    }
    console.info(`[node_pre_build] Downloading prebuilt sdk from ${sdk_url} to ${sdk_path}`);
    // download sdk
    download(sdk_url, sdk_path, {
        extract: true,
        filter: (file) => {
            return !file.path.includes('._');
        },
    }).then(() => {
        console.info(`[node_pre_build] Downloading prebuilt sdk complete`);
    }).catch((err) => {
        console.error(`[node_pre_build] downloadSDK error:${err}`)
    });
});