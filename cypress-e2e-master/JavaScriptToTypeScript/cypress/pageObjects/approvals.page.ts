export class Approvals {

    policyGroupMenu() {
        return cy.get('[data-e2e="linkApprovals"]')
    }
    approvalsMenu() {
        return cy.get('a[data-e2e="linkApprovals"]')
    }
    myApprovalsTab() {
        return cy.xpath('//a[contains(.,"My Approvals")]')
    }
    assignedApprovalsTab() {
        return cy.xpath('//a[contains(.,"Assigned Approvals")]')
    }
    search() {
        return cy.get('[placeholder="Search"]')
    }
    searchPolicyGroupName(policyGroupName) {
        return cy.xpath(`//h5[.='${policyGroupName}']`)
    }
    publishButton() {
        return cy.xpath('//button[.="Publish"]')
    }
    statusDropDown() {
        return cy.xpath('select[ng-reflect-name="status"]')
    }
    draft() {
        return cy.xpath('//option[contains(.,"Draft")]')
    }
    published() {
        return cy.xpath('//option[contains(.,"Published")]')
    }
    incrementByDropdown() {
        return cy.get('select[ng-reflect-name="versionBump"]')
    }
    major() {
        return cy.xpath('//option[contains(.,"MAJOR")]')
    }
    minor() {
        return cy.xpath('//option[contains(.,"MINOR")]')
    }
    saveButton() {
        return cy.get('.Save')
    }
    approvalEntity(entityId) {
        return cy.xpath(`//span[.='${entityId}']`)
    }
    userEmailDropDown() {
        return cy.xpath('//span[@class="ng-arrow"]')
    }
    selectUserEmail() {
        return cy.xpath('//div[.="admin@concoursehub.com"]')
    }
    approveButton() {
        return cy.get('[title="Approve"]')
    }
    rejectButton() {
        return cy.get('.btn-danger')
    }
    assignButton() {
        return cy.get('button[type="submit"]')
    }
    toast() {
        return cy.get('#toast-container')
    }
    list() {
        return cy.get('.data-left')
    }
    temp() {
        return cy.get('.app-container')
    }
    approvalStatus() {
        return cy.xpath('//span[.="APPROVED"]')
    }
    myelement(modelId) {
        return cy.xpath(`//td[.='${modelId} - Model']`)
    }
    surfaceDropDown() {
        return cy.get('select')
    }
    selectSurface(surface) {
        return cy.xpath(`//option[contains(.,'${surface}')]`)
    }
    policyGroupDetailPage() {
        return cy.get('div[data-e2e="policyGroupDetails"]')
    }
    deleteButton() {
        return cy.get('.btn-danger')
    }
    confirmDeleteButton() {
        return cy.get('.delete')
    }
    approvalList() {
        return cy.get('.data-left')
    }

    selectApprovalRequest(entityName) {
        return cy.xpath(`//span[contains(.,'${entityName}')]`)
    }
    
    toster() {
        return cy.get('.toast-message')
    }

    searchButton() { 
        return cy.get('.form-control') 
    }

    selectSearchData(entityId) { 
        return cy.xpath(`//span[.='${entityId}']`) 
    }

    approveRequest(entityName) {
        this.approvalsMenu().trigger('mouseover');
        this.approvalsMenu().should('be.visible');
        this.approvalsMenu().click();
        cy.wait(3000)
        this.searchButton().clear();
        cy.wait(3000)
        this.searchButton().type(entityName);
        cy.wait(3000)
        this.selectApprovalRequest(entityName).should('be.visible');
        this.selectApprovalRequest(entityName).first().click();
        this.approveButton().should('be.visible');
        cy.wait(2000)
        this.approveButton().click({force: true})
    }
    
    
    verifyApprovalRequest(requestname) {
        this.approvalsMenu().click()
        this.search().clear()
        this.search().type(requestname)
        this.selectSearchData(requestname).should('be.visible')
    }
}
