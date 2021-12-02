# NetEase IM Electron SDK 简介

NetEase IM Electron SDK（以下简称 SDK）是基于跨平台 C++ SDK 开发的 Node.js addon，可以让你顺利的在 Node.js 工程、Electron 工程中引入原生平台 SDK，在某些方面提升应用性能。

## 支持系统

 - Windows 7 或更高
 - macOS ARM/x86_64 10.13 或更高
 - Linux ARM/x86_64

## 推荐环境

### Node.js 版本

我们推荐您使用 Node.js 最新的长期支持（LTS）版本：[https://nodejs.org/en/](https://nodejs.org/en/)

### Electron 版本

推荐您使用 Electron v8.x ~ v12.x 中最新的 patch 版本，如截止 2021 年 12 月 1 日，Electron v12.x 系列最新的版本号为 v12.2.2，您可以使用如下命令来安装最新的 patch 版本。

```
npm install electron@12.x
```

它将自动安装最新的 v12.2.2 版本作为您的依赖。其他更多关于 npm 包版本管理的规则请参见：[https://docs.npmjs.com/about-semantic-versioning](https://docs.npmjs.com/about-semantic-versioning)

> SDK 将始终提供最新 patch 版本的预编译包，如果您本机安装的版本不是最新，可能会触发本地编译流程。您可以升级本地 Electron 版本来避免从本地编译 C++ addon
