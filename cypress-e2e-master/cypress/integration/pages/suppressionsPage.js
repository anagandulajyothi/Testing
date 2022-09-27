class supressionpolicyTempaltePage {

    policysupressionMenuLink() {
        return cy.get('.nav-link[data-e2e="linkPolicySuppressions"]')
    }

    newSupressionBtn() {
        return cy.get('.btn.btn-primary.ng-star-inserted')
    }
    editSupressionBtn() {
        return cy.get('[data-e2e="editSuppression"]')
    }
    editSubmitBtn() {
        return cy.get('button[class="btn btn-primary"]')
    }
    publishversion() {
        return cy.xpath('//span[normalize-space()="Publish Version"]')
    }
    name() {
        return cy.get('[data-e2e="name"]')
    }

    description() {
        return cy.get('[data-e2e="description"]')
    }

    OwningGroupDropDown() {
        return cy.get('ng-select[placeholder="Select Owning Group"]')
    }

    selectOwningGroupOption(optionvalue) {
        return cy.xpath('//span[contains(., "' + optionvalue + '")]')
    }

    SelectStatus(status) {
        return cy.get('[value="' + status + '"]')
    }

    policyGroupMinor() {
        return cy.get('[value="MINOR"]')
    }

    nextBtn() {
        return cy.get('.p-button-label')
    }
    AttributeAssignment() {
        return cy.get('#attributeTagAssignmentType')
    }

    AttributeTag() {
        return cy.get('[placeholder="Select Attribute Tag"]')
    }

    SelectAttributeTag(attributename) {
        return cy.xpath('//div[@class="option-container ng-star-inserted"][contains(., "' + attributename + '")]')
    }

    selectPolicies() {
        return cy.get('[formgroupname="policyInformation"]')
    }

    searchPolicy() {
        return cy.get('input[role="textbox"]')
    }

    selectPolicy(policyname) {
        return cy.xpath('//span[normalize-space()="' + policyname + '"]')
    }

    submitBtn() {
        return cy.get('button[type="submit"]')
    }

    StacksProducts() {
        return cy.get('[data-e2e="stacks-list"]')
    }

    selectStacksProduct(productname) {
        return cy.xpath('//span[contains(., "' + productname + '")]')
    }

    SubmitStack() {
        return cy.get('button[type="submit"]')
    }

    SelectWildCart() {
        return cy.get('[data-e2e="wildcardSuppressionTrue"]')
    }

    SelectRegions() {
        return cy.get('[data-e2e="awsRegions"]')
    }

    SelectRegionsOption(regionsname) {
        return cy.xpath("//span[contains(., '" + regionsname + "')]")
    }

    RegionSubmit() {
        return cy.get('button[type="submit"]')
    }

    Search() {
        return cy.xpath('(//input[@placeholder="Search"])[1]')
    }

    ClickSearchData(data) {
        return cy.xpath('//h5[contains(., "' + data + '")]')
    }

    ClickdeleteMenu() {
        return cy.get('.pos-rel > .btn > .ms-Icon')
    }

    ClickDeleteBtn() {
        return cy.get('button[title="Delete Suppression"]')
    }

    ClickDeleteConfirm() {
        return cy.get('button[class="btn btn-outline-danger p-button-outlined p-button-danger p-button p-component p-ripple"]')
    }

}
export default supressionpolicyTempaltePage