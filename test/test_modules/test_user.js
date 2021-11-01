const NIM = require('../../js/nim');
const assert = require('assert');

function testUser(test_info) {
  describe('********************User********************', function() {
    let myNameCard;
    describe('#initEventHandler', function() {
      it('initEventHandler', function() {
        NIM.User.initEventHandler();
      });
    });
    describe('#UpdateMyUserNameCard', function() {
      it('update my user name card should return 200', function(done) {
        NIM.User.updateMyUserNameCard({
          accid: test_info.mainUser,
          name: 'test',
          icon: 'test',
          sign: 'test',
          gender: 0,
          email: 'test',
          birth: 'test',
          mobile: 'test',
          ex: 'test',
        }, (res_code) => {
          assert.strictEqual(res_code, 200);
          done();
        }, '');
      });
    });
    describe('$Black list test', function() {
      before(function(done) {
        NIM.User.setBlack(test_info.assistUser, true, (res_code, accountId, option) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(accountId, test_info.assistUser);
          assert.strictEqual(option, true);
          done();
        }, '');
      });
      describe('#GetBlacklist', function() {
        it(`Get black list should include ${test_info.assistUser}`, function(done) {
          NIM.User.getBlacklist((res_code, blackList) => {
            let foundMember = false;
            blackList.map((member) => {
              if (member.accid === test_info.assistUser) {
                foundMember = true;
              }
            });
            assert.strictEqual(res_code, 200);
            assert.strictEqual(foundMember, true);
            done();
          }, '');
        });
      });
      after(function(done) {
        NIM.User.setBlack(test_info.assistUser, false, (res_code, accountId, option) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(accountId, test_info.assistUser);
          assert.strictEqual(option, false);
          done();
        }, '');
      });
    });
    describe('$Mute list test', function() {
      before(function(done) {
        NIM.User.setMute(test_info.assistUser, true, (res_code, accountId, option) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(accountId, test_info.assistUser);
          assert.strictEqual(option, true);
          done();
        }, '');
      });
      describe('#GetMuteList', function() {
        it(`Get mute list should include ${test_info.assistUser}`, function(done) {
          NIM.User.getMutelist((res_code, muteList) => {
            let foundMember = false;
            muteList.map((member) => {
              if (member.accid === test_info.assistUser) {
                foundMember = true;
              }
            });
            assert.strictEqual(res_code, 200);
            assert.strictEqual(foundMember, true);
            done();
          }, '');
        });
      });
      after(function(done) {
        NIM.User.setMute(test_info.assistUser, false, (res_code, accountId, option) => {
          assert.strictEqual(res_code, 200);
          assert.strictEqual(accountId, test_info.assistUser);
          assert.strictEqual(option, false);
          done();
        }, '');
      });
    });
    describe('#GetUserNameCardOnline', function() {
      it('get user name card should return 200', function(done) {
        NIM.User.getUserNameCardOnline([
          test_info.mainUser,
        ], (users) => {
          let foundMember = false;
          users.map((user) => {
            if (user.accid === test_info.mainUser) {
              foundMember = true;
            }
          });
          assert.strictEqual(foundMember, true);
          done();
        }, '');
      });
    });
    describe('#GetUserNameCard', function() {
      it('get user name card should return 200', function(done) {
        NIM.User.getUserNameCard([
          test_info.mainUser,
        ], (users) => {
          let foundMember = false;
          users.map((user) => {
            if (user.accid === test_info.mainUser) {
              foundMember = true;
              myNameCard = user;
            }
          });
          assert.strictEqual(foundMember, true);
          done();
        }, '');
      });
    });
    describe('#UpdateMyUserNameCard', function() {
      it('update my user name card should return 200', function(done) {
        myNameCard.name = `${new Date().getTime()}_Node`;
        myNameCard.ex = `${new Date().getTime()}_Node_Ex`;
        NIM.User.updateMyUserNameCard(myNameCard, (res_code) => {
          assert.strictEqual(res_code, 200);
          done();
        }, '');
      });
    });
    describe('#QueryUserListByKeyword', function() {
      it(`Query user list by keyword should inlucde ${test_info.mainUser}`, function(done) {
        NIM.User.queryUserListByKeyword('Node', (users) => {
          assert.notStrictEqual(users.length, 0, 'User list is empty!');
          let foundMember = false;
          users.map((user) => {
            if (user.accid === test_info.mainUser) {
              foundMember = true;
            }
          });
          assert.strictEqual(foundMember, true, `Did not find the given user: ${test_info.mainUser}`);
          done();
        }, '');
      });
    });
    describe('#updatePushToken', function() {
      it('updatePushToken', function() {
        NIM.User.updatePushToken('Node_test', 'Node_test', 0);
      });
    });
  });
}
exports.default = testUser;
