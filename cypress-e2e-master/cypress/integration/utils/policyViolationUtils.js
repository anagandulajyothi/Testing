import Violations from '../pages/policyViolationsPage';
const violations = new Violations();

Cypress.Commands.add('verifyViolation', (surfaceName, violationId) => {
    violations.policyViolationsMenu().should('be.visible')
    violations.policyViolationsMenu().click()
    cy.selectSurfaceFromDropDown(surfaceName)
    cy.reload(true)
    cy.wait(10000)
    violations.search().clear()
    violations.search().type(violationId);
    // violations.riskElement(violationId).first().click()
    cy.wait(2000)
})

Cypress.Commands.add('selectViolation', (surfaceName, violationId) => {
    violations.policyViolationsMenu().should('be.visible')
    violations.policyViolationsMenu().click()
    cy.selectSurfaceFromDropDown(surfaceName)
    cy.reload(true)
    cy.wait(5000)
    violations.search().clear()
    violations.search().type(violationId);
    violations.riskElement(violationId).first().click()
})

Cypress.Commands.add('checkViolationHappened', (violationId) => {
    cy.wait(4000)
    violations.riskElement(violationId).should('be.visible')
})

Cypress.Commands.add('checkViolationNotHappened', (violationId) => {
    cy.wait(3000)
    violations.violation().should('be.visible')
})

Cypress.Commands.add('unAssignUserForViolation', () => {
    cy.wait(3000)
    violations.selectDropdown().click()
    violations.unAssignUser().click()
})

Cypress.Commands.add('assignUserForViolation', (User) => {
    cy.wait(3000)
    violations.selectDropdown().click()
    violations.selectUser(User).click()
})

Cypress.Commands.add('assignGroupForViolation', (group) => {
    cy.wait(3000)
    violations.selectDropdown().click()
    violations.groupAssignInput(group).click()
})

Cypress.Commands.add('commentViolation', () => {
    cy.wait(3000)
    // violations.selectActivityTab().click()
    violations.selectCommentBox().click()
    violations.selectCommentBox().type('Test Policy Violation Actions')
    violations.commentButton().click()
})

Cypress.Commands.add('resloveViolation', () => {
    cy.wait(3000)
    violations.resolveButton().click()
})

Cypress.Commands.add('reOpenViolation', () => {
    cy.wait(3000)
    violations.reopenButton().click()
})

Cypress.Commands.add('cancleViolation', () => {
    violations.cancelButton().click()
})