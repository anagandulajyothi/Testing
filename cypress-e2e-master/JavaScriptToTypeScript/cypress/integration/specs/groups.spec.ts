import { GroupPage } from '../../pageObjects/groups.page'
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
const login = new loginPage()
const group = new GroupPage()
let groupName
let desc
let user
let role
let responsibilities
let organization
let groupId
let id


describe('Groups', function () {
 
    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            groupName = this.testdata.groupName + utils.getUniqueString()
            desc = this.testdata.groupDesc
            user = this.testdata.prodUser
            role = this.testdata.businessOperator
            responsibilities = this.testdata.businessOperatorResponsibilities
            organization = this.testdata.organization
            login.login(this.testdata)
        })
    })

    it('Groups', function () {
        cy.log('Step1: Create Group')
        group.createGroup(groupName, desc)
        // utils.assertSucessMsg('Group Created Successfully')
        group.getId().then(myid => {
            let groupId = myid
            cy.wrap(groupId).as('groupId')
        })

        cy.log(groupId)
        cy.get('@groupId').then(groupId => {
            cy.log('EntityId ' + groupId)
        })

        cy.log('Step2: Edit Group')
        group.editGroup(groupName)
        utils.assertSucessMsg('Group Updated Successfully')

        cy.log('Step3: Add User To Group')
        group.addUsers(groupName, user)
        utils.assertSucessMsg('User Added Successfully')

        cy.log('Step4: Add Role Assignment To Group')
        group.addRoleAssignments(groupName, role, responsibilities, organization, '')
        utils.assertSucessMsg('Role Assignment Created Successfully')

        cy.log('Step5: Remove Role Assignment From Group')
        group.removeRoleAssignments(groupName, role)
        utils.assertSucessMsg('Role Assignment Deleted Successfully')

        cy.log('Step6: Remove user From Group')
        group.removeUser(groupName, user)
        utils.assertSucessMsg('User Removed Successfully')

        cy.log('Step7: De-associate Group From Surface')
        cy.log(groupId)
        cy.get('@groupId').then(groupId => {
            cy.log('EntityId ' + groupId)
            group.deAssociateGroupFromSurfaceForGroup('E2E Surface', groupId)
        })

        cy.log('Step8: Delete Group')
        group.deleteGroup(groupName)
        utils.assertSucessMsg('Group Deleted Successfully')
    })
})