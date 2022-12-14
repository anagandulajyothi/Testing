import loginPage from "../pages/loginPage";
import assetsManagerPage from '../pages/buildTimeInventory.Page'
const login = new loginPage()
const assetsManager = new assetsManagerPage()

Cypress.Commands.add('createEnclaveModel', (status, name, description, owingGroup, attributeTag, cloudvalue, file) => {

    assetsManager.clickassetsManagerMenu().trigger('mouseover')
    assetsManager.clickassetsManagerMenu().should('be.visible')
    assetsManager.clickassetsManagerMenu().click()
    cy.wait(2000)
    assetsManager.createNewAssets().click()
    cy.wait(1000)
    if (status == 'Published') {
        assetsManager.selectStatus(status).click()
        assetsManager.selectIncrementBy('Minor').click()
    }
    assetsManager.selectStatus(status).click()
    cy.wait(1000)
    assetsManager.enterAssetName().type(name)
    assetsManager.assetDescription().type(description)
    cy.wait(1000)
    assetsManager.selectOwningGroup().click()
    cy.wait(1000)
    assetsManager.selectOwingGroupOption(owingGroup).click()
    cy.wait(1000)
    for (let attributeTagName of attributeTag) {
        console.log('value', attributeTag);
        assetsManager.selectAttributeTags().click()
        cy.wait(1000)
        assetsManager.selectAttributeTagsOption(attributeTagName).click({ multiple: true })
    }
    assetsManager.selectCloudProvider(cloudvalue).click()
    assetsManager.fileUpload().selectFile('cypress/fixtures/' + file);
    cy.wait(1000)

    assetsManager.nextbtn().click()
    assetsManager.nextbtn().click()
    cy.get('.my-3').should('not.contain', 'Something went wrong')
    cy.wait(3000)
    assetsManager.nextbtn().click()
    cy.wait(3000)
    assetsManager.submitbtn().click()
})

Cypress.Commands.add('editEnclaveModelName', (name) => {
    cy.wait(1000)
    assetsManager.clickassetsManagerMenu().click()
    assetsManager.search().clear()
    cy.wait(2000)
    assetsManager.search().type(name + 'Updated')
    assetsManager.selectSearchData(name).click()
    assetsManager.clickEditBtn().click()
    cy.wait(500)
    assetsManager.selectStatus('PUBLISHED').click()
    assetsManager.selectIncrementBy('Minor').click()
    cy.wait(1000)
    assetsManager.nextbtn().click()
    cy.wait(2000)
    assetsManager.nextbtn().click()
    cy.wait(3000)
    assetsManager.nextbtn().click()
    cy.wait(2000)
    assetsManager.submitbtn().click()
    cy.wait(2000)
})

Cypress.Commands.add('editAttributeTagForModel', (assetName, attributeName) => {
    cy.wait(1000)
    assetsManager.clickassetsManagerMenu().click()
    assetsManager.search().clear()
    assetsManager.search().type(assetName)
    assetsManager.selectSearchData(assetName).click()
    assetsManager.clickEditBtn().click()
    cy.wait(2000)
    assetsManager.selectAttributeTags().click()
    assetsManager.selectAttributeTags().type(attributeName)
    cy.wait(2000)
    assetsManager.selectAttributeTagsOption(attributeName).click()
    cy.wait(1000)
    assetsManager.selectStatus('PUBLISHED').click()
    assetsManager.selectIncrementBy('Minor').click()
    cy.wait(1000)
    assetsManager.nextbtn().click()
    cy.wait(2000)
    assetsManager.nextbtn().click()
    cy.wait(3000)
    assetsManager.nextbtn().click()
    cy.wait(2000)
    assetsManager.submitbtn().click()
    cy.wait(2000)
})

Cypress.Commands.add('deleteEnclaveModel', (assetName) => {
    cy.wait(2000)
    // assetsManager.closeEnclaveModel().click()
    cy.wait(1000)
    assetsManager.clickassetsManagerMenu().click()
    cy.wait(2000)
    assetsManager.search().clear()
    cy.wait(2000)
    assetsManager.search().type(assetName)
    cy.wait(2000)
    assetsManager.selectSearchData(assetName).click()
    cy.wait(2000)
    assetsManager.deleteDropDown().click()
    cy.wait(1000)
    assetsManager.deleteButton().click()
    cy.wait(1000)
    assetsManager.confirmDeleteButton().click()
    cy.wait(1000)
    assetsManager.clearsearchdata().click()

})

