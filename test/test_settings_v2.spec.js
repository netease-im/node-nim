import { v2 } from '../dist/node-nim'
import assert from 'assert'
import * as GlobalVariables from "./test_variables";
import {assistantAccounts, mainAccount} from "./test_variables";


let dndConfig = {
    dndOn: true,
    showDetail: true,
    fromH: 0,
    fromM: 0,
    toH: 1,
    toM: 10,
}
describe('#DndConfig', function () {
    before(async function () {
        await v2.settingService.setDndConfig(dndConfig);
        await v2.loginService.logout()
        await v2.loginService.login(
            GlobalVariables.mainAccount,
            GlobalVariables.assistantAccounts,
            {}
        )
    })

    it('getDndConfig return config', function (done) {
        const config = v2.settingService.getDndConfig();
        assert.strictEqual(config.dndOn, true);
    })
})
