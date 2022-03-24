const package_json = require('./package.json');
const fetch = require('node-fetch');
const download = require('download');

const arch = process.arch;
const platform = process.platform;
const sdk_group = "message";
const sdk_name = "nim";
const sdk_path = "sdk";
// fetch publish list··
fetch('http://publish.netease.im/api/list').then((res) => res.json()).then((publish_json) => {
    let sdk_list = [];
    Object.keys(publish_json[sdk_group]).forEach((temp) => {
        if (package_json.version.split('-')[0] === temp) {
            sdk_list = publish_json[sdk_group][temp];
        }
    });
    console.log(`[node_pre_build] downloadSDK sdk_name:${sdk_name}, platform:${platform}, arch:${arch}`)
    let sdk_url;
    sdk_list.forEach((member) => {
        if (member.filename.includes(sdk_name) && member.filename.includes(platform) && member.filename.includes(arch)) {
            sdk_url = member.cdnlink;
        }
    });
    if (!sdk_url) {
        console.error(`[node_pre_build] downloadSDK sdk_name:${sdk_name}, platform:${platform}, arch:${arch} not found`);
        return;
    }
    console.info(`[node_pre_build] Downloading prebuilt sdk from ${sdk_url} to ${sdk_path}`);
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