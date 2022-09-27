import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Control Catlogs', function () {
        let catalogName = 'E2E Catalog' + utils.getUniqueString()
        let catalogDesc = 'Description For E2E Catalog';
        let controlName = 'Access Agreements';
        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                cy.login(this.testdata)
            })
        })

        it('Control Catlogs', function () {

            cy.log('Step 1:Creatge Catalog')
            cy.createCatalog(catalogName, catalogDesc, 'E2E Admin')

            cy.log('Step 2: Assign Control Catalog')
            cy.assignControlToCatalog(catalogName, controlName)

            cy.log('Step 3: Remove Updated Control Catalog')
            cy.RemoveControlFromCatalog(catalogName, controlName)

            cy.log('Step 4 Publish catlog')
            cy.PublishCatlog(catalogName)

            cy.log('Step 5:Delete Catalog')
            cy.deleteCatalog(catalogName)
        })
    })
})