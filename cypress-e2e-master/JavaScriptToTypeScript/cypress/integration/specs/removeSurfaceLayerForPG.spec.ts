import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
import { policyGroupPage } from '../../pageObjects/policyGroup.page';
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'
import { Violations } from '../../pageObjects/policyViolations.page'
import { logicalDeploymentPage } from '../../pageObjects/logicalDeployment.page'
import { Approvals } from '../../pageObjects/approvals.page'

const login = new loginPage()
const policyGroupTemplate = new policyGroupTemplatePage()
const policyGroup = new policyGroupPage()
const attributeTags = new attributeTagPage()
const assetsManager = new assetsManagerPage()
const violation = new Violations()
const logicalDeployment = new logicalDeploymentPage()
const approvals = new Approvals()

let attributeTagName
let attributeTagDesc
let attributeTagName1
let attributeTagDesc1
let assetName
let description
let deploymentName
let stackName
let id
let modelid
let policyGroupTemplateName
let policyGroupTemplatedesc
let policyGroupName, policyGroupDesc
let baseSurface

    describe('removeSurfaceLayerForPG', function () {

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTagName = this.testdata.violationAttributeTagName + utils.getUniqueString()
                attributeTagDesc = this.testdata.violationAttributeTagDescription
                attributeTagName1 = this.testdata.violationAttributeTagName + utils.getUniqueString()
                attributeTagDesc1 = this.testdata.violationAttributeTagDescription
                assetName = 'AWS ' + this.testdata.ec2ModelName + utils.getUniqueString()
                description = this.testdata.ec2ModelDescription
                deploymentName = this.testdata.deploymentName + utils.getUniqueString()
                stackName = this.testdata.stackName + utils.getUniqueString()
                policyGroupTemplateName = this.testdata.policyGroupTemplateNameWithAWSProducts + utils.getUniqueString()
                policyGroupTemplatedesc = this.testdata.policyGroupTemplateDescWithAWSProducts + utils.getUniqueString()
                policyGroupName = this.testdata.violationPolicyGroupName + utils.getUniqueString()
                policyGroupDesc = this.testdata.violationPolicyGroupDescription
                baseSurface = this.testdata.surfaceName1
                login.login(this.testdata)
            })
        })

        it('removeSurfaceLayerForPG', function () {

            cy.log('Step 1: Create Attribute Tag')
            attributeTags.createAttributeTag(attributeTagName, attributeTagDesc)

            cy.log('Step 2: Create Another Attribute Tag')
            attributeTags.createAttributeTag(attributeTagName1, attributeTagDesc1)

            cy.log('Step 3: Create New Enclave Model')
            assetsManager.createEnclaveModel('PUBLISHED', assetName, description, 'E2E Admin', [attributeTagName], 'cloudProviderAws', 'concourseInfra.json')
            utils.assertSucessMsg('Buildtime Asset Created Successfully')

            cy.url().then(url => {
                cy.log(url)
                const modelid = url.split('/')[5]
                cy.wrap(modelid).as('modelid')
            })
            cy.log(modelid)
            cy.get('@modelid').then(modelid => {
                cy.log('Modelid is one :' + modelid)

            })

            cy.log('Step 4: Create Logical Deployment')
            logicalDeployment.createLogicalDeployment('AWS', assetName, deploymentName, stackName, 'E2E Admin', 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456')
            cy.reload(true)

            cy.url().then(url => {
                cy.log(url)
                let LDID = url.split('/')[5]
                let LDID2 = LDID.split('?')[0]
                cy.wrap(LDID2).as('LDeploymentID')
            })

            cy.log('Step 6: Creating Policy Group Template with  Published')
            policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

            cy.log('Step 7: Creating Policy Group with  Published')
            policyGroup.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::AmazonMQ', 'Default Surface - Root Surface Layer',
            '', '', '', '', '', '','','','','', '', '', '','', '', '', '', '', '', '', '', '', '', '')
            utils.assertSucessMsg('Policy Group Created Successfully')
            cy.wait(10000)

            cy.log('Step 8: Approve Publish Request')
            approvals.approveRequest(policyGroupName)
            cy.wait(30000)
            cy.reload(true)

            cy.log('Step 9: Verify Risk')
            cy.log(modelid)
            cy.get('@modelid').then(modelid => {
                cy.log('Modelid is :' + modelid)
                violation.verifyViolation(baseSurface, modelid)
                violation.checkViolationHappened(modelid)
            })

            cy.log('Step 10: Remove Surface Layer From Policy Group ')
            policyGroup.removeSurfaceLayerForPG(policyGroupName)
            cy.wait(30000)
            cy.reload(true)

            cy.log('Step 11:  Re-Verify Risk')
            cy.log(modelid)

            cy.get('@modelid').then(modelid => {
                cy.log('Modelid is :' + modelid)
                violation.verifyViolation(baseSurface, modelid)
                violation.checkViolationNotHappened(modelid)
            })

            cy.log('Step 12: CleanUp')
            logicalDeployment.deleteLogicalDeployment(deploymentName)
            cy.wait(10000)

            cy.log('Step 13: CleanUp')
            assetsManager.deleteEnclaveModel(assetName)

            cy.log('Step 14: CleanUp')
            policyGroup.deletePolicyGroup(policyGroupName)

            cy.log('Step 15: CleanUp')
            policyGroupTemplate.deletePolicyGroupTemplate(policyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step 16: Delete Attribute Tag')
            attributeTags.deleteAttributeTag(attributeTagName)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })