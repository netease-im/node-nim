const path = require('path')
const download = require('download')
const tar = require('tar')
const fs = require('fs')
const { logger } = require('just-task')

module.exports = ({
  platform = process.platform,
  arch = process.arch,
  fetchUrl,
  temporaryPath,
  extractPath
}) => {
  return new Promise((resolve, reject) => {
    download(fetchUrl, temporaryPath, {
      strip: 1,
      extract: true
    }).then(() => {
      const files = fs.readdirSync(temporaryPath)
      const matchPlatform = platform === 'win32' ? 'windows' : 'macosx'
      const matchArch = arch === 'ia32' ? 'x86' : (platform === 'win32' ? 'x64' : 'x86_64')
      for (let i = 0; i < files.length; i++) {
        logger.info(`[fetch] found resource: ${files[i]}`)
        if (files[i].indexOf(matchPlatform) !== -1 && files[i].indexOf(matchArch) !== -1) {
          const sourceFile = path.join(temporaryPath, files[i])
          if (!fs.existsSync(extractPath)) {
            fs.mkdirSync(extractPath)
          }
          logger.info(`[wrapper] Extract file from ${sourceFile} to ${extractPath}`)
          tar.extract({
            file: sourceFile,
            cwd: extractPath,
            sync: true
          })
          resolve()
          break
        }
      }
    }).catch(err => {
      reject(err)
    })
  })
}
