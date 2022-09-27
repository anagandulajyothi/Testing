import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Create Catlogs With Same Name', function () {
        let catalogName = 'E2E Catalog' + utils.getUniqueString()
        let catalogDesc = 'Description For E2E Catalog';
        let controlName = 'Access Agreements';
        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                cy.login(this.testdata)
            })
        })

        it('Create Catlogs With Same Name', function () {

            cy.log('Step 1:Create Catalog')
            cy.createCatalog(catalogName, catalogDesc, 'E2E Admin')
            cy.reload(true)

            cy.log('Step 2:Create Catalog With Same Name')
            cy.createCatalog(catalogName, catalogDesc, 'E2E Admin')
            utils.assertToastMsg('Name already exists: ' + catalogName)
            cy.reload(true)

            cy.log('Step 3:Try To Publish With Out Selecting Increment By')
            cy.EditCatlogwithPublish(catalogName, catalogDesc, 'E2E Admin')
            utils.assertToastPublishMsg('Error ?increment must be set to MAJOR or MINOR when publishing a versioned entity.')
            cy.reload(true)

            cy.log('Step 4:Delete Catalog')
            cy.deleteCatalog(catalogName)
        })

    })
})