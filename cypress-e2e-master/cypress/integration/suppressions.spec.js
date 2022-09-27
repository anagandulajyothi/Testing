import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Supression Policy Template', function () {
        let allowedKinesisAttributeTag = 'Allowed Kinesis Only' + utils.getUniqueString()
        let description = 'Allowed Kinesis Only'
        let encryptSupression = 'Encrypt Stateful Data in Stacks SUpression ' + utils.getUniqueString();
        let restrictSupression = 'Restrict Internet Ingress in Stacks Supression ' + utils.getUniqueString()
        let allowedAWSProductsSupression = 'Allowed AWS Products in Stacks ' + utils.getUniqueString()
        let allowedAWSRegionsSupression = 'Allowed AWS Regions in Accounts ' + utils.getUniqueString()
        //AWS::KinesisFirehose
        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                cy.login(this.testdata)
            })
        })

        it('SupressionpolicyTemplate', function () {

            cy.log('Step 1: Create Allowed Kinesis Only Attribute Tag')
            cy.createAttributeTag(allowedKinesisAttributeTag, description)

            cy.log('Step 2: Create Encryption Supression With Supressed')
            cy.createSupression(encryptSupression, encryptSupression, 'E2E Admin', 'PUBLISHED', allowedKinesisAttributeTag, 'Encrypt Stateful Data in Stacks', '', '')

            cy.log('Step 3: Create Restrict Supression With Supressed')
            cy.createSupression(restrictSupression, restrictSupression, 'E2E Admin', 'PUBLISHED', allowedKinesisAttributeTag, 'Restrict Internet Ingress in Stacks')

            cy.log('Step 4: Create Allowed AWS Products Supression With Supressed')
            cy.createSupression(allowedAWSProductsSupression, allowedAWSProductsSupression, 'E2E Admin', 'PUBLISHED', allowedKinesisAttributeTag, 'Allowed AWS Products in Stacks', 'Wildcard')

            cy.log('Step 5: Create Allowed AWS Regions Supression With Supressed')
            cy.createSupression(allowedAWSRegionsSupression, allowedAWSRegionsSupression, 'E2E Admin', 'PUBLISHED', allowedKinesisAttributeTag, 'Allowed AWS Regions in Accounts', 'Wildcard')

            cy.log('Step 6: Delete Allowed AWS Regions Supression')
            cy.deleteSupression(allowedAWSRegionsSupression)

            cy.log('Step 7: Delete Restrict Supression')
            cy.deleteSupression(restrictSupression)

            cy.log('Step 8: Delete Allowed AWS ProductsSupression')
            cy.deleteSupression(allowedAWSProductsSupression)

            cy.log('Step 9: Delete Encrypt Supression')
            cy.deleteSupression(encryptSupression)

            cy.log('Step 10: Delete Allowed Kinesis AttributeTag')
            cy.deleteAttributeTag(allowedKinesisAttributeTag)
        })
    })
})