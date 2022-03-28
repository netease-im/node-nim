# NetEase IM Node.js addon wrapper
[![GitHub Test Badge](https://github.com/netease-im/node-nim/workflows/build/badge.svg)](https://github.com/netease-im/node-nim/actions) [![codecov](https://codecov.io/gh/netease-im/node-nim/branch/master/graph/badge.svg?token=YUP8T7ZG6U)](https://codecov.io/gh/netease-im/node-nim) [![GitHub all releases](https://img.shields.io/github/downloads/netease-im/node-nim/total)](https://github.com/netease-im/node-nim/releases)

## Table of Contents
- [Installation](#installation)
- [Unit Test](#unit-test)
- [Sample Code ](#sample-code )
- [Documentation](#documentation)

## Introduction
node-nim is a wrapper of [NetEase IM](https://netease.im/).
node-nim will download the nim SDK which has the same version, you can override the version by add `NIM_SDK_VERSION="${version}"` to environment variables.
For more detailed documentation, changelog and tech support. See https://dev.yunxin.163.com/.

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
const client = new NIM.NIMClient()
const talk = new NIM.NIMTalk()
const result = client.init('app_key', 'app_data_dir', 'app_install_dir', {
    db_encrypt_key: 'abcdefghijklmnopqrstuvwxyz012345'
})

client.login('app_key', 'username', 'password_in_md5', (result) => {
    assert.strictEqual(result.err_code, 200)
    if (loginResult.login_step === 3) { // login has 3 steps, step 3 succeeded
        talk.initEventHandler() // init callbacks

        talk.on('onReceiveMsg', function (result) {
            console.log(result)
        })

        talk.sendMsg({
            to_type: 0, // p2p
            to_accid: 'receiver_accid',
            time: new Date().getTime(),
            msg_type: 0, // text message
            msg_body: 'Send from NIM node quick start.',
            client_msg_id: new Date().getTime().toString(), // use an uuid
        }, '', function () { })

        client.logout(1, (err_code) => {
            assert.strictEqual(err_code, 200)
        }, '')

        client.cleanUp('')
    }
}, '')
```

## Quick Start
Check out this [quick start project](https://github.com/netease-im/node-nim-quick-start), try out NIM's outstanding features!