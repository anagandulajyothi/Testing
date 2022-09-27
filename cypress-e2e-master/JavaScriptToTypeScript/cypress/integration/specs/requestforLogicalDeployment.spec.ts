import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'
import { Approvals } from '../../pageObjects/approvals.page'
import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
import { policyGroupPage } from '../../pageObjects/policyGroup.page'
import { logicalDeploymentPage } from '../../pageObjects/logicalDeployment.page'

const login = new loginPage()
const attributeTags = new attributeTagPage()
const assetsManager = new assetsManagerPage()
const approvals = new Approvals()
const policyGroupTemplate = new policyGroupTemplatePage()
const policyGroup = new policyGroupPage()
const logicalDeployment = new logicalDeploymentPage()

let attributeTagName
let description
let policyGroupTemplateName
let policyGroupTemplatedesc
let policyGroupName
let policyGroupDesc
let assetName
let EnclaveDesc
let logicalDeploymentName
let stackName
let attributeTag

describe('Request For Logical Deployment', function () {

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
            logicalDeploymentName = this.testdata.deploymentName + utils.getUniqueString()
            stackName = this.testdata.stackName + utils.getUniqueString()
            attributeTag = [attributeTagName];
            login.login(this.testdata)
        })
    })

    it('Request For Logical Deployment', function () {

        cy.log('Step 1: Creating Attribute Tag')
        attributeTags.createAttributeTag(attributeTagName, description)

        cy.log('Step 2: Creating Policy Group Template with  Published')
        policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Require Approval of Institutional Entities')
        utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

        cy.log('Step 3: Creating Policy Group')
        policyGroup.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remediation', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', ' ', 'Default Surface - Root Surface Layer', 'Deployment', 'E2E Admin', '',
        '', '', '', '','', '', '', '', '', '', '', '', '', '', '', '', '', '','', '', '')
        cy.reload(true)
        cy.wait(15000)
        cy.reload(true)

        cy.log('Step 4: Approve Publish Request')
        approvals.approveRequest(policyGroupName)
        cy.wait(25000)
        cy.reload(true)


        cy.log('Step 5: Create New Enclave Model')
        assetsManager.createEnclaveModel('PUBLISHED', assetName, EnclaveDesc, 'E2E Admin', attributeTag, 'cloudProviderAws', 'ec2template.json')

        cy.log('Step 6: Logical Deployement')
        logicalDeployment.createLogicalDeployment('AWS', assetName, logicalDeploymentName, stackName, 'E2E Admin', 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456')
        cy.wait(10000)
        cy.reload(true)

        cy.log('Step 7: Approve Publish Request')
        approvals.approveRequest(logicalDeploymentName)
        cy.wait(25000)
        cy.reload(true)


        cy.log('Step 8: Delete Logical Deployment')
        logicalDeployment.deleteLogicalDeployment(logicalDeploymentName)
        cy.wait(15000)

        cy.log('Step 9: Approve Delete Action')
        approvals.approveRequest(logicalDeploymentName)
        cy.wait(20000)
        cy.reload(true)

        cy.log('Step 10: Delete Buildtime Inventory')
        assetsManager.deleteEnclaveModel(assetName)

        cy.log('Step 11: Delete Policy Group')
        policyGroup.deletePolicyGroup(policyGroupName)
        cy.wait(25000)
        cy.reload(true)

        cy.log('Ste 12: Approve Delete Request For Policy Group')
        approvals.approveRequest(policyGroupName)
        cy.wait(30000)
        cy.reload(true)

        cy.log('Step 13: Delete Policy Group Template')
        policyGroupTemplate.deletePolicyGroupTemplate(policyGroupTemplateName)
        utils.assertSucessMsg('Policy Group Template Deleted Successfully')

        cy.log('Step 14: Delete Attribute Tag')
        attributeTags.deleteAttributeTag(attributeTagName)
        utils.assertSucessMsg('Attribute Tag Deleted')
    })
})