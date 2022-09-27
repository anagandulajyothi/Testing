import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Policy Group Template With Same Name', function () {
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
                cy.login(this.testdata)
            })
        })

        it('Policy Group With Template Same Name', function () {

            cy.log('Step1: Create Policy Group Template')
            cy.createPolicyGroupTemplate('DRAFT', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg('Policy Group Template Created Successfully')
            cy.reload(true)

            cy.log('Step2: Create Policy Group Template With Same Name')
            cy.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
            utils.assertToastMsg('Name already exists: '+awsPolicyGroupTemplateName)
            cy.reload(true)

            cy.log('Step3: Try To Publish With Out Selecting Increment By')
            cy.editPolicyGroupTemplatewithStatus(awsPolicyGroupTemplateName,'PUBLISHED')
            utils.assertToastMsg('?increment must be set to MAJOR or MINOR when publishing a heavily modified PolicyGroupTemplate.')
            cy.reload(true)

            cy.log('Step4: Delete Policy Group Template')
            cy.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')
        })
    })
})