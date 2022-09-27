import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js'
TestFilters([], function () {
    describe('Manage Instutions', function () {

        let networkWhitelists
        let publicKeys
        let whiteListKey
        let whiteListValue
        let publicKey
        let publicKeyValue
        let updatedWhiteListKey
        let updatedWhiteListValue
        let updatedPublicKey
        let updatedPublicKeyValue


        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                networkWhitelists = 'Network Whitelists';
                publicKeys = 'Public Keys';
                whiteListKey = '10.10.10.10';
                whiteListValue = '10.10.10.10';
                publicKey = 'Key - ' + utils.getRandomNumber();
                publicKeyValue = utils.getRandomNumber();
                updatedWhiteListKey = '11.11.11.11';
                updatedWhiteListValue = '11.11.11.11';
                updatedPublicKey = 'Key - ' + utils.getRandomNumber();
                updatedPublicKeyValue = utils.getRandomNumber();
                cy.login(this.testdata)

            })
        })
        it('createDataForInstitution', function () {
            cy.log('Step 1: Create Public Keys  Data For Institution')
            cy.createDataForInstitution(publicKeys, publicKey, publicKeyValue)

            cy.log('Step 2: Create Network Whitelists Data For Institution')
            cy.createDataForInstitution(networkWhitelists, whiteListKey, whiteListValue)

            cy.log('Step 3: Update  Public Keys For Institution')
            cy.updateInstitutionDataAccount(publicKeys, updatedPublicKey, updatedPublicKeyValue)

            cy.log('Step 4: Update  Public Keys For Institution')
            cy.updateInstitutionDataAccount(networkWhitelists, updatedWhiteListKey, updatedWhiteListValue)

            cy.log('Step 5: Remove Data For WhiteList Account')
            cy.removeInstitutionData(networkWhitelists)

            cy.log('Step 6: Remove Data From Public Keys Account')
            cy.removeInstitutionData(publicKeys)

            cy.log('Step 7: Delete Data For WhiteList Account')
            cy.deleteInstitutionData(networkWhitelists)

            cy.log('Step 8: Delete Data From Public Keys Account')
            cy.deleteInstitutionData(publicKeys)
        })
    })
})