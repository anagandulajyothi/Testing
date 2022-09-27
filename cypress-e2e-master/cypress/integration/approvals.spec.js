import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Approvals', function () {
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
                awsPolicyGroupTemplateName = this.testdata.approvalPolicyGroupTemplateName + utils.getUniqueString()
                awsPolicyGroupTemplateDesc = this.testdata.approvalPolicyGroupTemplateDesc
                policyGroupName = this.testdata.awsPolicyGroupName + utils.getUniqueString()
                policyGroupDesc = this.testdata.awsPolicyGroupDesc
                cy.login(this.testdata)
            })
        })

        it('Approvals', function () {

            cy.log('Step1: Create Attrkibute Tag')
            cy.createAttributeTag(attributeTag, attributeTagDescription)
            utils.assertSucessMsg('Attribute Tag Created Successfully')
            // cy.reload(true)

            cy.log('Step2: Create Policy Group Template')
            cy.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Require Approval of Institutional Entities')
            utils.assertSucessMsg('Policy Group Template Created Successfully')
            // cy.reload(true)

            cy.log('Step3: Create Published Policy Group')
            cy.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', '', 'Default Surface - Root Surface Layer', 'POLICY_GROUP', 'E2E Admin')
            utils.assertSucessMsg('Policy Group Created Successfully')
            cy.wait(10000)
            cy.reload(true)

            cy.log('Step4: Approve Publish Request For Policy Group')
            cy.approveRequest(policyGroupName)
            cy.wait(30000)
            cy.reload(true)
          

            cy.log('Step5: Delete Policy Group')
            cy.deletePolicyGroup(policyGroupName)
            cy.wait(25000)
            cy.reload(true)
         

            cy.log('Step6: Approve Delete Request For Policy Group')
            cy.approveRequest(policyGroupName)
            cy.wait(35000)
            cy.reload(true)

            cy.log('Step7: Delete Policy Group Template')
            cy.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step8: Delete Policy Group Template')
            cy.deleteAttributeTag(attributeTag)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })
})