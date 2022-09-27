import loginPage from '../pages/loginPage.js'
import Approvals from '../pages/approvalsPage.js'
const login = new loginPage();
const approval = new Approvals();

Cypress.Commands.add('approveRequest', (entityName) => {
    approval.approvalsMenu().trigger('mouseover');
    approval.approvalsMenu().should('be.visible');
    approval.approvalsMenu().click();
    cy.wait(3000)
    approval.searchButton().clear();
    cy.wait(3000)
    approval.searchButton().type(entityName);
    cy.wait(3000)
    approval.selectApprovalRequest(entityName).should('be.visible');
    approval.selectApprovalRequest(entityName).first().click();
    approval.approveButton().should('be.visible');
    cy.wait(2000)
    approval.approveButton().click({force: true})
})


Cypress.Commands.add('verifyApprovalRequest', (requestname) => {
    approval.approvalsMenu().click()
    approval.search().clear()
    approval.search().type(requestname)
    approval.selectSearchData(requestname).should('be.visible')
})