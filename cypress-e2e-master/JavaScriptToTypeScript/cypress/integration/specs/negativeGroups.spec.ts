import { before } from 'mocha';
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

describe('Create Group With Same Name', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            groupName = this.testdata.groupName + utils.getUniqueString()
            desc = this.testdata.groupDesc
            user = this.testdata.user
            role = this.testdata.businessOperator
            responsibilities = this.testdata.businessOperatorResponsibilities
            organization = this.testdata.organization
            login.login(this.testdata)
        })
    })

    it('Create Group With Same Name', function () {
        cy.log('Step1: Create Group')
        group.createGroupWithSameName(groupName, desc)
        cy.reload(true)

        cy.log('Step2: Create Group With Same Name')
        group.createGroupWithSameName(groupName, desc)
        cy.wait(4000)
        utils.assertToastMsg('Group\'s name must be unique.')
        cy.reload(true)

        cy.log('Step3: Delete Group')
        group.deleteGroup(groupName)
        utils.assertSucessMsg('Group Deleted Successfully')
    })
})