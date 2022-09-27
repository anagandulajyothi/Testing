import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { surfacePage } from '../../pageObjects/surface.page';
import { awsAccountPage } from '../../pageObjects/awsAccount.page'

const surface = new surfacePage()
const login = new loginPage()
const awsAccount = new awsAccountPage()


let awsAccountName
let awsAccountDescription
let awsAccountId
let selectOwningGroup

describe('Aws Account', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            awsAccountName = testdata.awsAccountName + utils.getUniqueString()
            awsAccountDescription = testdata.awsAccountName + utils.getUniqueString()
            awsAccountId = utils.getRandomNumber()
            selectOwningGroup = testdata.selectOwningGroup
            login.login(this.testdata)
        })
    })

    it('Aws Account', function () {
        cy.log('Step1: Create Aws Account')
        awsAccount.createNewCloudAccount(awsAccountName, awsAccountDescription, awsAccountId, 'E2E Admin')
        cy.reload(true)

        cy.log('Step2: Assign Aws Account To Surface')
        surface.assignAWSAccountsToSurface('E2E Surface', awsAccountName)

        cy.log('Step3: Remove Aws Account From Surface')
        surface.removeAWSAccountsFromSurface('E2E Surface', awsAccountName)

        cy.log('Step4: Edit Aws Account')
        awsAccount.editAWSAccount(awsAccountName, awsAccountDescription)

        cy.log('Step5: Delete Aws Account')
        awsAccount.deleteAWSAccount()
    })
})