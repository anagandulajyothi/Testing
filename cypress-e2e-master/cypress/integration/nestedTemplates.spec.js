import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Nested Template', function () {
        let attributeTagName
        let attributeTagdescription
        let assetName
        let description
        let NestedTemplate
        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTagName = this.testdata.attributeTagName + utils.getUniqueString()
                attributeTagdescription = this.testdata.attributeTagDesc
                assetName = this.testdata.awsModelName + utils.getUniqueString()
                description = this.testdata.awsModelDesc
                NestedTemplate = ['core.json', 'ec2.json', 'S3.json']
                cy.login(this.testdata)
            })
        })

        it('Nested Template', function () {

            cy.log('Step 1: Create Attribute Tag')
            cy.createAttributeTag(attributeTagName, attributeTagdescription)

            cy.log('Step 2: Create New Enclave Model With Nested Templates')
            cy.createNestedEnclaveModel('PUBLISHED', assetName, description, 'E2E Admin', attributeTagName, 'cloudProviderAws', 'Root.json', NestedTemplate)

            cy.log('Step 3: Edit Enclave Model')
            cy.editEnclaveModelName(assetName)

            cy.log('Step 4: Delete Enclave Model')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 6: Clean Up')
            cy.deleteAttributeTag(attributeTagName)
        })
    })
})