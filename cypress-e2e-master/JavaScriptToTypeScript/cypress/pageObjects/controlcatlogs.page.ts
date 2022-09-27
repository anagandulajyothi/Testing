export class controlcatlogsPage {

    clickcontrolcatlogMenu() {
        return cy.get('.nav-link[data-e2e="ControlCatalogMenu"]')
    }

    clickControlMenu() {
        return cy.get('a[routerlink="control-catalogs"]')
    }

    createNewControlCatlog() {
        return cy.get('[data-e2e="newControlCatalogButton"]')
    }

    controlname() {
        return cy.get('input[placeholder="Name"]')

    }
    controldesc() {
        return cy.get('textarea[placeholder="Description"]')
    }

    OwningGroupDropDown() {
        return cy.get('[data-e2e="selectOwningGroup"]')
    }
    OwningGroupValue(value) {
        return cy.xpath('//span[contains(., "' + value + '")]')
    }

    createCatlogButton() {
        return cy.xpath('//button[normalize-space()="Create Control Catalog"]')
    }

    search() {
        return cy.xpath('(//input[@placeholder="Search"])[1]')
    }

    selectSearchData(data) {
        return cy.xpath('//h5[contains(., "' + data + '")]')
    }

    controlsBtn() {
        return cy.get(`[panel='controls']`)
    }

    editcontrols() {
        return cy.get('.btn-sm.btn-outline-primary')
    }

    searchcontrol() {
        return cy.xpath(`//input[@class='p-listbox-filter p-inputtext p-component']`)
    }

    selectSearchcontrol() {
        return cy.get('[aria-label="Access Agreements"]')
    }

    Savecontrols() {
        return cy.xpath('//span[contains(text(),"Save Controls")]')
    }

    EditBtn() {
        return cy.get('[data-e2e="editControlCatalogButton"]')
    }

    publish() {
        return cy.xpath('//input[@id="published"]')
    }

    Minor() {
        return cy.get('#minor')
    }

    SubmitBtn() {
        return cy.xpath('(//button[normalize-space()="Submit"])[1]')
    }

    deleteDropDownButton() {
        return cy.get('.pos-rel > .btn > .ms-Icon')
    }

    deleteButton() {
        return cy.get('[data-e2e="deleteControlCatalogButton"]')
    }

    dashBoardMenu() {
        return cy.get('[data-e2e="linkDashboard"]')
    }

    confirmDeleteButton() {
        return cy.xpath('(//span[normalize-space()="Delete"])[1]')
    }

    globalCatalogCountElement() {
        return cy.get('div:nth-of-type(1) > .card-count')
    }

    clickGlobalCatalog() {
        return cy.xpath('//h5[.="Global Catalogs"]')
    }

    globalCatalogCountOnFilterElement() {
        return cy.get('div:nth-of-type(1) > .card-count')
    }

    clientCatalogCountElement() {
        return cy.get('div:nth-of-type(2) > .card-count')
    }

    clientCatalogCountOnFilterElement() {
        return cy.get('div:nth-of-type(2) > .card-count')
    }

    clickClientCatalog() {
        return cy.xpath('//h5[.="Client Catalogs"]')
    }

    globalControlsCountElement() {
        return cy.get('div:nth-of-type(3) > .card-count')
    }

    clickGlobalControls() {
        return cy.xpath('//h5[.="Global Controls"]')
    }

    clientControlsCountElement() {
        return cy.get('div:nth-of-type(4) > .card-count')
    }

    clickClientControls() {
        return cy.xpath('//h5[.="Client Controls"]')
    }

    createCatalog(catlogName, catalogDesc, value) {
        this.clickcontrolcatlogMenu().click({ multiple: true })
        this.clickControlMenu().click()
        this.createNewControlCatlog().click()
        this.controlname().type(catlogName)
        this.controldesc().type(catalogDesc)
        this.OwningGroupDropDown().click()
        this.OwningGroupValue(value).click()
        this.createCatlogButton().click()
    }

    assignControlToCatalog(catlogName, controlName) {
        this.clickcontrolcatlogMenu().click({ multiple: true })
        this.clickControlMenu().click()
        this.search().clear()
        this.search().type(catlogName)
        this.selectSearchData(catlogName).click()
        this.controlsBtn().click()
        this.editcontrols().click()
        this.searchcontrol().type(controlName)
        this.selectSearchcontrol().click()
        this.Savecontrols().click()
    }

    RemoveControlFromCatalog(catlogName, controlName) {
        this.clickcontrolcatlogMenu().click({ multiple: true })
        this.clickControlMenu().click()
        this.search().clear()
        this.search().type(catlogName)
        this.selectSearchData(catlogName).click()
        this.controlsBtn().click()
        this.editcontrols().click()
        this.searchcontrol().type(controlName)
        this.selectSearchcontrol().click()
        this.Savecontrols().click()
    }
    PublishCatlog(catlogName) {
        this.clickcontrolcatlogMenu().click({ multiple: true })
        this.clickControlMenu().click()
        this.search().clear()
        this.search().type(catlogName)
        this.selectSearchData(catlogName).click()
        this.EditBtn().click()
        this.publish().click()
        this.Minor().click()
        this.SubmitBtn().click()
    }

    deleteCatalog(catlogName) {
        this.search().clear()
        this.search().type(catlogName)
        this.selectSearchData(catlogName).click()
        this.deleteDropDownButton().click()
        this.deleteButton().click()
        this.confirmDeleteButton().click()
    }

    globalCatalogsCountOnDashBoard() {
        // this.clickcontrolcatlogMenu().click({ multiple: true })
        // return cy.get('div:nth-of-type(1) > .card-count').then((count)  {
        //     self.globalCatalogCount = count.text();
        //     cy.log('Global Catalog Count ' + self.globalCatalogCount);
        //     return new Cypress.Promise((resolve)  {
        //         return resolve(self.globalCatalogCount);
        //     });
        // });

    }
    globalCatalogsCountOnFilter() {
        this.clickGlobalCatalog().click()

        let filterCount = ''
        // cy.get('.mx-2')
        //     .then(number  {
        //         filterCount = number
        //             .text()
        //             .split('')
        //             .pop()
        //     cy.get('.mx-2')
        //             .should('contain', self.globalCatalogCount)
        //     cy.log(filterCount)
        //     })
    }

    clientCatalogsCountOnDashBoard() {
        this.dashBoardMenu().click()
        this.clickcontrolcatlogMenu().click({ multiple: true })

        // return cy.get('div:nth-of-type(2) > .card-count').then((count)  {
        //     self.clientCatalogCount = count.text();
        //     cy.log('Global Catalog Count ' + self.clientCatalogCount);
        //     return new Cypress.Promise((resolve)  {
        //         return resolve(self.clientCatalogCount);
        //     });
        // });

    }

    clientCatalogsCountOnFilter() {
        this.clickClientCatalog().click()

        // let filterCount = ''
        // cy.get('.mx-2')
        //     .then(number  {
        //         filterCount = number
        //             .text()
        //             .split('')
        //             .pop()
        //     cy.get('.mx-2')
        //             .should('contain', self.clientCatalogCount)
        //     cy.log(filterCount)
        //     })
    }

    globalControlsCountOnDashBoard() {
        this.dashBoardMenu().click()

        this.clickcontrolcatlogMenu().click({ multiple: true })

        // return cy.get('div:nth-of-type(3) > .card-count').then((count)  {
        //     self.clientCatalogCount = count.text();
        //     cy.log('Global Catalog Count ' + self.clientCatalogCount);
        //     return new Cypress.Promise((resolve)  {
        //         return resolve(self.clientCatalogCount);
        //     });
        // });

    }

    globalControlsCountOnFilter() {

        this.clickGlobalControls().click()

        let filterCount = ''
        // cy.get('.mx-2')
        //     .then(number  {
        //         filterCount = number
        //             .text()
        //             .split('')
        //             .pop()
        //         cy.get('.mx-2')
        //             .should('contain', self.clientCatalogCount)
        //         cy.log(filterCount)
    }

    clientControlsCountOnDashBoard() {
        this.dashBoardMenu().click()

        this.clickcontrolcatlogMenu().click({ multiple: true })

        // return cy.get('div:nth-of-type(4) > .card-count').then((count)  {
        //     self.clientCatalogCount = count.text();
        //     cy.log('Global Catalog Count ' + self.clientCatalogCount);
        //     return new Cypress.Promise((resolve)  {
        //         return resolve(self.clientCatalogCount);
        //     })

        // })
    }
    clientControlsCountOnFilter() {

        this.clickClientControls().click()

        let filterCount = ''
        cy.get('.mx-2')
        // .then(number  {
        //     filterCount = number
        //         .text()
        //         .split('')
        //         .pop()
        // cy.get('.mx-2')
        //         .should('contain', self.clientCatalogCount)
        // cy.log(filterCount)
    // })
}

EditCatlogwithPublish(catlogName) {
    this.clickcontrolcatlogMenu().click({ multiple: true })
    this.clickControlMenu().click()
    this.search().clear()
    this.search().type(catlogName)
    this.selectSearchData(catlogName).click()
    this.EditBtn().click()
    this.publish().click()
    this.SubmitBtn().click()
}
}