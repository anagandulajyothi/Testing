import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Deploy Policy As Policy Group', function () {
        let attributeTag
        let attributeTagDescription
        let policyName
        let policyDesc
        let policyGroupName
        let policyGroupDesc
        let awsPolicyGroupTemplateName

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTag = this.testdata.attributeTagName + utils.getUniqueString()
                attributeTagDescription = this.testdata.attributeTagDesc
                policyName = "E2E Policy" + utils.getUniqueString()
                policyDesc = "E2E Policy"
                policyGroupName = "E2E PolicyGroup" + utils.getUniqueString()
                policyGroupDesc = "E2E PolicyGroup"
                awsPolicyGroupTemplateName = "AWS CloudFormation"
                cy.login(this.testdata)
            })
        })


        it('Deploy Policy As Policy Group', function () {

            cy.log('Step1: Create Attribute Tag')
            cy.createAttributeTag(attributeTag, attributeTagDescription)

            cy.log('Step 2:  Create Policy')
            cy.createPolicy('AWS CloudFormation', policyName, policyDesc, 'AWS::ACMPCA::Certificate', 'AWS::ACMPCA::Certificate/ApiPassthrough/Extensions/CertificatePolicies/CertPolicyId', 'Equal ==', '222', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'Remedition')

            cy.log('Step 3:  Publish Policy')
            cy.PublishPolicy(policyName)

            cy.log('Step 4:  Deploy As Policy Group')
            cy.DeployAsPolicyGroup(policyName, policyGroupName, policyGroupDesc, 'E2E Admin', attributeTag)

            cy.log('Step 5:  Verify Deployed Policy Group')
            cy.VerifyDeployedPolicyGroup(policyGroupName)

            cy.log('Step 6: Delete Deployed Policy Group')
            cy.deletePolicyGroup(policyGroupName)

            cy.log('Step 7: Delete Attribute Tag')
            cy.deleteAttributeTag(attributeTag)

            cy.log('Step 8: Delete Policy')
            cy.deletePolicy(policyName)
        })
    })
})
