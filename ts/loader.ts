const path = require('path')
const fs = require('fs')

if (process.platform === 'win32') {
  const modulePaths = [
    path.join(__dirname, '../../build/lib/'),
    path.join(__dirname, '../../build/bin/'),
    path.join(__dirname, '../build/Release/'),
    path.join(__dirname, '../build/Release/').replace('app.asar', 'app.asar.unpacked'),
  ]
  for (const modulePath of modulePaths) {
    if (fs.existsSync(path.join(modulePath, 'node-nim.node'))) {
      process.env.PATH = `${modulePath};${process.env.PATH}`
      break
    }
  }
}

export default require('../build/Release/node-nim.node')
