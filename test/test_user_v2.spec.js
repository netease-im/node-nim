import { v2 } from '../dist/node-nim'
import assert from 'assert'
import {assistantAccounts} from "./test_variables";

describe('******************** User v2 ********************', function () {
  describe('#searchUserByOption', function () {
    it('Search user by account ID should return a non-empty list.', async function () {
      const result = await v2.userService.searchUserByOption({
        keyword: 'jia02',
        searchAlias: false,
        searchAccountId: true,
      })
      assert.notStrictEqual(result, [])
      assert.strictEqual(result[0].accountId, 'jiajia02')

    })
    it('Search user by mobile should return a non-empty list.', async function () {
      const result = await v2.userService.searchUserByOption({
        keyword: '20322335',
        searchAlias: false,
        searchAccountId: false,
        searchMobile: true
      })
      assert.notStrictEqual(result, [])
      for (let user of result) {
        assert.strictEqual(user.mobile, '13520322335')
      }
    })
    it('Search user by default should return a non-empty list.', async function () {
      const result = await v2.userService.searchUserByOption({
        keyword: 'new nick'
      })
      assert.notStrictEqual(result, [])
      for (let user of result) {
        assert.strictEqual(user.name.includes('new nick'), true)
      }
    })
  })
  describe('#getUserListFromCloud', function () {
    it('Search user list by cloud should return a non-empty list.', async function () {
      const result = await v2.userService.getUserListFromCloud({
          accountIds: assistantAccounts
      })
      assert.strictEqual(result.length , 3)
    })
  })
})
