export class surfacePage {

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

    // confirmDeleteButton() {
    //     return cy.get('//button[@data-e2e="confirmDeleteModalBtn"][contains(text(),"Delete")]')
    // }

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

    createNewSurface(surfaceName, SurfaceDescription, groupName) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.newSurface().click();
        this.enterSurfaceName().type(surfaceName);
        this.enterSurfaceDescription().type(SurfaceDescription)
        this.groupDropDown().should('be.visible');
        this.groupDropDown().click();
        this.enterGroupName().type(groupName);
        this.selectGroup().should('be.visible');
        this.selectGroup().click();
        this.blankClick().click();
        this.createNewGroupChekBox().check()
        this.createButton().click();
    }

    editSurface(surfaceName) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.selectSurfaceFromDropDown(surfaceName);

        cy.url().then((url) => {
            var surfaceList = url.split('surface-list')[0]
            cy.log('Name is :' + surfaceList)
            cy.visit(surfaceList + 'surfaces')
        })

        this.manageSurfaces().click();
        this.editSurfaceButton().click();
        this.enterSurfaceDescription().type(' Updated');
        this.saveButton().click();
    }

    deleteSurface(surfaceName) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.selectSurfaceFromDropDown(surfaceName);

        cy.url().then((url) => {
            var surfaceList = url.split('surface-list')[0]
            cy.log('Name is :' + surfaceList)
            cy.visit(surfaceList + 'surfaces')
        })

        this.manageSurfaces().click();
        this.deleteButton().should('be.visible');
        this.deleteButton().click();
        this.confirmDeleteButton().should('be.visible');
        this.confirmDeleteButton().click();
    }

    verifySurface(surfaceName) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.surfaceDropDown().should('be.visible');
        this.surfaceDropDown().click();
    }

    assignAWSAccountsToSurface(surfaceName, awsAccount) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.selectSurfaceFromDropDown(surfaceName);
        cy.wait(2000)
        cy.url().then((url) => {
            var surfaceList = url.split('surface-list')[0]
            cy.log('Name is :' + surfaceList)
            cy.visit(surfaceList)
        })

        this.manageSurfaces().click();
        this.assignAWSAccountsButton().should('be.visible');
        this.assignAWSAccountsButton().click();
        this.awsAccountsDropDown().should('be.visible');
        this.awsAccountsDropDown().click();
        this.enterawsAccountName().type(awsAccount)
        this.selectAWSAccount(awsAccount).trigger('mouseover');
        this.selectAWSAccount(awsAccount).should('be.visible');
        this.selectAWSAccount(awsAccount).click();
        this.saveAWSAccount().click();
    }

    removeAWSAccountsFromSurface(surfaceName, awsAccount) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.selectSurfaceFromDropDown(surfaceName);
        cy.wait(2000)
        cy.url().then((text) => {
            var surfaceList = text.split('surface-list')[0]
            cy.log('Name is :' + surfaceList)
            cy.visit(surfaceList)
        })

        this.manageSurfaces().click();
        this.removeAWSAccountsButton().should('be.visible');
        this.removeAWSAccountsButton().click();
        this.awsAccountsDropDown().should('be.visible');
        this.awsAccountsDropDown().click();
        this.enterawsAccountName().type(awsAccount)
        this.selectAWSAccount(awsAccount).trigger('mouseover');
        this.selectAWSAccount(awsAccount).should('be.visible');
        this.selectAWSAccount(awsAccount).click();
        this.disableAWSAccount().click();
    }

    assignAzureSubscriptionToSurface(surfaceName, azureSubscription) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.selectSurfaceFromDropDown(surfaceName);

        cy.url().then((url) => {
            var surfaceList = url.split('surface-list')[0]
            cy.log('Name is :' + surfaceList)
            cy.visit(surfaceList + 'surfaces')
        })

        this.manageSurfaces().click();
        this.assignAzureSubscription().should('be.visible');
        this.assignAzureSubscription().click();
        this.azureSubscriptionsDropDown().should('be.visible');
        this.azureSubscriptionsDropDown().click();
        this.enterSubscriptionName().type(azureSubscription)
        this.selectAzureSubscription(azureSubscription).trigger('mouseover');
        this.selectAzureSubscription(azureSubscription).should('be.visible');
        this.selectAzureSubscription(azureSubscription).click();
        this.azureBlankClick().click();
        this.associateButton().click();
    }

    removeAzureSubscriptionFromSurface(surfaceName, azureSubscription) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.selectSurfaceFromDropDown(surfaceName);

        cy.url().then((url) => {
            var surfaceList = url.split('surface-list')[0]
            cy.log('Name is :' + surfaceList)
            cy.visit(surfaceList + 'surfaces')
        })

        this.manageSurfaces().click();
        this.removeAzureSubscription().should('be.visible');
        this.removeAzureSubscription().click();
        this.azureSubscriptionsDropDown().should('be.visible');
        this.azureSubscriptionsDropDown().click();
        this.enterSubscriptionName().type(azureSubscription)
        this.selectAzureSubscriptionToRemove(azureSubscription).trigger('mouseover');
        this.selectAzureSubscriptionToRemove(azureSubscription).should('be.visible');
        this.selectAzureSubscriptionToRemove(azureSubscription).click();
        // this.azureBlankClick().click();
        this.removeButton().click();
    }

    createDataForSurface(surfaceDta) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.manageSurfaces().click();
        this.manageSurfaceData().should('be.visible');
        this.manageSurfaceData().click();
        this.addDataButton().should('be.visible');
        this.addDataButton().click();
        this.surfaceDataDropDown().should('be.visible');
        this.surfaceDataDropDown().click();
        // this.selectDataAccount().should('be.visible');
        // this.selectDataAccount().click();
        // this.selectDataAccount().should('be.visible');
        // this.selectDataAccount().click();
        // this.enterKey().should('be.visible');
        // this.enterKey().click();
        // this.enterKey().type(surfaceDta.dataKey + uniqueId);
        // this.enterValue().should('be.visible');
        // this.enterValue().click();
        // this.enterValue().type(surfaceDta.keyValue + uniqueId);
        this.createDataButton().click()
    }

    editDataForSurface(surfaceDta) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.manageSurfaces().click();
        this.manageSurfaceData().should('be.visible');
        this.manageSurfaceData().click();
        // this.editDataAccount().click();
        // this.updateKey().should('be.visible');
        // this.updateKey().click();
        // this.updateKey().type(surfaceDta.dataKey + uniqueId);
        // this.updateValue().should('be.visible');
        // this.updateValue().click();
        // this.updateValue().type(surfaceDta.keyValue + uniqueId);
        this.updateData().should('be.visible');
        this.updateData().click();

    }
    RemoveDataValueFromSrfaceData(surfaceDta) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.manageSurfaces().click();
        this.manageSurfaceData().should('be.visible');
        this.manageSurfaceData().click();
        // this.editDataAccount().click();
        this.removeDataValueButton().should('be.visible');
        this.removeDataValueButton().click();
        this.updateData().should('be.visible');
        this.updateData().click();
    }

    deleteDataAccount(surfaceDta) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        this.manageSurfaces().click();
        this.manageSurfaceData().should('be.visible');
        this.manageSurfaceData().click();
        // this.deleteAccountData().should('be.visible');
        // this.deleteAccountData().click();
        this.confirmDeleteButton().should('be.visible');
        this.confirmDeleteButton().click();
    }

    createDataForSurfaceLayer(surfaceDta) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        // this.selectSurfaceLayer().should('be.visible');
        // this.selectSurfaceLayer().click();
        this.manageSurfaces().click();
        this.manageSurfaceData().should('be.visible');
        this.manageSurfaceData().click();
        this.manageSurfaceLayerData().should('be.visible');
        this.manageSurfaceLayerData().click();
        this.addDataButtonForSurfaceLayer().should('be.visible');
        this.addDataButtonForSurfaceLayer().click();
        this.surfaceLayerDataDropDown().should('be.visible');
        this.surfaceLayerDataDropDown().click();
        // this.selectDataAccount().should('be.visible');
        // this.selectDataAccount().click();
        // this.selectDataAccount().should('be.visible');
        // this.selectDataAccount().click();
        // this.enterKey().type(surfaceDta.dataKey + uniqueId);
        // this.enterValue().should('be.visible');
        // this.enterValue().click();
        // this.enterValue().type(surfaceDta.keyValue + uniqueId);
        this.createDataButton().click()
    }

    updateDataForSurfaceLayer(surfaceDta) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        // this.selectSurfaceLayer().should('be.visible');
        // this.selectSurfaceLayer().click();
        this.manageSurfaces().click();
        this.manageSurfaceData().should('be.visible');
        this.manageSurfaceData().click();
        this.manageSurfaceLayerData().should('be.visible');
        this.manageSurfaceLayerData().click();
        // this.editDataAccount().should('be.visible');
        // this.editDataAccount().click();
        // this.updateKey().should('be.visible');
        // this.updateKey().click();
        // this.updateKey().type(surfaceDta.dataKey + uniqueId);
        // this.updateValue().should('be.visible');
        // this.updateValue().click();
        // this.updateValue().type(surfaceDta.keyValue + uniqueId);
        this.updateData().should('be.visible');
        this.updateData().click();
    }

    RemoveDataValueFromSrfaceLayerData(surfaceDta) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        // this.selectSurfaceLayer().should('be.visible');
        // this.selectSurfaceLayer().click();
        this.manageSurfaces().click();
        this.manageSurfaceData().should('be.visible');
        this.manageSurfaceData().click();
        this.manageSurfaceLayerData().should('be.visible');
        this.manageSurfaceLayerData().click();
        // this.editDataAccount().should('be.visible');
        // this.editDataAccount().click();
        this.removeDataValueButton().should('be.visible');
        this.removeDataValueButton().click();
        this.updateData().should('be.visible');
        this.updateData().click();
    }

    deleteDataAccountForSurfaceLayer(surfaceDta) {
        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().trigger('be.visible');
        this.surfaceLink().click();
        // this.selectSurfaceLayer().should('be.visible');
        // this.selectSurfaceLayer().click();
        this.manageSurfaces().click();
        this.manageSurfaceData().should('be.visible');
        this.manageSurfaceData().click();
        this.manageSurfaceLayerData().should('be.visible');
        this.manageSurfaceLayerData().click();
        this.deleteSurfaceLayerAccountData().should('be.visible');
        this.deleteSurfaceLayerAccountData().click();
        this.confirmDeleteButton().should('be.visible');
        this.confirmDeleteButton().click();
    }

    closeDataWindow(surfaceDta) {
        this.closeManageSurfaceWindow().trigger('mouseover');
        // this.closeManageSurfaceWindow().trigger('be.visible');
        this.closeManageSurfaceWindow().click();
    }

    selectSurfaceFromDropDown(surfaceName) {
        this.surfaceDropDown().trigger('mouseover');
        this.surfaceDropDown().should('be.visible');
        this.surfaceDropDown().click();
        // this.selectSurface(surfaceName).trigger('mouseover');
        this.selectSurface(surfaceName).should('be.visible');
        cy.wait(1000)
        this.selectSurface(surfaceName).click({ multiple: true });
    }
}
