const assert = require('assert');
// const NIMChatRoom = require('../build/Release/node-nim-chatroom')
const NIM = require('../build/Release/nim')

/**
 * NIM instance
 */
const client = new NIM.Client()
const sync = new NIM.DataSync()
const friend = new NIM.Friend()
const global = new NIM.Global()
const session = new NIM.Session()
const msglog = new NIM.MsgLog()
const talk = new NIM.Talk()
const team = new NIM.Team()
const user = new NIM.User()
const plugin = new NIM.PlugIn()
const tools = new NIM.Tool()

/**
 * ChatRoom instance
 */
// const chatroom = new NIMChatRoom.ChatRoom()

const current = process.cwd()
process.chdir(`${current}/build/Release`)
console.log(`Current run path: ${process.cwd()} for NIM SDK`)

const appKey = '45c6af3c98409b18a84451215d0bdd6e'

const mainUser = 'ljm2'
const mainUserPwd = 'e10adc3949ba59abbe56e057f20f883e'

const assistUser = 'jiajia02'
const assistUserPwd = '17ac6c7d1fe2e931e60751a8db164a4f'

const gOperator = 'jiajia02'
const gRoomId = 2008
const gQueuHead = 'jiajia01'
let gMyRoomInfo

describe('NIM client startup', () => {
  describe('#Init', () => {
    it('Init NIM SDK should return 1', () => {
      const result = client.Init('', 'NIM_SDK_NODE_TEST', '', {
        db_encrypt_key: 'abcdefghijklmnopqrstuvwxyz012345'
      })
      assert.strictEqual(result, 1)
    })
  })
})

