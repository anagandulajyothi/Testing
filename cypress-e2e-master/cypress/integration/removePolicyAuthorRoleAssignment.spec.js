import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Removing Policy Author Role Assignments with Underlying Policy Group', function () {
        let attributeTag
        let attributeTagDescription
        let awsPolicyGroupTemplateName
        let awsPolicyGroupTemplateDesc
        let policyGroupName
        let policyGroupDesc
        let groupName
        let desc
        let user
        let role
        let responsibilities
        let organization
        let groupId

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTag = this.testdata.attributeTagName + utils.getUniqueString()
                attributeTagDescription = this.testdata.attributeTagDesc
                awsPolicyGroupTemplateName = this.testdata.awsPolicyGroupTemplateName + utils.getUniqueString()
                awsPolicyGroupTemplateDesc = this.testdata.awsPolicyGroupTemplateDesc
                policyGroupName = this.testdata.awsPolicyGroupName + utils.getUniqueString()
                policyGroupDesc = this.testdata.awsPolicyGroupDesc
                groupName = this.testdata.groupName + utils.getUniqueString()
                desc = this.testdata.groupDesc
                user = this.testdata.prodUser
                role = this.testdata.policyAuthor
                responsibilities = this.testdata.policyAuthorResponsibilities
                organization = this.testdata.organization
                cy.login(this.testdata)
            })
        })

        it('Removing Policy Author Role Assignments with Underlying Policy Group', function () {

            cy.log('Step1: Create Group')
            cy.createGroup(groupName, desc)
            cy.getId().then(myid => {
                let groupId = myid
                cy.wrap(groupId).as('groupId')
            })
            cy.reload(true)
            cy.log(groupId)
            cy.get('@groupId').then(groupId => {
                cy.log('EntityId ' + groupId)
            })

            cy.log('Step2: Add User To Group')
            cy.addSameUser(groupName, user)
            utils.assertSucessMsg('User Added Successfully')

            cy.log('Step3: Add Role Assignment To Group')
            cy.addRoleAssignments(groupName, role, responsibilities, organization)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            cy.log('Step4: Create Attrkibute Tag')
            cy.createAttributeTag(attributeTag, attributeTagDescription)
            utils.assertSucessMsg('Attribute Tag Created Successfully')

            cy.log('Step5: Create Policy Group Template')
            cy.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg('Policy Group Template Created Successfully')

            cy.log('Step6: Create Policy Group')
            cy.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, groupName, 'PUBLISHED', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::AmazonMQ')
            utils.assertSucessMsg('Policy Group Created Successfully')

            cy.log('Step7: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, role)
            // utils.assertSucessMsg('Role Assignment Deleted Successfully')
            cy.reload(true)

            cy.log('Step8: Delete Published Policy Group')
            cy.deletePolicyGroup(policyGroupName)
            // utils.assertSucessMsg('Policy Group Deleted Successfully')

            cy.log('Step9: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, role)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')
            cy.reload(true)

            cy.log('Step10: Add Role Assignment To Group')
            cy.addRoleAssignments(groupName, role, responsibilities, organization)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            cy.log('Step11: Delete Policy Group Template')
            cy.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step12: Delete Attribute Tag')
            cy.deleteAttributeTag(attributeTag)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')

            cy.log('Step13: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, role)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step14: Remove user From Group')
            cy.removeUser(groupName, user)
            utils.assertSucessMsg('User Removed Successfully')

            cy.log('Step15: De-associate Group From Surface')
            cy.log(groupId)
            cy.get('@groupId').then(groupId => {
                cy.log('EntityId ' + groupId)
                cy.deAssociateGroupFromSurface('E2E Surface', groupId)
            })

            cy.log('Step16: Delete Group')
            cy.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')
        })
    })
})
