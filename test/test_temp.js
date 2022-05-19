const { NIMClient, NIMTalk } = require('../js/nim')
const assert = require('assert')
const test_info = {
    appKey: '45c6af3c98409b18a84451215d0bdd6e',
    mainUser: 'imelectron0',
    mainUserPwd: '44ad4e25e8701c4dfbb33e0af685ee66',
    assistUser: 'imelectron1',
    assistUserPwd: 'dc39f30783d8f0c38949a98289b4365e',
    superTeamID: '219184'
}

const client = new NIMClient()
const talk = new NIMTalk()
function emit_function(type, data) {
    console.log(type, data)
}

var result = client.init('', 'NIM_SDK_NODE_TEST', '', {
})

client.initEventHandlers()

client.getSDKConfig()

client.login(
    '45c6af3c98409b18a84451215d0bdd6e',
    'zvc0',
    'e10adc3949ba59abbe56e057f20f883e',
    (loginResult) => {
        console.log('loginResult', loginResult)
        if (loginResult.login_step_ == 3) {

        }
    },
    ''
)
talk.initEventHandlers()
talk.on("receiveMsg", (msg) => {
    console.log(msg)
})
talk.regMessageFilter((result) => {
    return false
}, "")
