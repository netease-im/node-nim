import { v2 } from '../dist/node-nim'
import assert from 'assert'

describe('#getAIUserList', async function () {
  it('Search aiUser by default should return a non-empty list.', async function () {
    const result = await v2.aiService.getAIUserList()
    assert.strictEqual(result.length > 0, true)
  })
})

describe('#proxyAIModelCall', function () {
  it('proxyAIModelCall should return 200', function (done) {
    v2.aiService.once('proxyAIModelCall', function (response) {
      assert.strictEqual(response.code, 200)
    })
    v2.aiService.proxyAIModelCall({
      accountId: 'ollamaTest07', requestId: 'qa3test12', content: {
        msg: 'c++ auto 作用',
        type: 0
      }
    })
  })
})