describe('NIM Test Suite', () => {
  before((done) => {
    /*
    sync.RegCompleteCb((syncType, status, dataSyncInfo) => {
      console.log(syncType, status)
      if (syncType === 7 && status === 1) {
        done()
      }
    })
    */
    client.Login(appKey, mainUser, mainUserPwd, (loginResult) => {
      if (loginResult.login_step === 3) {
        done()
      }
    }, '')
  })

  after((done) => {
    client.Logout(1, (errorCode) => {
      done()
    }, '')
  })

  describe('Client suite', () => {
    describe('#GetSDKConfig', () => {
      it('Get SDK config should return encrypt key: abcdefghijklmnopqrstuvwxyz012345', () => {
        const sdkConfig = client.GetSDKConfig()
        assert.strictEqual(sdkConfig.db_encrypt_key, 'abcdefghijklmnopqrstuvwxyz012345')
      })
    })
    describe('#SetMultiportPushConfigAsync', () => {
      it('Set multiport push config should return 200', (done) => {
        client.SetMultiportPushConfigAsync(true, (errorCode, result) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(result, true)
          done()
        }, '')
      })
    })
    describe('#GetMultiportPushConfigAsync', () => {
      it('Get multiport push config should return true', (done) => {
        client.GetMultiportPushConfigAsync((errorCode, result) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(result, true)
          done()
        }, '')
      })
    })
    describe('#GetSDKVersion', () => {
      it('Get SDK version should return no empty', () => {
        const sdkVeresion = client.GetSDKVersion()
        assert.notStrictEqual(sdkVeresion, '')
      })
    })
    describe('#GetServerCurrentTime', () => {
      it('Get server current time should return > 0', (done) => {
        client.GetServerCurrentTime((errorCode, calcLocal, timestamp) => {
          assert.notStrictEqual(timestamp, 0)
          done()
        }, true)
      })
    })
    describe('#GetCurrentUserAccount', () => {
      it('Get current user account should return ljm2', () => {
        const account = client.GetCurrentUserAccount()
        assert.notStrictEqual(account, '')
      })
    })
  })

  describe('Friends suite', () => {
    const target = 'jiajia02'
    describe('#Request', () => {
      it('Friend request should return 200', (done) => {
        const result = friend.Request(target, 1, 'Request msg', (errorCode) => {
          assert.strictEqual(errorCode, 200)
          done()
        }, '')
        assert.strictEqual(result, true)
      })
    })
    describe('#Update', () => {
      it('Update friend should return 200', (done) => {
        const result = friend.Update({
          accid: target,
          alias: 'AliasTest'
        }, (errorCode) => {
          assert.strictEqual(errorCode, 200)
          done()
        }, '')
        assert.strictEqual(result, true)
      })
    })
    describe('#GetList', () => {
      it(`Get list should return 200`, (done) => {
        friend.GetList((errorCode, friendList) => {
          assert.strictEqual(errorCode, 200)
          assert.notStrictEqual(friendList.length, 0)
          let foundTarget = false
          friendList.map((friend) => {
            if (friend.accid === target) {
              foundTarget = true
            }
          })
          assert.strictEqual(foundTarget, true)
          done()
        }, '')
      })
    })
    describe('#GetFriendProfile', () => {
      it(`Get friend profile should return 200 with ${target} profile`, (done) => {
        friend.GetFriendProfile(target, (accountId, profile) => {
          assert.strictEqual(accountId, target)
          assert.strictEqual(profile.accid, target)
          done()
        }, '')
      })
    })
    describe('#QueryFriendListByKeyword', () => {
      it('Query friend list by keywork should return 200', (done) => {
        friend.QueryFriendListByKeyword('jia  ', (errorCode, profile) => {
          assert.strictEqual(errorCode, 200)
          // TODO
          done()
        }, '')
      })
    })
    describe('#DeleteEx', () => {
      it('Delete friend should return 200', (done) => {
        const result = friend.DeleteEx(target, {
          delete_alias: true
        }, (errorCode) => {
          assert.strictEqual(errorCode, 200)
          done()
        })
        assert.strictEqual(result, true)
      })
    })
  })

  describe('Global suite', () => {
    describe('#SetExceptionReportCallback', () => {
      it('Set exception report callback');
    })
    describe('#SetProxy', () => {
      it('Set proxy');
    })
    describe('#DetectProxy', () => {
      it('Detect proxy');
    })
    describe('#GetSDKCachedFileInfoAsync', () => {
      it('Get SDK cache file info should return 200', (done) => {
        global.GetSDKCachedFileInfoAsync(mainUser,
          'image', new Date().getTime(), (errorCode, info) => {
            assert.strictEqual(errorCode, 200)
            assert.strictEqual(info.file_type, 'image')
            done()
          }, '')
      })
    })
    describe('#DeleteSDKCachedFileAsync', () => {
      it('Delete SDK cached file should return 200', (done) => {
        global.DeleteSDKCachedFileAsync(mainUser,
          'image', new Date().getTime(), (errorCode) => {
            assert.strictEqual(errorCode, 200)
            done()
          }, '')
      })
    })
    describe.skip('#SDKFeedbackAsync', () => {
      it('SDK feedback should return 200', (done) => {
        global.SDKFeedbackAsync('https://yunxin.163.com', (errorCode) => {
          assert.strictEqual(errorCode, 200)
          done()
        }, '')
      }).timeout(1000 * 10)
    })
  })

  describe('Message history suite', () => {
    const target = 'jiajia02'
    let signalMsgId = ''
    let signalMessage
    describe('#QueryMsgOnlineAsync', () => {
      it('Query messages online should return 200', (done) => {
        const limit = 10
        msglog.QueryMsgOnlineAsync({
          id: target,
          to_type: 0,
          limit_count: limit,
          from_time: 0,
          end_time: new Date().getTime(),
          reverse: false,
          need_save_to_local: true,
          auto_download_attachment: false,
          msg_type_list: [],
          is_exclusion_type: false
        }, (errorCode, accountId, toType, messages) => {
          assert.strictEqual(messages.count, limit)
          let isTarget = true
          // Check all message to_accid
          messages.content.map((message) => {
            if (message.to_accid !== target) {
              isTarget = false
            }
          })
          assert.strictEqual(isTarget, true)
          done()
        })
      })
    })
    describe('#QueryMsgAsync', () => {
      it('Query msg log should return 200 with 10 number of msglogs', (done) => {
        msglog.QueryMsgAsync(target, 0, 10, 0, (errorCode, accId, toType, msglogs) => {
          assert.notStrictEqual(msglogs.count, 0)
          assert.strictEqual(msglogs.content[0].to_accid, target)
          signalMsgId = msglogs.content[0].client_msg_id
          signalMessage = msglogs.content[0]
          done()
        }, '')
      })
    })
    describe('#QueryMsgByIDAysnc', () => {
      it(`Query msg by ID should return ID ${signalMsgId}`, (done) => {
        msglog.QueryMsgByIDAysnc(signalMsgId, (errorCode, messageId, message) => {
          console.log(errorCode, messageId, JSON.stringify(message))
          assert.strictEqual(signalMsgId, messageId)
          assert.strictEqual(signalMsgId, message.client_msg_id)
          done()
        }, '')
      })
    })
    describe('#QueryMsgByKeywordOnlineAsync', () => {
      it('Query message by keywork should return 200 with 10 number of messages', (done) => {
        const result = msglog.QueryMsgByKeywordOnlineAsync({
          id: target,
          to_type: 0,
          keyword: 'Goodbye!',
          limit_count: 10,
          from_time: new Date().getTime() - (60 * 60 * 1000 * 24),
          end_time: new Date().getTime(),
          reverse: false,
        }, (errorCode, accountId, toType, messages) => {
          assert.strictEqual(errorCode, 200)
          // TODO
          let isTarget = true
          messages.content.map((message) => {
            if (message.to_accid !== target) {
              isTarget = false
            }
          })
          assert.strictEqual(isTarget, true)
          done()
        })
        assert.strictEqual(result, true)
      }).timeout(1000 * 10)
    })
    describe('#QueryMsgOfSpecifiedTypeInASessionAsync', () => {
      it('Query message by specified type should return message with 0 type', (done) => {
        msglog.QueryMsgOfSpecifiedTypeInASessionAsync(
          0, target, 10, 0,
          new Date().getTime(), '', false, [0], (errorCode, accountId, toType, messages) => {
            assert.strictEqual(errorCode, 200)
            let differentMsgType = false
            messages.content.map((message) => {
              if (message.msg_type !== 0) {
                differentMsgType = true
              }
            })
            assert.strictEqual(differentMsgType, false)
            done()
          }, '')
      })
    })
    describe('#QueryMsgByOptionsAsync', () => {
      it('Query message by option should return 200', (done) => {
        const result = msglog.QueryMsgByOptionsAsync(
          0,                    // range
          [target],             // id
          10,                   // limit
          0,                    // from timetag
          new Date().getTime(), // end timetag
          '',                   // end message ID
          false,                // reverse
          0,                    // message type
          'Hello',              // content
          (errorCode, accountId, toType, messages) => {
            console.log(errorCode, accountId, toType, JSON.stringify(messages))
            // TODO
            assert.strictEqual(errorCode, 200)
            assert.strictEqual(toType, 0)
            assert.strictEqual(accountId, target)
            done()
          }, '')
        assert.strictEqual(result, true)
      })
    })
    describe('#BatchStatusReadAsync', () => {
      it('Batch status read should return 200', (done) => {
        msglog.BatchStatusReadAsync(target, 0, (errorCode, accountId, toType) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(accountId, target)
          assert.strictEqual(toType, 0)
          done()
        }, '')
      })
    })
    describe.skip('#BatchStatusDeleteAsync', () => {
      it('Batch status delete should return 200', (done) => {
        msglog.BatchStatusDeleteAsync(target, 0, (errorCode, accountId, toType) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(accountId, target)
          assert.strictEqual(toType, 0)
          done()
        }, '')
      })
    })
    describe('#SetStatusAsync', () => {
      it('Set signal msglog status should return 200', (done) => {
        msglog.SetStatusAsync(signalMsgId, 6, (errorCode, messageId) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(messageId, signalMsgId)
          done()
        }, '')
      })
    })
    describe('#SetSubStatusAsync', () => {
      it('Set sub status of message should return 200', (done) => {
        msglog.SetSubStatusAsync(signalMsgId, 6, (errorCode, messageId) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(messageId, signalMsgId)
          done()
        }, '')
      })
    })
    describe('#WriteMsglogToLocalAsync', () => {
      it('Write msglog to local should return 200', (done) => {
        const writeMsgId = new Date().getTime().toString()
        msglog.WriteMsglogToLocalAsync(target, {
          to_type: 0,
          to_accid: 'jiajia02',
          time: new Date().getTime(),
          msg_type: 0,
          msg_body: 'Send from NIM node test.',
          client_msg_id: writeMsgId
        }, true, (errorCode, messageId) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(messageId, writeMsgId)
          done()
        }, '')
      })
    })
    describe('#DeleteBySessionTypeAsync', () => {
      it('Delete msglog by session type should return 200', (done) => {
        msglog.DeleteBySessionTypeAsync(true, 5, (errorCode, accountId, toType) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(toType, 5)
          done()
        }, '')
      })
    })
    describe('#DeleteAsync', () => {
      it('Delete msglog should return 200', (done) => {
        msglog.DeleteAsync(target, 0, signalMsgId, (errorCode, messageId) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(messageId, signalMsgId)
          done()
        }, '')
      })
    })
    describe('#DeleteAllAsync', () => {
      it('TODO DeleteAllAsync')
    })
    describe('#DeleteMsgByTimeAsync', () => {
      it('TODO Delete message by timetag should return 200');
    })
    describe('#DeleteMsgByTimeAsyncEx', () => {
      it('TODO Delete message by timetag should return 200');
    })
    describe.skip('#SendReceiptAsync', () => {
      it('Send receipt should return 200', (done) => {
        msglog.SendReceiptAsync(signalMessage, (result) => {
          console.log('------------------------', JSON.stringify(result))
          // TODO
          done()
        })
      })
    })
    describe('#QuerySentMessageBeReaded', () => {
      it('Query sent message be read should return 200', () => {
        const result = msglog.QuerySentMessageBeReaded(signalMessage)
        assert.strictEqual(result, false)
      })
    })
    describe('#UpdateLocalExtAsync', () => {
      it('Update ext of local message should return 200', (done) => {
        msglog.UpdateLocalExtAsync(signalMsgId, 'Custom ext content for local message', (errorCode, messageId) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(messageId, signalMsgId)
          done()
        }, '')
      })
    })
    describe('#ReadAllAsync', () => {
      it('Set status as read for all messages', (done) => {
        msglog.ReadAllAsync((errorCode) => {
          assert.strictEqual(errorCode, 200)
          done()
        }, '')
      })
    })
  })

  describe('Team suite', () => {
    describe('#UpdateTInfoLocal', () => {
      it('Update tinfo list should return sccuess 1, failed 0', (done) => {
        team.UpdateTInfoLocal([{
          tid: '3860273806',
          name: 'jiajia01 team',
          intro: 'Modified by NIM node addon test',
          announcement: 'Modified by NIM node addon test'
        }], (success, failed) => {
          assert.strictEqual(success.length, 1)
          assert.strictEqual(failed.length, 0)
          done()
        }, '')
      })
    })
  })

  describe('SuperTeam suite', () => {

  })

  describe('Talk suite', () => {
    let messageId
    describe('#SendMsg', () => {
      it('Send message should return 200', (done) => {
        talk.RegSendMsgCb((ack) => {
          messageId = ack.msg_id
          done()
        }, '')
        talk.SendMsg({
          to_type: 0,
          to_accid: 'jiajia02',
          time: new Date().getTime(),
          msg_type: 0,
          msg_body: 'Send from NIM node test.',
          client_msg_id: new Date().getTime().toString(),
        }, '', () => {

        })
      })
    })
    describe.skip('#QueryMsgByIDAysnc', () => {
      it('Reply message should return 200', (done) => {
        msglog.QueryMsgByIDAysnc(messageId, (errorCode, messageId, message) => {
          talk.ReplyMessage(message, {
            to_type: 0,
            to_accid: 'jiajia02',
            time: new Date().getTime(),
            msg_type: 0,
            msg_body: 'This is a reply message.',
            client_msg_id: new Date().getTime().toString(),
          })
          done()
        }, '')
      })
    })
  })

  describe('TalkEx suite', () => {

  })

  describe('Session suite', () => {
    describe('#SetToStickTopSession', () => {
      it('Set stick top session should return 200', (done) => {
        session.SetToStickTopSession(gOperator, 0, '', (errorCode, stickSessionInfo) => {
          assert.strictEqual(errorCode, 200)
          done()
        })
      })
    })
    describe('#UpdateToStickTopSession', () => {
      it('Update stick top session should return 200', (done) => {
        session.UpdateToStickTopSession(gOperator, 0, '', (errorCode, stickSessionInfo) => {
          assert.strictEqual(errorCode, 200)
          done()
        })
      })
    })
    describe('#QueryStickTopSessionList', () => {
      it('Query stick top session list should return 200 and list size > 0', (done) => {
        session.QueryStickTopSessionList((errorCode, stickSessionList) => {
          assert.strictEqual(errorCode, 200)
          assert.notStrictEqual(stickSessionList.length, 0)
          done()
        })
      })
    })
    describe('#CancelToStickTopSession', () => {
      it('Cancel stick top session should return 200', (done) => {
        session.CancelToStickTopSession(gOperator, 0, (errorCode, sessionId, sessionType) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(sessionId, gOperator)
          assert.strictEqual(sessionType, 0)
          done()
        })
      })
    })
  })

  describe('Subscribe event suite', () => {

  })

  describe('SystemMessage suite', () => {

  })

  describe('Tool suite', () => {
    describe('#GetUserAppdataDir', () => {
      it('Get user appdata directory should return with NIM_SDK_NODE_TEST', () => {
        const appDataDir = tools.GetUserAppdataDir(mainUser)
        console.log(appDataDir)
        assert.notStrictEqual(appDataDir.indexOf('NIM_SDK_NODE_TEST'), -1)
      })
    })
    describe('#GetSpecificAppdataDir', () => {
      it('Get specific appdata directory should return with NIM_SDK_NODE_TEST image', () => {
        const appDataDir = tools.GetSpecificAppdataDir(mainUser, 1)
        console.log(appDataDir)
        assert.notStrictEqual(appDataDir.indexOf('NIM_SDK_NODE_TEST'), -1)
        assert.notStrictEqual(appDataDir.indexOf('/image/'), -1)
      })
    })
    describe('#GetLocalAppdataDir', () => {
      it('Get local appdata directory should return with NIM_SDK_NODE_TEST', () => {
        const localAppDataDir = tools.GetLocalAppdataDir()
        console.log(localAppDataDir)
        assert.notStrictEqual(localAppDataDir.indexOf('NIM_SDK_NODE_TEST'), -1)
      })
    })
    describe('#GetCurModuleDir', () => {
      it('Get current module directory', () => {
        const currentModuleDir = tools.GetCurModuleDir()
        if (process.platform === 'darwin') {
          assert.notStrictEqual(currentModuleDir.indexOf('nim.framework/Versions/A/'), -1)
        }
      })
    })
    describe('#GetMD5', () => {
      it('Get MD5 should return e10adc3949ba59abbe56e057f20f883e', () => {
        const md5 = tools.GetMD5('123456')
        // 123456 === e10adc3949ba59abbe56e057f20f883e
        assert.strictEqual(md5, 'e10adc3949ba59abbe56e057f20f883e')
      })
    })
    describe('#GetFileMD5', () => {
      it('Get file md5 should return a non-empty value', () => {
        const md5 = tools.GetFileMD5(`${tools.GetCurModuleDir()}nim`)
        assert.notStrictEqual(md5, '')
      })
    })
    describe.skip('#GetUUID', () => {
      it('Get UUID should return a non-empty value', () => {
        // TODO
        const uuid = tools.GetUuid()
        assert.notStrictEqual(uuid, '')
      })
    })
    describe('#GetAudioTextAsync', () => {
      it('TODO GetAudioTextAsync')
    })
    describe('#FilterClientAntispam', () => {
      it('TODO FilterClientAntispam')
    })
  })

  describe('Roaming message suite', () => {
    describe('#DeleteSessionRoamingMessage', () => {
      it('Delete roaming should return 200', (done) => {
        const result = session.DeleteSessionRoamingMessage(gOperator, 0, (errorCode, sessionType, sessionId) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(sessionId, gOperator)
          assert.strictEqual(sessionType, 0)
          done()
        }, '')
        assert.strictEqual(result, true)
      })
    })
    describe('#SetMultiUnreadCountZeroAsync', () => {
      it('Set multi unread coung zero should return 200', (done) => {
        const result = session.SetMultiUnreadCountZeroAsync(false, [{
          id: gOperator,
          type: 0
        }], (errorCode, sessionList, unreadCount) => {
          assert.strictEqual(errorCode, 200)
          done()
        })
        assert.strictEqual(result, true)
      })
    })
    describe('#QueryHasmoreRoammsg', () => {
      it('Query session has more roaming msg should return 200', (done) => {
        session.QueryHasmoreRoammsg(gOperator, 0, (errorCode, info) => {
          done()
        })
      })
    })
    describe.skip('#SendMsg', () => {
      it('Send message should return 200', () => {
        talk.SendMsg({
          to_type: 0,
          to_accid: 'jiajia02',
          time: new Date().getTime(),
          msg_type: 0,
          msg_body: 'Send from NIM node test.',
          client_msg_id: new Date().getTime().toString(),
        }, '', () => {

        })
      })
    })
    describe('#UpdateHasmoreRoammsg', () => {
      it('Update session has more roaming msg should return 200', (done) => {
        msglog.QueryMsgAsync('jiajia02', 0, 1, 0, (errorCode, sessionId, sessionType, result) => {
          assert.strictEqual(errorCode, 200)
          const message = result.content[0]
          session.UpdateHasmoreRoammsg(message, (errorCode) => {
            assert.strictEqual(errorCode, 200)
            done()
          })
        }, '')
      })
    })
    describe('#QueryAllHasmoreRoammsg', () => {
      it('Query all session roaming msg should return 200', (done) => {
        session.QueryAllHasmoreRoammsg((errorCode, infos) => {
          assert.strictEqual(errorCode, 200)
          done()
        })
      })
    })
    describe('#DeleteHasmoreRoammsg', () => {
      it('Delete has more roam msg should return 200', (done) => {
        session.DeleteHasmoreRoammsg(gOperator, 0, (errorCode) => {
          assert.strictEqual(errorCode, 200)
          done()
        })
      })
    })
  })

  describe('User suite', () => {
    let myNameCard
    describe('Black list test', () => {
      before((done) => {
        user.SetBlack(assistUser, true, (errorCode, accountId, option) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(accountId, assistUser)
          assert.strictEqual(option, true)
          done()
        }, '')
      })
      describe('#GetBlacklist', () => {
        it(`Get black list should include ${assistUser}`, (done) => {
          user.GetBlacklist((errorCode, blackList) => {
            let foundMember = false
            blackList.map((member) => {
              if (member.accid === assistUser) {
                foundMember = true
              }
            })
            assert.strictEqual(errorCode, 200)
            assert.strictEqual(foundMember, true)
            done()
          }, '')
        })
      });
      after((done) => {
        user.SetBlack(assistUser, false, (errorCode, accountId, option) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(accountId, assistUser)
          assert.strictEqual(option, false)
          done()
        }, '')
      })
    })
    describe('Mute list test', () => {
      before((done) => {
        user.SetMute(assistUser, true, (errorCode, accountId, option) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(accountId, assistUser)
          assert.strictEqual(option, true)
          done()
        }, '')
      })
      describe('#GetMuteList', () => {
        it(`Get mute list should include ${assistUser}`, (done) => {
          user.GetMutelist((errorCode, muteList) => {
            let foundMember = false
            muteList.map((member) => {
              if (member.accid === assistUser) {
                foundMember = true
              }
            })
            assert.strictEqual(errorCode, 200)
            assert.strictEqual(foundMember, true)
            done()
          }, '')
        });
      });
      after((done) => {
        user.SetMute(assistUser, false, (errorCode, accountId, option) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(accountId, assistUser)
          assert.strictEqual(option, false)
          done()
        }, '')
      })
    })
    describe('#GetUserNameCardOnline', () => {
      it('Get user name card should return 200', (done) => {
        user.GetUserNameCardOnline([
          mainUser
        ], (users) => {
          let foundMember = false
          users.map((user) => {
            if (user.accid === mainUser) {
              foundMember = true
            }
          })
          assert.strictEqual(foundMember, true)
          done()
        }, '')
      })
    })
    describe('#GetUserNameCard', () => {
      it('Get user name card should return 200', (done) => {
        user.GetUserNameCard([
          mainUser
        ], (users) => {
          let foundMember = false
          users.map((user) => {
            if (user.accid === mainUser) {
              foundMember = true
              myNameCard = user
            }
          })
          assert.strictEqual(foundMember, true)
          done()
        }, '')
      })
    })
    describe('#UpdateMyUserNameCard', () => {
      it('Update my user name card should return 200', (done) => {
        myNameCard.name = `${new Date().getTime()}_Node`
        myNameCard.ex = `${new Date().getTime()}_Node_Ex`
        user.UpdateMyUserNameCard(myNameCard, (errorCode) => {
          assert.strictEqual(errorCode, 200)
          done()
        }, '')
      })
    })
    describe('#QueryUserListByKeyword', () => {
      it(`Query user list by keywork should inlucde ${assistUser}`, (done) => {
        user.QueryUserListByKeyword(assistUser, (users) => {
          assert.notStrictEqual(users.length, 0)
          let foundMember = false
          users.map((user) => {
            if (user.accid === assistUser) {
              foundMember = true
            }
          })
          assert.strictEqual(foundMember, true)
          done()
        }, '')
      });
    });

  })
})

