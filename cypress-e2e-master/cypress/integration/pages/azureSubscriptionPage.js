class azureSubscriptionPage1 {


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
    azureAccountName(){
        return cy.get(`input[data-e2e="inputAzureSubscriptionName"]`)
    }
    azureAccountDescription(){
        return cy.get(`[data-e2e="inputAzureSubscriptionDescription"]`)
    }
    azureSubscriptionId(){
        return cy.get(`input[data-e2e="inputAzureSubscriptionId"]`)
    }
    azureSubscriptionName(){
        return cy.get(`input[data-e2e="inputAzureSubscriptionPrettyName"]`)
    }
    ownigGroupDropDown(){
        return cy.get(`[data-e2e="selectOwningGroup"]`)
    }
    selectOwningGroup(owningGroup){
        return cy.xpath(`//span[.='${owningGroup}']`)
    }
    saveButton(){
        return cy.get(`button[data-e2e="createAzureSubscriptionButton"]`)
    }
    editAccountName(){
        return cy.get(`input[formcontrolname="name"]`)
    }
    editAccountDescription(){
        return cy.get(`[formcontrolname="description"]`)
    }
    closeButton(){ 
        return cy.get(`.close`)
    }
    saveOnEdit(){
        return cy.get(`.mt-2`)
    }
    toast(){
        return cy.get(`#toast-container`)
    }
    search(){
        return cy.get(`[placeholder="Search"]`)
    }
    deleteDropDownButton(){
        return cy.get(`.pos-rel > .btn`)
    }
    confirmDeleteButton(){
        return cy.get(`[data-e2e="confirmDeleteModalBtn"]`)
    }
    searchAccount(azureSubscription){
        return cy.xpath(`//h5[contains(.,'${azureSubscription}')]`)
    }
    editButton(){
        return cy.get(`[data-e2e='editAzureSubscriptionButton']`)
    }
    deleteButton(){
        return cy.get(`[data-e2e='deleteAzureSubscriptionButton']`)
    }
        
}



export default azureSubscriptionPage1