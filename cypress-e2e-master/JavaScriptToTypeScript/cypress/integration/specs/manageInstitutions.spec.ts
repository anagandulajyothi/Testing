import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { manageInstutionsPage } from '../../pageObjects/manageInstitutions.page';
const login = new loginPage()
const createInstutionData = new manageInstutionsPage();

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


describe('Manage Instutions', function () {

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
            login.login(this.testdata)

        })
    })
    it('createDataForInstitution', function () {
        cy.log('Step 1: Create Public Keys  Data For Institution')
        createInstutionData.createDataForInstitution(publicKeys, publicKey, publicKeyValue)

        cy.log('Step 2: Create Network Whitelists Data For Institution')
        createInstutionData.createDataForInstitution(networkWhitelists, whiteListKey, whiteListValue)

        cy.log('Step 3: Update  Public Keys For Institution')
        createInstutionData.updateInstitutionDataAccount(publicKeys, updatedPublicKey, updatedPublicKeyValue)

        cy.log('Step 4: Update  Public Keys For Institution')
        createInstutionData.updateInstitutionDataAccount(networkWhitelists, updatedWhiteListKey, updatedWhiteListValue)

        cy.log('Step 5: Remove Data For WhiteList Account')
        createInstutionData.removeInstitutionData(networkWhitelists)

        cy.log('Step 6: Remove Data From Public Keys Account')
        createInstutionData.removeInstitutionData(publicKeys)

        cy.log('Step 7: Delete Data For WhiteList Account')
        createInstutionData.deleteInstitutionData(networkWhitelists)

        cy.log('Step 8: Delete Data From Public Keys Account')
        createInstutionData.deleteInstitutionData(publicKeys)
    })
})