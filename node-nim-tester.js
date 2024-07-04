#! /usr/bin/env node

const { Command } = require('commander')
const WebAT = require('hawk-web')
const program = new Command()
const downloadSDK = require('./script/download-sdk.js').downloadSDK
program
    .command('run')
    .description('run node-nim tester')
    .requiredOption('--deviceId <deviceId>', 'tester device id')
    .option('--taskId <taskId>', 'hawk test suite task id')
    .option('--url <url>', 'hawk websocket url')
    .option('--version <version>', 'test sdk version')
    .option('--nimSdkUrl <nimSdkUrl>', 'nim native sdk download url')
    .allowUnknownOption(true)
    .action(async (options) => {
        console.log('run node-nim tester, options:', options)
        if (options.nimSdkUrl) {
            await downloadSDK(options.nimSdkUrl)
        }
        const NIM = require('./dist/node-nim')
        new WebAT({
            applicationName: 'nim',
            platform: 'Windows&MacOS',
            version: options.version,
            url: options.url,
            deviceId: options.deviceId,
            taskId: options.taskId,
            targets: {
                NIM
            },
            oncompleted: () => {
                // 执行完成后退出进程
                process.exit(0)
            }
        })
    })

// parse
program.parse()
