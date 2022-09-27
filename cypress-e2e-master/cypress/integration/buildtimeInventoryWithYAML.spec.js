import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from './utils/utils.js'

TestFilters([], function () {
    describe('Buildtime Inventory With YAML', function () {
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

        it('Buildtime Inventory With YAML', function () {
            cy.log('Step1: Create Attribute Tag')
            cy.createAttributeTag(attribute, attributeTagDescription)
            utils.assertSucessMsg('Attribute Tag Created Successfully')

            cy.log('Step2: Create Draft Yaml Enclave Model')
            cy.createEnclaveModel('DRAFT', modelName, modelDescription, 'E2E Admin', attributeTag, 'cloudProviderAws', 'rds.yaml')

            cy.log('Step3: Publish Draft Yaml Enclave Model')
            cy.publishYamlEnclaveModel(modelName)
            utils.assertSucessMsg('Buildtime Asset Updated Successfully')

            cy.log('Step4: Delete Draft Yaml Enclave Model')
            cy.deleteEnclaveModel(modelName)
            utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

            cy.log('Step5: Create Enclave Model With Json')
            cy.createEnclaveModel('PUBLISHED', modelName, modelDescription, 'E2E Admin', attributeTag, 'cloudProviderAws', 'concourseInfra.json')

            cy.log('Step6: Update Enclave Model With Yaml')
            cy.updateEnclaveModelWithYaml(modelName, 'rds.yaml')
            utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

            cy.log('Step7: Delete Updated Enclave Model With Json')
            cy.deleteEnclaveModel(modelName)
            utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

            cy.log('Step8: Delete Updated Enclave Model With Yaml')
            cy.deleteEnclaveModel(modelName)
            utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

            cy.log('Step9: Delete Attribute Tag')
            cy.deleteAttributeTag(attribute)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })
})