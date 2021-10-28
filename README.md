# NetEase IM Node.js addon wrapper
[![GitHub Test Badge](https://github.com/netease-im/node-nim/workflows/build/badge.svg)](https://github.com/netease-im/node-nim/actions) [![codecov](https://codecov.io/gh/netease-im/node-nim/branch/master/graph/badge.svg?token=YUP8T7ZG6U)](https://codecov.io/gh/netease-im/node-nim) [![GitHub all releases](https://img.shields.io/github/downloads/netease-im/node-nim/total)](https://github.com/netease-im/node-nim/releases)

## Table of Contents
- [Build Environment](#build-environment)
- [Installation](#installation)
- [Unit Test](#unit-test)
- [Sample Code ](#sample-code )
- [Documentation](#documentation)
- [Build From Source](#build-from-source)


## Build Environment
If you are using node-nim under node enviroment or electron lower than 12.x.y, you will need the following tools to build addon locally, see [here](#build-from-source).
 - [CMake 3.10 or higher](https://cmake.org/)
 - [Visual Studio 2017 or MSBuild 2017](https://visualstudio.microsoft.com/zh-hans/vs/older-downloads/)

## Installation

node-nim runs on Node.js and is available as a NPM package.
```
npm install node-nim --save-dev
```
## Unit Test
Execute following script to run unit test, [check this](./test/test_all.js), and you can also get an coverage report under 'coverage'.
```
npm run coverage
```

## Sample Code

```
const NIM = require('node-nim')
const assert = require('assert')

const result = NIM.Client.init('app_key', 'app_data_dir', 'app_install_dir', {
    db_encrypt_key: 'abcdefghijklmnopqrstuvwxyz012345'
})

NIM.Client.login('app_key', 'username', 'password_in_md5', (result) => {
    assert.strictEqual(result.err_code, 200)
}, '')

NIM.Talk.initEventHandler() // init callbacks

NIM.Talk.on('onReceiveMsg', function (result) {
    console.log(result)
})

NIM.Talk.sendMsg({
    to_type: 0, // p2p
    to_accid: 'receiver_accid',
    time: new Date().getTime(),
    msg_type: 0, // text message
    msg_body: 'Send from NIM node quick start.',
    client_msg_id: new Date().getTime().toString(), // use an uuid
}, '', function () { })

NIM.Client.logout(1, (err_code) => {
    assert.strictEqual(err_code, 200)
}, '')

NIM.Client.cleanUp('')
```
## Quick Start
Check out this [quick start project](https://github.com/netease-im/node-nim-quick-start), try out NIM's outstanding features!

## Documentation

For more detailed documentation, the changelog, and tech support, see https://dev.yunxin.163.com/.

## Build From Source

Script 'install' will build addon from source automatically if downloading pre-built addon from  yunxin server failed(bad connection/lack of certain version/etc). You can also build addon manully, just type in the following command and run.
```
npm run build
```