Cypress.Commands.add('createNestedEnclaveModel', (status, name, description, owingGroup, attributeTag, cloudvalue, file, NestedTemplate) => {
    assetsManager.clickassetsManagerMenu().trigger('mouseover')
    assetsManager.clickassetsManagerMenu().should('be.visible')
    assetsManager.clickassetsManagerMenu().click()
    cy.wait(2000)
    assetsManager.createNewAssets().click()

    if (status == 'Published') {
        assetsManager.selectStatus(status)
        assetsManager.selectIncrementBy('Minor')
    }
    assetsManager.selectStatus(status)
    cy.wait(1000)
    assetsManager.enterAssetName().type(name)
    assetsManager.assetDescription().type(description)
    cy.wait(1000)
    assetsManager.selectOwningGroup().click()
    cy.wait(1000)
    assetsManager.selectOwingGroupOption(owingGroup).click()
    cy.wait(1000)
    assetsManager.selectAttributeTags().click()
    cy.wait(1000)
    assetsManager.selectAttributeTags().type(attributeTag)
    cy.wait(3000)
    assetsManager.selectAttributeTagsOption(attributeTag).click()
    cy.wait(1000)
    assetsManager.selectCloudProvider(cloudvalue).click()
    assetsManager.fileUpload().selectFile('cypress/fixtures/' + file);
    cy.wait(2000)
    for (let i = 0; i <= NestedTemplate.length - 1; i++) {
        assetsManager.ClickAddNestedTemplate().click()
        cy.wait(1000)
        cy.log(NestedTemplate[i])
        assetsManager.uploadNestedTemplate(i + 1).selectFile('cypress/fixtures/' + NestedTemplate[i])
        cy.wait(1000)
    }

    assetsManager.nextbtn().click()

    assetsManager.nextbtn().click()
    cy.get('.my-3').should('not.contain', 'Something went wrong')
    cy.wait(5000)
    assetsManager.nextbtn().click()

    assetsManager.submitbtn().click()
})

Cypress.Commands.add('verifyNestedEnclaveModel', (assetName) => {

    assetsManager.clickassetsManagerMenu().click()
    cy.wait(2000)
    assetsManager.search().clear()
    cy.wait(2000)
    assetsManager.search().type(assetName)
    cy.wait(2000)
    // cy.xpath('//div[@class="card no-results-container ng-tns-c212-0 ng-star-inserted"][contains(., "No results")]').should('be.visible')
    //assetsManager.selectSearchData(assetName).should('not.be.visible')
    cy.wait(2000)
})

Cypress.Commands.add('publishYamlEnclaveModel', (assetName) => {
    cy.wait(1000)
    assetsManager.clickassetsManagerMenu().click()
    assetsManager.search().clear()
    cy.wait(1000)
    assetsManager.search().type(assetName)
    cy.wait(1000)
    assetsManager.selectSearchData(assetName).click()
    cy.wait(1000)
    assetsManager.publishButton().click()
    cy.wait(3000)

})

Cypress.Commands.add('updateEnclaveModelWithYaml', (name, file) => {

    assetsManager.clickassetsManagerMenu().trigger('mouseover')
    assetsManager.clickassetsManagerMenu().should('be.visible')
    assetsManager.clickassetsManagerMenu().click()
    assetsManager.search().clear()
    cy.wait(1000)
    assetsManager.search().type(name)
    cy.wait(1000)
    assetsManager.selectSearchData(name).click()
    cy.wait(2000)
    assetsManager.clickEditBtn().click()
    cy.wait(2000)
    assetsManager.fileUpload().selectFile('cypress/fixtures/' + file);
    cy.wait(2000)
    assetsManager.nextbtn().click()
    cy.wait(2000)
    assetsManager.nextbtn().click()
    cy.wait(3000)
    assetsManager.nextbtn().click()
    cy.wait(3000)
    assetsManager.submitbtn().click()
    cy.wait(8000)
})