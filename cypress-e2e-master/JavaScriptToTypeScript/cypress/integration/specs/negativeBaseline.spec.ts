import { loginPage } from '../../pageObjects/login.page';
import { baseLineAssetsPage } from '../../pageObjects/baseLineAssets.page';
import utils from '../specs/utils/utils';
const login = new loginPage()
const baseline = new baseLineAssetsPage()

let baselineAssetName
let description


describe('Base Line Assets With Same Name', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            baselineAssetName = this.testdata.baselineAssetName + utils.getUniqueString()
            description = this.testdata.baselineAssetDesc
            login.login(this.testdata)
        })
    })

    it('Base Line Assets With Same Name', function () {

        cy.log('Step 1: Create New BaseLine Asset')
        baseline.createBaseLine(baselineAssetName, description, 'E2E Admin')
        utils.assertSucessMsg("Baseline Created Successfully")
        cy.reload(true)

        cy.log('Step 2: Create New BaseLine Asset with Same Name')
        baseline.createBaseLine(baselineAssetName, description, 'E2E Admin')
        utils.assertSucessMsg('Name already exists: ' + baselineAssetName)
        cy.wait(1000)
        cy.reload(true)

        cy.log('Step 3: Try To Publish With Out Selecting Increment By')
        baseline.editBaseLineAssetStatus(baselineAssetName, baselineAssetName, description, 'PUBLISHED')
        utils.assertSucessMsg('?increment must be set to MAJOR or MINOR when publishing a versioned entity.')
        cy.wait(1000)
        cy.reload(true)

        cy.log('Step 4: Delete BaseLine Asset')
        baseline.deleteNegativeBaseLine(baselineAssetName)
        utils.assertSucessMsg("Baseline Deleted Successfully")
    })
})