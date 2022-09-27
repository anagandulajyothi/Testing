class surfacePage {


    surfaceLink() {
        return cy.get('a[data-e2e="linkSurfaces"]')
    }

    newSurface() {
        return cy.get('[data-e2e="newSurface"]')
    }

    enterSurfaceName() {
        return cy.get('[data-e2e="name"]')
    }

    enterSurfaceDescription() {
        return cy.get('#description')
    }
    groupDropDown() {
        return cy.get('[hideselected="false"] [role="combobox"]')
    }

    enterGroupName() {
        return cy.get('[aria-expanded="true"]')
    }

    selectGroup() {
        return cy.get('[role="option"] > span')
        // [role='option'] > span
        //   return cy.get('//*/div[@role="option"]//span[contains(text(),"E2E Admin")]')
    }

    createNewGroupChekBox() {
        return cy.get('#createGroup')
    }

    createButton() {
        return cy.get('.Create')
    }
    editSurfaceButton() {
        return cy.get('button[data-e2e="editSurface"]')
    }

    saveButton() {
        return cy.get('.Save')
    }

    editAllowedGroupsButton() {
        return cy.get('[data-e2e="addGroupsToSurface"]')
    }

    associateGroupDropDown() {
        return cy.get('[data-e2e="assignGroupsSelect"]')
    }

    surfacelist() {
        return cy.get('[data-e2e="surfaceInfo"]')
    }

    lists() {
        return cy.get('[data-e2e="surfaceInfo"]')
    }

    deleteButton() {
        return cy.get('[data-e2e="deleteSurface"]')
    }

    confirmDeleteButton() {
        return cy.get('//button[@data-e2e="confirmDeleteModalBtn"][contains(text(),"Delete")]')
    }

    blankClick() {
        return cy.get('.pos-rel > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    surfaceDropDown() {
        return cy.get('[data-e2e="surfaceSwitcherDropdown"]')
    }

    selectSurface(surface) {
        return cy.xpath(`//h5[.='${surface}']`)
    }

    manageSurfaceData() {
        return cy.get('a[data-e2e="manageDataSurface"]')
    }

    manageSurfaceLayerData() {
        return cy.get('//button[contains(.,"Manage Surface Layer Data")]')
    }

    addDataButton() {
        return cy.get('button[title="Manage Surface Layer Data"]')
    }

    addDataButtonForSurfaceLayer() {
        return cy.get('//button[@class="btn btn-primary ng-star-inserted"]')
    }

    surfaceDataDropDown() {
        return cy.get('//ng-select[@name="selectInstData"]')
    }

    surfaceLayerDataDropDown() {
        return cy.get('ng-select[name="selectInstData"] > div > span')
    }

    selectDataAccount() {
        // return cy.get('//span[.='${account}']')
    }

    enterKey() {
        return cy.get('[placeholder="Key"]')
    }

    enterValue() {
        return cy.get('[placeholder="Value"]')
    }

    createDataButton() {
        return cy.get('button.ml-auto')
    }

    updateKey() {
        // return cy.get('.form-group > div:nth-of-type(2) [placeholder='Key']')
    }

    updateValue() {
        // return cy.get('.form-group > div:nth-of-type(2) [placeholder='Value']')
    }

    editDataAccount() {
        // return cy.get('button[title='Edit Data']')
    }

    deleteAccountData() {
        // return cy.get('button[title='Delete Data']')
    }

    deleteSurfaceLayerAccountData() {
        return cy.get('.fa-trash-alt')
    }

    addDataValueButton() {
        return cy.get('.fa-plus-circle')
    }

    removeDataValueButton() {
        return cy.get('.form-group > div:nth-of-type(${value}) .btn')
    }

    updateData() {
        return cy.get('button.ml-auto')
    }

    closeManageSurfaceWindow() {
        return cy.get('.close')
    }

    selectSurfaceLayer() {
        // return cy.get('//a[.='${surfaceLayer}']')
    }

    surfaceLayerManageData() {
        return cy.get('button[title="Manage Surface Layer Data"]')
    }

    addDataForSurfaceLayer() {
        return cy.get('//button[contains(.,"Add Data")]')
    }

    editDataForSurfaceLayer() {
        // return cy.get('//ul[@class='list-group ng-star-inserted']/li[${value}]//button[@class='btn btn-primary ng-star-inserted']')
    }

    deleteDataForSurfaceLayer() {
        // return cy.get('//ul[@class='list-group ng-star-inserted']/li[${value}]//button[@class='btn btn-primary btn-danger ng-star-inserted']')
    }

    assignAWSAccountsButton() {
        return cy.get('[data-e2e="addAWSAccountsToSurface"]')
    }

    awsAccountsDropDown() {
        return cy.get('[placeholder="Select Aws Account"]')
    }

    enterawsAccountName() {
        return cy.xpath('//div[@class="ng-select-container"]//input[1]')
    }

    selectAWSAccount(awsAccount) {
        return cy.xpath(`//span[.='${awsAccount}']`)
    }

    saveAWSAccount() {
        return cy.xpath('//button[@class="btn btn-primary mt-2"]')
    }

    removeAWSAccountsButton() {
        return cy.get('[data-e2e="removeAWSAccountsToSurface"]')
    }

    selectAWSAccountToRemove() {
        // return cy.get('//span[.='${awsAccount}']')
    }

    disableAWSAccount() {
        return cy.xpath('//button[@class="btn btn-primary mt-2"]')
    }

    manageSurfaces() {
        return cy.xpath(`//button[contains(text(),'Manage Surface')]`)
    }

    assignAzureSubscription() {
        return cy.get('[data-e2e="associateAzureSubscriptions"]')
    }

    removeAzureSubscription() {
        return cy.get('[data-e2e="removeAzureSubscriptionsToSurface"]')
    }

    azureSubscriptionsDropDown() {
        return cy.get('[placeholder="Select Azure Subscriptions"]')
    }

    selectAzureSubscription(subscription) {
        return cy.xpath(`//strong[.='${subscription}']`)
    }

    enterSubscriptionName() {
        return cy.xpath('//div[@class="ng-select-container"]//input[1]')
    }

    selectAzureSubscriptionToRemove(subscription) {
        return cy.xpath(`//span[.='${subscription}']`)
    }

    azureBlankClick() {
        return cy.get('.modal-body > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    azureBlankClick1() {
        return cy.get('.modal-body > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }


    associateButton() {
        return cy.get('button.mt-2')
    }

    removeButton() {
        return cy.get('button.mt-2')
    }

    toster() {
        return cy.get('.toast-message')
    }

    saveButton() {
        return cy.get('.Save')
    }

    searchButton() {
        return cy.get('.form-control')
    }

    selectAttributeTag(name) {
        return cy.xpath(`//h5[contains(.,'${name}')]`)
    }

    editButton() {
        return cy.get('[data-e2e="editAttributeTagButton"]')
    }
    dashBoard() {
        return cy.get('[data-e2e="linkDashboard"]')
    }

    deleteDropDown() {
        return cy.get('.pos-rel > .btn')
    }

    deleteTagButton() {
        return cy.get('[data-e2e="deleteAttributeTagButton"]')
    }

    confirmDeleteButton() {
        return cy.get('[data-e2e="confirmDeleteModalBtn"]')
    }

}

export default surfacePage