const { logger } = require('just-task')
const shell = require('shelljs')
const path = require('path')

module.exports = ({
  platform = process.platform,
  arch = process.arch,
  debug = false,
  cachePath = ''
}) => {
  logger.info(`[node-nim] Start building C++ wrapper [${platform}-${arch}]`)

  /** cmake generate vistual studio solution */
  const cmakeGenerate = ['cmake']
  /** NIM SDK C++ wrapper source folder */
  cmakeGenerate.push(`${path.join(cachePath, 'wrapper')}`)
  /** build cache folder */
  cmakeGenerate.push(`-B${path.join(cachePath, 'build')}`)
  /** install prefix */
  cmakeGenerate.push(`-DCMAKE_INSTALL_PREFIX=${cachePath}`)
  /** build shared library */
  cmakeGenerate.push('-DBUILD_SHARED_LIBS=ON')

  const cmakeBuild = [`cmake --build ${path.join(cachePath, 'build')}`]

  // check platform
  if (arch === 'ia32') {
    // command.push(`--arch=${arch} --msvs_version=${msvsVersion}`)
    cmakeGenerate.push('-G"Visual Studio 15 2017"')
  } else {
    cmakeGenerate.push('-G"Visual Studio 15 2017 Win64"')
  }

  // check debug
  if (debug) {
    cmakeBuild.push('--config Debug')
  } else {
    cmakeBuild.push('--config Release')
  }
  cmakeBuild.push('--target install')

  /** start build */
  logger.info('[node-nim] Arch:', arch)
  logger.info('[node-nim] Platform:', platform)
  logger.info('[node-nim] Building...')

  logger.info(`[node-nim] ${cmakeGenerate.join(' ')}`)
  logger.info(`[node-nim] ${cmakeBuild.join(' ')}`)

  if (shell.exec(cmakeGenerate.join(' ')).code !== 0) {
    logger.error('[node-nim] Failed to generate NIM C++ wrapper solution.')
    process.exit(1)
  }

  if (shell.exec(cmakeBuild.join(' ')).code !== 0) {
    logger.error('[node-nim] Failed to build NIM C++ wrapper.')
    process.exit(1)
  }
}
