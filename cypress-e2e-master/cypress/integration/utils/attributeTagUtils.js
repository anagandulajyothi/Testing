import loginPage from '../pages/loginPage.js'
import createAttributeTag from '../pages/attributeTagPage.js'
const login = new loginPage();
const attributeTag = new createAttributeTag();

Cypress.Commands.add('createAttributeTag', (attributeTagName, attributeTagDesc) => {
    attributeTag.attributeTagsLink().trigger('mouseover');
    attributeTag.attributeTagsLink().should('be.visible');
    attributeTag.attributeTagsLink().click();
    attributeTag.createNewAttributeTag().should('be.visible');
    attributeTag.createNewAttributeTag().click();
    attributeTag.enterTagName().should('be.visible');
    attributeTag.enterTagName().type(attributeTagName);
    attributeTag.enterTagDescription().type(attributeTagDesc)
    attributeTag.saveButton().should('be.visible');
    attributeTag.saveButton().click();
})

Cypress.Commands.add('editAttributeTag', (attributeTagName) => {
    attributeTag.attributeTagsLink().trigger('mouseover');
    attributeTag.attributeTagsLink().click();
    attributeTag.searchButton().should('be.visible');
    attributeTag.searchButton().clear();
    attributeTag.searchButton().type(attributeTagName);
    attributeTag.selectAttributeTag(attributeTagName).should('be.visible');
    attributeTag.selectAttributeTag(attributeTagName).click();
    attributeTag.editButton().should('be.visible');
    attributeTag.editButton().click();
    attributeTag.enterTagName().type(" Updated");
    attributeTag.saveButton().should('be.visible');
    attributeTag.saveButton().click();
})

Cypress.Commands.add('deleteAttributeTag', (attributeTagName) => {
    attributeTag.attributeTagsLink().trigger('mouseover');
    attributeTag.attributeTagsLink().click();
    attributeTag.searchButton().should('be.visible');
    attributeTag.searchButton().clear();
    attributeTag.searchButton().type(attributeTagName);
    attributeTag.selectAttributeTag(attributeTagName).should('be.visible');
    attributeTag.selectAttributeTag(attributeTagName).click();
    attributeTag.deleteDropDown().should('be.visible');
    attributeTag.deleteDropDown().click();
    attributeTag.deleteTagButton().should('be.visible');
    attributeTag.deleteTagButton().click();
    attributeTag.confirmDeleteButton().should('be.visible');
    attributeTag.confirmDeleteButton().click();
})
