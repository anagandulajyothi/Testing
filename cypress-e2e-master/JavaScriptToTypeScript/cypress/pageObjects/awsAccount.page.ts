export class awsAccountPage {


    linkInstitutionData() {
        return cy.get('[data-e2e="linkInstitutionData"]')
    }

    connectCloudAccount() {
        return cy.get('a[data-e2e="ConnectCloudAccounts"]')
    }

    awsTab() {
        return cy.xpath(`//div[.='AWS']`)
    }

    newAWSAccount() {
        return cy.get(`[data-e2e="newAWSAccount"]`)
    }

    awsAccountName() {
        return cy.get(`input[data-e2e="inputAwsAccountName"]`)
    }

    awsAccountDescription() {
        return cy.get(`[data-e2e="inputAwsAccountDescription"]`)
    }


    awsAccountId() {
        return cy.get(`input[data-e2e="inputAwsAccountId"]`)
    }
    ownigGroupDropDown() {
        return cy.get(`[data-e2e="selectOwningGroup"]`)
    }

    selectOwningGroup(owningGroup) {
        return cy.xpath(`//span[.='${owningGroup}']`)
    }

    editAccountName() {
        return cy.get(`input[formcontrolname="name"]`)
    }

    editAccountDescription() {
        return cy.get(`[formcontrolname="description"]`)
    }

    closeButton() {
        return cy.get('.close')
    }

    saveButton() {
        return cy.get('[data-e2e="createAwsAccountButton"]')
    }

    saveOnEdit() {
        return cy.get('.mt-2')
    }

    toast() {
        return cy.get('#toast-container')
    }

    lists() {
        return cy.get('.app-container')
    }

    surfaceDropDown() {
        return cy.get('[data-e2e="surfaceSwitcherDropdown"]')
    }


    selectSurface(surface) {
        return cy.xpath(`//option[contains(.,'${surface}')]`)
    }


    accountGrid(account) {
        return cy.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]`)
    }


    verifySurface(account, value) {
        return cy.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]//label[.='${value}']`)
    }

    awsAccountEditButton(account) {
        return cy.xpath(`//section[@class='accounts-grid']//div[contains(.,'${account}')]//button[@class='btn btn-sm btn-light']`)
    }

    awsAccountDeleteButton(account) {
        return cy.xpath(`//section[@class='accounts-grid']//div[contains(.,'${account}')]//button[@class='btn btn-sm btn-danger']`)
    }

    deleteDropDownButton() {
        return cy.get('.pos-rel > .btn')
    }

    confirmDeleteButton() {
        return cy.get('[data-e2e="confirmDeleteModalBtn"]')
    }

    searchAccount(awsAccount) {
        return cy.xpath(`//h5[contains(.,'${awsAccount}')]`)
    }

    search() {
        return cy.get('[placeholder="Search"]')
    }

    editButton() {
        return cy.get(`[data-e2e="editAwsAccountButton"]`)
    }
    deleteButton() {
        return cy.get(`[data-e2e='deleteAwsAccountButton']`)
    }

    createNewCloudAccount(awsAccountName, awsAccountDescription, awsAccountId, owningGroup) {
        this.linkInstitutionData().trigger('mouseover');
        this.linkInstitutionData().should('be.visible');
        this.linkInstitutionData().click();
        this.connectCloudAccount().click();
        this.connectCloudAccount().click();
        this.awsTab().click();
        this.newAWSAccount().click();
        this.awsAccountName().type(awsAccountName);
        this.awsAccountDescription().type(awsAccountDescription);
        this.awsAccountId().type(awsAccountId);
        this.ownigGroupDropDown().should('be.visible');
        this.ownigGroupDropDown().click();
        this.selectOwningGroup(owningGroup).trigger('mouseover');
        this.selectOwningGroup(owningGroup).click();
        this.saveButton().click();
    }

    searchAwsAccount(awsAccountName) {
        this.linkInstitutionData().trigger('mouseover');
        this.linkInstitutionData().should('be.visible');
        this.linkInstitutionData().click();
        this.connectCloudAccount().click();
        this.awsTab().click();
        this.search().should('be.visible');
        this.search().clear();
        this.search().type(awsAccountName);
        this.searchAccount(awsAccountName).click();
    }

    editAWSAccount(awsAccountName, awsAccountDescription) {
        this.searchAwsAccount(awsAccountName);
        this.editButton().trigger('mouseover');
        this.editButton().click();
        this.editAccountName().should('be.visible');
        this.editAccountName().type('Updated');
        this.editAccountDescription().should('be.visible');
        this.editAccountDescription().type('Updated');
        this.saveOnEdit().should('be.visible');
        this.saveOnEdit().click();
    }

    deleteAWSAccount() {
        this.deleteDropDownButton().trigger('mouseover');
        this.deleteDropDownButton().click();
        this.deleteButton().trigger('mouseover');
        this.deleteButton().click();
        // this.confirmDeleteButton.should('be.visible');
        this.confirmDeleteButton().click();
    }
}
