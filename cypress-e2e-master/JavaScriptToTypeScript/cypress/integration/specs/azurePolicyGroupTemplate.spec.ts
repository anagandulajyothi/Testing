import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';

const login = new loginPage()
const policyGroupTemplate = new policyGroupTemplatePage()

let awsPolicyGroupTemplateName
let awsPolicyGroupTemplateDesc

describe('Azure PolicyGroup Template', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            awsPolicyGroupTemplateName = this.testdata.awsPolicyGroupTemplateName + utils.getUniqueString()
            awsPolicyGroupTemplateDesc = this.testdata.awsPolicyGroupTemplateDesc
            login.login(this.testdata)
        })
    })
    it('Azure PolicyGroup Template', function () {
        cy.log('Step1: Create Draft Policy Group Template')
        policyGroupTemplate.createPolicyGroupTemplate('DRAFT', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Custom policy for Microsoft Azure Resources created with Terraform')
        utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

        cy.log('Step2: Edit Policy Group Template')
        policyGroupTemplate.editPolicyGroupTemplate(awsPolicyGroupTemplateName)
        utils.assertSucessMsg(this.testdata.PolicyGroupTemplateUpdateSucessMsg)

        cy.log('Step3: Delete Draft Policy Group Template')
        policyGroupTemplate.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
        utils.assertSucessMsg(this.testdata.PolicyGroupTemplateDeleteSucessMsg)

        cy.log('Step4: Create Published Policy Group Template')
        policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Custom policy for Microsoft Azure Resources created with Terraform')
        utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

        cy.log('Step5: Delete Published Policy Group Template')
        policyGroupTemplate.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
        utils.assertSucessMsg(this.testdata.PolicyGroupTemplateDeleteSucessMsg)
    })
})