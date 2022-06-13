import fs from 'fs'
import path from 'path'
let sdk_path = ''

// Add the compiled product path to the environment variable,
// so that the third party does not need to copy the
// dynamic library separately to the program directory when importing.
if (process.platform === 'win32') {
    sdk_path = path.join(__dirname, '../sdk/bin')
    process.env.PATH = `${sdk_path};${process.env.PATH}`
} else {
    sdk_path = path.join(__dirname, '../sdk/lib')
}
let paths = [path.join(sdk_path, 'node-nim.node'), path.join(process.cwd(), 'node-nim.node'), path.join(path.dirname(process.execPath), 'node-nim.node')]
let node_nim_path = ''
for (let path of paths) {
    if (fs.existsSync(path)) {
        node_nim_path = path
        break
    }
}

export default require(node_nim_path)
