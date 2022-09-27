
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
import { policyGroupPage } from '../../pageObjects/policyGroup.page'
import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'
import { Approvals } from '../../pageObjects/approvals.page'
const login = new loginPage()
const attributeTags = new attributeTagPage()
const policyGroupTemplate = new policyGroupTemplatePage()
const policyGroup = new policyGroupPage()
const assetsManager = new assetsManagerPage()
const approvals = new Approvals()

describe('Request For Model', function () {
    let attributeTagName
    let description
    let policyGroupTemplateName
    let policyGroupTemplatedesc
    let policyGroupName
    let policyGroupDesc
    let assetName
    let EnclaveDesc
    let attributeTag

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attributeTagName = this.testdata.attributeName1 + utils.getUniqueString()
            description = this.testdata.attributeDescription1
            policyGroupTemplateName = this.testdata.requireApprovalPolicyGroupTemplateName + utils.getUniqueString()
            policyGroupTemplatedesc = this.testdata.requireApprovalPolicyGroupTemplateDesc
            policyGroupName = this.testdata.policyGroupName + utils.getUniqueString()
            policyGroupDesc = this.testdata.policyGroupDesc
            assetName = this.testdata.awsModelName + utils.getUniqueString()
            EnclaveDesc = this.testdata.awsModelDesc
            attributeTag = [attributeTagName];
            login.login(this.testdata)
        })
    })


    it('Request For Model', function () {

        cy.log('Step 1: Create Attribute Tag')
        attributeTags.createAttributeTag(attributeTagName, description)

        cy.log('Step 2: Creating Policy Group Template with  Published')
        policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Require Approval of Institutional Entities')
        utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

        cy.log('Step 3: Creating Policy Group')
        policyGroup.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remediation', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', ' ', 'Default Surface - Root Surface Layer', 'MODEL', 'E2E Admin',
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
        cy.wait(20000)
        cy.reload(true)

        cy.log('Step 4: Verify Approval Request For Publish')
        approvals.verifyApprovalRequest(policyGroupName)

        cy.log('Step 5: Approve Publish Request')
        approvals.approveRequest(policyGroupName)
        cy.wait(25000)
        cy.reload(true)


        cy.log('Step 6: Create New Enclave Model')
        assetsManager.createEnclaveModel('PUBLISHED', assetName, EnclaveDesc, 'E2E Admin', attributeTag, 'cloudProviderAws', 'ec2template.json')
        cy.wait(10000)


        cy.log('Step 7: Verify Approval Request For Publish')
        approvals.verifyApprovalRequest(assetName)

        cy.log('Step 8: Approve Publish Request')
        approvals.approveRequest(assetName)
        cy.wait(20000)
        cy.reload(true)


        cy.log('Step 9: Delete Enclave Model')
        assetsManager.deleteEnclaveModel(assetName)
        cy.wait(20000)
        cy.reload(true)

        cy.log('Step 10: Verify Approval Request For Delete')
        approvals.verifyApprovalRequest(assetName)

        cy.log('Step 11: Approve Delete Action')
        approvals.approveRequest(assetName)
        cy.wait(10000)

        cy.log('Step 12: Verify Enclave Model Deleted Or Not')
        assetsManager.verifyNestedEnclaveModel(assetName)

        cy.log('Step 13: Approval Request For Delete')
        policyGroup.deletePolicyGroup(policyGroupName)
        cy.wait(20000)
        cy.reload(true)

        cy.log('Step 14: Approve Delete Action')
        approvals.approveRequest(policyGroupName)
        cy.wait(30000)
        cy.reload(true)

        cy.log('Step 15: CleanUp')
        cy.reload(true)
        policyGroupTemplate.deletePolicyGroupTemplate(policyGroupTemplateName)

        cy.log('Step 16: CleanUp')
        attributeTags.deleteAttributeTag(attributeTagName)
    })
})