class assetsManagerPage {

    selectStatus(value) {
        return cy.xpath('//label[contains(text(),"' + value + '")]')
    }
    selectIncrementBy(incrementvalue) {
        return cy.xpath('//label[contains(text(),"' + incrementvalue + '")]')
    }

    clickassetsManagerMenu() {
        return cy.get('a[data-e2e="linkAssets"]')
    }

    createNewAssets() {
        return cy.get('[data-e2e="newAssetButton"]')
    }

    enterAssetName() {
        return cy.get('[data-e2e="inputAssetName"]')
    }

    assetDescription() {
        return cy.get('[data-e2e="inputAssetDescription"]')
    }

    selectOwningGroup() {
        return cy.get('ng-select[data-e2e="selectAssetOwningGroup"]')
    }

    selectOwingGroupOption(optionvalue) {
        return cy.xpath('//span[contains(., "' + optionvalue + '")]')
    }

    selectAttributeTags() {
        return cy.get('ng-select[data-e2e="inputAssetAttributeTags"]')
    }

    inputAttributeTags() {
        return cy.get(':nth-child(4) > .pos-rel > .ng-select > .ng-select-container > .ng-value-container > .ng-input > input')
    }

    selectAttributeTagsOption(attributevalue) {
        return cy.xpath('//span[contains(., "' + attributevalue + '")]')
    }

    selectCloudProvider(cloudvalue) {
        // return cy.get('[value="' + cloudvalue + '"]')
        return cy.get('[data-e2e="' + cloudvalue + '"]')
    }

    fileUpload() {
        return cy.get('[data-e2e="fileAssetUpload"]')
    }

    nextbtn() {
        return cy.get('[data-e2e="next"]')
    }

    submitbtn() {
        return cy.get('[data-e2e="submit"]')
    }

    publishButton() {
        return cy.get('.btn-publish')
    }

    search() {
        return cy.xpath('(//input[@placeholder="Search"])[1]')
    }

    selectSearchData(name) {
        return cy.xpath(`(//h5[contains(.,'${name}')])[1]`)
    }

    clickEditBtn() {
        return cy.get('.ms-Icon.ms-Icon--Edit')
    }

    closeEnclaveModel() {
        return cy.get('.ms-Icon.ms-Icon--ChromeClose')
    }

    deleteDropDown() {
        return cy.get('.pos-rel > .btn > .ms-Icon')
    }

    deleteButton() {
        return cy.get('[data-e2e="deleteAssetButton"]')

    }
    confirmDeleteButton() {
        return cy.get('[data-e2e="confirmDeleteModalBtn"]')
    }

    clearsearchdata() {
        return cy.xpath('(//button[contains(.,"Clear")])[1]')
    }

    ClickAddNestedTemplate() {
        return cy.get('[data-e2e="addNestedTemplate"]')
    }

    uploadNestedTemplate(index) {
        return cy.xpath('(//input[@class="form-control"])[' + index + ']')
    }
}

export default assetsManagerPage