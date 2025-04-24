# 网易云信 Electron IM SDK

[![codecov](https://codecov.io/gh/netease-im/node-nim/branch/master/graph/badge.svg?token=YUP8T7ZG6U)](https://codecov.io/gh/netease-im/node-nim) [![GitHub all releases](https://img.shields.io/github/downloads/netease-im/node-nim/total)](https://github.com/netease-im/node-nim/releases)  
[English](README.md) | [API 文档](https://doc.yunxin.163.com/messaging2/client-apis?platform=client)

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
npm install node-nim
```

也许您需要在 x64 平台上构建 ia32 应用程序或类似的操作，您可以使用 `--arch` 和 `--platform` 来指定要构建的平台。

-   Windows x64

```bash
npm install node-nim --arch=x64 --platform=win32
```

-   Windows x86

```bash
npm install node-nim --arch=ia32 --platform=win32
```

-   macOS x64

```bash
npm install node-nim --arch=x64 --platform=darwin
```

-   macOS arm64

```bash
npm install node-nim --arch=arm64 --platform=darwin
```

-   Linux x64

```bash
npm install node-nim --arch=x64 --platform=linux
```

-   Linux arm64

```bash
npm install node-nim --arch=arm64 --platform=linux
```

## 构建

从技术上讲，原生的 NIM SDK 附带了一个预编译的 `node-nim.node` 二进制文件，而 `npm install` 的时候会自动安装, 所以正常使用是`无需构建`的。  
但是如果您想添加个性功能或仅仅是想试一下，请随意构建！

构建要求：

-   Node.js
-   CMake
-   CMake 支持的生成器（Unix Makefiles、Ninja、Visual Studio、Xcode...）

现在您已经准备好进行构建，在项目根目录下运行以下命令：

```cmake

cmake -Bbuild

cmake --build build --config Release

```

然后您就能在 `build` 目录下找到构建好的 `node-nim.node` 二进制文件了。

## 快速开始

首先您需要导入 `node-nim` 模块：

```ts
// ES6 Module
import * as NIM from 'node-nim'
// CommonJS
const NIM = require('node-nim')
```

导入模块后，您可以直接使用我们已经帮您实例化好的三类对象，如即时通讯、聊天室、圈组，示例代码如下：

```javascript
// IM 相关功能
NIM.nim.client.init('', '', '', {})
NIM.nim.client.cleanup('')

// 聊天室相关功能
NIM.chatroom.init('', '')
NIM.chatroom.cleanup()

// 圈组相关功能
NIM.qchat.instance.init({ appkey: 'your appkey', app_data_path: 'qchat' })
NIM.qchat.instance.cleanup({})
```

其中 `NIM.nim` 可直接访问的对象有：

| 对象名              | 说明                    |
|------------------|-----------------------|
| client           | 客户端模块                 |
| dataSync         | 数据同步模块                |
| friend           | 好友模块                  |
| global           | 全局模块                  |
| msgLog           | 消息记录模块                |
| nos              | NOS 模块                |
| onlineSession    | 在线会话模块                |
| passThroughProxy | 透传代理模块                |
| session          | 会话模块                  |
| subscribeEvent   | 事件订阅模块                |
| superTeam        | 超级群模块                 |
| sysMsg           | 系统消息模块                |
| talk             | 会话模块                  |
| team             | 群组模块                  |
| tool             | 工具模块                  |
| user             | 用户模块                  |
| plugin           | 插件模块                  |
| talkEx           | 消息扩展模块，PIN 消息、快捷评论、收藏 |

可通过 `NIM.chatroom` 直接访问的对象对应 `ChatRoomModule`，您可以直接访问该对象下的成员函数。

可通过 `NIM.qchat` 直接访问的对象有：

| 对象名                | 说明       |
|--------------------|----------|
| instance           | 圈组实例模块   |
| server             | 圈组服务器模块  |
| channel            | 圈组频道模块   |
| channelCategory    | 圈组频道分类模块 |
| message            | 圈组消息模块   |
| systemNotification | 圈组系统通知模块 |
| attachment         | 圈组附件模块   |
| role               | 圈组身份组模块  |
