const node_nim = require('../dist/node-nim')

async function testNIM() {
    let result = node_nim.nim.client.init('', 'NIM_SDK_NODE_TEST', '', {
        use_private_server_: true,
        lbs_address_: 'https://imtest-jd.netease.im/lbs',
        nego_key_neca_key_parta_:
            'e3afe7487e6ac9ba69654672672ceddc05d5b6d45850859f11004d30c63e3691afd55722bdd2c75232b2a3561776201f84def8e38c508870ca7692b4228b0478e104460d7800dee3b6c3d8f89746ed48ee94f268f42b9c911437083d3815624e50de3fec3c0ec8ab3e71d5bdce3f4291d20538893cacdc00da9d1390ee39440d',
        nego_key_neca_key_partb_: '10001',
        default_link_address_: '59.111.241.213:8000'
    })
    if (!result) {
        console.log('NIM init failed')
        process.exit(1)
    }
    node_nim.nim.initEventHandlers()
    node_nim.nim.talk.on('sendMsg', (res) => {
        console.log('sendMsg ack', res)
    })
    result = await node_nim.nim.client.login('fe416640c8e8a72734219e1847ad2547', 'zvct0', 'e10adc3949ba59abbe56e057f20f883e', null, '')
    console.log('loginResult', result)
    let message = node_nim.nim.talk.createTextMessage('zvct1', 0, node_nim.nim.tool.getUuid(), '', {}, 0, 0)
    node_nim.nim.talk.sendMsg(message, '')
}

async function testQChat() {
    // QChat
    let result = node_nim.qchat.instance.init({})
    if (!result) {
        console.log('QChat init failed')
        process.exit(1)
    }
    node_nim.qchat.initEventHandlers()
    node_nim.qchat.instance.on('loginStatus', (resp) => {
        console.log('loginStatus', resp)
    })
    node_nim.qchat.server.on('unread', (res) => {
        console.log('unread', res)
    })
    result = node_nim.qchat.instance.login({
        appkey: '45c6af3c98409b18a84451215d0bdd6e',
        accid: 'zvc0',
        auth_type: 0,
        login_token: 'e10adc3949ba59abbe56e057f20f883e',
        link_address: ['qchatlink-yqsx23.netease.im:9092', 'qchatlink-yqsx23.netease.im:8080']
    })
    console.log('login', result)
    node_nim.qchat.server.createServer({
        server_info: {
            name: 'test'
        }
    })
}

