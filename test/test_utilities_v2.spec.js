import { v2 } from '../dist/node-nim'
import assert from 'assert'

describe('******************** Utilities ********************', function () {
  describe('#messageSerialization', function () {
    it('Message serialization should return a string', async function () {
      const message = v2.messageCreator.createTextMessage('new message')
      const result = v2.messageConverter.messageSerialization(message)
      assert.strictEqual(typeof result, 'string')

      const convertedMessage = v2.messageConverter.messageDeserialization(result)
      assert.strictEqual(convertedMessage.text, message.text)
    })
  })
  describe('#messageDeserialization', function () {
    it('Message deserialization should return a message object', async function () {
      // const message = v2.messageCreator.createTextMessage('new message')
      // const messageProperty = v2.messageConverter.messageSerialization(message)
      const message = ''
      const result = v2.messageConverter.messageDeserialization(message)
      console.log(result)
    })
  })
  describe('#createCallMessage', function () {
    it('Create call message should return a message object', async function () {
      const message = v2.messageCreator.createCallMessage(0, 'new channel', 100, [{
        accountId: 'account',
        duration: 100
      }], 'Hello this is call message')
      assert.strictEqual(message.attachment.attachmentType, 7)
      assert.strictEqual(message.attachment.type, 0)
      assert.strictEqual(message.attachment.status, 100)
      assert.strictEqual(message.attachment.channelId, 'new channel')
      assert.strictEqual(message.attachment.durations.length, 1)
      assert.strictEqual(message.text, 'Hello this is call message')
    })
  })
  describe('#imageThumbUrl', function () {
    it('Image thumb url should return a string', async function () {
      const imageUrl = 'https://nim-s3dn.chatnos.com/MTAxMTAwMg==/czNhcHBfNTIxNDQyNzI3NF8xNzE3NDc5MDEzMDg5Xzk1Y2RjYjJkLTcyOTMtNDAzMi05ZjliLWZjYWFkNDNhNmE0YSYyJjExMDAyJnl1bnhpbmltJmFwLXNvdXRoZWFzdC0x'
      const imageUrlWithThumb = 'https://nim-s3dn.chatnos.com/MTAxMTAwMg==/czNhcHBfNTIxNDQyNzI3NF8xNzE3NDc5MDEzMDg5Xzk1Y2RjYjJkLTcyOTMtNDAzMi05ZjliLWZjYWFkNDNhNmE0YSYyJjExMDAyJnl1bnhpbmltJmFwLXNvdXRoZWFzdC0x?imageView&thumbnail=150x150'
      const result = v2.storageUtil.imageThumbUrl(imageUrl, 150)
      assert.strictEqual(imageUrlWithThumb, result)
    })
  })
  describe('#videoCoverUrl', function () {
    it('Video cover url should return a string', async function () {
      const videoUrl = 'https://nim-s3dn.chatnos.com/MTAxMTAwMg==/czNhcHBfNTIxNDQyNzI3NF8xNzE3NDc5MDEzMDk4XzE3MzE0OThmLTI0ZTQtNGY1OS04OTE0LTVhN2JjNDg3ODE3YiYyJjExMDAyJnl1bnhpbmltJmFwLXNvdXRoZWFzdC0x'
      const videoUrlWithFrame = 'https://nim-s3dn.chatnos.com/MTAxMTAwMg==/czNhcHBfNTIxNDQyNzI3NF8xNzE3NDc5MDEzMDk4XzE3MzE0OThmLTI0ZTQtNGY1OS04OTE0LTVhN2JjNDg3ODE3YiYyJjExMDAyJnl1bnhpbmltJmFwLXNvdXRoZWFzdC0x?vframe&offset=0&resize=150x150&type=jpeg'
      const result = v2.storageUtil.videoCoverUrl(videoUrl, 0, 150, 'jpeg')
      assert.strictEqual(videoUrlWithFrame, result)
    })
  })
})
