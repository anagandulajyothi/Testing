class policyGroupTemplatePage {

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
}
export default policyGroupTemplatePage
