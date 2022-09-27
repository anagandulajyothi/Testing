import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js';

TestFilters([], function () {
    describe('Policy Group Template', function () {
        let awsPolicyGroupTemplateName
        let awsPolicyGroupTemplateDesc
        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                awsPolicyGroupTemplateName = this.testdata.awsPolicyGroupTemplateName + utils.getUniqueString()
                awsPolicyGroupTemplateDesc = this.testdata.awsPolicyGroupTemplateDesc
                cy.login(this.testdata)
            })
        })
        it('Create PolicyGroup Template', function () {
            cy.log('Step1: Create Draft Policy Group Template')
            cy.createPolicyGroupTemplate('DRAFT', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

            cy.log('Step2: Edit Policy Group Template')
            cy.editPolicyGroupTemplate(awsPolicyGroupTemplateName)
            utils.assertSucessMsg(this.testdata.PolicyGroupTemplateUpdateSucessMsg)

            cy.log('Step3: Delete Draft Policy Group Template')
            cy.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
            utils.assertSucessMsg(this.testdata.PolicyGroupTemplateDeleteSucessMsg)

            cy.log('Step4: Create Published Policy Group Template')
            cy.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

            cy.log('Step5: Delete Published Policy Group Template')
            cy.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
            utils.assertSucessMsg(this.testdata.PolicyGroupTemplateDeleteSucessMsg)
        })
    })
})