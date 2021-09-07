# NetEase IM Node.js addon wrapper
[![GitHub Test Badge](https://github.com/netease-im/node-nim/workflows/node-gyp/badge.svg)](https://github.com/netease-im/node-nim/actions) [![codecov](https://codecov.io/gh/netease-im/node-nim/branch/master/graph/badge.svg?token=YUP8T7ZG6U)](https://codecov.io/gh/netease-im/node-nim) [![GitHub all releases](https://img.shields.io/github/downloads/netease-im/node-nim/total)](https://github.com/netease-im/node-nim/releases)


## Build Environment

 - CMake 3.10 or higher
 - Visual Studio 2017 or MSBuild 2017

## Installation

node-nim runs on Node.js and is available as a NPM package.
```text
npm install node-nim --save-dev
```

## Quick Start

```text
const NIM = require('node-im')
const assert = require('assert')

var client = new NIM.NIMClient

const result = client.init('app_key', 'app_data_dir', 'app_install_dir', {
                    db_encrypt_key: 'abcdefghijklmnopqrstuvwxyz012345'
               })

client.login('app_key', 'username', 'password_in_md5', (result) => {
               assert.strictEqual(result.err_code, 200)
             }, '')

client.logout(1, (err_code) => {
                    assert.strictEqual(err_code, 200)
                }, '')

client.cleanUp('')
```
## Documentation

For more detailed documentation, the changelog, and tech support, see https://dev.yunxin.163.com/.

## Build From Source

|Options|Descroption|
|---|---|
|fetch-wrapper|Download NIM C++ SDK source files and C binary files|
|build-wrapper|Build NIM C++ SDK|
|package|Package the compiled artifacts|
|build|Build with specified parameters (build-wrapper+package)|

Examples:

Fetch C++ wrapper source files and build C++ addon for node.js.

```bash
npx just fetch-wrapper --target_platform=win32 --target_arch=ia32
npx just build --runtime=electron --target=13.1.2 --target_platform=win32 --target_arch=ia32
```

Just build NIM C++ wrapper, needs `npx just fetch-wrapper` before.

```bash
npx just build-wrapper --target_platform=win32 --target_arch=ia32
```

Packing a compiled artifact as `.tar.gz` in `packages` folder.

```bash
npx just package --runtime=electron --target=13.1.2 --target_platform=win32 --target_arch=ia32
```
