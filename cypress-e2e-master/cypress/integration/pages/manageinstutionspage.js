class manageInstutionsPage {


    linkInstitutionData() {
        return cy.get('[data-e2e="linkInstitutionData"]')
    }

    institutionData() {
        return cy.get('a[data-e2e="InstitutionData"]')
    }

    newInstitutionData() {
        return cy.get('[data-e2e="newInstitutionData"]')
    }

    institutionDataDropDown() {
        return cy.get('[name="selectInstData"]')
    }

    selectDataAccount(account) {
        return cy.xpath(`//span[.='${account}']`)
    }


    enterKey() {
        return cy.get('[placeholder="Key"]')
    }

    enterValue() {
        return cy.get('[placeholder="Value"]')
    }

    // enterUrl(value: any) {
    // return cy.get('input[ng-reflect-name='${value}']')
    // }

    enterNewValue() {
        return cy.get('[placeholder="Value"]')
    }


    createButton() {
        return cy.get('.d-flex > .btn')
    }

    updateKey() {
        return cy.get(`[novalidate] div:nth-of-type(2) [placeholder='Key']`)
    }

    updateValue() {
        return cy.get(`[novalidate] div:nth-of-type(2) [placeholder='Value']`)
    }


    updateWhiteListValue() {
        // return cy.get('(//textarea[contains(@placeholder,'Value')])[2]')
    }


    addButtton() {
        return cy.get('.fa-plus-circle')
    }

    removeInstitutionData(num) {
        return cy.xpath(`div[ng-reflect-name='${num}'] .btn-danger`)
    }


    selectAccount(account) {
        return cy.get(`h5[data-e2e='${account}']`)
    }


    updateData() {
        return cy.get('.d-flex > .btn')
    }

    deleteAccountButton() {
        return cy.get('[data-e2e="delete"]')
    }


    confirmDeleteButton() {
        return cy.get('[data-e2e="confirmDeleteModalBtn"]')
    }

    surfaceDropDown() {
        return cy.get('[data-e2e="surfaceSwitcherDropdown"]')
    }


    selectSurface() {
        // return cy.get('//option[contains(.,'${surface}')]')
    }

    toast() {
        return cy.get('#toast-container')
    }


    removeWhiteListValue(value) {
        return cy.xpath(`(//*[@type="button"])[${value}]`)
    }

    removePublickKeyValue() {
        return cy.xpath(`(//button[@type='button']//fa-icon)[2]`)
    }

    dataDetailPage() {
        return cy.get('.content')
    }

    dataAccountList() {
        return cy.get('.list')
    }

}

export default manageInstutionsPage