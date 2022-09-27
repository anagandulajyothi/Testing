import loginPage from '../pages/loginPage.js'
import surfacePage from '../pages/surfacePage'
const login = new loginPage();
const surfacePages = new surfacePage();


Cypress.Commands.add('createNewSurface', (surfaceName, SurfaceDescription, groupName) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    surfacePages.newSurface().click();
    surfacePages.enterSurfaceName().type(surfaceName);
    surfacePages.enterSurfaceDescription().type(SurfaceDescription)
    surfacePages.groupDropDown().should('be.visible');
    surfacePages.groupDropDown().click();
    surfacePages.enterGroupName().type(groupName);
    surfacePages.selectGroup().should('be.visible');
    surfacePages.selectGroup().click();
    surfacePages.blankClick().click();
    surfacePages.createNewGroupChekBox().check()
    surfacePages.createButton().click();
})

Cypress.Commands.add('editSurface', (surfaceName) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    cy.selectSurfaceFromDropDown(surfaceName);

    cy.url().then(GetUrl => {
        cy.log("Url Is:" + GetUrl)
        var name = GetUrl.split('surface-list')[0]
        cy.log('name is :' + name)
        cy.visit(name + 'surfaces')
    });

    surfacePages.manageSurfaces().click();
    surfacePages.editSurfaceButton().click();
    surfacePages.enterSurfaceDescription().type(' Updated');
    surfacePages.saveButton().click();
})

Cypress.Commands.add('deleteSurface', (surfaceName) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    cy.selectSurfaceFromDropDown(surfaceName);

    cy.url().then(GetUrl => {
        cy.log("Url Is:" + GetUrl)
        var name = GetUrl.split('surface-list')[0]
        cy.log('name is :' + name)
        cy.visit(name + 'surfaces')

    });

    surfacePages.manageSurfaces().click();
    surfacePages.deleteButton().should('be.visible');
    surfacePages.deleteButton().click();
    surfacePages.confirmDeleteButton().should('be.visible');
    surfacePages.confirmDeleteButton().click();
})

Cypress.Commands.add('verifySurface', (surfaceName) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    surfacePages.surfaceDropDown().should('be.visible');
    surfacePages.surfaceDropDown().click();
})

Cypress.Commands.add('assignAWSAccountsToSurface', (surfaceName, awsAccount) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    cy.selectSurfaceFromDropDown(surfaceName);

    cy.url().then(GetUrl => {
        cy.log("Url Is:" + GetUrl)
        var name = GetUrl.split('surface-list')[1]
        cy.log('name is :' + name)
        cy.visit(name + 'surfaces')

    });

    surfacePages.manageSurfaces().click();
    surfacePages.assignAWSAccountsButton().should('be.visible');
    surfacePages.assignAWSAccountsButton().click();
    surfacePages.awsAccountsDropDown().should('be.visible');
    surfacePages.awsAccountsDropDown().click();
    surfacePages.enterawsAccountName().type(awsAccount)
    surfacePages.selectAWSAccount(awsAccount).trigger('mouseover');
    surfacePages.selectAWSAccount(awsAccount).should('be.visible');
    surfacePages.selectAWSAccount(awsAccount).click();
    surfacePages.saveAWSAccount().click();
})

Cypress.Commands.add('removeAWSAccountsFromSurface', (surfaceName, awsAccount) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    cy.selectSurfaceFromDropDown(surfaceName);

    cy.url().then(GetUrl => {
        cy.log("Url Is:" + GetUrl)
        var name = GetUrl.split('surface-list')[0]
        cy.log('name is :' + name)
        cy.visit(name + 'surfaces')
    });

    surfacePages.manageSurfaces().click();
    surfacePages.removeAWSAccountsButton().should('be.visible');
    surfacePages.removeAWSAccountsButton().click();
    surfacePages.awsAccountsDropDown().should('be.visible');
    surfacePages.awsAccountsDropDown().click();
    surfacePages.enterawsAccountName().type(awsAccount)
    surfacePages.selectAWSAccount(awsAccount).trigger('mouseover');
    surfacePages.selectAWSAccount(awsAccount).should('be.visible');
    surfacePages.selectAWSAccount(awsAccount).click();
    surfacePages.disableAWSAccount().click();
})

