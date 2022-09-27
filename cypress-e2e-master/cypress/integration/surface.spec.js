import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js';

TestFilters([], function () {
    describe('surfaces', function () {
        let surfaceName
        let surfaceDescription
        let groupName
        let identityAdmin
        let institutionAdmin
        let permissionAdmin
        let surfaceAdmin
        let user
        let owningGroup

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                surfaceName = this.testdata.surfaceName + utils.getUniqueString()
                surfaceDescription = this.testdata.surfaceDescription + utils.getUniqueString()
                owningGroup = this.testdata.owningGroup
                identityAdmin = this.testdata.identityAdmin
                institutionAdmin = this.testdata.institutionAdmin
                permissionAdmin = this.testdata.permissionAdmin
                surfaceAdmin = this.testdata.surfaceAdmin
                user = this.testdata.user
                groupName = surfaceName
                cy.login(this.testdata)
            })
        })

        it('Create New surface', function () {
            cy.log('Step1: Create Surface')
            cy.createNewSurface(surfaceName, surfaceDescription, owningGroup)
            utils.assertSucessMsg('Surface Created Successfully')
            cy.reload(true)

            cy.log('Step2: Search Root Group')
            cy.searchGroup(surfaceName, groupName)
            cy.getId().then(myid => {
                let groupId = myid
                cy.wrap(groupId).as('groupId')
            })
            // cy.log(groupId)
            cy.get('@groupId').then(groupId => {
                let [mainurl, queryparam] = groupId.split('?');
                groupId = mainurl.split('/');
                cy.log('EntityId ' + groupId)
            })

            cy.log('Step3: Edit Surface')
            cy.editSurface(surfaceName)
            utils.assertSucessMsg('Surface Updated Successfully')

            cy.log('Step4: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, identityAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step5: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, institutionAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step6: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, permissionAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step7: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, surfaceAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step8: Remove user From Group')
            cy.removeUser(groupName, user)
            utils.assertSucessMsg('User Removed Successfully')

            cy.log('Step9: De-associate Group From Surface')
            cy.get('@groupId').then(groupId => {
                let [mainurl, queryparam] = groupId.split('?');
                groupId = mainurl.split('/');
                cy.log('EntityId ' + groupId)
                cy.deAssociateGroupFromSurface(surfaceName, groupId)
            })

            cy.log('Step10: Delete Group')
            cy.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')

            cy.log('Step11: Delete Surface')
            cy.deleteSurface(surfaceName)
            utils.assertSucessMsg('Surface Deleted Successfully')
        })
    })
})