import loginPage from '../pages/loginPage.js'
import azureSubscriptionPage1 from '../pages/azureSubscriptionPage.js'
const login = new loginPage();
const azureSubscriptionPage = new azureSubscriptionPage1();
const uuid = () => Cypress._.random(0, 1e6)
const uniqueId = uuid()

Cypress.Commands.add('createNewAzureAccount', (azureAccountName, azureAccountDescription, azureSubscriptionName, azureSubscriptionId, owningGroup) => {
    azureSubscriptionPage.linkInstitutionData().trigger('mouseover');
    azureSubscriptionPage.linkInstitutionData().should('be.visible');
    azureSubscriptionPage.linkInstitutionData().click();
    azureSubscriptionPage.connectCloudAccount().click();
    azureSubscriptionPage.connectCloudAccount().click();
    azureSubscriptionPage.azureTab().click();
    azureSubscriptionPage.newAzureAccount().click();
    azureSubscriptionPage.azureAccountName().type(azureAccountName);
    azureSubscriptionPage.azureAccountDescription().type(azureAccountDescription);
    azureSubscriptionPage.azureSubscriptionName().type(azureSubscriptionName);
    azureSubscriptionPage.azureSubscriptionId().type(azureSubscriptionId);
    azureSubscriptionPage.ownigGroupDropDown().should('be.visible');
    azureSubscriptionPage.ownigGroupDropDown().click();
    azureSubscriptionPage.selectOwningGroup(owningGroup).trigger('mouseover');
    azureSubscriptionPage.selectOwningGroup(owningGroup).should('be.visible');
    azureSubscriptionPage.selectOwningGroup(owningGroup).click();
    azureSubscriptionPage.saveButton().click();
})

Cypress.Commands.add('searchAzureSubscription', (azureSubscriptionName) => {
    azureSubscriptionPage.linkInstitutionData().trigger('mouseover');
    azureSubscriptionPage.linkInstitutionData().should('be.visible');
    azureSubscriptionPage.linkInstitutionData().click();
    azureSubscriptionPage.connectCloudAccount().click();
    azureSubscriptionPage.azureTab().click();
    azureSubscriptionPage.search().should('be.visible');
    azureSubscriptionPage.search().clear();
    azureSubscriptionPage.search().type(azureSubscriptionName);
    azureSubscriptionPage.searchAccount(azureSubscriptionName).click();
})

Cypress.Commands.add('editAzureAccount', (azureAccountName, azureAccountDescription) => {
    cy.searchAzureSubscription(azureAccountName);
    azureSubscriptionPage.editButton().trigger('mouseover');
    azureSubscriptionPage.editButton().click();
    azureSubscriptionPage.editAccountName().should('be.visible');
    azureSubscriptionPage.editAccountName().type('Updated');
    azureSubscriptionPage.editAccountDescription().should('be.visible');
    azureSubscriptionPage.editAccountDescription('Updated');
    azureSubscriptionPage.saveOnEdit().should('be.visible');
    azureSubscriptionPage.saveOnEdit().click();
})

Cypress.Commands.add('deleteAzureAccount', () => {
    azureSubscriptionPage.deleteDropDownButton().trigger('mouseover');
    azureSubscriptionPage.deleteDropDownButton().click();
    azureSubscriptionPage.deleteButton().trigger('mouseover');
    azureSubscriptionPage.deleteButton().click();
    azureSubscriptionPage.confirmDeleteButton().click();
})
