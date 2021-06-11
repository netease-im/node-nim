var nim_path = '';
if (process.platform == 'win32') {
    nim_path = '../../../../static/nim_sdk/win32/nim_electron_sdk';
} else if (process.platform == 'darwin') {
    nim_path = '../../../../static/nim_sdk/darwin/nim_electron_sdk';
} else {

}
const nim = require(nim_path);
export default nim;

