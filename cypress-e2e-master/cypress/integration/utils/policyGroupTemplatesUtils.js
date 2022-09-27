import loginPage from '../pages/loginPage.js'
import policyGroupTemplatePage from '../pages/policyGroupTemplatePage.js'
const login = new loginPage();
const policyGroupTemplate = new policyGroupTemplatePage();

Cypress.Commands.add('createPolicyGroupTemplate', (status, policyGroupTemplateName, policyGroupTemplateDesc, policyTemplate) => {
    policyGroupTemplate.policyGroupTemplatelink().trigger('mouseover')
    policyGroupTemplate.policyGroupTemplatelink().should('be.visible')
    policyGroupTemplate.policyGroupTemplatelink().click()
    policyGroupTemplate.newPolicyGroupTemplate().click()
    if (status == 'PUBLISHED') {
        policyGroupTemplate.selectStatus(status).check()
        policyGroupTemplate.policyGroupTemplateMinor().check()
    }
    policyGroupTemplate.selectStatus(status).check()
    policyGroupTemplate.enterPolicyGroupTemplateName().type(policyGroupTemplateName)
    policyGroupTemplate.enterPolicyGroupTemplateDesc().type(policyGroupTemplateDesc)
    policyGroupTemplate.clickPolicyGroupTemplateNextbtn().click()
    cy.wait(1000)
    policyGroupTemplate.searchPolicyTemplateName().type(policyTemplate)
    policyGroupTemplate.selectPolicyTemplate(policyTemplate).should('be.visible')
    policyGroupTemplate.selectPolicyTemplate(policyTemplate).click()
    policyGroupTemplate.clickPolicyGroupTemplateNextbtn().click()
    policyGroupTemplate.createPolicyGroupTemplateSubmitbtn().click()
})

Cypress.Commands.add('editPolicyGroupTemplate', (policyGroupTemplateName) => {

    policyGroupTemplate.policyGroupTemplatelink().click()
    policyGroupTemplate.search().clear()
    policyGroupTemplate.search().type(policyGroupTemplateName)
    policyGroupTemplate.selectSearchData(policyGroupTemplateName).click()
    policyGroupTemplate.clickEditbtn().click()
    // policyGroupTemplate.editPolicyGroupTemplateName().clear()
    policyGroupTemplate.editPolicyGroupTemplateName().type(' Updated')
    policyGroupTemplate.editPolicyGroupTemplateSubmitbtn().click()
})

Cypress.Commands.add('deletePolicyGroupTemplate', (policyGroupTemplateName) => {

    // policyGroupTemplate.closePolicyGroupTemplate().click()
    policyGroupTemplate.policyGroupTemplatelink().click()
    cy.wait(5000)
    policyGroupTemplate.search().clear()
    policyGroupTemplate.search().type(policyGroupTemplateName)
    policyGroupTemplate.selectSearchData(policyGroupTemplateName).should('be.visible');
    policyGroupTemplate.selectSearchData(policyGroupTemplateName).click()
    cy.wait(5000)
    policyGroupTemplate.deleteDropDown().click()
    cy.wait(5000)
    policyGroupTemplate.deleteButton().click()
    policyGroupTemplate.confirmDeleteButton().click()
})

Cypress.Commands.add('createPolicyGroupTemplateWithTerraform', (status, policyGroupTemplateName, policyGroupTemplateDesc, policyTemplate, value) => {
    policyGroupTemplate.policyGroupTemplatelink().trigger('mouseover')
    policyGroupTemplate.policyGroupTemplatelink().should('be.visible')
    policyGroupTemplate.policyGroupTemplatelink().click()
    policyGroupTemplate.newPolicyGroupTemplate().click()
    if (status == 'PUBLISHED') {
        policyGroupTemplate.selectStatus(status).check()
        policyGroupTemplate.policyGroupTemplateMinor().check()
    }
    policyGroupTemplate.selectStatus(status).check()
    policyGroupTemplate.selectStatus(status).check()
    policyGroupTemplate.enterPolicyGroupTemplateName().type(policyGroupTemplateName)
    policyGroupTemplate.enterPolicyGroupTemplateDesc().type(policyGroupTemplateDesc)
    policyGroupTemplate.clickPolicyGroupTemplateNextbtn().click()
    policyGroupTemplate.searchPolicyTemplateName().type(policyTemplate)

    for (let i = 1; i <= value; i++) {
        policyGroupTemplate.selectPolicyTemplate_TerraForm(i).check()
    }

    policyGroupTemplate.clickPolicyGroupTemplateNextbtn().click()
    policyGroupTemplate.createPolicyGroupTemplateSubmitbtn().click()
})

Cypress.Commands.add('editPolicyGroupTemplatewithStatus', (policyGroupTemplateName, status) => {
    policyGroupTemplate.policyGroupTemplatelink().click()
    policyGroupTemplate.search().clear()
    policyGroupTemplate.search().type(policyGroupTemplateName)
    policyGroupTemplate.selectSearchData(policyGroupTemplateName).click()
    policyGroupTemplate.clickEditbtn().click()
    policyGroupTemplate.editPolicyGroupTemplateName().type(' Updated')

    if (status == 'PUBLISHED') {
        policyGroupTemplate.selectStatus(status).check()
    }

    policyGroupTemplate.editPolicyGroupTemplateSubmitbtn().click()
})
