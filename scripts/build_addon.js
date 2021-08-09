const { logger } = require('just-task')
const shell = require('shelljs')
const path = require('path')
const fs = require('fs')

module.exports = ({
  target = '8.0.0',
  runtime = 'electron',
  platform = process.platform,
  arch = process.arch,
  debug = false,
  silent = false,
  msvcVersion = '2017',
  distUrl = 'https://electronjs.org/headers',
  forceClean = false
}) => {
  return new Promise((resolve, reject) => {
    logger.info(`[build] start building [${runtime}-${target}]`)
    const command = [`npx node-gyp configure`]
    command.push(`--arch=${arch} --msvs_version=${msvcVersion}`)
    if (runtime === 'electron') {
      command.push(`--target=${target} --dist-url=${distUrl}`)
    }
    if (debug) {
      command.push('--debug')
      if (platform === 'darwin') {
        command.push('-- -f xcode')
      }
    }
    logger.info(command.join(' '))
    logger.info('[build] platform:', platform)
    logger.info('[build] arch:', arch)
    logger.info('[build] target:', target)
    logger.info('[build] runtime:', runtime)
    if (forceClean) {
      if (shell.exec(`npx node-gyp clean`, { silent }) !== 0) {
        reject(new Error('failed to clean up build folder.'))
      }
    }
    shell.exec(command.join(' '), { silent }, (code, stdout, stderr) => {
      logger.info(`[build] configure done ${stdout}`)
      if (code !== 0) {
        reject(stderr)
      }
      shell.exec(`npx node-gyp build`, { silent }, (code, stdout, stderr) => {
        if (code !== 0) {
          logger.error('[build] failed to build C++ addon manually.')
          logger.error(stderr)
          reject(stderr)
        }
        logger.info(`[build] build complete ${stdout}`)
        resolve()
      })
    })
  })
}
