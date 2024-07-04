import { v2 } from '../dist/node-nim'
import assert from 'assert'
import sinon from 'sinon'
import * as GlobalVariable from './test_variables'

describe('******************** Conversation ********************', function () {

  describe('#getConversationList', function () {
    it('Get conversation should return a non-empty list.', async function () {
      const result = await v2.conversationService.getConversationList(0, 100)
      assert.notStrictEqual(result.conversationList, [])
    })
  })

  describe('#getConversationList', function () {
    before(function () {
      return v2.friendService.setFriendInfo('jiajia02', {
        alias: 'jiajia02-alias'
      })
    })

    it('Get conversation name should return with friend alias', async function () {
      const result = await v2.conversationService.getConversation('jiajia01|1|jiajia02')
      assert.strictEqual(result.name, 'jiajia02-alias')
    })
  })

  describe('#getConversationList', function () {
    before(function () {
      return v2.friendService.setFriendInfo('jiajia02', {
        alias: ''
      })
    })
    it('Get conversation name should return with user nickname', async function () {
      const result = await v2.conversationService.getConversation('jiajia01|1|jiajia02')
      assert.strictEqual(result.name, 'jiajia02')
    })
  })

  describe('#getConversaion', function () {
    before(function () {
      const message = v2.messageCreator.createTextMessage('new message')
      return v2.messageService.sendMessage(message, GlobalVariable.toP2PConversationId)
    })
    it('Get conversation last message sender name should empty', async function () {
      const result = await v2.conversationService.getConversation(GlobalVariable.toP2PConversationId)
      assert.strictEqual(result.lastMessage.senderName, '')
    })
  })

  describe('#markConversationRead', function () {
    before(function () {
      const message = v2.messageCreator.createTextMessage('new message')
      return v2.messageService.sendMessage(message, GlobalVariable.toP2PConversationId)
    })
    it('Mark conversation read should success', async function () {
      const ackTime = await v2.conversationService.markConversationRead(GlobalVariable.toP2PConversationId)
      // ackTime 大于 0
      assert.ok(ackTime > 0)
    })
  })

  describe('#getConversationReadTime', async function () {
    it('Get conversation read time should success', async function () {
      const readTime = await v2.conversationService.getConversationReadTime('jiajia01|1|jiajia02')
      // readTime 大于 0
      assert.ok(readTime > 0)
    })
  })
})
