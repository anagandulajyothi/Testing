import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
import { policyGroupPage } from '../../pageObjects/policyGroup.page';
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { GroupPage } from '../../pageObjects/groups.page'

const login = new loginPage()
const policyGroupTemplate = new policyGroupTemplatePage()
const policyGroup = new policyGroupPage()
const attributeTags = new attributeTagPage()
const group = new GroupPage()

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

describe('Verify Policy Author Permissions', function () {


    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            groupName = this.testdata.groupName + utils.getUniqueString()
            desc = this.testdata.groupDesc
            user = this.testdata.user
            policyAuthorRole = this.testdata.policyAuthor
            policyAuthorResponsibilities = this.testdata.policyAuthorResponsibilities
            organization = this.testdata.organization
            attributeTag = this.testdata.attributeTagName + utils.getUniqueString()
            attributeTagDescription = this.testdata.attributeTagDesc
            awsPolicyGroupTemplateName = this.testdata.awsPolicyGroupTemplateName + utils.getUniqueString()
            awsPolicyGroupTemplateDesc = this.testdata.awsPolicyGroupTemplateDesc
            policyGroupName = this.testdata.awsPolicyGroupName + utils.getUniqueString()
            policyGroupDesc = this.testdata.awsPolicyGroupDesc
            login.login(this.testdata)
        })
    })

    it('Verify Policy Author Permission', function () {
        cy.log('Step 1: Create Group')
        group.createGroup(groupName, desc)
        return groupId = group.getId().then(myid => {
            groupId = myid
            cy.wrap(groupId).as('groupId')
            cy.log('id is', groupId)
            groupId = (groupId.slice(0, 6))
            cy.log('Latest Id', groupId)

            cy.log('Step 2: Add User To Group')
            group.addSameUser(groupName, user)
            utils.assertSucessMsg('User Added Successfully')

            cy.log('Step 3: Add policy Author Role Assignment To Group')
            group.addRoleAssignments(groupName, policyAuthorRole, policyAuthorResponsibilities, organization, true)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            cy.log('Step 4: Create Attribute Tag')
            attributeTags.createAttributeTag(attributeTag, attributeTagDescription)
            utils.assertSucessMsg('Attribute Tag Created Successfully')

            cy.log('Step 5: Create Policy Group Template')
            policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg('Policy Group Template Created Successfully')

            cy.log('Step 6: Create Policy Group')
            policyGroup.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, groupName, 'PUBLISHED', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::AmazonMQ', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
            utils.assertSucessMsg('Policy Group Created Successfully')

            cy.log('Step 7: Delete Published Policy Group')
            policyGroup.deletePolicyGroup(policyGroupName)
            utils.assertSucessMsg('Policy Group Deleted Successfully')

            cy.log('Step 8: Delete Policy Group Template')
            policyGroupTemplate.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step 9: Delete Attribute Tag')
            attributeTags.deleteAttributeTag(attributeTag)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')

            cy.log('Step 10: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, policyAuthorRole)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step 11: Remove user From Group')
            group.removeUser(groupName, user)
            utils.assertSucessMsg('User Removed Successfully')

            cy.log('Step 12: De-associate Group From Surface')
            group.deAssociateGroupFromSurfaceForGroup('E2E Surface', groupId)

            cy.log('Step 13: Delete Group')
            group.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')
        })
    })
})