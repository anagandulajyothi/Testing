import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from './utils/utils.js';

TestFilters([], function () {
    describe('Azure Subscriptions', function () {
        let azureAccountName
        let azureAccountDescription
        let azureSubscriptionName
        let azureSubscriptionId
        let selectOwningGroup
        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                azureAccountName = testdata.azureAccountName + utils.getUniqueString()
                azureAccountDescription = testdata.azureAccountDescription + utils.getUniqueString()
                azureSubscriptionName = testdata.azureSubscriptionName + utils.getUniqueString()
                azureSubscriptionId = "caf672d4-4336-499a-8a4a-" + utils.getRandomNumber()
                selectOwningGroup = testdata.selectOwningGroup
                cy.login(this.testdata)
            })
        })

        it('Azure Subscriptions', function () {
            cy.log('Step1: Create Azure Subscription')
            cy.createNewAzureAccount(azureAccountName, azureAccountDescription, azureSubscriptionName, azureSubscriptionId, 'E2E Admin')
            cy.reload(true)

            cy.log('Step2: Assign Azure Subscription To Surface')
            cy.assignAzureSubscriptionToSurface('E2E Surface', azureAccountName)

            cy.log('Step3: Remove Azure Subscription  From Surface')
            cy.removeAzureSubscriptionFromSurface('E2E Surface', azureAccountName)

            cy.log('Step4: Edit Azure Subscription')
            cy.editAzureAccount(azureAccountName, azureAccountDescription)
            
            cy.log('Step5: Delete Azure Subscription')
            cy.deleteAzureAccount()
        })
    })
})