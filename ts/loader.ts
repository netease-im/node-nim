const path = require('path')

if (process.platform === 'win32') {
  const modulePath = path.join(__dirname, '../build/Release/').replace('app.asar', 'app.asar.unpacked')
  process.env.PATH = `${modulePath};${process.env.PATH}`
}

export default require('../build/Release/node-nim.node')
