const child_process = require('child_process')
const fs = require('fs')
const testDir = 'node-nim-tester'
if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir)
}
process.chdir(testDir)
child_process.execSync(`npm init --force`, { stdio: 'inherit' })
child_process.execSync(`npm install node-nim@latest --registry=http://npm.netease.im/`, { stdio: 'inherit' })
const args = process.argv.slice(2).join(' ')
if (process.platform === 'win32') {
    child_process.execSync(`.\\node_modules\\.bin\\node-nim-tester.cmd run ${args}`, { stdio: 'inherit' })
} else {
    child_process.execSync(`./node_modules/.bin/node-nim-tester run ${args}`, { stdio: 'inherit' })
}
process.chdir('..')
fs.rmSync(testDir, { recursive: true, force: true })
