import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Create Supression With Same Name', function () {
        let allowedKinesisAttributeTag = 'Allowed Kinesis Only' + utils.getUniqueString()
        let description = 'Allowed Kinesis Only'
        let allowedAWSProductsSupression = 'Allowed AWS Products in Stacks ' + utils.getUniqueString()

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                cy.login(this.testdata)
            })
        })

        it('Create Supression With Same Name', function () {

            cy.log('Step 1: Create Allowed Kinesis Only Attribute Tag')
            cy.createAttributeTag(allowedKinesisAttributeTag, description)

            cy.log('Step 2: Create Supression')
            cy.createSupression(allowedAWSProductsSupression, allowedAWSProductsSupression, 'E2E Admin', 'DRAFT', allowedKinesisAttributeTag, 'Allowed AWS Products in Stacks', 'Wildcard')

            cy.log('Step 3: Create Supression With Same Name')
            cy.createSupressionwithSameName(allowedAWSProductsSupression, allowedAWSProductsSupression, 'E2E Admin', 'DRAFT', allowedKinesisAttributeTag, 'Allowed AWS Products in Stacks', 'Wildcard')
            utils.assertSuppressionMsg('Name is already taken.')
            cy.wait(1000)
            cy.reload(true)

            cy.log('Step 4: Publish Supression With Out Increment By')
            cy.editSuppression(allowedAWSProductsSupression, allowedAWSProductsSupression, 'E2E Admin', 'PUBLISHED', allowedKinesisAttributeTag)
            utils.assertToastPublishMsg('Error ?increment must be set to MAJOR or MINOR when publishing a versioned entity.')
            cy.wait(1000)
            cy.reload(true)

            cy.log('Step 5: Delete Allowed AWS ProductsSupression')
            cy.deleteSupression(allowedAWSProductsSupression)

            cy.log('Step 6: Delete Allowed Kinesis AttributeTag')
            cy.deleteAttributeTag(allowedKinesisAttributeTag)
        })
    })
})