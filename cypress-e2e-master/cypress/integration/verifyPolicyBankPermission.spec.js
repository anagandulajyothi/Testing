import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from './utils/utils.js';
// const utils = new utilss();

TestFilters([], function () {
    describe('Verify Policy Bank Permissions', function () {
        let groupName
        let desc
        let user
        let policyAuthorRole
        let policyAuthorResponsibilities
        let organization
        let groupId
        let attributeTag
        let attributeTagDescription
        let awsPolicyGroupTemplateName
        let awsPolicyGroupTemplateDesc
        let policyGroupName
        let policyGroupDesc

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                groupName = this.testdata.groupName + utils.getUniqueString()
                desc = this.testdata.groupDesc
                user = this.testdata.prodUser
                policyAuthorRole = this.testdata.policyAuthor
                policyAuthorResponsibilities = this.testdata.policyAuthorResponsibilities
                organization = this.testdata.organization
                attributeTag = this.testdata.attributeTagName + utils.getUniqueString()
                attributeTagDescription = this.testdata.attributeTagDesc
                awsPolicyGroupTemplateName = this.testdata.awsPolicyGroupTemplateName + utils.getUniqueString()
                awsPolicyGroupTemplateDesc = this.testdata.awsPolicyGroupTemplateDesc
                policyGroupName = this.testdata.awsPolicyGroupName + utils.getUniqueString()
                policyGroupDesc = this.testdata.awsPolicyGroupDesc
                cy.login(this.testdata)
            })
        })

        it('Verify Policy Bank Permission', function () {
            cy.log('Step 1: Create Group')
            cy.createGroup(groupName, desc)
            cy.getId().then(myid => {
                let groupId = myid
                cy.wrap(groupId).as('groupId')
            })

            cy.log(groupId)
            cy.get('@groupId').then(groupId => {
                cy.log('EntityId ' + groupId)
            })

            cy.log('Step 2: Add User To Group')
            cy.addUsers(groupName, "e2eProdUser <ramakrishna+e2eproduser@concourselabs.com>")
            utils.assertSucessMsg('User Added Successfully')

            cy.log('Step 3: Add policy Author Role Assignment To Group')
            cy.addRoleAssignments(groupName, policyAuthorRole, policyAuthorResponsibilities, organization)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            cy.log('Step 4: Re-Login ')
            cy.reLogin("ramakrishna+e2eproduser@concourselabs.com", "Concourse1!")

            cy.log('Step 5: Verify New Policy Bank Button ')
            cy.policyBankMenu()
            cy.get('.btn-secondary').should('be.enabled')
            cy.backToMainMenu()

            cy.log('Step 6: Re-Login ')
            cy.reLogin("chandrakanth.vedicharala+e2eperfuser@concourselabs.com", "Concourse1!")

            cy.log('Step 7: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, policyAuthorRole)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step 8: Remove user From Group')
            cy.removeUser(groupName, "e2eProdUser <ramakrishna+e2eproduser@concourselabs.com>")
            utils.assertSucessMsg('User Removed Successfully')

            cy.log('Step 9: Re-Login ')
            cy.reLogin("ramakrishna+e2eproduser@concourselabs.com", "Concourse1!")

            cy.log('Step 10: Verify New Policy Bank Button ')
            cy.policyBankMenu()
            cy.xpath('//div[@class="ps"]').should('not.be.visible', '.btn-secondary.btn-secondary')
            cy.backToMainMenu()

            cy.log('Step 11: Re-Login ')
            cy.reLogin("chandrakanth.vedicharala+e2eperfuser@concourselabs.com", "Concourse1!")

            cy.log('Step 12: De-associate Group From Surface')
            cy.log(groupId)
            cy.get('@groupId').then(groupId => {
                cy.log('EntityId ' + groupId)
                cy.deAssociateGroupFromSurfaceForGroup('E2E Surface', groupId)
            })

            cy.log('Step 13: Delete Group')
            cy.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')
        })
    })
})