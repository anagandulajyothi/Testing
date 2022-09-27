export class policyGroupTemplatePage {

    policyGroupTemplatelink() {
        return cy.get('a[data-e2e="linkPolicyGroupTemplates"]')
    }

    newPolicyGroupTemplate() {
        return cy.get('button[data-e2e="createNewPGT"]')
    }

    enterPolicyGroupTemplateName() {
        return cy.get('input[data-e2e="name"]')

    }

    enterPolicyGroupTemplateDesc() {
        return cy.get('[data-e2e="description"]')
    }

    clickPolicyGroupTemplateNextbtn() {
        return cy.get('[data-e2e="next"]')
    }

    searchPolicyTemplateName() {
        return cy.get('[placeholder="Search Policy Templates"]')
    }

    selectPolicyTemplate(policyTemplateName) {
        return cy.xpath(`//strong[.='${policyTemplateName}']`)
    }

    createPolicyGroupTemplateSubmitbtn() {
        return cy.get('[data-e2e="submit"]')
    }

    sucessMsg() {
        return cy.get('[id="toast-container"]').contains('Policy Group Template Created Successfully')
        // Policy Group Template Created Successfully
    }

    search() {
        return cy.get('input[placeholder="Search"]')
    }

    selectSearchData(name) {
        return cy.xpath(`//h5[contains(.,'${name}')]`)
    }

    selectStatus(status) {
        return cy.get('[value="' + status + '"]')
    }

    clickEditbtn() {
        return cy.get('button[title="Edit Policy Group Template"]')
    }

    policyGroupTemplatePublished() {
        return cy.get('[id="published"]')
    }

    policyGroupTemplateMinor() {
        return cy.get('[value="MINOR"]')
    }

    editPolicyGroupTemplateName() {
        return cy.get('input[data-e2e="name"]')
    }

    editPolicyGroupTemplateSubmitbtn() {
        return cy.get('[data-e2e="submit"]')
    }

    closePolicyGroupTemplate() {
        return cy.get('.ms-Icon.ms-Icon--ChromeClose')
    }

    deleteDropDown() {
        return cy.get('.pos-rel > .btn > .ms-Icon')
    }

    deleteButton() {
        return cy.get('[data-e2e="PGTDeleteBtn"]')

    }
    confirmDeleteButton() {
        return cy.get('[data-e2e="confirmDeleteModalBtn"]')
    }

    selectPolicyTemplate_TerraForm(index){
        return cy.xpath('(//input[@class="form-check-input"])['+index+']')
    }

    createPolicyGroupTemplate(status, policyGroupTemplateName, policyGroupTemplateDesc, policyTemplate) {
        this.policyGroupTemplatelink().trigger('mouseover')
        this.policyGroupTemplatelink().should('be.visible')
        this.policyGroupTemplatelink().click()
        this.newPolicyGroupTemplate().click()
        if (status == 'PUBLISHED') {
            this.selectStatus(status).check()
            this.policyGroupTemplateMinor().check()
        }
        this.selectStatus(status).check()
        this.enterPolicyGroupTemplateName().type(policyGroupTemplateName)
        this.enterPolicyGroupTemplateDesc().type(policyGroupTemplateDesc)
        this.clickPolicyGroupTemplateNextbtn().click()
        cy.wait(1000)
        this.searchPolicyTemplateName().type(policyTemplate)
        this.selectPolicyTemplate(policyTemplate).should('be.visible')
        this.selectPolicyTemplate(policyTemplate).click()
        this.clickPolicyGroupTemplateNextbtn().click()
        this.createPolicyGroupTemplateSubmitbtn().click()
    }

    editPolicyGroupTemplate(policyGroupTemplateName) {
    
        this.policyGroupTemplatelink().click()
        this.search().clear()
        this.search().type(policyGroupTemplateName)
        this.selectSearchData(policyGroupTemplateName).click()
        this.clickEditbtn().click()
        // this.editPolicyGroupTemplateName().clear()
        this.editPolicyGroupTemplateName().type(' Updated')
        this.editPolicyGroupTemplateSubmitbtn().click()
    }
    
    deletePolicyGroupTemplate(policyGroupTemplateName) {
    
        // this.closePolicyGroupTemplate().click()
        this.policyGroupTemplatelink().click()
        cy.wait(5000)
        this.search().clear()
        this.search().type(policyGroupTemplateName)
        this.selectSearchData(policyGroupTemplateName).should('be.visible');
        this.selectSearchData(policyGroupTemplateName).click()
        cy.wait(5000)
        this.deleteDropDown().click()
        cy.wait(5000)
        this.deleteButton().click()
        this.confirmDeleteButton().click()
    }
    
    createPolicyGroupTemplateWithTerraform(status, policyGroupTemplateName, policyGroupTemplateDesc, policyTemplate, value) {
        this.policyGroupTemplatelink().trigger('mouseover')
        this.policyGroupTemplatelink().should('be.visible')
        this.policyGroupTemplatelink().click()
        this.newPolicyGroupTemplate().click()
        if (status == 'PUBLISHED') {
            this.selectStatus(status).check()
            this.policyGroupTemplateMinor().check()
        }
        this.selectStatus(status).check()
        this.selectStatus(status).check()
        this.enterPolicyGroupTemplateName().type(policyGroupTemplateName)
        this.enterPolicyGroupTemplateDesc().type(policyGroupTemplateDesc)
        this.clickPolicyGroupTemplateNextbtn().click()
        this.searchPolicyTemplateName().type(policyTemplate)
    
        for (let i = 1; i <= value; i++) {
            this.selectPolicyTemplate_TerraForm(i).check()
        }
    
        this.clickPolicyGroupTemplateNextbtn().click()
        this.createPolicyGroupTemplateSubmitbtn().click()
    }
    
    editPolicyGroupTemplatewithStatus(policyGroupTemplateName, status) {
        this.policyGroupTemplatelink().click()
        this.search().clear()
        this.search().type(policyGroupTemplateName)
        this.selectSearchData(policyGroupTemplateName).click()
        this.clickEditbtn().click()
        this.editPolicyGroupTemplateName().type(' Updated')
    
        if (status == 'PUBLISHED') {
            this.selectStatus(status).check()
        }
    
        this.editPolicyGroupTemplateSubmitbtn().click()
    }
}
