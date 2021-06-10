const { task, option, logger } = require('just-task')
const { readdirSync, mkdirSync, existsSync } = require('fs')
const path = require('path')
const build = require('./scripts/build')
const download = require('./scripts/download')
const cleanup = require('./scripts/cleanup')
const extract = require('extract-zip')
const tar = require('tar')

let electronVersion = '8.5.5'
const downloadUrl = 'https://yx-web-nosdn.netease.im/package/1619595742/NIM_CrossPlatform_SDK_v8.4.0.zip?download=NIM_CrossPlatform_SDK_v8.4.0.zip'
const projectDir = path.join(process.env.INIT_CWD, 'package.json')
const pkgMeta = require(projectDir)
if (pkgMeta.nertc_config) {
  electronVersion = pkgMeta.nertc_config.electron_version
}

// trigger when run npm install
task('install', () => {
  const buildPath = path.join(__dirname, 'build')
  const cachePath = path.join(__dirname, 'nim_sdk')
  const temporaryPath = path.join(__dirname, 'temporary')
  return new Promise((resolve, reject) => {
    cleanup(buildPath).then(() => {
      cleanup(cachePath).then(() => {
        download(downloadUrl, temporaryPath).then(f => {
          logger.info(`${f}`)
          extract(f, { dir: temporaryPath }).then(() => {
            const files = readdirSync(temporaryPath)
            const matchPlatform = process.platform === 'win32' ? 'windows' : 'macosx'
            const matchArch = process.arch === 'ia32' ? 'x86' : 'x64'
            for (let i = 0; i < files.length; i++) {
              if (files[i].indexOf(matchPlatform) !== -1 && files[i].indexOf(matchArch) !== -1) {
                const sourceFile = path.join(temporaryPath, files[i])
                if (!existsSync(cachePath)) {
                  mkdirSync(cachePath)
                }
                logger.info(`Extract file from ${sourceFile} to ${cachePath}`)
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
        })
      })
    })
  })
})
