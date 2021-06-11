const path = require('path')

module.exports.getArgumentsFromNpmEnv = () => {
  return {
    electronVersion: process.env.npm_config_node_nim_electron_version,
    prebuilt: process.env.npm_config_node_nim_prebuilt,
    platform: process.env.npm_config_node_nim__platform,
    msvsVersion: process.env.npm_config_node_nim_msvs_version,
    debug: process.env.npm_config_node_nim_debug,
    silent: process.env.npm_config_node_nim_silent,
    arch: process.env.npm_config_node_nim_arch,
    nimLibs: process.env.npm_package_node_nim_win_libs
  }
}

module.exports.getArgumentsFromPkgConfig = () => {
  const rootConfig = path.join(process.env.INIT_CWD, 'package.json')
  const pkgInfo = require(rootConfig)
  if (pkgInfo.electronEnvironment) {
    return {
      electronVersion: pkgInfo.electronEnvironment.electronVersion,
      prebuilt: pkgInfo.electronEnvironment.prebuilt === true,
      platform: pkgInfo.electronEnvironment.platform,
      msvsVersion: pkgInfo.electronEnvironment.msvcVersion,
      debug: pkgInfo.electronEnvironment.debug === true,
      silent: pkgInfo.electronEnvironment.silent === true,
      arch: process.env.npm_config_node_nim_arch
    }
  } else {
    return {
      // Download prebuilt C++ addon defaultly.
      prebuilt: true
    }
  }
}
