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

describe('Removing Policy Author Role Assignments with Underlying Policy Group', function () {

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
            user = this.testdata.user
            role = this.testdata.policyAuthor
            responsibilities = this.testdata.policyAuthorResponsibilities
            organization = this.testdata.organization
            login.login(this.testdata)
        })
    })

    it('Removing Policy Author Role Assignments with Underlying Policy Group', function () {

        cy.log('Step1: Create Group')
        group.createGroup(groupName, desc)
        return groupId = group.getId().then(myid => {
            groupId = myid
            cy.wrap(groupId).as('groupId')
            cy.log('id is', groupId)
            groupId = (groupId.slice(0, 6))
            cy.log('Latest Id', groupId)

            cy.log('Step2: Add User To Group')
            group.addSameUser(groupName, user)
            utils.assertSucessMsg('User Added Successfully')

            cy.log('Step3: Add Role Assignment To Group')
            group.addRoleAssignments(groupName, role, responsibilities, organization, true)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            cy.log('Step4: Create Attrkibute Tag')
            attributeTags.createAttributeTag(attributeTag, attributeTagDescription)
            utils.assertSucessMsg('Attribute Tag Created Successfully')

            cy.log('Step5: Create Policy Group Template')
            policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg('Policy Group Template Created Successfully')

            cy.log('Step6: Create Policy Group')
            policyGroup.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, groupName, 'PUBLISHED', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::AmazonMQ', '',
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
            utils.assertSucessMsg('Policy Group Created Successfully')

            cy.log('Step7: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, role)
            cy.xpath('//div[@class="modal-body"]//div[@class="alert alert-danger alert-dismissible ng-star-inserted"]').contains(`Cannot remove role because Group [${groupId}] is current owner of Policy Group(s).`)
            cy.reload(true)

            cy.log('Step8: Delete Published Policy Group')
            policyGroup.deletePolicyGroup(policyGroupName)

            cy.log('Step9: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, role)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')
            cy.reload(true)

            cy.log('Step10: Add Role Assignment To Group')
            group.addRoleAssignments(groupName, role, responsibilities, organization, true)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            cy.log('Step11: Delete Policy Group Template')
            policyGroupTemplate.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step12: Delete Attribute Tag')
            attributeTags.deleteAttributeTag(attributeTag)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')

            cy.log('Step13: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, role)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step14: Remove user From Group')
            group.removeUser(groupName, user)
            utils.assertSucessMsg('User Removed Successfully')

            cy.log('Step15: De-associate Group From Surface')
            group.deAssociateGroupFromSurfaceForGroup('E2E Surface', groupId)

            cy.log('Step16: Delete Group')
            group.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')
        })
    })
})
