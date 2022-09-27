import supressionpolicyTempaltePage from "../pages/suppressionsPage.js";
const supressionpolicyTemplate = new supressionpolicyTempaltePage()


Cypress.Commands.add('createSupression', (name, description, optionvalue, status, attributename, policyname, StackStatus, productname, regionname) => {

    supressionpolicyTemplate.policysupressionMenuLink().click()
    
    supressionpolicyTemplate.newSupressionBtn().click()
    supressionpolicyTemplate.name().type(name)
    supressionpolicyTemplate.description().type(description)
    supressionpolicyTemplate.OwningGroupDropDown().click()
    supressionpolicyTemplate.selectOwningGroupOption(optionvalue).click()
    if (status == 'PUBLISHED') {
        supressionpolicyTemplate.SelectStatus(status).check()
        supressionpolicyTemplate.policyGroupMinor().check()
    }
    supressionpolicyTemplate.SelectStatus(status).check()
    supressionpolicyTemplate.nextBtn().click()
    supressionpolicyTemplate.AttributeAssignment().check()
    supressionpolicyTemplate.AttributeTag().click()
    supressionpolicyTemplate.AttributeTag().type(attributename)   
    supressionpolicyTemplate.SelectAttributeTag(attributename).click()
    supressionpolicyTemplate.nextBtn().click()
    supressionpolicyTemplate.selectPolicies().click() 
    supressionpolicyTemplate.searchPolicy().type(policyname)
    supressionpolicyTemplate.selectPolicy(policyname).click()

    if (policyname == 'Allowed AWS Products in Stacks') {

        cy.awsProduct(StackStatus, productname)

    } else if (policyname == 'Allowed AWS Regions in Accounts') {

        cy.awsRegions(StackStatus, regionname)
    }
    else {
        supressionpolicyTemplate.submitBtn().click()
        
    }
})
Cypress.Commands.add('createSupressionwithSameName', (name, description, optionvalue, status) => {

    supressionpolicyTemplate.policysupressionMenuLink().click()
    supressionpolicyTemplate.newSupressionBtn().click()
    supressionpolicyTemplate.name().type(name)
    supressionpolicyTemplate.description().type(description)
    supressionpolicyTemplate.OwningGroupDropDown().click()
    supressionpolicyTemplate.selectOwningGroupOption(optionvalue).click()
    if (status == 'PUBLISHED') {
        supressionpolicyTemplate.SelectStatus(status).check()
        supressionpolicyTemplate.policyGroupMinor().check()
    }
    supressionpolicyTemplate.SelectStatus(status).check()
    supressionpolicyTemplate.nextBtn().click()
})

Cypress.Commands.add('editSuppression', (name, status) => {
    supressionpolicyTemplate.policysupressionMenuLink().click()
    supressionpolicyTemplate.Search().clear()
    supressionpolicyTemplate.Search().type(name)
    supressionpolicyTemplate.ClickSearchData(name).click()
    supressionpolicyTemplate.editSupressionBtn().click()
    supressionpolicyTemplate.name().type('Updated')
    
    if (status = 'PUBLISHED') {
        supressionpolicyTemplate.SelectStatus(status).check()
    }
    supressionpolicyTemplate.AttributeAssignment().check()
    supressionpolicyTemplate.AttributeTag().click()
    cy.wait(2000)
    supressionpolicyTemplate.editSubmitBtn().click()
})

Cypress.Commands.add('awsProduct', (StackStatus, productname) => {
    
    supressionpolicyTemplate.StacksProducts().click()
    if (StackStatus == 'Wildcard') {
        supressionpolicyTemplate.StacksProducts().click()
        supressionpolicyTemplate.SelectWildCart().check()
        supressionpolicyTemplate.SubmitStack().click()
    } else {
        supressionpolicyTemplate.StacksProducts().click()
        supressionpolicyTemplate.StacksProducts().type(productname)
        supressionpolicyTemplate.selectStacksProduct(productname).click()
        supressionpolicyTemplate.SubmitStack().click()
    }
})

Cypress.Commands.add('awsRegions', (StackStatus, regionname) => {
    
    if (StackStatus == 'Wildcard') {
        supressionpolicyTemplate.SelectRegions().click()
        supressionpolicyTemplate.SelectWildCart().check()
        supressionpolicyTemplate.RegionSubmit().click()

    } else {
        supressionpolicyTemplate.SelectRegions().click()     
        supressionpolicyTemplate.SelectRegions().type(regionname)
        supressionpolicyTemplate.SelectRegionsOption(regionsname).click()
        supressionpolicyTemplate.RegionSubmit().click()
    }
})

Cypress.Commands.add('deleteSupression', (SupressionName) => {
    supressionpolicyTemplate.policysupressionMenuLink().click()   
    supressionpolicyTemplate.Search().clear()
    supressionpolicyTemplate.Search().type(SupressionName)
    supressionpolicyTemplate.ClickSearchData(SupressionName).click()
    supressionpolicyTemplate.ClickdeleteMenu().click()
    supressionpolicyTemplate.ClickDeleteBtn().click()
    supressionpolicyTemplate.ClickDeleteConfirm().click()
})