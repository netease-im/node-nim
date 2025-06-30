import sinon from 'sinon'

const { v2 } = require('../dist/node-nim')
const assert = require('assert')
import * as GlobalVariable from './test_variables'

describe('******************** Team v2 ********************', function () {
  describe('#updateTeamInfo', function () {
    let teamId = ''
    before(async function () {
      const result = await v2.teamService.createTeam({
        name: 'test_team_created_by_nim_node_tester',
        teamType: 1
      })
      const updateResult = await v2.teamService.updateTeamInfo(result.team.teamId, 1, {
        serverExtension: 'test_server_extension',
        memberLimit: 100
      }, {})
      teamId = result.team.teamId
    })
    it('Query message of new team should return attachment with server extension and member limit', async function () {
      const result = await v2.messageService.getMessageList({
        conversationId: `jiajia01|2|${teamId}`,
        limit: 100
      })
      assert.strictEqual(result.length, 1)
      assert.strictEqual(result[0].attachment.updateTeamInfo.serverExtension, 'test_server_extension')
      assert.strictEqual(result[0].attachment.updateTeamInfo.memberLimit, 100)
    })
    after(async function () {
      await v2.teamService.dismissTeam(teamId, 1)
    })
  })
  describe('#searchTeamMembers', async function () {
    let temporaryTeamId = ''
    const teamCount = 5
    before(async function () {
      const createResult = await v2.teamService.createTeam({
        name: 'new team',
        teamType: 1,
        agreeMode: 1
      })
      temporaryTeamId = createResult.team.teamId
      // 分开邀请，确保时间不是一样的
      for (let i = 0; i < teamCount; i++) {
        await v2.teamService.inviteMember(temporaryTeamId, 1, [GlobalVariable.assistantAccounts[i]], '')
      }
      for (let i = 0; i < teamCount; i++) {
        await v2.teamService.updateTeamMemberNick(temporaryTeamId, 1, GlobalVariable.assistantAccounts[i], `nick${i + 1}`)
      }
    })
    it('Search team member by keyword should return length 5', async function () {
      // 延迟 3s 查询，等待群通知过来
      await new Promise(resolve => setTimeout(resolve, 3000))
      const result = await v2.teamService.searchTeamMembers({
        keyword: 'nick',
        teamId: temporaryTeamId,
        teamType: 1
      })
      assert.ok(result.memberList.length === teamCount)
    })
    it('Search team member by keyword result should order by asc', async function () {
      // 延迟 3s 查询，等待群通知过来
      await new Promise(resolve => setTimeout(resolve, 3000))
      const result = await v2.teamService.searchTeamMembers({
        keyword: 'nick',
        teamId: temporaryTeamId,
        teamType: 1,
        order: 1
      })
      // 返回内容按 joinTime 升序排列
      for (let i = 0; i < teamCount; i++) {
        assert.ok(result.memberList[i].accountId === GlobalVariable.assistantAccounts[i])
      }
    })
    it('Search team member by keyword result should order by desc', async function () {
      // 延迟 3s 查询，等待群通知过来
      await new Promise(resolve => setTimeout(resolve, 3000))
      const result = await v2.teamService.searchTeamMembers({
        keyword: 'nick',
        teamId: temporaryTeamId,
        teamType: 1,
        order: 0
      })
      // 返回内容按 joinTime 降序排列
      for (let i = 0; i < teamCount; i++) {
        assert.ok(result.memberList[i].accountId === GlobalVariable.assistantAccounts[teamCount - i - 1])
      }
    })
    it('Search team member by keyword by next token should return different result', async function () {
      await new Promise(resolve => setTimeout(resolve, 3000))
      const firstResult = await v2.teamService.searchTeamMembers({
        keyword: 'nick',
        teamId: temporaryTeamId,
        teamType: 1,
        limit: 3
      })
      const secondResult = await v2.teamService.searchTeamMembers({
        keyword: 'nick',
        teamId: temporaryTeamId,
        teamType: 1,
        limit: 3,
        nextToken: firstResult.nextToken
      })
      assert.ok(firstResult.memberList.length === 3)
      assert.ok(secondResult.memberList.length === 2)
      assert.ok(firstResult.memberList[0].accountId !== secondResult.memberList[0].accountId)
      assert.ok(secondResult.nextToken === '')
    })
    after(async function () {
      await v2.teamService.dismissTeam(temporaryTeamId, 1)
    })
  })
  describe('#leaveAllTeams', function () {
    it('Leave all my teams', async function () {
      await new Promise(resolve => setTimeout(resolve, 5000))
      const result = await v2.teamService.getJoinedTeamList([1])
      for (let i = 0; i < result.length; i++) {
        const team = result[i]
        if (team.ownerAccountId === GlobalVariable.mainAccount) {
          await v2.teamService.dismissTeam(team.teamId, 1)
        } else {
          await v2.teamService.leaveTeam(team.teamId, 1)
        }
        // 延迟 500 毫秒
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    })
  })
  describe('#addTeamMemberFollow', async function () {
    let teamId = ''
    before(async function () {
      const teamInfo = await v2.teamService.createTeam({
        name: 'new team',
        teamType: 1,
        agreeMode: 1
      }, [GlobalVariable.assistantAccounts[0], GlobalVariable.assistantAccounts[1]], 'postscript')
      teamId = teamInfo.team.teamId
    })
    it('Add team member follow should return success', async function () {
      try {
        await v2.teamService.addTeamMembersFollow(teamId, 1, [GlobalVariable.assistantAccounts[0]])
      } catch (error) {
        assert.ok(false)
      }
    })
    it('Remove team member follow should return success', async function () {
      try {
        await v2.teamService.removeTeamMembersFollow(teamId, 1, [GlobalVariable.assistantAccounts[0]])
      } catch (error) {
        assert.ok(false)
      }
    })
    it('Follow member with an empty team ID should return 191004', async function () {
      try {
        await v2.teamService.addTeamMembersFollow('', 1, [''])
      } catch (error) {
        assert.strictEqual(error.code, 191004)
      }
    })
    it('Follow member with an invalid team type should return 191004', async function () {
      try {
        await v2.teamService.addTeamMembersFollow(teamId, 0, [''])
      } catch (error) {
        assert.strictEqual(error.code, 191004)
      }
    })
    it('Query team member list should return with follow members', async function () {
      await v2.teamService.addTeamMembersFollow(teamId, 1, [GlobalVariable.assistantAccounts[0]])
      const result = await v2.teamService.getTeamMemberList(teamId, 1, {
        roleQueryType: 0
      })
      result.memberList.map(member => {
        if (member.accountId === GlobalVariable.mainAccount) {
          assert.strictEqual(member.followAccountIds[0], GlobalVariable.assistantAccounts[0])
        }
      })
      await v2.teamService.removeTeamMembersFollow(teamId, 1, [GlobalVariable.assistantAccounts[0]])
    })
    it('Follow team member should trigger teamMemberInfoUpdated event', async function () {
      const spy = sinon.spy()
      v2.teamService.on('teamMemberInfoUpdated', spy)
      await v2.teamService.addTeamMembersFollow(teamId, 1, [GlobalVariable.assistantAccounts[0]])
      assert.strictEqual(spy.firstCall.args[0][0].teamId, teamId)
      assert.strictEqual(spy.firstCall.args[0][0].followAccountIds[0], GlobalVariable.assistantAccounts[0])
      await v2.teamService.removeTeamMembersFollow(teamId, 1, [GlobalVariable.assistantAccounts[0]])
      assert.strictEqual(spy.secondCall.args[0][0].teamId, teamId)
      assert.strictEqual(spy.secondCall.args[0][0].followAccountIds.length, 0)
    })
    after(async function () {
      await v2.teamService.dismissTeam(teamId, 1)
    })
  })
  describe('#getJoinedTeamMembers', async function () {
    it('Get joined team members should return success', async function () {
      const result = await v2.teamService.getJoinedTeamMembers([1, 2])
      assert.ok(result.length > 0)
    })
  })
})
