import fs from 'fs'
import path from 'path'
let sdk_path = ''
let test_sdk_path = ''

// Add the compiled product path to the environment variable,
// so that the third party does not need to copy the
// dynamic library separately to the program directory when importing.
if (process.platform === 'win32') {
    sdk_path = path.join(__dirname, '../sdk/bin')
    test_sdk_path = path.join(__dirname, '../../../bin')
    process.env.PATH = `${sdk_path};${test_sdk_path};${process.env.PATH}`
} else if (process.platform === 'darwin') {
    sdk_path = path.join(__dirname, '../sdk/lib')
    test_sdk_path = path.join(__dirname, '../../../lib')
}
let node_nim_path
if (fs.existsSync(sdk_path)) {
    node_nim_path = path.join(sdk_path, 'node-nim')
} else {
    node_nim_path = path.join(test_sdk_path, 'node-nim')
}

export default require(node_nim_path)
