import { v2, nim } from '../dist/node-nim'
import assert from 'assert'

describe('******************** Friend v2 ********************', function () {
  describe('#friendService', function () {
    it('Get friend list should return non-empty list.', async function () {
      const result = await v2.friendService.getFriendList()
      assert.notStrictEqual(result, [])
    })
  })

  describe('#getAddApplicationUnreadCount', function () {
    it('Get add application unread count should return a number.', async function () {
      const result = await v2.friendService.getAddApplicationUnreadCount()
      assert.strictEqual(typeof result, 'number')
    })
  })

  describe('#setAddApplicationRead', function () {
    it('Set add application read should return a number.', async function () {
      const result = await v2.friendService.setAddApplicationRead()
      assert.strictEqual(typeof result, 'number')
    })
  })

  describe('#searchFriendByOption', function () {
    before(function () {
      return v2.friendService.setFriendInfo('jiajia02', {
        alias: ''
      })
    })

    it('Search friend by account ID should return a non-empty list.', async function () {
      const result = await v2.friendService.searchFriendByOption({
        keyword: 'jia02',
        searchAlias: false,
        searchAccountId: true,
      })
      assert.notStrictEqual(result, [])
      assert.strictEqual(result[0].accountId, 'jiajia02')
    })
  })

  describe('#searchFriendByOption', function () {
    before(function () {
      return v2.friendService.setFriendInfo('jiajia02', {
        alias: 'jiajia02-alias'
      })
    })
    it('Search friend by alias should return a non-empty list.', async function () {
      const result = await v2.friendService.searchFriendByOption({
        keyword: '02-alias',
        searchAlias: true,
        searchAccountId: false,
      })
      assert.notStrictEqual(result, [])
      assert.strictEqual(result[0].alias, 'jiajia02-alias')
      assert.strictEqual(result[0].accountId, 'jiajia02')
    })
    it('Search friend by alias but not exists should return an empty list.', async function () {
      const result = await v2.friendService.searchFriendByOption({
        keyword: '02-alias-not-exists',
        searchAlias: true,
        searchAccountId: false,
      })
      assert.strictEqual(result.length, 0)
    })
  })

  describe('#Friend::Update', function () {
    before(function () {
      return nim.friend.update({
        accid: 'jiajia02',
        alias: 'new-alias-test'
      }, null, '')
    })
    it('Get friend info should return with new alias.', async function () {
      const result = await v2.friendService.getFriendByIds(['jiajia02'])
      for (const item of result) {
        if (item.accountId === 'jiajia02') {
          assert.strictEqual(item.alias, 'new-alias-test')
        }
      }
    })
  })
})
