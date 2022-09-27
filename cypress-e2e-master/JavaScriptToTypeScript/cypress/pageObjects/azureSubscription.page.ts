export class azureSubscriptionPage {

    linkInstitutionData() {
        return cy.get('[data-e2e="linkInstitutionData"]')
    }

    connectCloudAccount() {
        return cy.get('a[data-e2e="ConnectCloudAccounts"]')
    }

    azureTab() {
        return cy.xpath(`//sl-tab[.="Azure"]`)
    }

    newAzureAccount() {
        return cy.get(`[data-e2e="newAzureSubscription"]`)
    }
    // newAzureAccount(){
    //     return cy.xpath(`//button[contains(.,"New Azure Subscription")]`)
    // }
    azureAccountName() {
        return cy.get(`input[data-e2e="inputAzureSubscriptionName"]`)
    }

    azureAccountDescription() {
        return cy.get(`[data-e2e="inputAzureSubscriptionDescription"]`)
    }

    azureSubscriptionId() {
        return cy.get(`input[data-e2e="inputAzureSubscriptionId"]`)
    }

    azureSubscriptionName() {
        return cy.get(`input[data-e2e="inputAzureSubscriptionPrettyName"]`)
    }

    ownigGroupDropDown() {
        return cy.get(`[data-e2e="selectOwningGroup"]`)
    }

    selectOwningGroup(owningGroup) {
        return cy.xpath(`//span[.='${owningGroup}']`)
    }

    saveButton() {
        return cy.get(`button[data-e2e="createAzureSubscriptionButton"]`)
    }

    editAccountName() {
        return cy.get(`input[formcontrolname="name"]`)
    }

    editAccountDescription() {
        return cy.get(`[formcontrolname="description"]`)
    }

    closeButton() {
        return cy.get(`.close`)
    }

    saveOnEdit() {
        return cy.get(`.mt-2`)
    }

    toast() {
        return cy.get(`#toast-container`)
    }

    search() {
        return cy.get(`[placeholder="Search"]`)
    }

    deleteDropDownButton() {
        return cy.get(`.pos-rel > .btn`)
    }

    confirmDeleteButton() {
        return cy.get(`[data-e2e="confirmDeleteModalBtn"]`)
    }

    searchAccount(azureSubscription) {
        return cy.xpath(`//h5[contains(.,'${azureSubscription}')]`)
    }

    editButton() {
        return cy.get(`[data-e2e='editAzureSubscriptionButton']`)
    }

    deleteButton() {
        return cy.get(`[data-e2e='deleteAzureSubscriptionButton']`)
    }

    createNewAzureAccount(azureAccountName, azureAccountDescription, azureSubscriptionName, azureSubscriptionId, owningGroup)  {
        this.linkInstitutionData().trigger('mouseover');
        this.linkInstitutionData().should('be.visible');
        this.linkInstitutionData().click();
        this.connectCloudAccount().click();
        this.connectCloudAccount().click();
        this.azureTab().click();
        this.newAzureAccount().click();
        this.azureAccountName().type(azureAccountName);
        this.azureAccountDescription().type(azureAccountDescription);
        this.azureSubscriptionName().type(azureSubscriptionName);
        this.azureSubscriptionId().type(azureSubscriptionId);
        this.ownigGroupDropDown().should('be.visible');
        this.ownigGroupDropDown().click();
        this.selectOwningGroup(owningGroup).trigger('mouseover');
        this.selectOwningGroup(owningGroup).should('be.visible');
        this.selectOwningGroup(owningGroup).click();
        this.saveButton().click();
    }
    
    searchAzureSubscription(azureSubscriptionName)  {
        this.linkInstitutionData().trigger('mouseover');
        this.linkInstitutionData().should('be.visible');
        this.linkInstitutionData().click();
        this.connectCloudAccount().click();
        this.azureTab().click();
        this.search().should('be.visible');
        this.search().clear();
        this.search().type(azureSubscriptionName);
        this.searchAccount(azureSubscriptionName).click();
    }
    
    editAzureAccount(azureAccountName, azureAccountDescription)  {
        this.searchAzureSubscription(azureAccountName);
        this.editButton().trigger('mouseover');
        this.editButton().click();
        this.editAccountName().should('be.visible');
        this.editAccountName().type('Updated');
        this.editAccountDescription().should('be.visible');
        this.editAccountDescription().type('Updated');
        this.saveOnEdit().should('be.visible');
        this.saveOnEdit().click();
    }
    
    deleteAzureAccount()  {
        this.deleteDropDownButton().trigger('mouseover');
        this.deleteDropDownButton().click();
        this.deleteButton().trigger('mouseover');
        this.deleteButton().click();
        this.confirmDeleteButton().click();
    }
}