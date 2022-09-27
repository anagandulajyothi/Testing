class attributeTagPage {


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

}

export default attributeTagPage