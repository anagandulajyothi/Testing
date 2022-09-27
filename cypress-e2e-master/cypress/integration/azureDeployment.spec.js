import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {

    describe('Azure Deployment', function () {
        let attributeTagName
        let attributeTagDescription
        let attributeTagName1
        let attributeTagDesc1
        let azureAssetName
        let azureAssetDesc
        let azureDeploymentName
        let stackName
        let attributeTag

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTagName = this.testdata.violationAttributeTagName + utils.getUniqueString()
                attributeTagDescription = this.testdata.violationAttributeTagDescription
                attributeTagDesc1 = this.testdata.violationAttributeDescription1
                azureAssetName = this.testdata.azureEnclaveModelName + utils.getUniqueString()
                azureAssetDesc = this.testdata.azureEnclaveModelDescription
                azureDeploymentName = this.testdata.azureDeploymentName + utils.getUniqueString()
                stackName = this.testdata.stackName + utils.getUniqueString()
                attributeTag = [attributeTagName];
                cy.login(this.testdata)
            })
        })

        it('Azure Deployment', function () {

            cy.log('Step 1: Create Attribute Tag')
            cy.createAttributeTag(attributeTagName, attributeTagDescription)

            cy.log('Step 2: Create Another Attribute Tag')
            attributeTagName1 = this.testdata.violationAttributeName1 + utils.getUniqueString()
            cy.createAttributeTag(attributeTagName1, attributeTagDesc1)

            cy.log('Step 3: Create Azure Enclave Model')
            cy.createEnclaveModel('PUBLISHED', azureAssetName, azureAssetDesc, 'E2E Admin', attributeTag, 'AZURE', 'azuredeploy.json')

            cy.log('Step 4: Azure Logical Deployement')
            cy.createLogicalDeployment('Azure', azureAssetName, azureDeploymentName, ' ', 'E2E Admin', ' ', 'Default Surface - Root Surface Layer', 'Azure Account')

            cy.log('Step 5: Update New Enclave Model')
            cy.editAttributeTagForModel(azureAssetName, attributeTagName1)

            cy.log('Step 6: Delete Azure Logical Deployment')
            cy.deleteLogicalDeployment(azureDeploymentName)

            cy.log('Step 7: Clean Up')
            cy.deleteEnclaveModel(azureAssetName)

            cy.log('Step 8: Clean Up')
            cy.deleteEnclaveModel(azureAssetName)

            cy.log('Step 9: Clean Up')
            cy.deleteAttributeTag(attributeTagName)

            cy.log('Step 10: Clean Up')
            cy.deleteAttributeTag(attributeTagName1)
        })
    })
})