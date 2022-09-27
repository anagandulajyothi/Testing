class controlcatlogsPage {

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
}
export default controlcatlogsPage