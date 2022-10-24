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
function testChatRoom() {
    const chatroom = new node_nim.ChatRoomModule()
    if (!chatroom.init('', '')) {
        console.log('init failed')
        process.exit(1)
    }
    chatroom.initEventHandlers()
    chatroom.on('enter', function (...resp) {
        console.log('enter', resp)
        if (resp[1] == 5 && resp[2] == 200) {
            chatroom
                .getMessageHistoryByTagsOnlineAsync(
                    36,
                    {
                        limit_: 10,
                        tags_: ['tag1', 'tag2']
                    },
                    null,
                    ''
                )
                .then((...resp) => {
                    console.log('getMessageHistoryByTagsOnlineAsync', resp)
                })
        }
    })
    if (
        !chatroom.independentEnter(
            36,
            {
                accid_: 'zvct0',
                token_: 'e10adc3949ba59abbe56e057f20f883e',
                app_key_: 'fe416640c8e8a72734219e1847ad2547',
                address_: ['59.111.241.163:9092']
            },
            {
                private_config: {
                    nego_key_enca_key_parta:
                        'e3afe7487e6ac9ba69654672672ceddc05d5b6d45850859f11004d30c63e3691afd55722bdd2c75232b2a3561776201f84def8e38c508870ca7692b4228b0478e104460d7800dee3b6c3d8f89746ed48ee94f268f42b9c911437083d3815624e50de3fec3c0ec8ab3e71d5bdce3f4291d20538893cacdc00da9d1390ee39440d',
                    nego_key_enca_key_partb: '10001',
                    nego_key_enca_key_version: 0
                },
                public_config: {
                    comm_enca: 1,
                    hand_shake_type: 0,
                    nego_key_neca: 1
                }
            }
        )
    ) {
        console.log('independentEnter failed')
        process.exit(1)
    }
}
async function testV2() {
    const client = new node_nim.V2Client()
    const talk = new node_nim.NIMTalk()
    const result = client.init({
        app_key: '2bd025c577313e81b2bdb2d2dcefcadb',
        private_setting: {
            use_private_server: true,
            lbs_address: 'http://lbs-test.netease.im/lbs/conf.jsp',
            nego_key_neca_key_parta:
                'e3afe7487e6ac9ba69654672672ceddc05d5b6d45850859f11004d30c63e3691afd55722bdd2c75232b2a3561776201f84def8e38c508870ca7692b4228b0478e104460d7800dee3b6c3d8f89746ed48ee94f268f42b9c911437083d3815624e50de3fec3c0ec8ab3e71d5bdce3f4291d20538893cacdc00da9d1390ee39440d',
            nego_key_neca_key_partb: '10001'
        }
    })
    if (result.rescode != 200) {
        console.log('init failed')
        process.exit(1)
    }
    client.initEventHandlers()
    talk.initEventHandlers()
    let resp = await client.login({
        accid: 'zvct0',
        token: 'e10adc3949ba59abbe56e057f20f883e',
        option: {
            auth_type: 0
        }
    })
    if (resp.result.rescode != node_nim.NIMResCode.kNIMResSuccess) {
        console.log('login failed')
        process.exit(1)
    }
    console.log('loginResult', resp)
    talk.on('receiveMsg', function (result) {
        console.log('receiveMsg', result)
    })
    talk.on('sendMsg', (msg) => {
        console.log('sendMsg', msg)
    })

    talk.sendMsg(
        {
            session_type_: 0, // p2p
            receiver_accid_: 'zvct1',
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

testChatRoom()
