import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Logical Deployment', function () {
        let attribute
        let atttibuteTagDesc
        let assetName
        let assetDescription
        let deploymentName
        let stackName
        let attributeTagName1
        let attributeTagDesc1
        let version
        let attributeTag

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attribute = this.testdata.attributeTagName + utils.getUniqueString()
                atttibuteTagDesc = this.testdata.attributeTagDesc
                attributeTagName1 = this.testdata.deploymentAttributeTagName + utils.getUniqueString()
                attributeTagDesc1 = this.testdata.deploymentAttributeTagDescription
                assetName = this.testdata.awsModelName + utils.getUniqueString()
                assetDescription = this.testdata.awsModelDesc
                deploymentName = this.testdata.deploymentName + utils.getUniqueString()
                stackName = this.testdata.stackName + utils.getUniqueString()
                version = this.testdata.version
                attributeTag = [attribute];
                cy.login(this.testdata)
            })

        })

        it('Logical Deployment', function () {

            cy.log('Step 1: Create Attribute Tag')
            cy.createAttributeTag(attribute, atttibuteTagDesc, this.testdata)

            cy.log('Step 2:Create another Attribute Tag')
            cy.createAttributeTag(attributeTagName1, attributeTagDesc1)

            cy.log('Step 3:Create Enclave Model')
            cy.createEnclaveModel('PUBLISHED', assetName, assetDescription, 'E2E Admin', attributeTag, 'cloudProviderAws', 'ec2template.json')

            cy.log('Step 4:Logical Deployment')
            cy.createLogicalDeployment('AWS', assetName, deploymentName, stackName, 'E2E Admin', 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456')

            cy.log('Step 5: Update New Enclave Model')
            cy.editAttributeTagForModel(assetName, attributeTagName1)

            cy.log('Step 6: Update Logical Deployment')
            cy.updateLogicalDeployment(deploymentName, assetName, version)

            cy.log('Step 7: Delete Logical Deployment')
            cy.deleteLogicalDeployment(deploymentName)

            cy.log('Step 8: Delete Buildtime Inventory')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 9: Delete Buildtime Inventory')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 10: Delete Attribute Tag')
            cy.deleteAttributeTag(attribute)

            cy.log('Step 11: Delete Attribute Tag')
            cy.deleteAttributeTag(attributeTagName1)
        })
    })
})