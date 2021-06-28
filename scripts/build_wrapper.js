const path = require('path')
const shell = require('shelljs')
const { logger } = require('just-task')

module.exports = ({
  platform = process.platform,
  arch = process.arch,
  sourcePath
}) => {
  return new Promise((resolve, reject) => {
    const wrapperSource = path.join(sourcePath, 'wrapper')

    // Generate Visual Studio solution
    const temporaryPath = path.join(sourcePath, `build_${platform}_${arch}`)
    const cmakeGenerate = [`cmake ${wrapperSource}`]
    cmakeGenerate.push(`-B${temporaryPath}`)
    cmakeGenerate.push('-T"v141_xp"')
    cmakeGenerate.push(`-DCMAKE_INSTALL_PREFIX=${sourcePath}`)
    if (platform === 'win32') {
      cmakeGenerate.push('-DBUILD_SHARED_LIBS=ON')
      cmakeGenerate.push(arch === 'ia32' ? '-G"Visual Studio 15 2017"' : '-G"Visual Studio 15 2017 Win64"')
    } else if (platform === 'darwin') {
      cmakeGenerate.push('-G"Xcode" -DCMAKE_OSX_DEPLOYMENT_TARGET=10.9')
    } else {
      reject(new Error('Unsupported platform.'))
    }
    logger.info(`[wrapper] ${cmakeGenerate.join(' ')}`)
    if (shell.exec(cmakeGenerate.join(' ')).code !== 0) {
      logger.error('[wrapper] Failed to generate NIM C++ wrapper solution.')
      process.exit(1)
    }

    // Build C++ wrapper
    const cmakeBuild = [`cmake --build ${temporaryPath}`]
    cmakeBuild.push('--config Release')
    cmakeBuild.push('--target install')
    logger.info(`[wrapper] ${cmakeBuild.join(' ')}`)
    if (shell.exec(cmakeBuild.join(' ')).code !== 0) {
      logger.error('[wrapper] Failed to build NIM C++ wrapper.')
      process.exit(1)
    }

    resolve()
  })
}
