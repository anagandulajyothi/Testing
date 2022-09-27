import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from './utils/utils.js'

TestFilters([], function () {
    describe('Buildtime Inventory With Same Name', function () {
        let attribute
        let attributeTagDescription
        let modelName
        let modelDescription
        let attributeTag
        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attribute = this.testdata.attributeTagName + utils.getUniqueString()
                attributeTagDescription = this.testdata.attributeTagDesc
                modelName = this.testdata.awsModelName + utils.getUniqueString()
                modelDescription = this.testdata.awsModelDesc
                attributeTag = [attribute];
                cy.login(this.testdata)
            })
        })

        it('Buildtime Inventory With Same Name', function () {
            cy.log('Step1: Create Attribute Tag')
            cy.createAttributeTag(attribute, attributeTagDescription)

            cy.log('Step2: Create Enclave Model')
            cy.createEnclaveModel('PUBLISHED', modelName, modelDescription, 'E2E Admin', attributeTag, 'cloudProviderAws', 'concourseInfra.json')
            utils.assertSucessMsg('Buildtime Asset Created Successfully')

            cy.log('Step3: Create Enclave Model With Same Name')
            cy.createEnclaveModel('PUBLISHED', modelName, modelDescription, 'E2E Admin', attributeTag, 'cloudProviderAws', 'concourseInfra.json')
            utils.assertToastMsg('Name already exists: ' + modelName)
            cy.reload(true)

            cy.log('Step4: Delete Enclave Model')
            cy.deleteEnclaveModel(modelName)
            utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

            cy.log('Step5: Delete Attribute Tag')
            cy.deleteAttributeTag(attribute)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })
})