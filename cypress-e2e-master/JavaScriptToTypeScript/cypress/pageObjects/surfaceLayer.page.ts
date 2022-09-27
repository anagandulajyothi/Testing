export class SurfaceLayer {

    toast() {
        return cy.get('#toast-container')
    }
    surfaceMenu() {
        return cy.get('a[data-e2e="linkSurfaces"]')
    }
    surfaceLayerMenu() {
        return cy.get(`[data-e2e='linkSurfaces']`)
    }
    surfaceDropDown() {
        return cy.get('[data-e2e="surfaceSwitcherDropdown"]')
    }
    selectSurface(surface) {
        return cy.xpath(`//h5[.='${surface}']`)
    }
    selectNewSurface(surface) {
        return cy.xpath(`//button[contains(text(),'${surface}')]`)
    }
    selectRootSurfaceLayer(root) {
        return cy.xpath(`//button[@class='btn btn-outline-secondary dropdown-toggle node-menu-btn dropdown-no-caret']`)
    }
    clickRootSurfaceLayer() {
        return cy.get('li.root > .nodecontent > .name')
    }
    dropDownForChildSurfaceLayer() {
        return cy.get('.node-menu-btn')
    }
    addChildSurfaceLayer() {
        return cy.xpath('//div[@class="dropdown-menu show"]//button[contains(.,"Add Child Layer")]')
    }
    clickNewSurfaceLayerIcon() {
        return cy.xpath('//button[@class="btn text-white btn-sm add-child p-0 ng-star-inserted"]/i[@class="ms-Icon ms-Icon--Add"]')
    }
    enterSurfaceLayerName() {
        return cy.get('[placeholder="Surface Layer Name"]')
    }
    enterSurfaceLayerDescription() {
        return cy.get('textarea')
    }
    createButton() {
        return cy.get('[data-e2e="submit"]')
    }
    EditButton() {
        return cy.get('[data-e2e="editSurface"]')
    }
    enterDescriptionOnEdit() {
        return cy.get('#description')
    }
    saveButton() {
        return cy.get('.Save')
    }
    deleteButton() {
        return cy.get('.remove')
    }
    deleteSurfaceLayerButton() {
        return cy.get('.show.dropdown-menu [title="Delete"]')
    }
    confirmSurfaceLayerDelete() {
        return cy.xpath('//p-button[.="Delete"]')
    }
    confirmDelete() {
        return cy.get('.delete')
    }
    manageSurfaceLayers() {
        return cy.get('[data-e2e="manageSurface"]')
    }
    assignAwsAccount() {
        return cy.get('a[data-e2e="addAWSAccountsToSurface"]')
    }
    assignAzureSubscriptions() {
        return cy.get('a[data-e2e="associateAzureSubscriptions"]')
    }
    removeAwsAccount() {
        return cy.get('a[data-e2e="removeAWSAccountsToSurface"]')
    }
    removeAzureSubscriptions() {
        return cy.get('a[data-e2e="removeAzureSubscriptionsToSurface"]')
    }
    azureSubscriptionsDropDown() {
        return cy.get('[placeholder="Select Azure Subscriptions"]')
    }
    enterAzureSubscriptionName() {
        return cy.xpath('//div[@class="ng-select-container"]//input')
    }
    selectAzureSubscription(subscription) {
        return cy.xpath(`//div[.='${subscription}']`)
    }
    awsAccountsDropDown() {
        return cy.get('[placeholder="Select Aws Account"]')
    }
    enterAwsAccountName() {
        return cy.xpath('//div[@class="ng-select-container"]//input[1]')
    }
    selectAwsAccount(account) {
        return cy.xpath(`//span[.='${account}']`)
    }
    blankClick() {
        return cy.get('app-associate-azure-subscription-surface-layer>div:nth-of-type(1)')
    }
    awsBlankClick() {
        return cy.get('app-associate-azure-subscription-surface-layer>div:nth-of-type(1)')
    }
    removeBlankClick() {
        return cy.get('app-remove-azure-subscription-surface-layer>div:nth-of-type(1)')
    }
    awsRemoveBlankClick() {
        return cy.get('app-remove-azure-subscription-surface-layer>div:nth-of-type(1)')
    }
    associateButton() {
        return cy.get('button.mt-2')
    }
    removeButton() {
        return cy.get('button.mt-2')
    }
    serviceProvider() {
        return cy.xpath('//sl-tab[.="Service Providers"]')
    }
    manageAWSAccount() {
        return cy.xpath('//button[contains(.,"Manage AWS Accounts")]')
    }
    manageAzureSubscriptions() {
        return cy.xpath('//button[contains(.,"Manage Azure Subscriptions")]')
    }
    generateReportButton() {
        return cy.get('button[title="Generate Reports"]')
    }
    toster() {
        return cy.get('.toast-message')
    }

    createNewSurfaceLayer(surface, name, description) {
        this.surfaceMenu().trigger('mouseover');
        this.surfaceMenu().should('be.visible');
        this.surfaceMenu().click();
        cy.log('Surface Page Displayed');
        this.selectSurfaceFromDropDown(surface);

        cy.url().then(GetUrl => {
            cy.log("Url Is:" + GetUrl)
            var name = GetUrl.split('surface-list')[0]
            cy.log('name is :' + name)
            cy.visit(name + 'surfaces')
        });

        this.dropDownForChildSurfaceLayer().first().click();
        this.addChildSurfaceLayer().click();
        this.enterSurfaceLayerName().type(name);
        cy.log('Entered Surface Layer Namename');
        this.enterSurfaceLayerDescription().type(description);
        cy.log('Description Entereddescription');
        this.createButton().click();
        cy.log('Surface Drop Down Selected');

    }

    editSurfaceLayer(surface, root, name, description) {
        this.surfaceMenu().trigger('mouseover');
        this.surfaceMenu().should('be.visible');
        this.surfaceMenu().click();
        cy.log('Surface Page Displayed');
        this.selectSurfaceFromDropDown(surface);

        cy.url().then(GetUrl => {
            cy.log("Url Is:" + GetUrl)
            var name = GetUrl.split('surface-list')[0]
            cy.log('name is :' + name)
            cy.visit(name + 'surfaces')
        });

        this.selectRootSurfaceLayer(root).click();
        cy.log('Edit Button Clicked');
        this.manageSurfaceLayers().first().click();
        cy.log('Manage Surface Layers');
        this.EditButton().click();
        cy.log('Edit Button Clicked');
        this.enterDescriptionOnEdit().type(description + ' Updated');

        cy.log('Surface Layer Description Entered: description')
        cy.log('Suface Layer Description Updated');
        this.saveButton().click();
    }

    deleteSurfaceLayer(surface, surfaceLayerName) {
        this.surfaceMenu().trigger('mouseover');
        this.surfaceMenu().should('be.visible');
        this.surfaceMenu().click();
        cy.log('Surface Page Displayed');
        this.selectSurfaceFromDropDown(surface);

        cy.url().then(GetUrl => {
            cy.log("Url Is:" + GetUrl)
            var name = GetUrl.split('surface-list')[0]
            cy.log('name is :' + name)
            cy.visit(name + 'surfaces')
        })

        this.selectRootSurfaceLayer(surfaceLayerName).children().click({ multiple: true });
        cy.log('Surface Layer Selected');
        cy.wait(3000)
        this.deleteSurfaceLayerButton().click();
        cy.log('Clicked On Delete Drop Down');
        this.confirmSurfaceLayerDelete().click();
    }

    selectSurfaceFromDropDown(surfaceName) {
        this.surfaceDropDown().trigger('mouseover');
        this.surfaceDropDown().should('be.visible');
        this.surfaceDropDown().click();
        this.selectSurface(surfaceName).trigger('mouseover');
        this.selectSurface(surfaceName).should('be.visible');
        cy.wait(1000)
        this.selectSurface(surfaceName).click({ multiple: true });
    }
}