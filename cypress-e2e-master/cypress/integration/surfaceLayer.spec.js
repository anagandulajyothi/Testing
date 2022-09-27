import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js';

TestFilters([], function () {
    describe('Surface Layers', function () {
        let surfaceName
        let surfaceDescription
        let groupName
        let identityAdmin
        let institutionAdmin
        let permissionAdmin
        let surfaceAdmin
        let surfaceLayerAdmin
        let user
        let owningGroup
        let responsibilities
        let organization
        let pordSurfaceLayerName = 'Prod'
        let devSurfaceLayerName = 'Dev'

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
                surfaceLayerAdmin = this.testdata.surfaceLayerAdmin
                user = this.testdata.user
                groupName = surfaceName
                responsibilities = this.testdata.surfaceLayerAdminResponsibilities
                organization = [`${surfaceName}`];
                cy.login(this.testdata)
            })
        })

        it('Create New surface Layer', function () {
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
            cy.log('Step3: Add Role Assignment To Group')
            cy.addRoleAssignments(groupName, surfaceLayerAdmin, responsibilities, organization)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            cy.log('Step4: Create Dev Surface Layer')
            cy.createNewSurfaceLayer(surfaceName, devSurfaceLayerName, devSurfaceLayerName)
            cy.wait(2000)
            cy.reload(true)

            cy.log('Step5: Create Prod Surface Layer')
            cy.createNewSurfaceLayer(surfaceName, pordSurfaceLayerName, pordSurfaceLayerName)
            cy.wait(2000)
            cy.reload(true)

            cy.log('Step6: Delete Prod Surface Layer')
            cy.deleteSurfaceLayer(surfaceName, pordSurfaceLayerName)
            cy.wait(2000)
            cy.reload(true)

            cy.log('Step7: Delete Dev Surface Layer')
            cy.deleteSurfaceLayer(surfaceName, devSurfaceLayerName)

            cy.log('Step8: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, identityAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step9: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, institutionAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step10: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, permissionAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step11: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, surfaceAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step12: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, surfaceLayerAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step13: Remove user From Group')
            cy.removeUser(groupName, user)
            utils.assertSucessMsg('User Removed Successfully')

            cy.log('Step14: De-associate Group From Surface')
            cy.get('@groupId').then(groupId => {
                let [mainurl, queryparam] = groupId.split('?');
                groupId = mainurl.split('/');
                cy.log('EntityId ' + groupId)
                cy.deAssociateGroupFromSurface(surfaceName, groupId)
            })

            cy.log('Step15: Delete Group')
            cy.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')

            cy.log('Step16: Delete Group')
            cy.deleteSurface(surfaceName)
            utils.assertSucessMsg('Surface Deleted Successfully')
        })
    })
})