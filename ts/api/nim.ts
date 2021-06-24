const nim = require('bindings')('nim');
const path = require('path');
process.env.PATH = `${path.resolve(path.join(__dirname, '../../build/Release'))};${process.env.PATH}`
export default nim;
