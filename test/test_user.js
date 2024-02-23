const NIM = require('../../dist/node-nim')
const assert = require('assert')

const user = new NIM.NIMUser()

describe('********************User********************', function () {
  let myNameCard
  describe('#initEventHandlers', function () {
    it('initEventHandlers', function () {
      user.initEventHandlers()
    })
  })
  describe('$Black list test', function () {
    before(function (done) {
      user.setBlack(
        test_info.assistUser,
        true,
        (res_code, accountId, option) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(accountId, test_info.assistUser)
          assert.strictEqual(option, true)
          done()
        },
        ''
      )
    })
    describe('#GetBlacklist', function () {
      it(`Get black list should include ${test_info.assistUser}`, function (done) {
        user.getBlacklist((res_code, blackList) => {
          let foundMember = false
          blackList.map((member) => {
            if (member.accid_ === test_info.assistUser) {
              foundMember = true
            }
          })
          assert.strictEqual(res_code, 200)
          assert.strictEqual(foundMember, true)
          done()
        }, '')
      })
    })
    after(function (done) {
      user.setBlack(
        test_info.assistUser,
        false,
        (res_code, accountId, option) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(accountId, test_info.assistUser)
          assert.strictEqual(option, false)
          done()
        },
        ''
      )
    })
  })
  describe('$Mute list test', function () {
    before(function (done) {
      user.setMute(
        test_info.assistUser,
        true,
        (res_code, accountId, option) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(accountId, test_info.assistUser)
          assert.strictEqual(option, true)
          done()
        },
        ''
      )
    })
    describe('#GetMuteList', function () {
      it(`Get mute list should include ${test_info.assistUser}`, function (done) {
        user.getMutelist((res_code, muteList) => {
          let foundMember = false
          muteList.map((member) => {
            if (member.accid_ === test_info.assistUser) {
              foundMember = true
            }
          })
          assert.strictEqual(res_code, 200)
          assert.strictEqual(foundMember, true)
          done()
        }, '')
      })
    })
    after(function (done) {
      user.setMute(
        test_info.assistUser,
        false,
        (res_code, accountId, option) => {
          assert.strictEqual(res_code, 200)
          assert.strictEqual(accountId, test_info.assistUser)
          assert.strictEqual(option, false)
          done()
        },
        ''
      )
    })
  })
  describe('#GetUserNameCardOnline', function () {
    it('get user name card should return 200', function (done) {
      user.getUserNameCardOnline(
        [test_info.mainUser],
        (users) => {
          let foundMember = false
          users.map((user) => {
            if (user.accid_ === test_info.mainUser) {
              foundMember = true
            }
          })
          assert.strictEqual(foundMember, true)
          done()
        },
        ''
      )
    })
  })
  describe('#GetUserNameCard', function () {
    it('get user name card should return 200', function (done) {
      user.getUserNameCard(
        [test_info.mainUser],
        (users) => {
          let foundMember = false
          users.map((user) => {
            if (user.accid_ === test_info.mainUser) {
              foundMember = true
              myNameCard = user
            }
          })
          assert.strictEqual(foundMember, true)
          done()
        },
        ''
      )
    })
  })
  describe('#UpdateMyUserNameCard', function () {
    it('update my user name card should return 200', function (done) {
      myNameCard.nickname_ = `${new Date().getTime()}_Node`
      myNameCard.expand_ = `{}`
      user.updateMyUserNameCard(myNameCard, null, '').then(([res_code]) => {
        assert.strictEqual(res_code, 200)
        done()
      })
    })
  })
  describe('#QueryUserListByKeyword', function () {
    it(`Query user list by keyword should inlucde ${test_info.mainUser}`, function (done) {
      user.queryUserListByKeyword(
        'Node',
        (users) => {
          assert.notStrictEqual(users.length, 0, 'User list is empty!')
          let foundMember = false
          users.map((user) => {
            if (user.accid_ === test_info.mainUser) {
              foundMember = true
            }
          })
          assert.strictEqual(foundMember, true, `Did not find the given user: ${test_info.mainUser}`)
          done()
        },
        ''
      )
    })
  })
  describe('#updatePushToken', function () {
    it('updatePushToken', function () {
      user.updatePushToken('Node_test', 'Node_test', 0)
    })
  })
})
