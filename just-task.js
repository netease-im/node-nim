const { task, option, logger } = require('just-task')
const { readdirSync, mkdirSync, existsSync } = require('fs')
const download = require('download')
const extract = require('extract-zip')
const tar = require('tar')
const path = require('path')

const build = require('./scripts/build')
const cleanup = require('./scripts/cleanup')
const argv = require('./scripts/arguments')
const packageMeta = require('./package.json')
const nativeUrl = 'https://yx-web-nosdn.netease.im/package/1619595742/NIM_CrossPlatform_SDK_v8.4.0.zip?download=NIM_CrossPlatform_SDK_v8.4.0.zip'

// trigger when run npm install
task('install', () => {
  const buildPath = path.join(__dirname, 'build')
  const cachePath = path.join(__dirname, 'nim_sdk')
  const temporaryPath = path.join(__dirname, 'temporary')
  return new Promise((resolve, reject) => {
    cleanup(buildPath).then(() => {
      cleanup(cachePath).then(() => {
        const config = Object.assign({},
          argv.getArgumentsFromNpmEnv(),
          argv.getArgumentsFromPkgConfig()
        )
        // default electron build version as 8.5.5
        const electronVersion = config.electronVersion || '8.5.5'
        if (config.prebuilt) {
          const prefix = 'https://yx-web-nosdn.netease.im/package/nim-electron-sdk'
          const platform = config.platform || process.platform
          const addonVersion = packageMeta.version
          const arch = config.arch || process.arch
          const requestUrl = `${prefix}-${platform}-${arch}-${addonVersion}-${electronVersion}.zip`
          logger.info(`downloading prebuilt addon from: ${requestUrl}`)
          download(`${requestUrl}`, temporaryPath)
        } else {
          download(nativeUrl, temporaryPath, {
            strip: 1,
            extract: true
          }).then(() => {
            const files = readdirSync(temporaryPath)
            const matchPlatform = process.platform === 'win32' ? 'windows' : 'macosx'
            const matchArch = process.arch === 'ia32' ? 'x86' : 'x64'
            for (let i = 0; i < files.length; i++) {
              if (files[i].indexOf(matchPlatform) !== -1 && files[i].indexOf(matchArch) !== -1) {
                const sourceFile = path.join(temporaryPath, files[i])
                if (!existsSync(cachePath)) {
                  mkdirSync(cachePath)
                }
                logger.info(`extract file from ${sourceFile} to ${cachePath}`)
                tar.extract({
                  file: sourceFile,
                  cwd: cachePath,
                  sync: true
                })
                build({ electronVersion, cachePath })
                resolve()
              }
            }
          })
        }
      })
    })
  })
})
