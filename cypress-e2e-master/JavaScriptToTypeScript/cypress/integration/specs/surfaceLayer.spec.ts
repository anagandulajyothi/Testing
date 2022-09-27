import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { surfacePage } from '../../pageObjects/surface.page';
import { GroupPage } from '../../pageObjects/groups.page'
import { SurfaceLayer } from '../../pageObjects/surfaceLayer.page'

const surface = new surfacePage()
const login = new loginPage()
const group = new GroupPage()
const surfaceLayer = new SurfaceLayer()

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
    let groupId

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
            user = this.testdata.prodUser
            groupName = surfaceName
            responsibilities = this.testdata.surfaceLayerAdminResponsibilities
            organization = [`${surfaceName}`];
            login.login(this.testdata)
        })
    })

    it('Create New surface Layer', function () {
        cy.log('Step1: Create Surface')
        surface.createNewSurface(surfaceName, surfaceDescription, owningGroup)
        utils.assertSucessMsg('Surface Created Successfully')
        cy.reload(true)

        cy.log('Step2: Search Root Group')
        group.searchGroup(surfaceName, groupName)
        return groupId = group.getId().then(myid => {
            groupId = myid
            cy.wrap(groupId).as('groupId')
            cy.log('id is', groupId)
            groupId = (groupId.slice(0, 6))
            cy.log('Latest Id', groupId)

            cy.log('Step3: Add Role Assignment To Group')
            group.addRoleAssignments(groupName, surfaceLayerAdmin, responsibilities, organization, true)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            cy.log('Step4: Create Dev Surface Layer')
            surfaceLayer.createNewSurfaceLayer(surfaceName, devSurfaceLayerName, devSurfaceLayerName)
            cy.wait(2000)
            cy.reload(true)

            cy.log('Step5: Create Prod Surface Layer')
            surfaceLayer.createNewSurfaceLayer(surfaceName, pordSurfaceLayerName, pordSurfaceLayerName)
            cy.wait(2000)
            cy.reload(true)

            cy.log('Step6: Delete Prod Surface Layer')
            surfaceLayer.deleteSurfaceLayer(surfaceName, pordSurfaceLayerName)
            cy.wait(2000)
            cy.reload(true)

            cy.log('Step7: Delete Dev Surface Layer')
            surfaceLayer.deleteSurfaceLayer(surfaceName, devSurfaceLayerName)

            cy.log('Step8: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, identityAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step9: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, institutionAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step10: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, permissionAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step11: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, surfaceAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step12: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, surfaceLayerAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step13: Remove user From Group')
            group.removeUser(groupName, user)
            utils.assertSucessMsg('User Removed Successfully')

            cy.log('Step14: De-associate Group From Surface')
            group.deAssociateGroupFromSurface(surfaceName, groupId)

            cy.log('Step15: Delete Group')
            group.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')

            cy.log('Step16: Delete Group')
            surface.deleteSurface(surfaceName)
            utils.assertSucessMsg('Surface Deleted Successfully')
        })
    })
})