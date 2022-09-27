import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Base Line Assets With Same Name', function () {
        let baselineAssetName
        let description
        let awsAccountName = '123456987456'
        let awsRegion = 'us-east-1';
        let awsProduct = 'cloudformation'
        let awsResourceType = 'cloudformation/stack'
        let awsTag = 'CostCenter'
        let awsTagValue = 'frontend'
        let baseLineAssetId;
        let newbaselineAssetName;

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                baselineAssetName = this.testdata.baselineAssetName + utils.getUniqueString()
                description = this.testdata.baselineAssetDesc
                cy.login(this.testdata)
            })
        })

        it('Base Line Assets With Same Name', function () {

            cy.log('Step 1: Create New BaseLine Asset')
            cy.createBaseLine(baselineAssetName, description, 'E2E Admin')
            utils.assertSucessMsg("Baseline Created Successfully")
            cy.reload(true)

            cy.log('Step 2: Create New BaseLine Asset with Same Name')
            cy.createBaseLine(baselineAssetName, description, 'E2E Admin')
            utils.assertSucessMsg('Name already exists: ' + baselineAssetName)
            cy.wait(1000)
            cy.reload(true)

            cy.log('Step 3: Try To Publish With Out Selecting Increment By')
            cy.editBaseLineAssetStatus(baselineAssetName, baselineAssetName, description, 'PUBLISHED')
            utils.assertSucessMsg('?increment must be set to MAJOR or MINOR when publishing a versioned entity.')
            cy.wait(1000)
            cy.reload(true)

            cy.log('Step 4: Delete BaseLine Asset')
            cy.deleteNegativeBaseLine(baselineAssetName)
            utils.assertSucessMsg("Baseline Deleted Successfully")
        })
    })
})