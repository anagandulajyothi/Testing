import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js';
// const utils = new utilss();

TestFilters([], function () {
    describe('Create Group With Same Name', function () {
        let groupName
        let desc
        let user
        let role
        let responsibilities
        let organization
        
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

        it('Create Group With Same Name', function () {
            cy.log('Step1: Create Group')
            cy.createGroupWithSameName(groupName, desc)
            cy.reload(true)

            cy.log('Step2: Create Group With Same Name')
            cy.createGroupWithSameName(groupName, desc)
            cy.wait(4000)
            utils.assertToastMsg('Group\'s name must be unique.')
            cy.reload(true)
          
            cy.log('Step3: Delete Group')
            cy.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')
        })
    })
})