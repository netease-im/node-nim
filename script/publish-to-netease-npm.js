const childProcess = require('child_process')
let gitTag = ''
let gitBranch = ''
let gitCommitCount = ''
try {
    gitTag = childProcess.execSync('git describe --abbrev=0 --tags --exact-match').toString().trim()
} catch (e) {}
try {
    gitBranch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
} catch (e) {}
try {
    gitCommitCount = childProcess.execSync('git rev-list --count HEAD ^$(git describe --tags --abbrev=0)~1').toString().trim()
} catch (e) {}

console.log(`[node-nim] gitTag: ${gitTag}`)
console.log(`[node-nim] gitBranch: ${gitBranch}`)
console.log(`[node-nim] gitCommitCount: ${gitCommitCount}`)
let version = gitTag
let channel = 'latest'
if (version === '') {
    if (gitBranch.startsWith('release') || gitBranch.startsWith('hotfix')) {
        channel = 'beta'
    }
    if (gitBranch.startsWith('feature')) {
        channel = 'alpha'
    }
    // remove characters before '/' in branch name
    version = gitBranch.replace(/.*\//, '')
    // remove characters after '-' in branch name
    version = version.replace(/-.*/, '')
    // append alpha
    version = `${version}-${channel}.${gitCommitCount}`
}
console.log(`[node-nim] version: ${version}`)
childProcess.execSync(`npm version ${version} --no-git-tag-version --allow-same-version`)

const registryUrl = process.argv[2] || 'http://npm.netease.im/'
childProcess.execSync(`npm publish --registry=${registryUrl} --tag=${channel}`)
