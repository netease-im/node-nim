const node_nim = require('../dist/node-nim')
const assert = require('assert')

async function testQChat() {
    const instance = new node_nim.QChatInstanceModule()
    let ret = instance.init({})
    instance.initEventHandlers()
    if (!ret) {
        console.log('init failed')
        process.exit(1)
    }
    instance.on('loginStatus', (resp) => {
        console.log('loginStatus', resp)
    })
    instance
        .login({
            appkey: '45c6af3c98409b18a84451215d0bdd6e',
            accid: 'zvc0',
            auth_type: 0,
            login_token: 'e10adc3949ba59abbe56e057f20f883e',
            link_address: ['qchatlink-yqsx23.netease.im:9092', 'qchatlink-yqsx23.netease.im:8080']
        })
        .then((resp) => {
            console.log('login', resp)
        })
}
function testNIM() {
    const client = new node_nim.NIMClient()
    const talk = new node_nim.NIMTalk()
    var result = client.init('', 'NIM_SDK_NODE_TEST', '', {})

    client.initEventHandlers()
    talk.initEventHandlers()

    client.getSDKConfig()
    client.login('45c6af3c98409b18a84451215d0bdd6e', 'zvc0', 'e10adc3949ba59abbe56e057f20f883e', null, '').then((res) => {
        console.log('loginResult', res)
        talk.sendMsg(
            {
                session_type_: 0, // p2p
                receiver_accid_: 'zvc1',
                timetag_: new Date().getTime(),
                type_: 0, // text message
                content_: 'Send from NIM node test.',
                client_msg_id_: new Date().getTime().toString(), // use an uuid
                msg_setting_: {
                    push_payload_: { test: 'qq' }
                }
            },
            ''
        )
    })
    talk.on('receiveMsg', (msg) => {
        console.log(msg)
    })
    talk.on('sendMsg', (msg) => {
        console.log(msg)
    })
    talk.regMessageFilter((result) => {
        return false
    }, '')
}

testNIM()
