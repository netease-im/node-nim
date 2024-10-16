import { v2, nim } from '../dist/node-nim'
import assert from 'assert'

describe('#getAIUserList', async function () {
  it('Search aiUser by default should return a non-empty list.', async function () {
    const result = await v2.aiService.getAIUserList()
    assert.strictEqual(result.length > 0, true)
  })
  it('V1 get AI user list should return with user list', async function () {
    const result = await nim.ai.getAIUserList()
    assert.strictEqual(result[0], 200)
    assert.strictEqual(result[1].length > 0, true)
  })
  it('V1 send proxy AI model call should return with error code 200',  function (done) {
    nim.initEventHandlers()
    const aiUserAccountId = 'qwtest7'
    const requestId = new Date().toString()
    nim.ai.on('proxyAIModelCall', function (code, result) {
      assert.strictEqual(result.request_id_, requestId)
      assert.strictEqual(result.account_id_, aiUserAccountId)
      done()
    })
    nim.ai.proxyAIModelCall({
      account_id_: aiUserAccountId,
      request_id_: requestId,
      prompt_variables_: '{"职业": "咨询师"}',
      model_config_params_: {
        prompt_: '{"职业":"咨询顾问"}',
        top_p_: 0.85,
        max_tokens_: 2000
      },
      messages_: [{
        role_: 1,
        msg_: '网易官网是什么',
        type_: 0
      }],
      content_: {
        msg_: '中国的首都是哪里',
        type_: 0
      }
    })
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