describe.skip('NIMChatRoom Test Suite', () => {
  before((done) => {
    client.Login(appKey, mainUser, mainUserPwd, (loginResult) => {
      if (loginResult.login_step === 3) {
        done()
      }
    }, '')
  })
  after((done) => {
    client.Logout(1, (errorCode) => {
      done()
    }, '')
  })
  describe('#Init', () => {
    it('Init should return 1', () => {
      const result = chatroom.Init('')
      assert.strictEqual(result, 1)
    })
  })
  describe('#ChatRoomRequestEnterAsync', () => {
    it('Enter chatroom should return 200 at step 5', (done) => {
      chatroom.RegEnterCb((roomId, step, errorCode, info, myInfo) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        if (errorCode === 200 && step === 5) {
          gMyRoomInfo = myInfo
          done()
        } else if (errorCode != 200 && step === 5) {
          done(errorCode)
        }
      }, '')
      // Get enter token for enter chatroom
      plugin.ChatRoomRequestEnterAsync(gRoomId, (errorCode, enterToken) => {
        assert.strictEqual(errorCode, 200)
        chatroom.Enter(gRoomId, enterToken, {
          nick: 'ljm2_node_test',
          avatar: 'https://yunxin.163.com/',
          login_tags: ['abc', 'def', 'ghi']
        }, '')
      }, '')
    })
  })
  describe('#GetLoginState', () => {
    it('Get login state should return 1 when entered room', () => {
      assert.strictEqual(chatroom.GetLoginState(gRoomId, ''), 1)
    })
  })
  describe.skip('#SendMsg', () => {
    it('Send message ack should return 200', (done) => {
      chatroom.RegSendMsgAckCb((roomId, errorCode, result) => {
        console.log(errorCode, JSON.stringify(result))
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        if (errorCode === 200)
          done()
        else
          done(errorCode)
      }, '')
      chatroom.SendMsg(gRoomId, {
        msg_type: 0,
        msg_attach: 'This is attach of message',
        body: 'This is body of message',
        client_msg_id: new Date().getTime().toString(),
        resend_flag: false,
        ext: '',
        anti_spam_enable: false,
        anti_spam_content: '',
        history_save: false,
        anti_spam_using_yidun: 1,
      }, '')
    })
  })
  describe('#GetMembersOnlineAsync', () => {
    it('Get members should return 200', (done) => {
      chatroom.GetMembersOnlineAsync(gRoomId, {
        type: 0,
        offset: 0,
        limit: 10
      }, (roomId, errorCode, members) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        assert.notStrictEqual(members.length, 0)
        done()
      }, '')
    })
  })
  describe('#GetMembersByTagOnlineAsync', () => {
    it('Get members by tag online should return 200 with specified tag', (done) => {
      chatroom.GetMembersByTagOnlineAsync(gRoomId, {
        tag: 'abc',
        offset: 0,
        limit: 10
      }, (roomId, errorCode, members) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        assert.notStrictEqual(members.length, 0)
        for (let j = 0; j < members.length; j++) {
          const memberTags = JSON.parse(members[j].tags)
          let foundTag = false
          for (let i = 0; i < memberTags.length; i++) {
            if (memberTags[i] === 'abc')
              foundTag = true
          }
          assert.strictEqual(foundTag, true)
        }
        done()
      }, '')
    })
  })
  describe('#GetMessageHistoryOnlineAsync', () => {
    it('Get message history online should return 200', (done) => {
      chatroom.GetMessageHistoryOnlineAsync(gRoomId, {
        start: 0,
        limit: 10,
        reverse: false,
        msgtypes: [0, 1, 2]
      }, (roomId, errorCode, messages) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        assert.notStrictEqual(messages.length, 0)
        done()
      }, '')
    })
  })
  describe.skip('#SetMemberAttributeOnlineAsync', () => {
    it('Set member attribute as -1 should return 200 and member type should return -1', (done) => {
      chatroom.SetMemberAttributeOnlineAsync(gRoomId, {
        account_id: 'jiajia01',
        attribute: -1
      }, (roomId, errorCode, memberInfo) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
      }, '')
      setTimeout(() => {
        chatroom.GetMemberInfoByIDsAsync(gRoomId, ['jiajia01'], (roomId, errorCode, members) => {
          JSON.stringify(members)
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(roomId, gRoomId)
          assert.notStrictEqual(members.length, 0)
          assert.strictEqual(members[0].type, -1)
          done()
        }, '')
      }, 1000)
    }, 4000)
  })
  describe.skip('#SetMemberAttributeOnlineAsync', () => {
    it('Set member attribute as 1 should return 200 and member type should return 2', (done) => {
      chatroom.SetMemberAttributeOnlineAsync(gRoomId, {
        account_id: 'jiajia01',
        attribute: 1
      }, (roomId, errorCode, memberInfo) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
      }, '')
      setTimeout(() => {
        chatroom.GetMemberInfoByIDsAsync(gRoomId, ['jiajia01'], (roomId, errorCode, members) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(roomId, gRoomId)
          assert.notStrictEqual(members.length, 0)
          assert.strictEqual(members[0].type, 2)
          done()
        }, '')
      }, 1000)
    }, 4000)
  })
  describe('#GetInfoAsync', () => {
    it('Get room info should return room ID 2008', (done) => {
      chatroom.GetInfoAsync(gRoomId, (roomId, errorCode, info) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        assert.strictEqual(info.room_id, 2008)
        done()
      }, '')
    })
  })
  describe('#KickMemberAsync', () => {
    it('Kick member should return 404', (done) => {
      chatroom.KickMemberAsync(gRoomId, 'jiajia02', '', (roomId, errorCode) => {
        assert.strictEqual(errorCode, 404)
        assert.strictEqual(roomId, gRoomId)
        done()
      }, '')
    })
  })
  describe('#SetProxy', () => {
    it('Set proxy has no return value', () => {
      chatroom.SetProxy(6, '127.0.0.1', 1080, '', '')
    })
  })
  describe('#TempMuteMemberAsync', () => {
    it('Mute member should return 200', (done) => {
      chatroom.TempMuteMemberAsync(gRoomId, 'jiajia01', 10, true, 'notify ext content', (roomId, errorCode, member) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        assert.strictEqual(member.account_id, 'jiajia01')
        done()
      }, '')
    })
  })
  describe('#TempMuteMemberByTagAsync', () => {
    it('Mute member by tag should return 200', (done) => {
      chatroom.TempMuteMemberByTagAsync(gRoomId, 'abc', 10, true, 'notify ext content', (roomId, errorCode, member) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        done()
      }, '')
    })
  })
  describe('#UpdateRoomInfoAsync', () => {
    it('Update room info should return 200', (done) => {
      chatroom.UpdateRoomInfoAsync(gRoomId, {
        id: gRoomId,
        name: 'Modified by Dylan',
        announcement: 'New announcement modified by Dylan',
        broadcast_url: '',
        mute_all: false,
        queuelevel: 1
      }, true, 'Modify chatroom info by Dylan', (roomId, errorCode) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        done()
      }, '')
    })
  })
  describe('#UpdateMyRoomRoleAsync', () => {
    it('Update my room role should return 200', (done) => {
      gMyRoomInfo.nick = new Date().toString()
      gMyRoomInfo.avatar = new Date().toString()
      chatroom.UpdateMyRoomRoleAsync(gRoomId, gMyRoomInfo, true, "Notify ext content", (roomId, errorCode) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        done()
      }, '')
    })
  })
  describe('#QueueOfferAsync', () => {
    it('Queue offer async should return 200', (done) => {
      chatroom.QueueOfferAsync(gRoomId, {
        key: gQueuHead,
        value: '0'
      }, (roomId, errorCode) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        done()
      }, '')
    })
  })
  describe('#QueueListAsync', () => {
    it(`Queue list async shoud return 200 with key ${gQueuHead}`, (done) => {
      chatroom.QueueListAsync(gRoomId, (roomId, errorCode, list) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        let foundMember = false
        list.map((element) => {
          if (element.key === gQueuHead) {
            foundMember = true
          }
        })
        assert.strictEqual(foundMember, true)
        done()
      }, '')
    })
  })
  describe('#QueueHeaderAsync', () => {
    it('Queue header async should return 200', (done) => {
      chatroom.QueueHeaderAsync(gRoomId, (roomId, errorCode, element) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        assert.strictEqual(element.key, gQueuHead)
        done()
      }, '')
    })
  })
  describe('#QueueBatchUpdateAsync', () => {
    it('Queue batch update should return 200', (done) => {
      chatroom.QueueBatchUpdateAsync(gRoomId, [{
        key: gQueuHead,
        value: '100'
      }, {
        key: 'jiajia02',
        value: '200'
      }], true, "notify ext content", (roomId, errorCode, notInQueueList) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        let found = false
        notInQueueList.map((element) => {
          if (element === 'jiajia02') {
            found = true
          }
        })
        assert.strictEqual(found, true)
        done()
      }, '')
    })
  })
  describe('#QueueDropAsync', () => {
    it('Queue drop async should return 200', (done) => {
      chatroom.QueueDropAsync(gRoomId, (roomId, errorCode) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        done()
      }, '')
    })
  })
  describe.skip('#QueueOfferAsync', () => {
    it('Queue poll async should return 200', (done) => {
      chatroom.QueueOfferAsync(gRoomId, gQueuHead, (roomId, errorCode, element) => {
        console.log(roomId, errorCode)
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        done()
      }, '')
    })
  })
  describe.skip('#RegExitCb', () => {
    it('Exit room should return 200 with room ID 2008 and reason 0', (done) => {
      chatroom.RegExitCb((roomId, errorCode, reason) => {
        assert.strictEqual(errorCode, 200)
        assert.strictEqual(roomId, gRoomId)
        if (reason === 0)
          done()
        else
          done(reason)
      }, '')
      chatroom.Exit(gRoomId, '')
    })
  })
  describe('#RegExitCbEx', () => {
    it('Exit room should return 200 with room ID 2008 and reason 0', (done) => {
      setTimeout(() => {
        chatroom.RegExitCbEx((roomId, errorCode, info) => {
          assert.strictEqual(errorCode, 200)
          assert.strictEqual(roomId, gRoomId)
          if (info.reason === 0)
            done()
          else
            done(info.reason)
        }, '')
        chatroom.Exit(gRoomId, '')
      })
    })
  })
  describe('#ChatRoom::CleanUp', () => {
    it('Cleanup test', () => {
      chatroom.CleanUp('')
    })
  })
})

describe('#Cleanup', () => {
  describe('#CleanUp', () => {
    it('Cleanup SDK has not return value', (done) => {
      client.CleanUp('')
      done()
      setTimeout(() => {
        process.exit(0)
      }, 1000)
    })
  })
})
