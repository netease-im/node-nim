import { V2NIMChatroomClient, V2NIMChatroomMessageCreator } from '../dist/node-nim'
import * as GlobalVariables from './test_variables'
import sinon from 'sinon'
import assert from 'assert'
import path from 'path'

const testEnv = true

describe('******************** Chatroom ********************', function () {
  let chatroomInstance = null
  let chatroomService = null
  before(function () {
    let initOption = {
      appkey: testEnv ? GlobalVariables.testAppKey : GlobalVariables.onlineAppKey
    }
    if (testEnv) {
      Object.assign(initOption, {
        privateServerOption: {
          asymmetricEncryptionKeyA: GlobalVariables.testAsymmetricEncryptionKeyA,
          asymmetricEncryptionKeyB: GlobalVariables.testAsymmetricEncryptionKeyB
        }
      })
    }
    V2NIMChatroomClient.init(initOption)
    chatroomInstance = V2NIMChatroomClient.newInstance()
    chatroomService = chatroomInstance.getChatroomService()
    return chatroomInstance.enter(
      testEnv ? GlobalVariables.testChatroomId : GlobalVariables.onlineChatroomId, {
        accountId: GlobalVariables.mainAccount,
        token: GlobalVariables.accountPassword,
        roomNick: 'Node.js mocha test nickname',
        __linkProvider: [GlobalVariables.testDefaultChatRoomLinkAddress],
      })
  })
  describe('#getInstanceId', function () {
    it('Get instance ID should return a number', function () {
      const instanceId = chatroomInstance.getInstanceId()
      assert.strictEqual(typeof instanceId, 'number')
      assert.strictEqual(instanceId, 0)
    })
  })
  describe('#sendMessage', () => {
    it('Send message should trigger onSendMessage event', async function () {
      const spy = sinon.spy()
      const message = V2NIMChatroomMessageCreator.createTextMessage('')
      chatroomService.on('sendMessage', spy)
      await chatroomService.sendMessage(message)
      // sendMessage 会回调两次
      // 第一次携带的 message sendingState 为 3
      // 第二次携带的 message sendingState 为 1
      assert.strictEqual(spy.calledTwice, true)
      assert.strictEqual(spy.firstCall.args[0].sendingState, 3)
      assert.strictEqual(spy.secondCall.args[0].sendingState, 1)
    })
    it('Send message with file should trigger onSendMessage event', async function () {
      const spy = sinon.spy()
      const message = V2NIMChatroomMessageCreator.createFileMessage(__filename, path.basename(__filename))
      chatroomService.on('sendMessage', spy)
      await chatroomService.sendMessage(message)
      // sendMessage 会回调四次
      // 第一次携带的 message sendingState 为 3
      // 第二次携带的 message sendingState 为 3，attachmentUploadState 为 3
      // 第三次携带的 message sendingState 为 3，attachmentUploadState 为 1
      // 第四次携带的 message sendingState 为 1
      assert.strictEqual(spy.callCount, 4)
      assert.strictEqual(spy.firstCall.args[0].sendingState, 3)
      assert.strictEqual(spy.secondCall.args[0].sendingState, 3)
      assert.strictEqual(spy.secondCall.args[0].attachmentUploadState, 3)
      assert.strictEqual(spy.thirdCall.args[0].sendingState, 3)
      assert.strictEqual(spy.thirdCall.args[0].attachmentUploadState, 1)
      assert.strictEqual(spy.lastCall.args[0].sendingState, 1)
    })
  })
  after(async function () {
    await chatroomInstance.exit()
    V2NIMChatroomClient.destroyInstance(chatroomInstance.getInstanceId())
    V2NIMChatroomClient.uninit()
  })
})
