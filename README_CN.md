# 网易云信 Electron IM SDK

[![codecov](https://codecov.io/gh/netease-im/node-nim/branch/master/graph/badge.svg?token=YUP8T7ZG6U)](https://codecov.io/gh/netease-im/node-nim) [![GitHub all releases](https://img.shields.io/github/downloads/netease-im/node-nim/total)](https://github.com/netease-im/node-nim/releases)  
[English](README.md)  
[API 文档](https://github.com/netease-im/node-nim/wiki)

## 目录

-   [网易云信 Electron IM SDK](#网易云信-electron-im-sdk)
    -   [目录](#目录)
    -   [介绍](#介绍)
    -   [运行时要求](#运行时要求)
    -   [操作系统要求](#操作系统要求)
    -   [支持的平台](#支持的平台)
    -   [安装](#安装)
    -   [构建](#构建)
    -   [快速开始](#快速开始)
        -   [初始化 SDK](#初始化-sdk)
        -   [登陆](#登陆)
        -   [发送消息](#发送消息)

## 介绍

`node-nim` 是 [NetEase IM PC SDK](https://doc.yunxin.163.com/messaging/docs/home-page?platform=pc) 的上层封装，使您可以在喜爱的前端框架中利用其所有功能, 并拥有原生平台性能。

更全面的文档，更新日志和技术支持，请访问 https://dev.yunxin.163.com/。

## 运行时要求

| 运行时   | 版本        |
| -------- | ----------- |
| Electron | >= v8.5.5   |
| Node.js  | >= v12.13.0 |

## 操作系统要求

| 操作系统 | 要求          |
| -------- | ------------- |
| Windows  | >= Windows 7  |
| macOS    | >= 10.14.0    |
| Linux    | glibc >= 2.23 |

## 支持的平台

| 平台    | 架构  |
| ------- | ----- |
| Windows | x64   |
| Windows | ia32  |
| macOS   | x64   |
| macOS   | arm64 |
| Linux   | x64   |
| Linux   | arm64 |

## 安装

`node-nim` 是一个可以使用 `npm install` 命令安装的 NPM 包。  
它会自动下载适合您当前平台的预构建二进制文件。

```bash
npm install node-nim --save-dev
```

默认情况下，`npm install` 安装 latest tag 下最新的版本，如果您期望使用目前 beta 阶段的 v10 版本 SDK，您需要指定使用 `beta` tag:

```bash
npm install node-nim@beta --save-dev
```

也许您需要在 x64 平台上构建 ia32 应用程序或类似的操作，您可以使用 `--arch` 和 `--platform` 来指定要构建的平台。

-   Windows x64

```bash
npm install node-nim --save-dev --arch=x64 --platform=win32
```

-   Windows x86

```bash
npm install node-nim --save-dev --arch=ia32 --platform=win32
```

-   macOS x64

```bash
npm install node-nim --save-dev --arch=x64 --platform=darwin
```

-   macOS arm64

```bash
npm install node-nim --save-dev --arch=arm64 --platform=darwin
```

-   Linux x64

```bash
npm install node-nim --save-dev --arch=x64 --platform=linux
```

-   Linux arm64

```bash
npm install node-nim --save-dev --arch=arm64 --platform=linux
```

## 构建

从技术上讲，原生的 nim sdk 附带了一个预编译的 `node-nim.node` 二进制文件，而 `npm install` 的时候会自动安装, 所以正常使用是`无需构建`的。  
但是如果您想添加个性功能或仅仅是想试一下，请随意构建！

构建要求：

-   Node.js
-   CMake
-   CMake 支持的生成器（Unix Makefiles、Ninja、Visual Studio、Xcode...）

现在您已经准备好进行构建，在项目根目录下运行以下命令：

```cmake

cmake -S . -B build

cmake --build build --config Release

```

然后您就能在 `build` 目录下找到构建好的 `node-nim.node` 二进制文件了。

## 快速开始

```ts
import * as node_nim from 'node-nim'
```

### 初始化 SDK

```ts
const result = node_nim.nim.client.init('appkey', '', '', {
    database_encrypt_key_: 'abcdefghijklmnopqrstuvwxyz012345'
})
if (result) {
    node_nim.nim.initEventHandlers() // init event handlers
    node_nim.nim.talk.on('receiveMsg', (result) => {
        console.log('receiveMsg', result)
    })
    node_nim.nim.talk.on('sendMsg', (message: node_nim.IMMessage) => {
        console.log('sendMsg: ', message)
    })
    // add more event handlers here
    // ...
}
return result
```

### 登陆

```ts
let [loginResult] = await node_nim.nim.client.login('appkey', 'accountId', 'password', null, '')
if (loginResult.res_code_ == node_nim.NIMResCode.kNIMResSuccess) {
    console.log('login succeeded')
} else {
    console.log('login failed')
}
```

### 发送消息

```ts
node_nim.nim.talk.sendMsg(
    {
        session_type_: node_nim.NIMSessionType.kNIMSessionTypeP2P,
        receiver_accid_: 'receiver',
        type_: node_nim.NIMMessageType.kNIMMessageTypeText,
        content_: 'Send from NIM node quick start.'
    },
    ''
)
```
