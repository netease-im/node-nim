const nim = require('bindings')('nim');
const path = require('path');
const asarPath = path.join(__dirname, '../../build/Release/');
const unpackedPath = asarPath.replace('app.asar', 'app.asar.unpacked');
process.env.PATH = `${unpackedPath};${process.env.PATH}`;
export default nim;
