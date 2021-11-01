const NIM = require('../../js/nim');
const assert = require('assert');

function iniClient(test_info) {
  describe('********************NIM init SDK********************', function() {
    describe('NIM client Init', function() {
      it('init NIM SDK should return 1', function() {
        const result = NIM.Client.init('', 'NIM_SDK_NODE_TEST', '', {
          db_encrypt_key: 'abcdefghijklmnopqrstuvwxyz012345',
        });
        assert.strictEqual(result, 1);
      });
    });
    describe('NIM client Login', function() {
      it('login step should be 3', function(done) {
        NIM.Client.login(test_info.appKey, test_info.mainUser, test_info.mainUserPwd, (loginResult) => {
          assert.strictEqual(loginResult.err_code, 200);
          if (loginResult.login_step === 3) {
            done();
          };
        }, '');
      });
    });
  });
}

function cleanupClient(test_info) {
  describe('********************NIM cleanup SDK********************', function() {
    describe('#logout', function() {
      it('logout should return 200', function(done) {
        NIM.Client.logout(1, (errorCode) => {
          done();
        }, '');
      });
    });
    describe('#cleanUp', function() {
      it('cleanup SDK has no return value', function(done) {
        NIM.Client.cleanUp('');
        done();
        setTimeout(function() {
          process.exit(0);
        }, 1000);
      });
    });
  });
}

function testClient(test_info) {
  describe('********************Client********************', function() {
    describe('#initEventHandler', function() {
      it('initEventHandler', function() {
        NIM.Client.initEventHandler();
      });
    });
    describe('#getSDKConfig', function() {
      it('get SDK config should return encrypt key: abcdefghijklmnopqrstuvwxyz012345', function() {
        const sdkConfig = NIM.Client.getSDKConfig();
        assert.strictEqual(sdkConfig.db_encrypt_key, 'abcdefghijklmnopqrstuvwxyz012345');
      });
    });
    describe('#relogin', function() {
      it('relogin', function() {
        // NIM.Client.on('onRelogin', function (result) {
        //     done()
        // })
        NIM.Client.relogin('');
      });
    });
    describe('#kickOtherClient', function() {
      it('kickOtherClient', function() {
        NIM.Client.kickOtherClient(['']);
      });
    });
    describe('#getLoginState', function() {
      it('getLoginState should return kNIMLoginStateLogin', function() {
        const login_state = NIM.Client.getLoginState('');
        assert.strictEqual(login_state, 1);
      });
    });
    describe('#loginCustomDataToJson', function() {
      it('loginCustomDataToJson should return "{\"custom_tag\":\"test\"}"', function() {
        const json = NIM.Client.loginCustomDataToJson('test');
        assert.strictEqual(json, `{"custom_tag":"test"}\n`);
      });
    });
    describe('#setMultiportPushConfigAsync', function() {
      it('set multiport push config should return 200', function(done) {
        NIM.Client.setMultiportPushConfigAsync(true, (errorCode, result) => {
          assert.strictEqual(errorCode, 200);
          assert.strictEqual(result, true);
          done();
        }, '');
      });
    });
    describe('#getMultiportPushConfigAsync', function() {
      it('get multiport push config should return true', function(done) {
        NIM.Client.getMultiportPushConfigAsync((errorCode, result) => {
          assert.strictEqual(errorCode, 200);
          assert.strictEqual(result, true);
          done();
        }, '');
      });
    });
    describe('#getSDKVersion', function() {
      it('get SDK version should return no empty', function() {
        const sdkVeresion = NIM.Client.getSDKVersion();
        assert.notStrictEqual(sdkVeresion, '');
      });
    });
    describe('#getServerCurrentTime', function() {
      it('get server current time should return > 0', function(done) {
        NIM.Client.getServerCurrentTime((errorCode, calcLocal, timestamp) => {
          assert.notStrictEqual(timestamp, 0);
          done();
        }, true);
      });
    });
    describe('#getCurrentUserAccount', function() {
      it('get current user account should return ljm2', function() {
        const account = NIM.Client.getCurrentUserAccount();
        assert.notStrictEqual(account, '');
      });
    });
  });
}
exports.iniClient = iniClient;
exports.testClient = testClient;
exports.cleanupClient = cleanupClient;
