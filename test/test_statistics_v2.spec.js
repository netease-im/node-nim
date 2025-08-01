import { v2 } from '../dist/node-nim'
import assert from 'assert'
import sinon from 'sinon'

describe('Statistics services', function () {
  describe('get database info should return with current opened databases', () => {
    it('should return an array of database info', async function () {
      const result = await v2.statisticsService.getDatabaseInfos()
      assert(Array.isArray(result), 'Result should be an array')
      assert(result.length > 0, 'Result should not be empty')
      console.log(result)
      result.forEach(dbInfo => {
        assert(dbInfo.hasOwnProperty('path'), 'Database info should have a path property')
        assert(dbInfo.hasOwnProperty('name'), 'Database info should have a name property')
        assert(dbInfo.hasOwnProperty('size'), 'Database info should have a size property')
        assert(dbInfo.size > 0, 'Database info should have a size property')
      })
    })
  })
})
