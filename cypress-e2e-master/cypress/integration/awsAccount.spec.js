import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js';

TestFilters([], function () {
    describe('Aws Account', function () {
        let awsAccountName
        let awsAccountDescription
        let awsAccountId
        let selectOwningGroup
        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                awsAccountName = testdata.awsAccountName + utils.getUniqueString()
                awsAccountDescription = testdata.awsAccountName + utils.getUniqueString()
                awsAccountId = utils.getRandomNumber()
                selectOwningGroup = testdata.selectOwningGroup
                cy.login(this.testdata)
            })
        })

        it('Aws Account', function () {
            cy.log('Step1: Create Aws Account')
            cy.createNewCloudAccount(awsAccountName, awsAccountDescription, awsAccountId, 'E2E Admin')
            cy.reload(true)

            cy.log('Step2: Assign Aws Account To Surface')
            cy.assignAWSAccountsToSurface('E2E Surface', awsAccountName)

            cy.log('Step3: Remove Aws Account From Surface')
            cy.removeAWSAccountsFromSurface('E2E Surface', awsAccountName)

            cy.log('Step4: Edit Aws Account')
            cy.editAWSAccount(awsAccountName, awsAccountDescription)

            cy.log('Step5: Delete Aws Account')
            cy.deleteAWSAccount()
        })
    })
})