Cypress.Commands.add('assignAzureSubscriptionToSurface', (surfaceName, azureSubscription) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    cy.selectSurfaceFromDropDown(surfaceName);

    cy.url().then(GetUrl => {
        cy.log("Url Is:" + GetUrl)
        var name = GetUrl.split('surface-list')[0]
        cy.log('name is :' + name)
        cy.visit(name + 'surfaces')
    });

    surfacePages.manageSurfaces().click();
    surfacePages.assignAzureSubscription().should('be.visible');
    surfacePages.assignAzureSubscription().click();
    surfacePages.azureSubscriptionsDropDown().should('be.visible');
    surfacePages.azureSubscriptionsDropDown().click();
    surfacePages.enterSubscriptionName().type(azureSubscription)
    surfacePages.selectAzureSubscription(azureSubscription).trigger('mouseover');
    surfacePages.selectAzureSubscription(azureSubscription).should('be.visible');
    surfacePages.selectAzureSubscription(azureSubscription).click();
    surfacePages.azureBlankClick().click();
    surfacePages.associateButton().click();
})

Cypress.Commands.add('removeAzureSubscriptionFromSurface', (surfaceName, azureSubscription) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    cy.selectSurfaceFromDropDown(surfaceName);

    cy.url().then(GetUrl => {
        cy.log("Url Is:" + GetUrl)
        var name = GetUrl.split('surface-list')[0]
        cy.log('name is :' + name)
        cy.visit(name + 'surfaces')
    });

    surfacePages.manageSurfaces().click();
    surfacePages.removeAzureSubscription().should('be.visible');
    surfacePages.removeAzureSubscription().click();
    surfacePages.azureSubscriptionsDropDown().should('be.visible');
    surfacePages.azureSubscriptionsDropDown().click();
    surfacePages.enterSubscriptionName().type(azureSubscription)
    surfacePages.selectAzureSubscriptionToRemove(azureSubscription).trigger('mouseover');
    surfacePages.selectAzureSubscriptionToRemove(azureSubscription).should('be.visible');
    surfacePages.selectAzureSubscriptionToRemove(azureSubscription).click();
    // surfacePages.azureBlankClick().click();
    surfacePages.removeButton().click();
})

Cypress.Commands.add('createDataForSurface', (surfaceDta) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    surfacePages.manageSurfaces().click();
    surfacePages.manageSurfaceData().should('be.visible');
    surfacePages.manageSurfaceData().click();
    surfacePages.addDataButton().should('be.visible');
    surfacePages.addDataButton().click();
    surfacePages.surfaceDataDropDown().should('be.visible');
    surfacePages.surfaceDataDropDown().click();
    surfacePages.selectDataAccount().should('be.visible');
    surfacePages.selectDataAccount().click();
    surfacePages.selectDataAccount().should('be.visible');
    surfacePages.selectDataAccount().click();
    surfacePages.enterKey().should('be.visible');
    surfacePages.enterKey().click();
    surfacePages.enterKey().type(surfaceDta.dataKey + uniqueId);
    surfacePages.enterValue().should('be.visible');
    surfacePages.enterValue().click();
    surfacePages.enterValue().type(surfaceDta.keyValue + uniqueId);
    surfacePages.createDataButton().click()
})

Cypress.Commands.add('editDataForSurface', (surfaceDta) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    surfacePages.manageSurfaces().click();
    surfacePages.manageSurfaceData().should('be.visible');
    surfacePages.manageSurfaceData().click();
    surfacePages.editDataAccount().click();
    surfacePages.updateKey().should('be.visible');
    surfacePages.updateKey().click();
    surfacePages.updateKey().type(surfaceDta.dataKey + uniqueId);
    surfacePages.updateValue().should('be.visible');
    surfacePages.updateValue().click();
    surfacePages.updateValue().type(surfaceDta.keyValue + uniqueId);
    surfacePages.updateData().should('be.visible');
    surfacePages.updateData().click();

})
Cypress.Commands.add('RemoveDataValueFromSrfaceData', (surfaceDta) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    surfacePages.manageSurfaces().click();
    surfacePages.manageSurfaceData().should('be.visible');
    surfacePages.manageSurfaceData().click();
    surfacePages.editDataAccount().click();
    surfacePages.removeDataValueButton().should('be.visible');
    surfacePages.removeDataValueButton().click();
    surfacePages.updateData().should('be.visible');
    surfacePages.updateData().click();
})

Cypress.Commands.add('deleteDataAccount', (surfaceDta) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    surfacePages.manageSurfaces().click();
    surfacePages.manageSurfaceData().should('be.visible');
    surfacePages.manageSurfaceData().click();
    surfacePages.deleteAccountData().should('be.visible');
    surfacePages.deleteAccountData().click();
    surfacePages.confirmDeleteButton().should('be.visible');
    surfacePages.confirmDeleteButton().click();
})

