import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
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
                cy.login(this.testdata)
            })
        })

        it('Remove AttributeTag From PolicyGroup', function () {

            cy.log('Step 1: Create First Attribute Tag')
            cy.createAttributeTag(attributeTagName, attributeTagDesc)

            cy.log('Step 2: Create Second Attribute Tag')
            cy.createAttributeTag(attributeTagName1, attributeTagDesc1)

            cy.log('Step 3: Create Enclave Model With EC2 Template and Second Attribute Tag')
            cy.createEnclaveModel('PUBLISHED', assetName, description, 'E2E Admin', attitibuteTag, 'cloudProviderAws', 'concourseInfra.json')
            utils.assertSucessMsg('Buildtime Asset Created Successfully')
            cy.wait(10000)
            cy.url().then(myid => {
                cy.log("Url Is:" + myid)
                modelId = myid.split('/')[5]
                const id = modelId.split('?')[0]
                cy.wrap(id).as('id')
            })

            cy.log('Step 4: Creating Policy Group Template with  Published')
            cy.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

            cy.log('Step 5: Creating Policy Group with S3 and First Attribute Tag')
            cy.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::S3')
            cy.wait(10000)
            cy.reload(true)

            cy.log('step 6: Verify Violation')
            cy.get('@id').then(modelId => {
                cy.log("ModelId Is", +  modelId)
                cy.verifyViolation(baseSurface, modelId)
                cy.checkViolationNotHappened(modelId)
            })

            cy.log('Step 7: Add Second Attribute Tag For Policy Group')
            cy.addAttributeTagForPG(policyGroupName, attributeTagName1)
            cy.wait(30000)
            cy.reload(true)

            cy.log('Step 8: Verify Violation After Adding Second Attribute Tag For Policy Group')
            cy.get('@id').then(modelId => {
                cy.log("ModelId Is", +  modelId)
                cy.verifyViolation(baseSurface, modelId)
                cy.checkViolationHappened(modelId)
            })

            cy.log('Step 9: Remove First Attribute Tag From Policy Group ')
            cy.removeAttributeTagForPG(policyGroupName, attributeTagName)
            cy.wait(30000)
            cy.reload(true)

            cy.log('Step 10: Verify Violation Still Exists After Removing First Attribute Tag From Policy Group')
            cy.get('@id').then(modelId => {
                cy.log("ModelId Is", +  modelId)
                cy.verifyViolation(baseSurface, modelId)
                cy.checkViolationHappened(modelId)
            })

            cy.log('Step 11: CleanUp - Delete Policy Group')
            cy.deletePolicyGroup(policyGroupName)

            cy.log('Step 12: CleanUp - Delete Policy Group Template')
            cy.deletePolicyGroupTemplate(policyGroupTemplateName)

            cy.log('Step 13: CleanUp - Delete Enclave Model')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 14: CleanUp - Delete First Attribute Tag ')
            cy.deleteAttributeTag(attributeTagName)

            cy.log('Step 15: CleanUp - Delete Second Attribute Tag')
            cy.deleteAttributeTag(attributeTagName1)
        })
    })
})