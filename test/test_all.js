const iniClient = require('./test_modules/test_client.js').iniClient
const cleanupClient = require('./test_modules/test_client.js').cleanupClient
const testClient = require('./test_modules/test_client.js').testClient
const testDataSync = require('./test_modules/test_datasync.js').default
const testOnlineSession = require('./test_modules/test_online_session.js').default
const testFriend = require('./test_modules/test_friend.js').default
const testGlobal = require('./test_modules/test_global.js').default
const testMsglog = require('./test_modules/test_msglog.js').default
const testTalk = require('./test_modules/test_talk.js').default
const testSession = require('./test_modules/test_session.js').default
const testUser = require('./test_modules/test_user.js').default
const testNos = require('./test_modules/test_nos.js').default
const testSysmsg = require('./test_modules/test_sysmsg.js').default
const testTool = require('./test_modules/test_tool.js').default
const testPlugin = require('./test_modules/test_plugin.js').default
const testSubscribeEvent = require('./test_modules/test_subscribe_event.js').default
const testTeam = require('./test_modules/test_team.js').default
const testSuperTeam = require('./test_modules/test_super_team.js').default
const testPassThroughProxy = require('./test_modules/test_pass_through_proxy.js').default

console.log(`Current run path: ${process.cwd()} for NIM SDK`)

const test_info = {
    appKey: '45c6af3c98409b18a84451215d0bdd6e',
    mainUser: 'imelectron0',
    mainUserPwd: '44ad4e25e8701c4dfbb33e0af685ee66',
    assistUser: 'imelectron1',
    assistUserPwd: 'dc39f30783d8f0c38949a98289b4365e',
    superTeamID: '219184'
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
    testTalk(test_info)
    testSession(test_info)
    testUser(test_info)
    testNos(test_info)
    testSysmsg(test_info)
    testMsglog(test_info)
    testTool(test_info)
    testPlugin(test_info)
    testSubscribeEvent(test_info)
    testTeam(test_info)
    testSuperTeam(test_info)
    testPassThroughProxy(test_info)
})
describe('NIM Cleanup', function () {
    cleanupClient(test_info)
})
