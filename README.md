# NetEase Electron IM SDK

[![codecov](https://codecov.io/gh/netease-im/node-nim/branch/master/graph/badge.svg?token=YUP8T7ZG6U)](https://codecov.io/gh/netease-im/node-nim) [![GitHub all releases](https://img.shields.io/github/downloads/netease-im/node-nim/total)](https://github.com/netease-im/node-nim/releases)  
[中文](README_CN.md)  
[API Document](https://github.com/netease-im/node-nim/wiki)

## Table of Contents

-   [NetEase Electron IM SDK](#netease-electron-im-sdk)
    -   [Table of Contents](#table-of-contents)
    -   [Introduction](#introduction)
    -   [Runtime Requirements](#runtime-requirements)
    -   [System Requirements](#system-requirements)
    -   [Supported Platforms](#supported-platforms)
    -   [Installation](#installation)
    -   [Build From Source](#build-from-source)
    -   [Quick Start](#quick-start)
        -   [Initialize SDK](#initialize-sdk)
        -   [Login](#login)
        -   [Send Message](#send-message)

## Introduction

`node-nim` is a Node.js wrapper for the [NetEase IM PC SDK](https://doc.yunxin.163.com/messaging/docs/home-page?platform=pc), enabling you to utilize all of its features in your preferred frontend framework with native platform performance.  
For comprehensive documentation, changelog, and technical support, please visit https://dev.yunxin.163.com/.

## Runtime Requirements

| Runtime  | Version     |
| -------- | ----------- |
| Electron | >= v8.5.5   |
| Node.js  | >= v12.13.0 |

## System Requirements

| System  | Requirements  |
| ------- | ------------- |
| Windows | >= Windows 7  |
| macOS   | >= 10.14.0    |
| Linux   | glibc >= 2.23 |

## Supported Platforms

| Platform | Architecture |
| -------- | ------------ |
| Windows  | x64          |
| Windows  | ia32         |
| macOS    | x64          |
| macOS    | arm64        |
| Linux    | x64          |
| Linux    | arm64        |

## Installation

`node-nim` is an NPM package that can be installed using the `npm install` command.  
It will automatically download the prebuilt binary file that fits your current platform.

```bash
npm install node-nim --save-dev
```

Maybe you need to build ia32 app on x64 platform or something like that, you can use `--arch` and `--platform` to specify the platform you want to build.

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

## Build From Source

Technically, native nim sdk is shipped with a prebuilt node-nim.node binary file, so `there is no need to build it yourself.`.  
But if you want to add personal features or simply prefer to do so, feel free to build it!  
Build Requirements:

-   Node.js
-   npm
-   CMake
-   CMake supported generator(Unix Makefiles, Ninja, Visual Studio, Xcode...)

Now you are all set to build, run following commands in the root directory of the project:

```cmake
cmake -S . -B build
cmake --build build --config Release
```

And voilà, you now have your own node-nim binary file in the `build` directory.

## Quick Start

```ts
import * as node_nim from 'node-nim'
```

### Initialize SDK

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

### Login

```ts
let [loginResult] = await node_nim.nim.client.login('appkey', 'account', 'password', null, '')
if (loginResult.res_code_ == node_nim.NIMResCode.kNIMResSuccess) {
    console.log('login succeeded')
} else {
    console.log('login failed')
}
```

### Send Message

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
