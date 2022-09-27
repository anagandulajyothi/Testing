class Violations {

    policyViolationsMenu() {
        return cy.xpath('//a[contains(.,"Violations")]')
    }
    selectUser(user) {
        return cy.get(`[data-e2e='${user}']`)
    }
    unAssignUser() {
        return cy.get('[data-e2e="Unassigned"]')
    }
    selectDropdown() {
        return cy.xpath(`//ng-select[@placeholder='Assign to']//span[@class='ng-arrow-wrapper']`)
    }
    userAssignInput() {
        return cy.get('div.scroll-host div:nth-of-type(4) > .option-label')
    }
    setUserInput() {
        return cy.xpath(`//span[.='e2e Test']`)
    }
    groupAssignInput(group) {
        return cy.get(`[data-e2e='${group}']`)
    }
    setGroupInput() {
        return cy.xpath(`//span[.='E2E Admin']`)
    }
    gridTable() {
        return cy.get('.grid-table')
    }
    risklist() {
        return cy.get('.app-container')
    }

    riskdetail() {
        return cy.get('div[data-e2e="approvalRequestDetails"]')
    }
    deleteButton() {
        return cy.get('.btn-danger')
    }
    confirmDeletionButton() {
        return cy.get('.btn-outline-danger')
    }
    toast() {
        return cy.xpath(`//div[@class='toast-top-right toast-container']`)
    }
    riskElement(ID) {
        return cy.xpath(`//h5[contains(.,'${ID}')]`)
    }
    selectViolation(id) {
        return cy.xpath(`//h5[contains(.,'${id}')]`)
    }
    lastPage() {
        return cy.xpath('//i[@class="datatable-icon-skip"]')
    }
    surfaceDropDown() {
        return cy.get('[data-e2e="surfaceSwitcherDropdown"]')
    }
    selectSurface(surface) {
        return cy.xpath(`//h5[.='${surface}']`)
    }
    search() {
        return cy.get('[placeholder="Search"]')
    }
    list() {
        return cy.get('.cdk-virtual-scroll-viewport')
    }
    lists() {
        return cy.get('.data-left')
    }
    selectActivityTab() {
        return cy.get('sl-tab[panel="activity"]')
    }
    selectCommentBox() {
        return cy.get('.w-100')
    }
    commentButton() {
        return cy.get('sl-button')
    }
    resolveButton() {
        return cy.get('[data-e2e="resolveViolationButton"]')
    }
    cancelButton() {
        return cy.get('[data-e2e="cancelViolationButton"]')
    }
    reopenButton() {
        return cy.get('[data-e2e="reopenViolationButton"]')
    }
    toaster() {
        return cy.get('.toast-message')
    }
    violation() {
        return cy.get('.card')
    }
}

export default Violations