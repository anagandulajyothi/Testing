/// <reference types="cypress" />

export class attributeTagPage {

    attributeTagsLink() {
        return cy.get('a[data-e2e="linkAttributeTags"]')
    }
    createNewAttributeTag() {
        return cy.get('[data-e2e="newAttributeTagButton"]')
    }
    enterTagName() {
        return cy.get('#name')
    }
    enterTagDescription() {
        return cy.get('#description')
    }
    saveButton() {
        return cy.get('.p-button-label')
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


    createAttributeTag(attributeTagName, attributeTagDesc) {
        this.attributeTagsLink().trigger('mouseover');
        this.attributeTagsLink().should('be.visible');
        this.attributeTagsLink().click();
        this.createNewAttributeTag().should('be.visible');
        this.createNewAttributeTag().click();
        this.enterTagName().should('be.visible');
        this.enterTagName().type(attributeTagName);
        this.enterTagDescription().type(attributeTagDesc)
        this.saveButton().should('be.visible');
        this.saveButton().click();
    }

    editAttributeTag(attributeTagName) {
        this.attributeTagsLink().trigger('mouseover');
        this.attributeTagsLink().click();
        this.searchButton().should('be.visible');
        this.searchButton().clear();
        this.searchButton().type(attributeTagName);
        this.selectAttributeTag(attributeTagName).should('be.visible');
        this.selectAttributeTag(attributeTagName).click();
        this.editButton().should('be.visible');
        this.editButton().click();
        this.enterTagName().type(" Updated");
        this.saveButton().should('be.visible');
        this.saveButton().click();
    }

    deleteAttributeTag(attributeTagName) {
        this.attributeTagsLink().trigger('mouseover');
        this.attributeTagsLink().click();
        this.searchButton().should('be.visible');
        this.searchButton().clear();
        this.searchButton().type(attributeTagName);
        this.selectAttributeTag(attributeTagName).should('be.visible');
        this.selectAttributeTag(attributeTagName).click();
        this.deleteDropDown().should('be.visible');
        this.deleteDropDown().click();
        this.deleteTagButton().should('be.visible');
        this.deleteTagButton().click();
        this.confirmDeleteButton().should('be.visible');
        this.confirmDeleteButton().click();
    }
}