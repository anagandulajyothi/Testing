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
let policyGroupTemplateName
let policyGroupTemplateDesc
let policyGroupName
let policyGroupDesc

describe('Cloud Formation Invariant Policy Group', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attributeTag = this.testdata.attributeTagName + utils.getUniqueString()
            attributeTagDescription = this.testdata.attributeTagDesc
            policyGroupTemplateName = 'Invariant Cloud Formation Policy Group Template' + utils.getUniqueString()
            policyGroupTemplateDesc = 'Invariant Cloud Formation Policy Group Template'
            policyGroupName = 'Invariant Cloud Formation Policy Group' + utils.getUniqueString()
            policyGroupDesc = 'Invariant Cloud Formation Policy Group'
            login.login(this.testdata)
        })
    })

    it('Cloud Formation Invariant Policy Group', function () {

        cy.log('Step1: Create Attrkibute Tag')
        attributeTags.createAttributeTag(attributeTag, attributeTagDescription)
        utils.assertSucessMsg('Attribute Tag Created Successfully')

        cy.log('Step2: Create Policy Group Template')
        policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplateDesc, 'Custom policy for CloudFormation Templates')
        utils.assertSucessMsg('Policy Group Template Created Successfully')

        cy.log('Step3: Create Draft Policy Group')
        policyGroup.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'DRAFT', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '', '', '', '', 'AWS::ACMPCA::Certificate', 'AWS::ACMPCA::Certificate/ApiPassthrough/Extensions/CertificatePolicies/CertPolicyId', 'Equal ==', '222')
        utils.assertSucessMsg('Policy Group Created Successfully')

        cy.log('Step4: Edit Policy Group Name')
        policyGroup.editPolicyGroup(policyGroupName)
        utils.assertSucessMsg('Policy Group Updated Successfully')

        cy.log('Step5: Delete Draft Policy Group')
        policyGroup.deletePolicyGroup(policyGroupName)
        utils.assertSucessMsg('Policy Group Deleted Successfully')

        cy.log('Step6: Create Published Policy Group')
        policyGroup.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '', '', '', '', 'AWS::ACMPCA::Certificate', 'AWS::ACMPCA::Certificate/ApiPassthrough/Extensions/CertificatePolicies/CertPolicyId', 'Equal ==', '222')
        utils.assertSucessMsg('Policy Group Created Successfully')

        cy.reload(true)
        cy.log('Step7: Delete Published Policy Group')
        policyGroup.deletePolicyGroup(policyGroupName)
        utils.assertSucessMsg('Policy Group Deleted Successfully')

        cy.log('Step8: Delete Policy Group Template')
        policyGroupTemplate.deletePolicyGroupTemplate(policyGroupTemplateName)
        utils.assertSucessMsg('Policy Group Template Deleted Successfully')

        cy.log('Step9: Delete Policy Group Template')
        attributeTags.deleteAttributeTag(attributeTag)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')
    })
})