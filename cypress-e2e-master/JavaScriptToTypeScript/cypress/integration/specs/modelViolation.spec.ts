import { before } from 'mocha';
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
let attributeTagName1
let description
let awsPolicyGroupTemplateName
let awsPolicyGroupTemplateDesc
let policyGroupName
let policyGroupDesc
let policyGroupName1
let policyGroupDesc1
let assetName
let EnclaveDesc
let logicalDeploymentName
let stackName
let attributeTag
let modelId
let baseSurface

describe('Model Violation', function () {


    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attributeTagName = this.testdata.attributeTagName + utils.getUniqueString()
            attributeTagName1 = this.testdata.attributeTagName + utils.getUniqueString()
            description = this.testdata.attributeTagName
            awsPolicyGroupTemplateName = this.testdata.awsPolicyGroupTemplateName + utils.getUniqueString()
            awsPolicyGroupTemplateDesc = this.testdata.awsPolicyGroupTemplateDesc
            policyGroupName = 'E2E Policy Group' + utils.getUniqueString()
            policyGroupDesc = this.testdata.policyGroupDesc
            policyGroupName1 = 'E2E Policy Group' + utils.getUniqueString()
            policyGroupDesc1 = 'E2E Policy Group'
            assetName = this.testdata.awsModelName + utils.getUniqueString()
            EnclaveDesc = this.testdata.awsModelDesc
            logicalDeploymentName = this.testdata.deploymentName + utils.getUniqueString()
            stackName = this.testdata.stackName + utils.getUniqueString()
            baseSurface = this.testdata.surfaceName1
            login.login(this.testdata)
        })
    })

    it('Model Violation', function () {

        cy.log('Step 1: Creating Attribute Tag')
        attributeTags.createAttributeTag(attributeTagName, description)

        cy.log('Step 2: Creating Second Attribute Tag')
        attributeTags.createAttributeTag(attributeTagName1, description)

        cy.log('Step 3: Creating Policy Group Template with  Published')
        policyGroupName.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
        utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

        cy.log('Step 4: Creating Policy Group With S3')
        policyGroup.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::S3', '', '',
        '', '', '', '', '', '', '', '', '','','', '', '', '', '', '', '', '', '', '', '', '', '' )
        cy.wait(5000)

        cy.log('Step 5: Creating Policy Group With EC2')
        policyGroup.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName1, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName1, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::EC2', '', '',
        '', '', '', '', '', '', '', '', '','','', '', '', '', '', '', '', '', '', '', '', '', '')
        cy.wait(5000)

        cy.log('Step 6: Create New Enclave Model')
        attributeTag = [attributeTagName, attributeTagName1];
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
            cy.log('Step 7: Verify Risk')
            violation.verifyViolation(baseSurface, modelId)
            violation.checkViolationHappened(modelId)
        })

        cy.log('Step 8: Delete Buildtime Inventory')
        assetsManager.deleteEnclaveModel(assetName)
        cy.wait(10000)
        cy.reload(true)

        cy.get('@id').then(modelId => {
            cy.log('ModelId is :' + modelId)
            cy.log('Step 9: Re verifying Risk')
            violation.verifyViolation(baseSurface, modelId)
            violation.checkViolationNotHappened(modelId)
        })

        cy.log('Step 10: Delete Policy Group')
        policyGroup.deletePolicyGroup(policyGroupName)
        cy.wait(10000)
        cy.reload(true)

        cy.log('Step 11: Delete Policy Group')
        policyGroup.deletePolicyGroup(policyGroupName1)
        cy.wait(10000)
        cy.reload(true)

        cy.log('Step 12: Delete Policy Group Template')
        policyGroupTemplate.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
        utils.assertSucessMsg('Policy Group Template Deleted Successfully')

        cy.log('Step 13: Delete Attribute Tag')
        attributeTags.deleteAttributeTag(attributeTagName)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')

        cy.log('Step 14: Delete Attribute Tag1')
        attributeTags.deleteAttributeTag(attributeTagName1)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')
    })
})