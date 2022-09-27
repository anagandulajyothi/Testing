class baseLineAssetsPage {

    baseLineAssetLink() {
        return cy.get('a[data-e2e="linkBaselineAssets"]')
    }

    createNewBaseLine() {
        return cy.get('.btn-primary')
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
        return cy.xpath('//div[@class="ng-option ng-star-inserted"][contains(., "' + account + '")]')
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

    selectAwsResourceType(resourceType) {
        return cy.xpath(`//span[.='${resourceType}']`)
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
}

export default baseLineAssetsPage