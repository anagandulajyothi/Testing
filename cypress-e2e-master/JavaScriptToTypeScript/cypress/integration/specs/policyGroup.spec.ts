import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
import { policyGroupPage } from '../../pageObjects/policyGroup.page';
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
const login = new loginPage()
const policyGroupTemplate = new policyGroupTemplatePage()
const policyGroup = new policyGroupPage()
const attributeTags = new attributeTagPage()

let attributeTag
let attributeTagDescription
let awsPolicyGroupTemplateName
let awsPolicyGroupTemplateDesc
let policyGroupName
let policyGroupDesc


describe('Policy Group', function () {
    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attributeTag = this.testdata.attributeTagName + utils.getUniqueString()
            attributeTagDescription = this.testdata.attributeTagDesc
            awsPolicyGroupTemplateName = this.testdata.awsPolicyGroupTemplateName + utils.getUniqueString()
            awsPolicyGroupTemplateDesc = this.testdata.awsPolicyGroupTemplateDesc
            policyGroupName = this.testdata.awsPolicyGroupName + utils.getUniqueString()
            policyGroupDesc = this.testdata.awsPolicyGroupDesc
            login.login(this.testdata)
        })
    })

    it('Policy Group', function () {

        cy.log('Step1: Create Attrkibute Tag')
        attributeTags.createAttributeTag(attributeTag, attributeTagDescription)
        utils.assertSucessMsg('Attribute Tag Created Successfully')
        // cy.reload(true)

        cy.log('Step2: Create Policy Group Template')
        policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
        utils.assertSucessMsg('Policy Group Template Created Successfully')
        // cy.reload(true)

        cy.log('Step3: Create Draft Policy Group')
        policyGroup.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'DRAFT', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::AmazonMQ','',
        '','','','','','','','','','','','','','','','','','','','','','','','')
        utils.assertSucessMsg('Policy Group Created Successfully')

        cy.log('Step5: Edit Policy Group Name')
        policyGroup.editPolicyGroup(policyGroupName)
        utils.assertSucessMsg('Policy Group Updated Successfully')

        cy.log('Step6: Delete Draft Policy Group')
        policyGroup.deletePolicyGroup(policyGroupName)
        utils.assertSucessMsg('Policy Group Deleted Successfully')

        cy.log('Step7: Create Published Policy Group')
        policyGroup.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::AmazonMQ',
        '','','','','','','','','','','','','','','','','','','','','','','','','')
        utils.assertSucessMsg('Policy Group Created Successfully')

        cy.log('Step8: Delete Published Policy Group')
        policyGroup.deletePolicyGroup(policyGroupName)
        utils.assertSucessMsg('Policy Group Deleted Successfully')

        cy.log('Step9: Delete Policy Group Template')
        policyGroupTemplate.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
        utils.assertSucessMsg('Policy Group Template Deleted Successfully')

        cy.log('Step10: Delete Attribute Tag')
        attributeTags.deleteAttributeTag(attributeTag)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')
    })
})
