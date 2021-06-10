const { logger } = require('just-task')
const { existsSync } = require('fs')
const download = require('download')
const path = require('path')

module.exports = (url, f) => {
  return new Promise((resolve, reject) => {
    const temporaryFileName = 'nim_sdk.7z'
    const downloadFile = path.join(f, temporaryFileName)
    if (existsSync(downloadFile)) {
      logger.info(`Download file exist: ${downloadFile}`)
      resolve(downloadFile)
      return
    }
    logger.info('start downloading: ', url)
    download(url, f, { filename: temporaryFileName }).then(() => {
      logger.info('download complete.')
      resolve(downloadFile)
    }).catch(err => {
      reject(err)
    })
  })
}
