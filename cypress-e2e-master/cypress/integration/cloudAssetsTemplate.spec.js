import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from './utils/utils.js'

TestFilters([], function () {
    describe('Cloud Assests Template', function () {
        let attributeTagName
        let description
        let assetName
        let EnclaveDesc
        let NestedTemplate = ['core.json', 'ec2.json', 'S3.json']
        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTagName = this.testdata.attributeName1 + utils.getUniqueString()
                description = this.testdata.attributeDescription1
                assetName = this.testdata.awsModelName + utils.getUniqueString()
                EnclaveDesc = this.testdata.awsModelDesc
                cy.login(this.testdata)
            })
        })

        it('Cloud Assests Template', function () {

            cy.log('Step 1: Create Attribute Tag')
            cy.createAttributeTag(attributeTagName, description)

            cy.log('Step 2: Create New Enclave Model')
            cy.createNestedEnclaveModel('PUBLISHED', assetName, EnclaveDesc, 'E2E Admin', attributeTagName, 'cloudProviderAws', 'Root.json', NestedTemplate)

            cy.log('Step 3: Edit Enclave Model')
            cy.editEnclaveModelName(assetName)

            cy.log('Step 4: Delete Enclave Model')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 5: Verify Enclave Model Deleted Or Not')
            cy.verifyNestedEnclaveModel(assetName)

            cy.log('Step 6: Delete Attribute Tag')
            cy.deleteAttributeTag(attributeTagName)
            utils.assertSucessMsg('Attribute Tag Deleted')
        })
    })
})