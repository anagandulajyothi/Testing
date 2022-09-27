export class assetsManagerPage {

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

    createEnclaveModel(status, name, description, owingGroup, attributeTag, cloudvalue, file) {

        this.clickassetsManagerMenu().trigger('mouseover')
        this.clickassetsManagerMenu().should('be.visible')
        this.clickassetsManagerMenu().click()
        cy.wait(2000)
        this.createNewAssets().click()
        cy.wait(1000)
        if (status == 'Published') {
            this.selectStatus(status).click()
            this.selectIncrementBy('Minor').click()
        }
        this.selectStatus(status).click()
        cy.wait(1000)
        this.enterAssetName().type(name)
        this.assetDescription().type(description)
        cy.wait(1000)
        this.selectOwningGroup().click()
        cy.wait(1000)
        this.selectOwingGroupOption(owingGroup).click()
        cy.wait(1000)
        for (let attributeTagName of attributeTag) {
            console.log('value', attributeTag);
            this.selectAttributeTags().click()
            cy.wait(1000)
            this.selectAttributeTagsOption(attributeTagName).click({ multiple: true })
        }
        this.selectCloudProvider(cloudvalue).click()
        this.fileUpload().selectFile('cypress/fixtures/' + file);
        cy.wait(1000)

        this.nextbtn().click()
        this.nextbtn().click()
        cy.get('.my-3').should('not.contain', 'Something went wrong')
        cy.wait(3000)
        this.nextbtn().click()
        cy.wait(3000)
        this.submitbtn().click()
    }

    editEnclaveModelName(name) {
        cy.wait(1000)
        this.clickassetsManagerMenu().click()
        this.search().clear()
        cy.wait(2000)
        this.search().type(name + 'Updated')
        this.selectSearchData(name).click()
        this.clickEditBtn().click()
        cy.wait(500)
        this.selectStatus('PUBLISHED').click()
        this.selectIncrementBy('Minor').click()
        cy.wait(1000)
        this.nextbtn().click()
        cy.wait(2000)
        this.nextbtn().click()
        cy.wait(3000)
        this.nextbtn().click()
        cy.wait(2000)
        this.submitbtn().click()
        cy.wait(2000)
    }

    editAttributeTagForModel(assetName, attributeName) {
        cy.wait(1000)
        this.clickassetsManagerMenu().click()
        this.search().clear()
        this.search().type(assetName)
        this.selectSearchData(assetName).click()
        this.clickEditBtn().click()
        cy.wait(2000)
        this.selectAttributeTags().click()
        this.selectAttributeTags().type(attributeName)
        cy.wait(2000)
        this.selectAttributeTagsOption(attributeName).click()
        cy.wait(1000)
        this.selectStatus('PUBLISHED').click()
        this.selectIncrementBy('Minor').click()
        cy.wait(1000)
        this.nextbtn().click()
        cy.wait(2000)
        this.nextbtn().click()
        cy.wait(3000)
        this.nextbtn().click()
        cy.wait(2000)
        this.submitbtn().click()
        cy.wait(2000)
    }

    deleteEnclaveModel(assetName) {
        cy.wait(2000)
        // this.closeEnclaveModel().click()
        cy.wait(1000)
        this.clickassetsManagerMenu().click()
        cy.wait(2000)
        this.search().clear()
        cy.wait(2000)
        this.search().type(assetName)
        cy.wait(2000)
        this.selectSearchData(assetName).click()
        cy.wait(2000)
        this.deleteDropDown().click()
        cy.wait(1000)
        this.deleteButton().click()
        cy.wait(1000)
        this.confirmDeleteButton().click()
        cy.wait(1000)
        this.clearsearchdata().click()

    }

    createNestedEnclaveModel(status, name, description, owingGroup, attributeTag, cloudvalue, file, NestedTemplate) {
        this.clickassetsManagerMenu().trigger('mouseover')
        this.clickassetsManagerMenu().should('be.visible')
        this.clickassetsManagerMenu().click()
        cy.wait(2000)
        this.createNewAssets().click()

        if (status == 'Published') {
            this.selectStatus(status)
            this.selectIncrementBy('Minor')
        }
        this.selectStatus(status)
        cy.wait(1000)
        this.enterAssetName().type(name)
        this.assetDescription().type(description)
        cy.wait(1000)
        this.selectOwningGroup().click()
        cy.wait(1000)
        this.selectOwingGroupOption(owingGroup).click()
        cy.wait(1000)
        this.selectAttributeTags().click()
        cy.wait(1000)
        this.selectAttributeTags().type(attributeTag)
        cy.wait(3000)
        this.selectAttributeTagsOption(attributeTag).click()
        cy.wait(1000)
        this.selectCloudProvider(cloudvalue).click()
        this.fileUpload().selectFile('cypress/fixtures/' + file);
        cy.wait(2000)
        for (let i = 0; i <= NestedTemplate.length - 1; i++) {
            this.ClickAddNestedTemplate().click()
            cy.wait(1000)
            cy.log(NestedTemplate[i])
            this.uploadNestedTemplate(i + 1).selectFile('cypress/fixtures/' + NestedTemplate[i])
            cy.wait(1000)
        }

        this.nextbtn().click()

        this.nextbtn().click()
        cy.get('.my-3').should('not.contain', 'Something went wrong')
        cy.wait(5000)
        this.nextbtn().click()

        this.submitbtn().click()
    }

    verifyNestedEnclaveModel(assetName) {

        this.clickassetsManagerMenu().click()
        cy.wait(2000)
        this.search().clear()
        cy.wait(2000)
        this.search().type(assetName)
        cy.wait(2000)
        // cy.xpath('//div[@class="card no-results-container ng-tns-c212-0 ng-star-inserted"][contains(., "No results")]').should('be.visible')
        //this.selectSearchData(assetName).should('not.be.visible')
        cy.wait(2000)
    }

    publishYamlEnclaveModel(assetName) {
        cy.wait(1000)
        this.clickassetsManagerMenu().click()
        this.search().clear()
        cy.wait(1000)
        this.search().type(assetName)
        cy.wait(1000)
        this.selectSearchData(assetName).click()
        cy.wait(1000)
        this.publishButton().click()
        cy.wait(3000)

    }

    updateEnclaveModelWithYaml(name, file) {

        this.clickassetsManagerMenu().trigger('mouseover')
        this.clickassetsManagerMenu().should('be.visible')
        this.clickassetsManagerMenu().click()
        this.search().clear()
        cy.wait(1000)
        this.search().type(name)
        cy.wait(1000)
        this.selectSearchData(name).click()
        cy.wait(2000)
        this.clickEditBtn().click()
        cy.wait(2000)
        this.fileUpload().selectFile('cypress/fixtures/' + file);
        cy.wait(2000)
        this.nextbtn().click()
        cy.wait(2000)
        this.nextbtn().click()
        cy.wait(3000)
        this.nextbtn().click()
        cy.wait(3000)
        this.submitbtn().click()
        cy.wait(8000)
    }
}