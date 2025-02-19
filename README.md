# NetEase Electron IM SDK

[![codecov](https://codecov.io/gh/netease-im/node-nim/branch/master/graph/badge.svg?token=YUP8T7ZG6U)](https://codecov.io/gh/netease-im/node-nim) [![GitHub all releases](https://img.shields.io/github/downloads/netease-im/node-nim/total)](https://github.com/netease-im/node-nim/releases)  
[中文](README_CN.md) | [API Document](https://doc.yunxin.163.com/messaging2/client-apis?platform=client)

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
| ------- |---------------|
| Windows | >= Windows 7  |
| macOS   | >= 10.13.0    |
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
cmake -Bbuild
cmake --build build --config Release
```

Now, you have your own node-nim binary file in the `build` directory.

## Quick Start

First, you need to import the `node-nim` module:

```ts
// ES6 Module
import * as NIM from 'node-nim'
// CommonJS
const NIM = require('node-nim')
```

After importing the module, you can directly use the three types of objects we have instantiated for you, such as IM, chatroom, and qchat. Here is an example:

```javascript
// IM related functions
NIM.nim.client.init('', '', '', {})
NIM.nim.client.cleanup('')

// Chatroom related functions
NIM.chatroom.init('', '')
NIM.chatroom.cleanup()

// QChat related functions
NIM.qchat.instance.init({ appkey: 'your appkey', app_data_path: 'qchat' })
NIM.qchat.instance.cleanup({})
```

The objects that can be directly accessed through `NIM.nim` are:

| Object Name        | Description                                                         |
|--------------------|---------------------------------------------------------------------|
| `client`           | Client module                                                       |
| `dataSync`         | Data sync module                                                    |
| `friend`           | Friend module                                                       |
| `global`           | Global module                                                       |
| `msgLog`           | Message log module                                                  |
| `nos`              | Object storage module                                               |
| `onlineSession`    | Online session module                                               |
| `passThroughProxy` | Pass-through proxy module                                           |
| `session`          | Local session module                                                |
| `subscribeEvent`   | Event subscription module                                           |
| `superTeam`        | Super team module                                                   |
| `sysMsg`           | System message module                                               |
| `talk`             | Talk module                                                         |
| `team`             | Team module                                                         |
| `tool`             | Tool module                                                         |
| `user`             | User module                                                         |
| `plugin`           | Plugin module                                                       |
| `talkEx`           | Message extension module, PIN messages, quick comments, collections |

The object that can be directly accessed through `NIM.chatroom` corresponds to `ChatRoomModule`, and you can directly access the member functions under this object.

The objects that can be directly accessed through `NIM.qchat` are:

| Object Name          | Description                      |
|----------------------|----------------------------------|
| `instance`           | QChat instance module            |
| `server`             | QChat server module              |
| `channel`            | QChat channel module             |
| `channelCategory`    | QChat channel category module    |
| `message`            | QChat message module             |
| `systemNotification` | QChat system notification module |
| `attachment`         | QChat attachment module          |
| `role`               | QChat role module                |
