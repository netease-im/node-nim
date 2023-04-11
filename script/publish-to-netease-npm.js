const process = require('child_process')
let gitTag = ''
let gitBranch = ''
let gitCommitCount = ''
try {
    gitTag = process.execSync('git describe --abbrev=0 --tags --exact-match').toString().trim()
} catch (e) {}
try {
    gitBranch = process.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
} catch (e) {}
try {
    gitCommitCount = process.execSync('git rev-list --count HEAD').toString().trim()
} catch (e) {}

console.log(`[node-nim] gitTag: ${gitTag}`)
console.log(`[node-nim] gitBranch: ${gitBranch}`)
console.log(`[node-nim] gitCommitCount: ${gitCommitCount}`)
let version = gitTag
if (version === '') {
    // remove characters before '/' in branch name
    version = gitBranch.replace(/.*\//, '')
    // remove characters after '-' in branch name
    version = version.replace(/-.*/, '')
}
version = version + '-alpha.' + gitCommitCount
console.log(`[node-nim] version: ${version}`)
process.execSync(`npm version ${version} --no-git-tag-version`)
process.execSync(`npm publish --registry=http://npm.netease.im/`)
