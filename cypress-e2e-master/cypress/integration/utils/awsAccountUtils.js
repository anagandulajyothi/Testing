import loginPage from '../pages/loginPage.js'
import awsaccountPage from '../pages/awsAccountPage.js'
const login = new loginPage();
const awsaccountpage = new awsaccountPage();
const uuid = () => Cypress._.random(0, 1e6)
const uniqueId = uuid()

Cypress.Commands.add('createNewCloudAccount', (awsAccountName, awsAccountDescription, awsAccountId, owningGroup) => {
    awsaccountpage.linkInstitutionData().trigger('mouseover');
    awsaccountpage.linkInstitutionData().should('be.visible');
    awsaccountpage.linkInstitutionData().click();
    awsaccountpage.connectCloudAccount().click();
    awsaccountpage.connectCloudAccount().click();
    awsaccountpage.awsTab().click();
    awsaccountpage.newAWSAccount().click();
    awsaccountpage.awsAccountName().type(awsAccountName);
    awsaccountpage.awsAccountDescription().type(awsAccountDescription);
    awsaccountpage.awsAccountId().type(awsAccountId);
    awsaccountpage.ownigGroupDropDown().should('be.visible');
    awsaccountpage.ownigGroupDropDown().click();
    awsaccountpage.selectOwningGroup(owningGroup).trigger('mouseover');
    awsaccountpage.selectOwningGroup(owningGroup).click();
    awsaccountpage.saveButton().click();
})

Cypress.Commands.add('searchAwsAccount', (awsAccountName) => {
    awsaccountpage.linkInstitutionData().trigger('mouseover');
    awsaccountpage.linkInstitutionData().should('be.visible');
    awsaccountpage.linkInstitutionData().click();
    awsaccountpage.connectCloudAccount().click();
    awsaccountpage.awsTab().click();
    awsaccountpage.search().should('be.visible');
    awsaccountpage.search().clear();
    awsaccountpage.search().type(awsAccountName);
    awsaccountpage.searchAccount(awsAccountName).click();
})

Cypress.Commands.add('editAWSAccount', (awsAccountName, awsAccountDescription) => {
    cy.searchAwsAccount(awsAccountName);
    awsaccountpage.editButton().trigger('mouseover');
    awsaccountpage.editButton().click();
    awsaccountpage.editAccountName().should('be.visible');
    awsaccountpage.editAccountName().type('Updated');
    awsaccountpage.editAccountDescription().should('be.visible');
    awsaccountpage.editAccountDescription('Updated');
    awsaccountpage.saveOnEdit().should('be.visible');
    awsaccountpage.saveOnEdit().click();
})

Cypress.Commands.add('deleteAWSAccount', (surfaceDta) => {
    awsaccountpage.deleteDropDownButton().trigger('mouseover');
    awsaccountpage.deleteDropDownButton().click();
    awsaccountpage.deleteButton().trigger('mouseover');
    awsaccountpage.deleteButton().click();
    // awsaccountpage.confirmDeleteButton.should('be.visible');
    awsaccountpage.confirmDeleteButton().click();
})
