import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Removing Business Operator Role Assignments with Underlying Buildtime Inventory', function () {
        let attributeTag
        let attributeTagDescription
        let modelName
        let modelDescription
        let groupName
        let desc
        let user
        let role
        let responsibilities
        let organization
        let groupId
        let attributeTagName

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTag = this.testdata.attributeTagName + utils.getUniqueString()
                attributeTagDescription = this.testdata.attributeTagDesc
                modelName = this.testdata.awsModelName + utils.getUniqueString()
                modelDescription = this.testdata.awsModelDesc
                groupName = this.testdata.groupName + utils.getUniqueString()
                desc = this.testdata.groupDesc
                user = this.testdata.prodUser
                role = this.testdata.businessAuthor
                responsibilities = this.testdata.businessAuthorResponsibilities
                organization = this.testdata.organization
                attributeTagName = [attributeTag];
                cy.login(this.testdata)
            })
        })

        it('Removing Business Operator Role Assignments with Underlying Buildtime Inventory', function () {

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

            cy.log('Step5: Create Enclave Model With Publish')
            cy.createEnclaveModel('PUBLISHED', modelName, modelDescription, groupName, attributeTagName, 'cloudProviderAws', 'concourseInfra.json')
            utils.assertSucessMsg('Buildtime Asset Created Successfully')
            cy.wait(2000)

            cy.log('Step6: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, role)
            // utils.assertSucessMsg('Role Assignment Deleted Successfully')
            cy.reload(true)

            cy.log('Step7: Delete Enclave Model With Publish')
            cy.deleteEnclaveModel(modelName)
            utils.assertSucessMsg('Buildtime Asset Deleted ')

            cy.log('Step8: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, role)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')
            cy.reload(true)

            cy.log('Step9: Add Role Assignment To Group')
            cy.addRoleAssignments(groupName, role, responsibilities, organization)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            cy.log('Step10: Delete Attribute Tag')
            cy.deleteAttributeTag(attributeTag)
            utils.assertSucessMsg('Attribute Tag Deleted')

            cy.log('Step11: Remove Role Assignment From Group')
            cy.removeRoleAssignments(groupName, role)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step12: Remove user From Group')
            cy.removeUser(groupName, user)
            utils.assertSucessMsg('User Removed Successfully')

            cy.log('Step13: De-associate Group From Surface')
            cy.log(groupId)
            cy.get('@groupId').then(groupId => {
                cy.log('EntityId ' + groupId)
                cy.deAssociateGroupFromSurface('E2E Surface', groupId)
            })

            cy.log('Step14: Delete Group')
            cy.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')
        })
    })
})
