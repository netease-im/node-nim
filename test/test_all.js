const iniClient = require('./test_client.js').iniClient
const cleanupClient = require('./test_client.js').cleanupClient
const testClient = require('./test_client.js').testClient
const testDataSync = require('./test_datasync.js').default
const testOnlineSession = require('./test_online_session.js').default
const testFriend = require('./test_friend.js').default
const testGlobal = require('./test_global.js').default
const testMsglog = require('./test_msglog.js').default
const testTalk = require('./test_talk.js').default
const testSession = require('./test_session.js').default
const testUser = require('./test_user.js').default
const testNos = require('./test_nos.js').default
const testRts = require('./test_rts.js').default
const testSysmsg = require('./test_sysmsg.js').default
const testTool = require('./test_tool.js').default


const current = process.cwd()
process.chdir(`${current}/build/Release`)
console.log(`Current run path: ${process.cwd()} for NIM SDK`)

const test_info = {
    appKey: '45c6af3c98409b18a84451215d0bdd6e',
    mainUser: 'ljm2',
    mainUserPwd: 'e10adc3949ba59abbe56e057f20f883e',
    assistUser: 'jiajia02',
    assistUserPwd: '17ac6c7d1fe2e931e60751a8db164a4f',
}
describe('NIM Init Client', function () {
    iniClient(test_info)
})
describe('NIM Test Suite', function () {
    testClient(test_info)
    testDataSync(test_info)
    testFriend(test_info)
    testOnlineSession(test_info)
    testGlobal(test_info)
    testMsglog(test_info)
    testTalk(test_info)
    testSession(test_info)
    testUser(test_info)
    testNos(test_info)
    testRts(test_info)
    testSysmsg(test_info)
    testTool(test_info)
})
describe('NIM Cleanup', function () {
    cleanupClient(test_info)
})
