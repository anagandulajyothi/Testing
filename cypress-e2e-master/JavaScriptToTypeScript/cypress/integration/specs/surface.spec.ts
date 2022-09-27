import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { surfacePage } from '../../pageObjects/surface.page';
import { GroupPage } from '../../pageObjects/groups.page'

const surface = new surfacePage()
const login = new loginPage()
const group = new GroupPage()

let surfaceName
let surfaceDescription
let groupName
let identityAdmin
let institutionAdmin
let permissionAdmin
let surfaceAdmin
let user
let owningGroup
// let groupId
let entityId

describe('surfaces', function () {
    // let groupId
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
            user = this.testdata.prodUser
            groupName = surfaceName

            login.login(this.testdata)
        })
    })

    it('Create New surface', function () {
        let groupId
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
            groupId = (groupId.slice(0, 5))
            cy.log('Latest Id', groupId)

            cy.log('Step3: Edit Surface')
            surface.editSurface(surfaceName)
            utils.assertSucessMsg('Surface Updated Successfully')

            cy.log('Step4: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, identityAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step5: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, institutionAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step6: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, permissionAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step7: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, surfaceAdmin)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step8: Remove user From Group')
            group.removeUser(groupName, user)
            utils.assertSucessMsg('User Removed Successfully')

            cy.log('Step9: De-associate Group From Surface')
            cy.log("Test" + groupId)
            group.deAssociateGroupFromSurface(surfaceName, groupId)

            cy.log('Step10: Delete Group')
            group.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')

            cy.log('Step11: Delete Surface')
            surface.deleteSurface(surfaceName)
            utils.assertSucessMsg('Surface Deleted Successfully')
        })
    })
})