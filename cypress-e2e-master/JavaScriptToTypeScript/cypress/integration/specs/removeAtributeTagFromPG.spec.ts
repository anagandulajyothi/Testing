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

describe('Remove AttributeTag From PolicyGroup', function () {
    let attributeTagName = 'E2E Attribute Tag' + utils.getUniqueString()
    let attributeTagDesc = 'E2E Attribute Tag';
    let attributeTagName1 = 'E2E Attribute Tag' + utils.getUniqueString()
    let attributeTagDesc1 = 'E2E Attribute Tag';
    let assetName = 'AWS Enclave Model For Violation' + utils.getUniqueString()
    let description = 'AWS Enclave Model For Violation';
    let attitibuteTag = [attributeTagName1];
    let modelId
    let policyGroupTemplateName = 'AWS Products Policy Group Template For Violation' + utils.getUniqueString()
    let policyGroupTemplatedesc = 'AWS Products Policy Group Template For Violation';
    let policyGroupName = 'Policy Group For Violation' + utils.getUniqueString()
    let policyGroupDesc = 'Policy Group For Violation';
    let baseSurface
    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            baseSurface = this.testdata.surfaceName1
            login.login(this.testdata)
        })
    })

    it('Remove AttributeTag From PolicyGroup', function () {

        cy.log('Step 1: Create First Attribute Tag')
        attributeTags.createAttributeTag(attributeTagName, attributeTagDesc)

        cy.log('Step 2: Create Second Attribute Tag')
        attributeTags.createAttributeTag(attributeTagName1, attributeTagDesc1)

        cy.log('Step 3: Create Enclave Model With EC2 Template and Second Attribute Tag')
        assetsManager.createEnclaveModel('PUBLISHED', assetName, description, 'E2E Admin', attitibuteTag, 'cloudProviderAws', 'concourseInfra.json')
        utils.assertSucessMsg('Buildtime Asset Created Successfully')
        cy.wait(10000)
        cy.url().then(myid => {
            cy.log("Url Is:" + myid)
            modelId = myid.split('/')[5]
            const id = modelId.split('?')[0]
            cy.wrap(id).as('id')
        })

        cy.log('Step 4: Creating Policy Group Template with  Published')
        policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks')
        utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

        cy.log('Step 5: Creating Policy Group with S3 and First Attribute Tag')
        policyGroup.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::S3', '',
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
        cy.wait(10000)
        cy.reload(true)

        cy.log('step 6: Verify Violation')
        cy.get('@id').then(modelId => {
            cy.log("ModelId Is", +  modelId)
            violation.verifyViolation(baseSurface, modelId)
            violation.checkViolationNotHappened(modelId)
        })

        cy.log('Step 7: Add Second Attribute Tag For Policy Group')
        policyGroup.addAttributeTagForPG(policyGroupName, attributeTagName1)
        cy.wait(30000)
        cy.reload(true)

        cy.log('Step 8: Verify Violation After Adding Second Attribute Tag For Policy Group')
        cy.get('@id').then(modelId => {
            cy.log("ModelId Is", +  modelId)
            violation.verifyViolation(baseSurface, modelId)
            violation.checkViolationHappened(modelId)
        })

        cy.log('Step 9: Remove First Attribute Tag From Policy Group ')
        policyGroup.removeAttributeTagForPG(policyGroupName, attributeTagName)
        cy.wait(30000)
        cy.reload(true)

        cy.log('Step 10: Verify Violation Still Exists After Removing First Attribute Tag From Policy Group')
        cy.get('@id').then(modelId => {
            cy.log("ModelId Is", +  modelId)
            violation.verifyViolation(baseSurface, modelId)
            violation.checkViolationHappened(modelId)
        })

        cy.log('Step 11: CleanUp - Delete Policy Group')
        policyGroup.deletePolicyGroup(policyGroupName)

        cy.log('Step 12: CleanUp - Delete Policy Group Template')
        policyGroupTemplate.deletePolicyGroupTemplate(policyGroupTemplateName)

        cy.log('Step 13: CleanUp - Delete Enclave Model')
        assetsManager.deleteEnclaveModel(assetName)

        cy.log('Step 14: CleanUp - Delete First Attribute Tag ')
        attributeTags.deleteAttributeTag(attributeTagName)

        cy.log('Step 15: CleanUp - Delete Second Attribute Tag')
        attributeTags.deleteAttributeTag(attributeTagName1)
    })
})