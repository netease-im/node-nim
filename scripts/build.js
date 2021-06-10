const { logger } = require('just-task')
const shell = require('shelljs')
const path = require('path')
const fs = require('fs')

// workaround to find executable when install as dependency
let gypPath = `${path.resolve(__dirname, '../../node-gyp/bin/node-gyp.js')}`

if (!fs.existsSync(gypPath)) {
  logger.info(`gypExec not found at ${gypPath}, switch`)
  gypPath = `${path.resolve(__dirname, '../node_modules/node-gyp/bin/node-gyp.js')}`
}
const gypExec = `node ${gypPath}`

module.exports = ({
  electronVersion = '8.1.1',
  runtime = 'electron',
  platform = process.platform,
  debug = false,
  silent = false,
  msvsVersion = '2017',
  arch = 'ia32',
  distUrl = 'https://electronjs.org/headers',
  cachePath = ''
}) => {
  logger.info(`start building [${runtime}-${electronVersion}]`)
  logger.info(path.resolve(__dirname))

  /** get command string */
  const command = [`${gypExec} configure`]
  const cmakeGenerate = ['cmake']
  cmakeGenerate.push(`${path.join(cachePath, 'wrapper')}`)
  cmakeGenerate.push(`-B${path.join(cachePath, 'build')}`)
  cmakeGenerate.push('-G"Visual Studio 15 2017"')
  cmakeGenerate.push('-T"v141_xp"')
  cmakeGenerate.push(`-DCMAKE_INSTALL_PREFIX=${cachePath}`)
  cmakeGenerate.push('-DBUILD_SHARED_LIBS=ON')

  const cmakeBuild = [`cmake --build ${path.join(cachePath, 'build')}`]

  // check platform
  if (platform === 'win32') {
    // command.push(`--arch=${arch} --msvs_version=${msvsVersion}`)
    command.push(`--arch=${arch} --msvs_version=${msvsVersion}`)
  }

  // check runtime
  if (runtime === 'electron') {
    command.push(`--target=${electronVersion} --dist-url=${distUrl}`)
  }

  // check debug
  if (debug) {
    command.push('--debug')
    cmakeBuild.push('--config Debug')
    if (platform === 'darwin') {
      // MUST AT THE END OF THE COMMAND ARR
      command.push('-- -f xcode')
    }
  } else {
    cmakeBuild.push('--config Release')
  }
  cmakeBuild.push('--target install')

  const commandStr = command.join(' ')

  /** start build */
  logger.info(commandStr)
  logger.info('Platform:', platform)
  logger.info('Electron Version:', electronVersion)
  logger.info('Runtime:', runtime)
  logger.info('Building...')

  logger.info(cmakeGenerate.join(' '))
  logger.info(cmakeBuild.join(' '))
  logger.info(commandStr)

  if (shell.exec(cmakeGenerate.join(' ')).code !== 0) {
    logger.error('Failed to generate NIM C++ wrapper solution.')
    process.exit(1)
  }

  if (shell.exec(cmakeBuild.join(' ')).code !== 0) {
    logger.error('Failed to build NIM C++ wrapper.')
    process.exit(1)
  }

  shell.exec(`${gypExec} clean`, { silent }, (code, stdout, stderr) => {
    // handle error
    logger.info(`clean done ${stdout}`)
    if (code !== 0) {
      logger.error(stderr)
      process.exit(1)
    }

    shell.exec(commandStr, {silent}, (code, stdout, stderr) => {
      // handle error
      logger.info(`configure done ${stdout}`)
      if (code !== 0) {
        logger.error(stderr)
        process.exit(1)
      }

      if (debug) {
        // handle success
        logger.info('Complete, please go to `/build` and build manually')
        process.exit(0)
      } else {
        shell.exec(`${gypExec} build`, { silent }, (code, stdout, stderr) => {
          // handle error
          if (code !== 0) {
            logger.error('build error!!!!!')
            logger.error(stderr)
            process.exit(1)
          }
          // handle success
          logger.info('Build complete')
          process.exit(0)
        })
      }
    })
  })
}
