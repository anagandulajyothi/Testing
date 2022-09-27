export class Violations {

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
    selectViolationId(id) {
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

    verifyViolation(surfaceName, violationId) {
        this.policyViolationsMenu().should('be.visible')
        this.policyViolationsMenu().click()
        this.selectSurfaceFromDropDown(surfaceName)
        cy.reload(true)
        cy.wait(10000)
        this.search().clear()
        this.search().type(violationId);
        // this.riskElement(violationId).first().click()
        cy.wait(2000)
    }
    
    selectViolation(surfaceName, violationId) {
        this.policyViolationsMenu().should('be.visible')
        this.policyViolationsMenu().click()
        this.selectSurfaceFromDropDown(surfaceName)
        cy.reload(true)
        cy.wait(5000)
        this.search().clear()
        this.search().type(violationId);
        this.riskElement(violationId).first().click()
    }

    checkViolationHappened(violationId) {
        cy.wait(4000)
        this.riskElement(violationId).should('be.visible')
    }

    checkViolationNotHappened(violationId) {
        cy.wait(3000)
        this.violation().should('be.visible')
    }

    unAssignUserForViolation() {
        cy.wait(3000)
        this.selectDropdown().click()
        this.unAssignUser().click()
    }

    assignUserForViolation(User) {
        cy.wait(3000)
        this.selectDropdown().click()
        this.selectUser(User).click()
    }

    assignGroupForViolation(group) {
        cy.wait(3000)
        this.selectDropdown().click()
        this.groupAssignInput(group).click()
    }

    commentViolation() {
        cy.wait(3000)
        // this.selectActivityTab().click()
        this.selectCommentBox().click()
        this.selectCommentBox().type('Test Policy Violation Actions')
        this.commentButton().click()
    }

    resloveViolation() {
        cy.wait(3000)
        this.resolveButton().click()
    }

    reOpenViolation() {
        cy.wait(3000)
        this.reopenButton().click()
    }

    cancleViolation() {
        this.cancelButton().click()
    }

    selectSurfaceFromDropDown(surfaceName) {
        this.surfaceDropDown().trigger('mouseover');
        this.surfaceDropDown().should('be.visible');
        this.surfaceDropDown().click();
        this.selectSurface(surfaceName).trigger('mouseover');
        this.selectSurface(surfaceName).should('be.visible');
        cy.wait(1000)
        this.selectSurface(surfaceName).click({ multiple: true });
    }
}