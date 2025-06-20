import { v2 } from '../dist/node-nim'
import assert from 'assert'
import * as GlobalVariables from "./test_variables";
import {assistantAccounts, mainAccount} from "./test_variables";
import sinon from 'sinon'

describe('Settings services', function () {
    describe('#getPushMobileOnDesktopOnline', function () {
        before(async function () {
            await v2.settingService.setPushMobileOnDesktopOnline(true)
        })
        it('get push mobile on desktop online should return true', async function () {
            const need = await v2.settingService.getPushMobileOnDesktopOnline()
            assert.strictEqual(need, true)
        })
        after(async function () {
            await v2.settingService.setPushMobileOnDesktopOnline(false)
        })
    })
    describe('pushMobileOnDesktopOnline event', function () {
        it('pushMobileOnDesktopOnline event should be triggered', async function () {
            const spy = sinon.spy()
            v2.settingService.on('pushMobileOnDesktopOnline', spy)
            await v2.settingService.setPushMobileOnDesktopOnline(true)
            assert.strictEqual(spy.calledOnce, true)
            assert.strictEqual(spy.firstCall.args[0], true)
        })
    })
})
