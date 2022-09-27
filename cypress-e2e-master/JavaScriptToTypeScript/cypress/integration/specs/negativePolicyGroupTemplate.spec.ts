import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
const login = new loginPage()
const policyGroupTemplate = new policyGroupTemplatePage()
let awsPolicyGroupTemplateName
let awsPolicyGroupTemplateDesc

describe('Policy Group Template With Same Name', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            awsPolicyGroupTemplateName = this.testdata.awsPolicyGroupTemplateName + utils.getUniqueString()
            awsPolicyGroupTemplateDesc = this.testdata.awsPolicyGroupTemplateDesc
            login.login(this.testdata)
        })
    })

    it('Policy Group With Template Same Name', function () {

        cy.log('Step1: Create Policy Group Template')
        policyGroupTemplate.createPolicyGroupTemplate('DRAFT', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
        utils.assertSucessMsg('Policy Group Template Created Successfully')
        cy.reload(true)

        cy.log('Step2: Create Policy Group Template With Same Name')
        policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
        utils.assertToastMsg('Name already exists: ' + awsPolicyGroupTemplateName)
        cy.reload(true)

        cy.log('Step3: Try To Publish With Out Selecting Increment By')
        policyGroupTemplate.editPolicyGroupTemplatewithStatus(awsPolicyGroupTemplateName, 'PUBLISHED')
        utils.assertToastMsg('?increment must be set to MAJOR or MINOR when publishing a heavily modified PolicyGroupTemplate.')
        cy.reload(true)

        cy.log('Step4: Delete Policy Group Template')
        policyGroupTemplate.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
        utils.assertSucessMsg('Policy Group Template Deleted Successfully')
    })
})