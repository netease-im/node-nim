const { task, logger, option, argv } = require('just-task')
const fs = require('fs')
const download = require('download')
const tar = require('tar')
const path = require('path')
const build = require('./scripts/build')
const cleanup = require('./scripts/cleanup')
const nativeUrl = 'https://yx-web-nosdn.netease.im/package/1619595742/NIM_CrossPlatform_SDK_v8.4.0.zip?download=NIM_CrossPlatform_SDK_v8.4.0.zip'

option('platform', { default: 'win32' })
option('arch', { default: 'ia32' })

// trigger when run npm install
task('build_wrapper', () => {
  logger.info(`[node-nim] Start build C++ wrapper, platform: ${argv().platform}, arch: ${argv().arch}`)
  const buildPath = path.join(__dirname, 'build')
  const cachePath = path.join(__dirname, 'nim_sdk')
  const temporaryPath = path.join(__dirname, 'temporary')
  return new Promise((resolve, reject) => {
    cleanup(buildPath).then(() => {
      cleanup(cachePath).then(() => {
        download(nativeUrl, temporaryPath, {
          strip: 1,
          extract: true
        }).then(() => {
          const files = fs.readdirSync(temporaryPath)
          const matchPlatform = process.platform === 'win32' ? 'windows' : 'macosx'
          const matchArch = process.arch === 'ia32' ? 'x86' : 'x64'
          for (let i = 0; i < files.length; i++) {
            if (files[i].indexOf(matchPlatform) !== -1 && files[i].indexOf(matchArch) !== -1) {
              const sourceFile = path.join(temporaryPath, files[i])
              if (!fs.existsSync(cachePath)) {
                fs.mkdirSync(cachePath)
              }
              logger.info(`[node-nim] Extract file from ${sourceFile} to ${cachePath}`)
              tar.extract({
                file: sourceFile,
                cwd: cachePath,
                sync: true
              })
              build({
                cachePath,
                arch: argv().arch,
                platform: argv().platform
              })
              resolve()
            }
          }
        })
      })
    })
  })
})
