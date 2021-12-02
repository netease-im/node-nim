# NetEase IM Electron SDK 安装指南

NetEase IM Electron SDK（以下简称 SDK）已经发布到 [npm](https://www.npmjs.com/package/node-nim) 平台，包名为 `node-nim`。

## 安装

您可以使用如下命令来安装 SDK：

```bash
npm install node-nim
```

> SDK 安装过程中会自动匹配您的 Electron 版本来下载预编译的 C++ addon，如果您安装过程中遇到错误，可以联系我们的技术人员针对您的版本生成预编译包来跳过本地编译流程。

## 集成

在需要的位置，您只需要导入 node-nim 包即可使用其功能：

```javascript
// require node-nim package
const nim = require('node-nim').default

// new nim client instance
const nimClient = new nim.NIMClient()

// initialize SDK
const sdkConfig = {
  db_encrypt_key： 'your db key'
}
nimClient.init('your app key', 'app data dir', 'app install dir', sdkConfig)
```
