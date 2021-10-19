const nim = require('bindings')('node-nim');
// Add the compiled product path to the environment variable,
// so that the third party does not need to copy the
// dynamic library separately to the program directory when importing.
if (process.platform === 'win32') {
    const path = require('path');
    const asarPath = path.join(__dirname, '../../sdk/bin');
    const unpackedPath = asarPath.replace('app.asar', 'app.asar.unpacked');
    process.env.PATH = `${unpackedPath};${process.env.PATH}`;
}

export default nim;
