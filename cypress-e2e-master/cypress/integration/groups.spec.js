import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js';
// const utils = new utilss();

TestFilters([], function () {
    describe('Groups', function () {
        let groupName
        let desc
        let user
        let role
        let responsibilities
        let organization
        let groupId
        let id

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                groupName = this.testdata.groupName + utils.getUniqueString()
                desc = this.testdata.groupDesc
                user = this.testdata.user
                role = this.testdata.businessOperator
                responsibilities = this.testdata.businessOperatorResponsibilities
                organization = this.testdata.organization
                cy.login(this.testdata)
            })
        })

        it('Groups', function () {
            cy.log('Step1: Create Group')
            cy.createGroup(groupName, desc)
            // utils.assertSucessMsg('Group Created Successfully')
            cy.getId().then(myid => {
                let groupId = myid
                cy.wrap(groupId).as('groupId')
            })

            cy.log(groupId)
            cy.get('@groupId').then(groupId => {
                cy.log('EntityId ' + groupId)
            })

            cy.log('Step2: Edit Group')
            cy.editGroup(groupName)
            utils.assertSucessMsg('Group Updated Successfully')

            cy.log('Step3: Add User To Group')
            cy.addSameUser(groupName, user)
            utils.assertSucessMsg('User Added Successfully')

            cy.log('Step4: Add Role Assignment To Group')
            cy.addRoleAssignments(groupName, role, responsibilities, organization)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            cy.log('Step5: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, role)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step6: Remove user From Group')
            cy.removeUser(groupName, user)
            utils.assertSucessMsg('User Removed Successfully')

            cy.log('Step7: De-associate Group From Surface')
            cy.log(groupId)
            cy.get('@groupId').then(groupId => {
                cy.log('EntityId ' + groupId)
                cy.deAssociateGroupFromSurfaceForGroup('E2E Surface', groupId)
            })

            cy.log('Step8: Delete Group')
            cy.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')
        })
    })
})