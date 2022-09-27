import { before } from "mocha"
import TestFilters from "../support/filterTests"


TestFilters([], function () {
    describe('Control Catlogs Dash Board Count', function () {
        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                cy.login(this.testdata)
            })
        })

        it('Verify Control Catlogs Count on Dash Board and Filter', function () {
            cy.log('Step 1:Verify Global Catalogs Count')
            cy.globalCatalogsCountOnDashBoard()
            cy.globalCatalogsCountOnFilter()

            cy.log('Step 2:Verify Client Catalogs Count')
            cy.clientCatalogsCountOnDashBoard()
            cy.clientCatalogsCountOnFilter()

            cy.log('Step 3:Verify Global Controls Count')
            cy.globalControlsCountOnDashBoard()
            cy.globalControlsCountOnFilter()

            cy.log('Step 3:Verify Client Controls Count')
            cy.clientControlsCountOnDashBoard()
            cy.clientControlsCountOnFilter()
        })
    })
})

