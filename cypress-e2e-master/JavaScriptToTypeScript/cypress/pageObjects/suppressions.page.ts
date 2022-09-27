export class suppressionsPage {

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

    createSupression (name, description, optionvalue, status, attributename, policyname, StackStatus, productname, regionname, regionsname) {

        this.policysupressionMenuLink().click()
        
        this.newSupressionBtn().click()
        this.name().type(name)
        this.description().type(description)
        this.OwningGroupDropDown().click()
        this.selectOwningGroupOption(optionvalue).click()
        if (status == 'PUBLISHED') {
            this.SelectStatus(status).check()
            this.policyGroupMinor().check()
        }
        this.SelectStatus(status).check()
        this.nextBtn().click()
        this.AttributeAssignment().check()
        this.AttributeTag().click()
        this.AttributeTag().type(attributename)   
        this.SelectAttributeTag(attributename).click()
        this.nextBtn().click()
        this.selectPolicies().click() 
        this.searchPolicy().type(policyname)
        this.selectPolicy(policyname).click()
        
        if (policyname == 'Allowed AWS Products in Stacks') {
    
            this.awsProduct(StackStatus, productname)

        } else if (policyname == 'Allowed AWS Regions in Accounts') {
    
            this.awsRegions(StackStatus, regionname, regionsname)
        }
        else {
            this.submitBtn().click()
            
        }
    }
    createSupressionwithSameName (name, description, optionvalue, status)  {
    
        this.policysupressionMenuLink().click()
        this.newSupressionBtn().click()
        this.name().type(name)
        this.description().type(description)
        this.OwningGroupDropDown().click()
        this.selectOwningGroupOption(optionvalue).click()
        if (status == 'PUBLISHED') {
            this.SelectStatus(status).check()
            this.policyGroupMinor().check()
        }
        this.SelectStatus(status).check()
        this.nextBtn().click()
    }
    
    editSuppression (name, status)  {
        this.policysupressionMenuLink().click()
        this.Search().clear()
        this.Search().type(name)
        this.ClickSearchData(name).click()
        this.editSupressionBtn().click()
        this.name().type('Updated')
        
        if (status = 'PUBLISHED') {
            this.SelectStatus(status).check()
        }
        this.AttributeAssignment().check()
        this.AttributeTag().click()
        cy.wait(2000)
        this.editSubmitBtn().click()
    }
    
    awsProduct(StackStatus, productname)  {
        
        this.StacksProducts().click()
        if (StackStatus == 'Wildcard') {
            this.StacksProducts().click()
            this.SelectWildCart().check()
            this.SubmitStack().click()
        } else {
            this.StacksProducts().click()
            this.StacksProducts().type(productname)
            this.selectStacksProduct(productname).click()
            this.SubmitStack().click()
        }
    }
    
    awsRegions (StackStatus, regionname, regionsname)  {
        
        if (StackStatus == 'Wildcard') {
            this.SelectRegions().click()
            this.SelectWildCart().check()
            this.RegionSubmit().click()
    
        } else {
            this.SelectRegions().click()     
            this.SelectRegions().type(regionname)
            this.SelectRegionsOption(regionsname).click()
            this.RegionSubmit().click()
        }
    }
    
    deleteSupression(SupressionName)  {
        this.policysupressionMenuLink().click()   
        this.Search().clear()
        this.Search().type(SupressionName)
        this.ClickSearchData(SupressionName).click()
        this.ClickdeleteMenu().click()
        this.ClickDeleteBtn().click()
        this.ClickDeleteConfirm().click()
    }

}    