class awsaccountPage {


    linkInstitutionData() {
        return cy.get('[data-e2e="linkInstitutionData"]')
    }

    connectCloudAccount() {
        return cy.get('a[data-e2e="ConnectCloudAccounts"]')
    }

    awsTab() {
        return cy.xpath(`//sl-tab[.='AWS']`)
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


    selectSurface() {
        return cy.xpath(`//option[contains(.,'${surface}')]`)
    }


    accountGrid() {
        return cy.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]`)
    }


    verifySurface() {
        return cy.xpath(`//section[@class='accounts-grid']/div[contains(.,'${account}')]//label[.='${value}']`)
    }

    awsAccountEditButton() {
        return cy.xpath(`//section[@class='accounts-grid']//div[contains(.,'${account}')]//button[@class='btn btn-sm btn-light']`)
    }

    awsAccountDeleteButton() {
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

    // searchAccount() {
    //     return cy.xpath(`//h5[contains(.,'${awsAccount}')]`)
    // }

    search() {
        return cy.get('[placeholder="Search"]')
    }

    editButton() {
        return cy.get(`[data-e2e="editAwsAccountButton"]`)
    }
    deleteButton() {
        return cy.get(`[data-e2e='deleteAwsAccountButton']`)
    }
    

}



export default awsaccountPage