Cypress.Commands.add('createDataForSurfaceLayer', (surfaceDta) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    surfacePages.selectSurfaceLayer().should('be.visible');
    surfacePages.selectSurfaceLayer().click();
    surfacePages.manageSurfaces().click();
    surfacePages.manageSurfaceData().should('be.visible');
    surfacePages.manageSurfaceData().click();
    surfacePages.manageSurfaceLayerData().should('be.visible');
    surfacePages.manageSurfaceLayerData().click();
    surfacePages.addDataButtonForSurfaceLayer().should('be.visible');
    surfacePages.addDataButtonForSurfaceLayer().click();
    surfacePages.surfaceLayerDataDropDown().should('be.visible');
    surfacePages.surfaceLayerDataDropDown().click();
    surfacePages.selectDataAccount().should('be.visible');
    surfacePages.selectDataAccount().click();
    surfacePages.selectDataAccount().should('be.visible');
    surfacePages.selectDataAccount().click();
    surfacePages.enterKey().type(surfaceDta.dataKey + uniqueId);
    surfacePages.enterValue().should('be.visible');
    surfacePages.enterValue().click();
    surfacePages.enterValue().type(surfaceDta.keyValue + uniqueId);
    surfacePages.createDataButton().click()
})

Cypress.Commands.add(' updateDataForSurfaceLayer', (surfaceDta) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    surfacePages.selectSurfaceLayer().should('be.visible');
    surfacePages.selectSurfaceLayer().click();
    surfacePages.manageSurfaces().click();
    surfacePages.manageSurfaceData().should('be.visible');
    surfacePages.manageSurfaceData().click();
    surfacePages.manageSurfaceLayerData().should('be.visible');
    surfacePages.manageSurfaceLayerData().click();
    surfacePages.editDataAccount().should('be.visible');
    surfacePages.editDataAccount().click();
    surfacePages.updateKey().should('be.visible');
    surfacePages.updateKey().click();
    surfacePages.updateKey().type(surfaceDta.dataKey + uniqueId);
    surfacePages.updateValue().should('be.visible');
    surfacePages.updateValue().click();
    surfacePages.updateValue().type(surfaceDta.keyValue + uniqueId);
    surfacePages.updateData().should('be.visible');
    surfacePages.updateData().click();
});

Cypress.Commands.add(' RemoveDataValueFromSrfaceLayerData', (surfaceDta) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    surfacePages.selectSurfaceLayer().should('be.visible');
    surfacePages.selectSurfaceLayer().click();
    surfacePages.manageSurfaces().click();
    surfacePages.manageSurfaceData().should('be.visible');
    surfacePages.manageSurfaceData().click();
    surfacePages.manageSurfaceLayerData().should('be.visible');
    surfacePages.manageSurfaceLayerData().click();
    surfacePages.editDataAccount().should('be.visible');
    surfacePages.editDataAccount().click();
    surfacePages.removeDataValueButton().should('be.visible');
    surfacePages.removeDataValueButton().click();
    surfacePages.updateData().should('be.visible');
    surfacePages.updateData().click();
});

Cypress.Commands.add(' deleteDataAccountForSurfaceLayer', (surfaceDta) => {
    surfacePages.surfaceLink().trigger('mouseover');
    surfacePages.surfaceLink().trigger('be.visible');
    surfacePages.surfaceLink().click();
    surfacePages.selectSurfaceLayer().should('be.visible');
    surfacePages.selectSurfaceLayer().click();
    surfacePages.manageSurfaces().click();
    surfacePages.manageSurfaceData().should('be.visible');
    surfacePages.manageSurfaceData().click();
    surfacePages.manageSurfaceLayerData().should('be.visible');
    surfacePages.manageSurfaceLayerData().click();
    surfacePages.deleteSurfaceLayerAccountData().should('be.visible');
    surfacePages.deleteSurfaceLayerAccountData().click();
    surfacePages.confirmDeleteButton().should('be.visible');
    surfacePages.confirmDeleteButton().click();
});

Cypress.Commands.add('  closeDataWindow', (surfaceDta) => {
    surfacePages.closeManageSurfaceWindow().trigger('mouseover');
    // surfacePages.closeManageSurfaceWindow().trigger('be.visible');
    surfacePages.closeManageSurfaceWindow().click();
});

