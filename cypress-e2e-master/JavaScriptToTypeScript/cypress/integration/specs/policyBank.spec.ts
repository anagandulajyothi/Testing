import { policyBankPage } from '../../pageObjects/policyBank.page';
import { policyGroupPage } from '../../pageObjects/policyGroup.page';
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';

const login = new loginPage()
const policyBank = new policyBankPage()
const attributeTags = new attributeTagPage()
const policyGroup = new policyGroupPage()

let attributeTag
let attributeTagDescription
let policyName
let policyDesc
let policyGroupName
let policyGroupDesc
let awsPolicyGroupTemplateName


describe('Deploy Policy As Policy Group', function () {

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
            login.login(this.testdata)
        })
    })


    it('Deploy Policy As Policy Group', function () {

        cy.log('Step1: Create Attribute Tag')
        attributeTags.createAttributeTag(attributeTag, attributeTagDescription)

        cy.log('Step 2:  Create Policy')
        policyBank.createPolicy('AWS CloudFormation', policyName, policyDesc, 'AWS::ACMPCA::Certificate', 'AWS::ACMPCA::Certificate/ApiPassthrough/Extensions/CertificatePolicies/CertPolicyId', 'Equal ==', '222', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'Remedition')

        cy.log('Step 3:  Publish Policy')
        policyBank.PublishPolicy(policyName)

        cy.log('Step 4:  Deploy As Policy Group')
        policyBank.DeployAsPolicyGroup(policyName, policyGroupName, policyGroupDesc, 'E2E Admin', attributeTag)

        cy.log('Step 5:  Verify Deployed Policy Group')
        policyBank.VerifyDeployedPolicyGroup(policyGroupName)

        cy.log('Step 6: Delete Deployed Policy Group')
        policyBank.deletePolicyGroup(policyGroupName)

        cy.log('Step 7: Delete Attribute Tag')
        attributeTags.deleteAttributeTag(attributeTag)

        cy.log('Step 8: Delete Policy')
        policyBank.deletePolicy(policyName)
    })
})