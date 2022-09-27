import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Azure Nested Template', function () {
        let attributeTagName
        let attributeTagdescription
        let assetName
        let description
        let NestedTemplate = ['nested-template-1.json']

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTagName = this.testdata.attributeName1 + utils.getUniqueString()
                attributeTagdescription = this.testdata.attributeDescription1
                assetName = this.testdata.azureEnclaveModelName + utils.getUniqueString()
                description = this.testdata.modelDescription
                cy.login(this.testdata)
            })
        })

        it('Azure Nested Template', function () {
            cy.log('Step 1: Create Attribute Tag')
            cy.createAttributeTag(attributeTagName, attributeTagdescription)

            cy.log('Step 2: Create New Enclave Model')
            cy.createNestedEnclaveModel('PUBLISHED', assetName, description, 'E2E Admin', attributeTagName, 'cloudProviderAws', 'root-template.json', NestedTemplate)

            cy.log('Step 3: Edit Enclave Model')
            cy.editEnclaveModelName(assetName)

            cy.log('Step 4: Delete Enclave Model')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 5: Verify Enclave Model Deleted Or Not')
            cy.verifyNestedEnclaveModel(assetName)

            cy.log('Step 6: Clean Up')
            cy.deleteAttributeTag(attributeTagName)
        })
    })
})