import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from './utils/utils.js'

TestFilters([], function () {
    describe('Buildtime Inventory', function () {
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

        it('Buildtime Inventory', function () {

            cy.log('Step1: Create Attribute Tag')
            cy.createAttributeTag(attribute, attributeTagDescription)
            utils.assertSucessMsg('Attribute Tag Created Successfully')

            cy.log('Step2: Create Enclave Model With Draft')
            cy.createEnclaveModel('DRAFT', modelName, modelDescription, 'E2E Admin', attributeTag, 'cloudProviderAws', 'concourseInfra.json')
            utils.assertSucessMsg('Buildtime Asset Created Successfully')

            cy.log('Step3: Edit Enclave Model With Draft')
            cy.editEnclaveModelName(modelName)
            utils.assertSucessMsg('Buildtime Asset Updated Successfully')

            cy.log('Step4: Delete Enclave Model With Draft')
            cy.deleteEnclaveModel(modelName)
            utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

            cy.log('Step5: Create Enclave Model With Publish')
            cy.createEnclaveModel('PUBLISHED', modelName, modelDescription, 'E2E Admin', attributeTag, 'cloudProviderAws', 'concourseInfra.json')
            utils.assertSucessMsg('Buildtime Asset Created Successfully')

            cy.log('Step6: Delete Enclave Model With Publish')
            cy.deleteEnclaveModel(modelName)
            utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

            cy.log('Step7: Delete Attribute Tag')
            cy.deleteAttributeTag(attribute)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })
})