import fs from 'fs'
import path from 'path'
let sdk_path = ''
let debug_path = ''

// Add the compiled product path to the environment variable,
// so that the third party does not need to copy the
// dynamic library separately to the program directory when importing.
if (process.platform === 'win32') {
    sdk_path = path.join(__dirname, '../sdk/bin')
    debug_path = path.join(__dirname, '../../build/bin')
} else {
    sdk_path = path.join(__dirname, '../sdk/lib')
    debug_path = path.join(__dirname, '../../build/lib')
}
let relative_path = process.platform === 'win32'
    ? path.join(process.cwd(), 'node_modules/node-nim/sdk/bin')
    : path.join(process.cwd(), 'node_modules/node-nim/sdk/lib')
let paths = [sdk_path, process.cwd(), path.dirname(process.execPath), debug_path, relative_path]
let node_nim_dir = ''
for (let current_path of paths) {
    if (fs.existsSync(path.join(current_path, 'node-nim.node'))) {
        node_nim_dir = current_path
        break
    }
}
if (node_nim_dir.length === 0) {
    throw new Error('node-nim.node not found, tried: ' + paths.join(', '))
}
if (process.platform === 'win32') {
    process.env.PATH = `${node_nim_dir};${process.env.PATH}`
}

let object: any
try {
    object = require(path.join(node_nim_dir, 'node-nim.node'))
} catch (exception) {
    if (process.platform === 'win32') {
        object = require('../sdk/bin/node-nim.node')
    } else {
        object = require('../sdk/lib/node-nim.node')
    }
}

export default object
