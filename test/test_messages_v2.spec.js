import { v2 } from '../dist/node-nim'
import sinon from 'sinon'
import assert from 'assert'
import path from 'path'
import * as GlobalVariables from './test_variables'

let messageClientId = ''
let senderId = ''
let receiverId = ''
let convasationType = 0
let createTime = 0
let messageServerId = ''
let convasationId = ''
let replyMessageClientId = ''
let secondReplyMessageClientId = ''
describe('******************** Messages ********************', function () {
  describe('#sendMessage', () => {
    it('Send message should trigger onSendMessage notify', async function () {
      const spy = sinon.spy()
      v2.messageService.on('sendMessage', spy)
      const message = v2.messageCreator.createTextMessage('')
      const result = await v2.messageService.sendMessage(message, GlobalVariables.toP2PConversationId)
      assert.strictEqual(result.message.messageClientId, message.messageClientId)
      // sendMessage 会回调两次
      // 第一次携带的 message sendingState 为 3
      // 第二次携带的 message sendingState 为 1
      assert.strictEqual(spy.calledTwice, true)
      assert.strictEqual(spy.firstCall.args[0].sendingState, 3)
      assert.strictEqual(spy.secondCall.args[0].sendingState, 1)
    })
    it('Send message with file attachment should trigger onSendMessage notify', async function () {
      const spy = sinon.spy()
      v2.messageService.on('sendMessage', spy)
      const message = v2.messageCreator.createFileMessage(__filename, path.basename(__filename))
      const result = await v2.messageService.sendMessage(message, GlobalVariables.toP2PConversationId)
      assert.strictEqual(result.message.messageClientId, message.messageClientId)
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
    it('Insert message to local should trigger onSendMessage notify', async function () {
      const spy = sinon.spy()
      v2.messageService.on('sendMessage', spy)
      const message = v2.messageCreator.createTextMessage('')
      const result = await v2.messageService.insertMessageToLocal(
        message,
        GlobalVariables.toP2PConversationId,
        GlobalVariables.mainAccount,
        0)
      // sendMessage 会回调一次
      // 携带的 message sendingState 为 1
      assert.strictEqual(spy.calledOnce, true)
      assert.strictEqual(spy.firstCall.args[0].sendingState, 1)
    })
  })
  describe('#getThreadMessageList', function () {

    before(async function () {
      const message = v2.messageCreator.createTextMessage('how are you?')
      let result = await v2.messageService.sendMessage(message, GlobalVariables.testToP2PConversationId)
      messageClientId = result.message.messageClientId
      senderId = result.message.senderId
      receiverId = result.message.receiverId
      convasationType = result.message.conversationType
      createTime = result.message.createTime
      messageServerId = result.message.messageServerId
      convasationId = `${senderId}|${convasationType}|${receiverId}`
      const replyMessage = v2.messageCreator.createTextMessage('i`m fine!')
      const replyResult = await v2.messageService.replyMessage(replyMessage, result.message)
      const replySecondMessage = v2.messageCreator.createTextMessage('i`m fine!')
      const replySecondResult = await v2.messageService.replyMessage(replySecondMessage, replyResult.message)
      secondReplyMessageClientId = replySecondResult.message.messageClientId
    })

    it('getThreadMessageList return has value', async function () {
      const result = await v2.messageService.getThreadMessageList({
        messageRefer: {
          senderId: senderId,
          receiverId: receiverId,
          messageClientId: messageClientId,
          messageServerId: messageServerId,
          conversationType: convasationType,
          conversationId: convasationId,
          createTime: createTime,
        },
        begin: 0,
        end: 0,
        direction: 0,
      })
      assert.ok(result.replyList.length > 0)
      assert.strictEqual(result.replyList[0].messageClientId, replyMessageClientId)
    })
  })

  describe('#getLocalThreadMessageList', function () {

    before(async function () {
      const message = v2.messageCreator.createTextMessage('how are you?')
      let result = await v2.messageService.sendMessage(message, GlobalVariables.testToP2PConversationId)
      messageClientId = result.message.messageClientId
      senderId = result.message.senderId
      receiverId = result.message.receiverId
      convasationType = result.message.conversationType
      createTime = result.message.createTime
      messageServerId = result.message.messageServerId
      convasationId = `${senderId}|${convasationType}|${receiverId}`
      const replyMessage = v2.messageCreator.createTextMessage('i`m fine!')
      const replyResult = await v2.messageService.replyMessage(replyMessage, result.message)
      replyMessageClientId = replyResult.message.messageClientId
      const replySecondMessage = v2.messageCreator.createTextMessage('i`m fine!')
      const replySecondResult = await v2.messageService.replyMessage(replySecondMessage, replyResult.message)
      secondReplyMessageClientId = replySecondResult.message.messageClientId
    })

    it('getLocalThreadMessageList return has value', async function () {
      const result = await v2.messageService.getLocalThreadMessageList({
        senderId: senderId,
        receiverId: receiverId,
        messageClientId: messageClientId,
        messageServerId: messageServerId,
        conversationType: convasationType,
        conversationId: convasationId,
        createTime: createTime,
      })
      assert.ok(result.replyList.length > 0)
      assert.strictEqual(result.message.messageClientId, messageClientId)
      assert.strictEqual(result.replyList[0].messageClientId, replyMessageClientId)

    })
  })
})



