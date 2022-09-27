export class baseLineAssetsPage {

    baseLineAssetLink() {
        return cy.get('a[data-e2e="linkBaselineAssets"]')
    }

    createNewBaseLine() {
        return cy.get('[data-e2e="newBaselineButton"]')
    }

    enterBaseLineName() {
        return cy.get('[data-e2e="name"]')
    }

    enterBaseLineDescription() {
        return cy.get('[data-e2e="description"]')
    }

    ownigGroupDropDown() {
        return cy.get('[placeholder="Select Owning Group"]')
    }

    selectOwningGroup(value) {
        return cy.xpath('//span[contains(., "' + value + '")]')
    }

    createButton() {
        return cy.get('button[data-e2e="createBaseLine"]')
    }

    search() {
        return cy.get('[placeholder="Search"]')
    }

    SelectSearchData(data) {
        return cy.xpath('//h5[contains(., "' + data + '")]')
    }

    awsTab() {
        return cy.xpath('//a[contains(.,"AWS")]')
    }

    editAwsButton() {
        return cy.get('button[title="Edit AWS"]')
    }

    awsAccountDropDown() {
        return cy.get('ng-select[data-e2e="accountIds"]')
    }

    selectAWSAccount(account) {
        return cy.xpath('//div[@class="ng-option ng-star-inserted ng-option-marked"][contains(., "' + account + '")]')
    }

    ClickAWsResources() {
        return cy.xpath('//h5[normalize-space()="AWS Resources"]')
    }

    awsRegionDropDown() {
        return cy.get('ng-select[data-e2e="regions"]')
    }

    selectAWSRegion(region) {
        return cy.xpath('//span[contains(., "' + region + '")]')
    }

    awsProductsDropDown() {
        return cy.get('ng-select[data-e2e="products"]')
    }

    selectAwsProduct(product) {
        return cy.xpath(`//span[.='${product}']`)
    }

    awsResourceTypeDropDown() {
        return cy.get('ng-select[data-e2e="resourceTypes"]')
    }

    selectAwsResourceType(resourceType) {
        return cy.xpath(`//span[.='${resourceType}']`)
    }

    awsTagDropDown() {
        return cy.get('ng-select[data-e2e="awsResourceTags"] > div > span')
    }

    selectAwsTag(tag) {
        return cy.xpath(`//span[.='${tag}']`)
    }

    awsTagValueDropDown() {
        return cy.get('ng-select[data-e2e="awsResourceTagValue"] > div > span')
    }


    tagValueDropDown() {
        return cy.get('div.resource-tag-container > [multiple="true"] > div > span')
    }

    selectValue(value) {
        return cy.xpath(`//span[.='${value}']`)
    }

    addTagButton() {
        return cy.get('[data-e2e="addTag"]')
    }


    save() {
        return cy.xpath(' //button[normalize-space()="Save"]')
    }

    editBaseLineButton() {
        return cy.get('[data-e2e="editBaselineButton"]')
    }

    status(status) {
        return cy.xpath('//input[@value="' + status + '"]')
    }

    SelectMinor() {
        return cy.xpath('//input[@value="MINOR"]')
    }

    publishversion() {
        return cy.xpath('//span[normalize-space()="Publish Version"]')
    }

    deleteMenu() {
        return cy.get('.pos-rel > .btn > .ms-Icon')
    }

    deleteOption() {
        return cy.get('button[title="Delete Baseline"]')
    }

    deleteConfirmation() {
        return cy.xpath('//span[contains(., "Delete")]')
    }

    createBaseLine(baselinename, baselinedesc, Owningvalue) {
        this.baseLineAssetLink().click()
        this.createNewBaseLine().click()
        this.enterBaseLineName().type(baselinename)
        this.enterBaseLineDescription().type(baselinedesc)
        this.ownigGroupDropDown().click()
        this.selectOwningGroup(Owningvalue).click()
        this.createButton().click()
    }

    editAWS(data, account, region, product, resourceType, tag, value) {
        this.search().clear()
        this.search().type(data)
        this.SelectSearchData(data).click()
        this.awsTab().click()
        this.editAwsButton().click()
        this.awsAccountDropDown().click()
        this.awsAccountDropDown().type(account)
        // this.selectAWSAccount(account).trigger('mouseover')
        // this.selectAWSAccount(account).should('be.visible')
        this.selectAWSAccount(account).click()
        this.ClickAWsResources().click()
        this.awsRegionDropDown().click()
        this.awsRegionDropDown().type(region)
        this.selectAWSRegion(region).click()
        cy.wait(1000)
        this.awsProductsDropDown().click()
        cy.wait(1000)
        this.awsProductsDropDown().type(product)
        cy.wait(5000)
        this.selectAwsProduct(product).click()
        cy.wait(2000)
        this.awsResourceTypeDropDown().click()
        cy.wait(1000)
        this.selectAwsResourceType(resourceType).click()
        cy.wait(1000)
        this.ClickAWsResources().click()
        this.awsTagDropDown().click()
        this.selectAwsTag(tag).click()
        this.tagValueDropDown().click()
        this.selectValue(value).click()
        this.addTagButton().click()
        cy.wait(2000)
        this.save().click()
    }

    editBaseLineAsset(data, baselinename, baselinedesc, status) {
        this.search().clear()
        this.search().type(data)
        this.SelectSearchData(data).click()
        this.editBaseLineButton().click()
        this.enterBaseLineName().clear()
        this.enterBaseLineName().type(baselinename + 'Updated')
        this.enterBaseLineDescription().clear()
        this.enterBaseLineDescription().type(baselinedesc + 'Updated')
        if (status = 'PUBLISHED') {
            this.status(status).check()
            this.SelectMinor().check()
        }
        this.status(status).check()
        this.publishversion().click()
    }

    editBaseLineAssetStatus(data, baselinename, baselinedesc, status) {
        this.search().clear()
        this.search().type(data)
        this.SelectSearchData(data).click()
        this.editBaseLineButton().click()
        this.enterBaseLineName().clear()
        this.enterBaseLineName().type(baselinename + ' Updated')
        this.enterBaseLineDescription().clear()
        this.enterBaseLineDescription().type(baselinedesc + ' Updated')
        if (status = 'PUBLISHED') {
            this.status(status).check()
        }
        this.publishversion().click()
    }

    deleteBaseLine(data) {
        this.search().clear()
        this.search().type(data)
        this.SelectSearchData(data).click()
        this.deleteMenu().click()
        this.deleteOption().click()
        this.deleteConfirmation().click()
    }

    deleteNegativeBaseLine(data) {
        this.baseLineAssetLink().click()
        this.search().clear()
        this.search().type(data)
        this.SelectSearchData(data).click()
        this.deleteMenu().click()
        this.deleteOption().click()
        this.deleteConfirmation().click()
    }

    verifyBaseLine(data) {
        this.search().clear()
        this.search().type(data)
        //cy.xpath('[class="card no-results-container ng-tns-c212-0 ng-star-inserted"]').should('be.visible')
    }

    verifySavedAwsFiltersOnEdit(data) {
        this.search().clear()
        this.search().type(data)
        this.SelectSearchData(data).click()
        this.awsTab().click()
        this.editAwsButton().click()
    }
}