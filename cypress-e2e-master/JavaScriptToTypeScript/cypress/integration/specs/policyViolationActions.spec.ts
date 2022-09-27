import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
import { policyGroupPage } from '../../pageObjects/policyGroup.page';
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'
import { Violations } from '../../pageObjects/policyViolations.page'

const login = new loginPage()
const policyGroupTemplate = new policyGroupTemplatePage()
const policyGroup = new policyGroupPage()
const attributeTags = new attributeTagPage()
const assetsManager = new assetsManagerPage()
const violation = new Violations()

let attributeTagName
let description
let awsPolicyGroupTemplateName
let awsPolicyGroupTemplateDesc
let policyGroupName
let policyGroupDesc
let assetName
let EnclaveDesc
let logicalDeploymentName
let stackName
let attributeTag
let modelId
let baseSurface


describe('Policy Violation Actions', function () {


    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attributeTagName = this.testdata.attributeTagName + utils.getUniqueString()
            description = this.testdata.attributeTagName
            awsPolicyGroupTemplateName = this.testdata.awsPolicyGroupTemplateName + utils.getUniqueString()
            awsPolicyGroupTemplateDesc = this.testdata.awsPolicyGroupTemplateDesc
            policyGroupName = 'E2E Policy Group' + utils.getUniqueString()
            policyGroupDesc = this.testdata.policyGroupDesc
            assetName = this.testdata.awsModelName + utils.getUniqueString()
            EnclaveDesc = this.testdata.awsModelDesc
            logicalDeploymentName = this.testdata.deploymentName + utils.getUniqueString()
            stackName = this.testdata.stackName + utils.getUniqueString()
            baseSurface = this.testdata.surfaceName1
            login.login(this.testdata)
        })
    })

    it('Policy Violation Actions', function () {

        cy.log('Step 1: Creating Attribute Tag')
        attributeTags.createAttributeTag(attributeTagName, description)

        cy.log('Step 3: Creating Policy Group Template with  Published')
        policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
        utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

        cy.log('Step 3: Creating Policy Group With S3')
        policyGroup.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::S3', '',
        '', '', '', '', '','', '', '', '', '', '', '', '','', '', '', '', '', '', '','', '','', '')

        cy.log('Step 4: Create New Enclave Model')
        attributeTag = [attributeTagName];
        assetsManager.createEnclaveModel('PUBLISHED', assetName, EnclaveDesc, 'E2E Admin', attributeTag, 'cloudProviderAws', 'concourse-infrastructure.json')
        cy.wait(30000)
        cy.reload(true)

        cy.url().then(myid => {
            cy.log("url is:" + myid)
            modelId = myid.split('/')[5]
            const id = modelId.split('?')[0]
            cy.wrap(id).as('id')
        })
        cy.get('@id').then(modelId => {
            cy.log('ModelId is :' + modelId)
            cy.log('Step 5: Verify Risk')
            violation.selectViolation(baseSurface, modelId)
            cy.xpath('//h3[contains(.,"Remediation")]').should('be.visible')
        })

        cy.log('Step 6: UnAssign User')
        violation.unAssignUserForViolation()

        cy.log('Step 7: Assign User')
        violation.assignUserForViolation('E2E Perf User')

        cy.log('Step 8: Assign Group')
        violation.assignGroupForViolation('E2E Admin')

        cy.log('Step 9: Comment Violation')
        violation.commentViolation()

        cy.log('Step 10: Resolve Violation')
        violation.resloveViolation()
        cy.wait(3000)
        cy.reload(true)

        cy.log('Step 11: Re-Open Violation')
        violation.reOpenViolation()

        cy.log('Step 12: Cancle Violation')
        violation.cancleViolation()

        cy.log('Step 13: Delete Buildtime Inventory')
        assetsManager.deleteEnclaveModel(assetName)
        cy.wait(10000)

        cy.log('Step 14: Delete Policy Group')
        policyGroup.deletePolicyGroup(policyGroupName)
        cy.wait(10000)
        cy.reload(true)

        cy.log('Step 15: Delete Policy Group Template')
        policyGroupTemplate.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
        utils.assertSucessMsg('Policy Group Template Deleted Successfully')

        cy.log('Step 16: Delete Attribute Tag')
        attributeTags.deleteAttributeTag(attributeTagName)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')
    })
})
