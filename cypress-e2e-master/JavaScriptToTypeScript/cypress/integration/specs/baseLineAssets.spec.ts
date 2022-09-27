import { loginPage } from '../../pageObjects/login.page';
import { baseLineAssetsPage } from '../../pageObjects/baseLineAssets.page';
import utils from '../specs/utils/utils';
const login = new loginPage()
const baseline = new baseLineAssetsPage()

let baselineAssetName
let description
let awsAccountName = '123456987456'
let awsRegion = 'us-east-1';
let awsProduct = 'cloudformation'
let awsResourceType = 'cloudformation/stack'
let awsTag = 'CostCenter'
let awsTagValue = 'frontend'
let baseLineAssetId;

describe('Base Line Assets', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            baselineAssetName = this.testdata.baselineAssetName + utils.getUniqueString()
            description = this.testdata.baselineAssetDesc
            login.login(this.testdata)
        })
    })

    it('Base Line Assets', function () {

        cy.log('Step 1: Create New BaseLine Asset')
        baseline.createBaseLine(baselineAssetName, description, 'E2E Admin')

        cy.log('Step 2: Edit AWS For BaseLine Asset')
        baseline.editAWS(baselineAssetName, awsAccountName, awsRegion, awsProduct, awsResourceType, awsTag, awsTagValue)
        cy.wait(2000)

        cy.log('Step 3: Verify Saved AWS Filters On Edit BaseLine Asset')
        baseline.verifySavedAwsFiltersOnEdit(baselineAssetName)
        utils.verifyAWSAccount(awsAccountName)
        utils.verifyAWSRegion(awsRegion)
        utils.verifyAWSProducts(awsProduct)
        utils.verifyAWSResourceType(awsResourceType)
        utils.verifyAWSResourceTag(awsTag)
        cy.wait(3000)
        cy.reload(true)

        cy.log('Step 4: Update and Publish the New BaseLine Asset')
        baseline.editBaseLineAsset(baselineAssetName, baselineAssetName, description, 'PUBLISHED')

        cy.log('Step 5: Delete BaseLine Asset')
        baseline.deleteBaseLine(baselineAssetName)

        cy.log('Step 6: Verify Base Line Deleted Or Not')
        baseline.verifyBaseLine(baselineAssetName)
    })
})
