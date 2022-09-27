import loginPage from '../pages/loginPage.js'
import createDataForInstitution from '../pages/manageinstutionspage.js'
import utils from '../utils/utils.js'
const login = new loginPage();
const manageinstutions = new createDataForInstitution();
const uuid = () => Cypress._.random(0, 1e6)
const uniqueId = uuid()
const randomInteger = () => Cypress._.random(0, 10000000)

Cypress.Commands.add('createDataForInstitution', (Keys, publicKey, KeyValue) => {
    manageinstutions.linkInstitutionData().trigger('mouseover');
    manageinstutions.linkInstitutionData().should('be.visible');
    manageinstutions.linkInstitutionData().click();
    manageinstutions.institutionData().click();
    manageinstutions.newInstitutionData().click();
    manageinstutions.institutionDataDropDown().trigger('mouseover');
    manageinstutions.institutionDataDropDown().should('be.visible');
    manageinstutions.institutionDataDropDown().click();
    manageinstutions.selectDataAccount(Keys).click();
    manageinstutions.enterKey().click();
    manageinstutions.enterKey().type(publicKey)
    manageinstutions.enterValue().click();
    manageinstutions.enterValue().type(KeyValue)
    manageinstutions.createButton().click();
})

Cypress.Commands.add('updateInstitutionDataAccount', (Keys, updatedKey, updatedKeyValue) => {
    manageinstutions.linkInstitutionData().trigger('mouseover');
    manageinstutions.linkInstitutionData().should('be.visible');
    manageinstutions.linkInstitutionData().click();
    manageinstutions.institutionData().click();
    manageinstutions.selectAccount(Keys).click();
    cy.wait(2000)
    manageinstutions.updateKey().type(updatedKey)
    cy.wait(2000)
    manageinstutions.updateValue().type(updatedKeyValue)
    manageinstutions.updateData().click();
})

Cypress.Commands.add('removeInstitutionData', (Keys) => {
    manageinstutions.linkInstitutionData().trigger('mouseover');
    manageinstutions.linkInstitutionData().should('be.visible');
    manageinstutions.linkInstitutionData().click();
    manageinstutions.institutionData().click();
    manageinstutions.selectAccount(Keys).click();
    cy.wait(2000)
    manageinstutions.removePublickKeyValue(Keys).click();
    cy.wait(2000)
    manageinstutions.updateData().click();
})

Cypress.Commands.add('deleteInstitutionData', (Keys) => {
    manageinstutions.linkInstitutionData().trigger('mouseover');
    manageinstutions.linkInstitutionData().should('be.visible');
    manageinstutions.linkInstitutionData().click();
    manageinstutions.institutionData().click();
    manageinstutions.selectAccount(Keys).click();
    cy.wait(1000)
    manageinstutions.deleteAccountButton().click();
    cy.wait(1000)
    manageinstutions.confirmDeleteButton().click()
})