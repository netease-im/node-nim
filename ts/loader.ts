import fs from 'fs';
import path from 'path';
const sdk_path = path.join(__dirname, '../sdk/bin');
const test_sdk_path = path.join(__dirname, '../../../bin');
// Add the compiled product path to the environment variable,
// so that the third party does not need to copy the
// dynamic library separately to the program directory when importing.
if (process.platform === 'win32') {
    process.env.PATH = `${sdk_path};${test_sdk_path};${process.env.PATH}`;
}
let node_nim_path;
if (fs.existsSync(sdk_path)) {
    node_nim_path = path.join(sdk_path, 'node-nim');
} else {
    node_nim_path = path.join(test_sdk_path, 'node-nim');
}

export default require(node_nim_path);
