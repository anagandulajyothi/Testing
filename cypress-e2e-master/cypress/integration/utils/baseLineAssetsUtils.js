import baseLineAssetsPage from "../pages/baseLineAssetsPage";

const baseLineAsset = new baseLineAssetsPage()

Cypress.Commands.add('createBaseLine', (baselinename, baselinedesc, Owningvalue) => {
    baseLineAsset.baseLineAssetLink().click()
    baseLineAsset.createNewBaseLine().click()
    baseLineAsset.enterBaseLineName().type(baselinename)
    baseLineAsset.enterBaseLineDescription().type(baselinedesc)
    baseLineAsset.ownigGroupDropDown().click()
    baseLineAsset.selectOwningGroup(Owningvalue).click()
    baseLineAsset.createButton().click()
})

Cypress.Commands.add('editAWS', (data, account, region, product, resourceType, tag, value) => {
    baseLineAsset.search().clear()
    baseLineAsset.search().type(data)
    baseLineAsset.SelectSearchData(data).click()
    baseLineAsset.awsTab().click()
    baseLineAsset.editAwsButton().click()
    baseLineAsset.awsAccountDropDown().click()
    baseLineAsset.selectAWSAccount(account).click()
    baseLineAsset.ClickAWsResources().click()
    baseLineAsset.awsRegionDropDown().click()
    baseLineAsset.awsRegionDropDown().type(region)
    baseLineAsset.selectAWSRegion(region).click()
    cy.wait(1000)
    baseLineAsset.awsProductsDropDown().click()
    cy.wait(1000)
    baseLineAsset.awsProductsDropDown().type(product)
    cy.wait(5000)
    baseLineAsset.selectAwsProduct(product).click()
    cy.wait(2000)
    baseLineAsset.awsResourceTypeDropDown().click()
    cy.wait(1000)
    baseLineAsset.selectAwsResourceType(resourceType).click()
    cy.wait(1000)
    baseLineAsset.ClickAWsResources().click()
    baseLineAsset.awsTagDropDown().click()
    baseLineAsset.selectAwsTag(tag).click()
    baseLineAsset.tagValueDropDown().click()
    baseLineAsset.selectValue(value).click()
    baseLineAsset.addTagButton().click()
    cy.wait(2000)
    baseLineAsset.save().click()
})

Cypress.Commands.add('editBaseLineAsset', (data, baselinename, baselinedesc, status) => {
    baseLineAsset.search().clear()
    baseLineAsset.search().type(data)
    baseLineAsset.SelectSearchData(data).click()
    baseLineAsset.editBaseLineButton().click()
    baseLineAsset.enterBaseLineName().clear()
    baseLineAsset.enterBaseLineName().type(baselinename + 'Updated')
    baseLineAsset.enterBaseLineDescription().clear()
    baseLineAsset.enterBaseLineDescription().type(baselinedesc + 'Updated')
    if (status = 'PUBLISHED') {
        baseLineAsset.status(status).check()
        baseLineAsset.SelectMinor().check()
    }
    baseLineAsset.status(status).check()
    baseLineAsset.publishversion().click()
})

Cypress.Commands.add('editBaseLineAssetStatus', (data, baselinename, baselinedesc, status) => {
    baseLineAsset.search().clear()
    baseLineAsset.search().type(data)
    baseLineAsset.SelectSearchData(data).click()
    baseLineAsset.editBaseLineButton().click()
    baseLineAsset.enterBaseLineName().clear()
    baseLineAsset.enterBaseLineName().type(baselinename + ' Updated')
    baseLineAsset.enterBaseLineDescription().clear()
    baseLineAsset.enterBaseLineDescription().type(baselinedesc + ' Updated')
    if (status = 'PUBLISHED') {
        baseLineAsset.status(status).check()
    }
    baseLineAsset.publishversion().click()
})

Cypress.Commands.add('deleteBaseLine', (data) => {
    baseLineAsset.search().clear()
    baseLineAsset.search().type(data)
    baseLineAsset.SelectSearchData(data).click()
    baseLineAsset.deleteMenu().click()
    baseLineAsset.deleteOption().click()
    baseLineAsset.deleteConfirmation().click()
})

Cypress.Commands.add('deleteNegativeBaseLine', (data) => {
    baseLineAsset.baseLineAssetLink().click()
    baseLineAsset.search().clear()
    baseLineAsset.search().type(data)
    baseLineAsset.SelectSearchData(data).click()
    baseLineAsset.deleteMenu().click()
    baseLineAsset.deleteOption().click()
    baseLineAsset.deleteConfirmation().click()
})

Cypress.Commands.add('verifyBaseLine', (data) => {
    baseLineAsset.search().clear()
    baseLineAsset.search().type(data)
    //cy.xpath('[class="card no-results-container ng-tns-c212-0 ng-star-inserted"]').should('be.visible')
})

Cypress.Commands.add('verifySavedAwsFiltersOnEdit', (data, baselinename, baselinedesc, status) => {
    baseLineAsset.search().clear()
    baseLineAsset.search().type(data)
    baseLineAsset.SelectSearchData(data).click()
    baseLineAsset.awsTab().click()
    baseLineAsset.editAwsButton().click()
})