async function testChatRoom() {
    // ChatRoom
    if (!node_nim.chatroom.init('', '')) {
        console.log('init failed')
        process.exit(1)
    }
    node_nim.chatroom.initEventHandlers()
    node_nim.chatroom.on('enter', function (...resp) {
        console.log('enter', resp)
        if (resp[1] == 5 && resp[2] == 200) {
            node_nim.chatroom
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
        !node_nim.chatroom.independentEnter(
            36,
            {
                accid_: 'zvct0',
                token_: 'e10adc3949ba59abbe56e057f20f883e',
                app_key_: 'fe416640c8e8a72734219e1847ad2547',
                address_: ['59.111.241.213:9092']
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
    let error = node_nim.v2.init({
        appDataPath: '',
        appkey: 'fe416640c8e8a72734219e1847ad2547',
        basicOption: {
            customClientType: 0,
            disableAppNap: true,
            logReserveDays: 30,
            sdkLogLevel: 5,
            sdkType: 0
        },
        databaseOption: {
            backupFolder: '',
            enableBackup: true,
            enableRestore: true,
            encryptionKey: ''
        },
        fcsOption: {
            fcsAuthType: 1,
            mockRefer: '',
            mockUa: ''
        },
        linkOption: {
            asymmetricEncryptionAlgorithm: 1,
            exclusiveCluster: false,
            symmetricEncryptionAlgorithm: 1,
            useHttps: true
        },
        privateServerOption: {
            asymmetricEncryptionKeyA:
                'e3afe7487e6ac9ba69654672672ceddc05d5b6d45850859f11004d30c63e3691afd55722bdd2c75232b2a3561776201f84def8e38c508870ca7692b4228b0478e104460d7800dee3b6c3d8f89746ed48ee94f268f42b9c911437083d3815624e50de3fec3c0ec8ab3e71d5bdce3f4291d20538893cacdc00da9d1390ee39440d',
            asymmetricEncryptionKeyB: '10001',
            asymmetricEncryptionKeyVersion: 0,
            defaultLinkAddress: '59.111.241.213:8081',
            defaultLinkAddressIpv6: '',
            defaultNosUploadAddress: '',
            defaultNosUploadHost: '',
            ipProtocolVersion: 1,
            lbsAddresses: ['https://imtest-jd.netease.im/lbs/conf.jsp'],
            nosAccelerateAddress: '',
            nosAccelerateHosts: [],
            nosDownloadAddress: '',
            nosLbsAddress: '',
            probeIpv4Url: '',
            probeIpv6Url: '',
            useHttpdns: true
        }
    })
    if (error) {
        console.log('init failed', error)
        process.exit(1)
    }
    node_nim.v2.loginService.on('loginStatus', function (status) {
        console.log('loginStatus', status)
    })
    node_nim.v2.loginService.on('connectStatus', function (status) {
        console.log('connectStatus', status)
    })
    try {
        await node_nim.v2.loginService.login('zvct0', 'e10adc3949ba59abbe56e057f20f883e', {})
        // let result = await node_nim.v2.userService.getUserList(['zvct0', 'zvct1'])
        // console.log('getUserList', result)
        // result = await node_nim.v2.friendService.getFriendList()
        // console.log('getFriendList', result)
        // let result = await node_nim.nim.nos.downloadResource('http://10.219.25.127:88/IM-Native/mock/mock_file.txt', {}, null, null, null, null)
        // console.log('downloadResource', result)
        // node_nim.v2.messageService.on('receiveMessages', function (messages) {
        //     console.log('receiveMessages', messages)
        // })
        // let result = node_nim.v2.settingService.getP2PMessageMuteMode('zvct1')
        // console.log('getP2PMessageMuteMode', result)
        // let conversationId = node_nim.v2.conversationIdUtil.p2pConversationId('zvct1')
        let message = node_nim.V2NIMMessageCreator.createImageMessage('C:/Windows/Web/Screen/img100.jpg', 'name', '', 10, 20)
        result = await node_nim.v2.messageService.sendMessage(message, conversationId, {}, (progress) => {
            console.log('progress', progress)
        })
        console.log('sendMessage', result)
    } catch (e) {
        console.log('failed', e)
        process.exit(1)
    }
}
async function testV2Chatroom() {
    let error = node_nim.V2NIMChatroomClient.init({
        appDataPath: '',
        appkey: 'fe416640c8e8a72734219e1847ad2547',
        basicOption: {
            customClientType: 0,
            disableAppNap: true,
            logReserveDays: 30,
            sdkLogLevel: 5,
            sdkType: 0
        },
        databaseOption: {
            backupFolder: '',
            enableBackup: true,
            enableRestore: true,
            encryptionKey: ''
        },
        fcsOption: {
            fcsAuthType: 1,
            mockRefer: '',
            mockUa: ''
        },
        linkOption: {
            asymmetricEncryptionAlgorithm: 1,
            exclusiveCluster: false,
            symmetricEncryptionAlgorithm: 1,
            useHttps: true
        },
        privateServerOption: {
            asymmetricEncryptionKeyA:
                'e3afe7487e6ac9ba69654672672ceddc05d5b6d45850859f11004d30c63e3691afd55722bdd2c75232b2a3561776201f84def8e38c508870ca7692b4228b0478e104460d7800dee3b6c3d8f89746ed48ee94f268f42b9c911437083d3815624e50de3fec3c0ec8ab3e71d5bdce3f4291d20538893cacdc00da9d1390ee39440d',
            asymmetricEncryptionKeyB: '10001',
            asymmetricEncryptionKeyVersion: 0,
            defaultLinkAddress: '59.111.241.213:8081',
            defaultLinkAddressIpv6: '',
            defaultNosUploadAddress: '',
            defaultNosUploadHost: '',
            ipProtocolVersion: 1,
            lbsAddresses: ['https://imtest-jd.netease.im/lbs/conf.jsp'],
            nosAccelerateAddress: '',
            nosAccelerateHosts: [],
            nosDownloadAddress: '',
            nosLbsAddress: '',
            probeIpv4Url: '',
            probeIpv6Url: '',
            useHttpdns: true
        }
    })
    if (error) {
        console.log('init failed', error)
        process.exit(1)
    }
    let instance = node_nim.V2NIMChatroomClient.newInstance()
    if (!instance) {
        console.log('newInstance failed')
        process.exit(1)
    }
    try {
        let result = await instance.enter('36', {
            accountId: 'zvct0',
            token: 'e10adc3949ba59abbe56e057f20f883e',
            linkProvider: (roomId, accountId) => {
                return ['59.111.241.213:9092']
            }
        })
        console.log('enter', result)
        let instanceList = node_nim.V2NIMChatroomClient.getInstanceList()
        console.log('instanceList', instanceList)
        node_nim.V2NIMChatroomClient.destroyAll()
        console.log('destroyAll')
    } catch (e) {
        console.log('failed', e)
        process.exit(1)
    }
}

testV2Chatroom()
