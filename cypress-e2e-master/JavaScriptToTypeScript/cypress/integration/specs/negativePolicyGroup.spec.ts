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

describe('Policy Group With Same Name', function () {

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

    it('Policy Group With Same Name', function () {

        cy.log('Step1: Create Attrkibute Tag')
        attributeTags.createAttributeTag(attributeTag, attributeTagDescription)
        utils.assertSucessMsg('Attribute Tag Created Successfully')

        cy.log('Step2: Create Policy Group Template')
        policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
        utils.assertSucessMsg('Policy Group Template Created Successfully')

        cy.log('Step3: Create Policy Group')
        policyGroup.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'DRAFT', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::AmazonMQ',
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
        utils.assertSucessMsg('Policy Group Created Successfully')
        cy.reload(true)

        cy.log('Step4: Create Policy Group With Same Name')
        policyGroup.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'DRAFT', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::AmazonMQ',
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
        utils.assertToastMsg('Name already exists: ' + policyGroupName)
        cy.reload(true)

        cy.log('Step5: Try To Publish With Out Selecting Increment By')
        policyGroup.editPolicyGroupwithStatus(policyGroupName, 'PUBLISHED')
        utils.assertToastMsg('?increment must be set to MAJOR or MINOR when publishing a PolicyGroup.')
        cy.reload(true)

        cy.log('Step6: Delete Policy Group')
        policyGroup.deletePolicyGroup(policyGroupName)
        utils.assertSucessMsg('Policy Group Deleted Successfully')

        cy.log('Step7: Delete Policy Group Template')
        policyGroupTemplate.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
        utils.assertSucessMsg('Policy Group Template Deleted Successfully')

        cy.log('Step8: Delete Attribute Tag')
        attributeTags.deleteAttributeTag(attributeTag)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')
    })
})
