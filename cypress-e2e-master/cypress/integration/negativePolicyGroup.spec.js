import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Policy Group With Same Name', function () {
        let attributeTag
        let attributeTagDescription
        let awsPolicyGroupTemplateName
        let awsPolicyGroupTemplateDesc
        let policyGroupName
        let policyGroupDesc

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTag = this.testdata.attributeTagName + utils.getUniqueString()
                attributeTagDescription = this.testdata.attributeTagDesc
                awsPolicyGroupTemplateName = this.testdata.awsPolicyGroupTemplateName + utils.getUniqueString()
                awsPolicyGroupTemplateDesc = this.testdata.awsPolicyGroupTemplateDesc
                policyGroupName = this.testdata.awsPolicyGroupName + utils.getUniqueString()
                policyGroupDesc = this.testdata.awsPolicyGroupDesc
                cy.login(this.testdata)
            })
        })

        it('Policy Group With Same Name', function () {

            cy.log('Step1: Create Attrkibute Tag')
            cy.createAttributeTag(attributeTag, attributeTagDescription)
            utils.assertSucessMsg('Attribute Tag Created Successfully')

            cy.log('Step2: Create Policy Group Template')
            cy.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg('Policy Group Template Created Successfully')
            
            cy.log('Step3: Create Policy Group')
            cy.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'DRAFT', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::AmazonMQ')
            utils.assertSucessMsg('Policy Group Created Successfully')
            cy.reload(true)

            cy.log('Step4: Create Policy Group With Same Name')
            cy.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'DRAFT', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::AmazonMQ')
            utils.assertToastMsg('Name already exists: '+policyGroupName)
            cy.reload(true)

            cy.log('Step5: Try To Publish With Out Selecting Increment By')
            cy.editPolicyGroupwithStatus(policyGroupName,'PUBLISHED')
            utils.assertToastMsg('?increment must be set to MAJOR or MINOR when publishing a PolicyGroup.')
            cy.reload(true)

            cy.log('Step6: Delete Policy Group')
            cy.deletePolicyGroup(policyGroupName)
            utils.assertSucessMsg('Policy Group Deleted Successfully')

            cy.log('Step7: Delete Policy Group Template')
            cy.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step8: Delete Attribute Tag')
            cy.deleteAttributeTag(attributeTag)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })
})