import loginPage from '../pages/loginPage.js'
import policyBankPage from '../pages/policyBankPage.js'
import policyGroupPage from '../pages/policyGroupPage.js'
const login = new loginPage();
const Policy = new policyBankPage()
const policyGroup = new policyGroupPage();

Cypress.Commands.add('createPolicy', (policyGroupTemplateName, name, desc, resource, invariantProperty, invariantOperator, invariantValue, control, remediation) => {

    Policy.policylink().trigger('mouseover')
    Policy.policylink().should('be.visible')
    Policy.policylink().click()
    Policy.newPolicyLinkButton().click({ force: true })
    Policy.searchPolicyTemplate().clear()
    Policy.searchPolicyTemplate().type(policyGroupTemplateName)
    cy.wait(1000)
    Policy.selectSearchData(policyGroupTemplateName).click()
    cy.wait(1000)
    Policy.clickDetailsLink().click()
    Policy.enterPolicyName().clear()
    Policy.enterPolicyName().type(name)
    cy.wait(1000)
    Policy.enterPolicyDesc().clear()
    Policy.enterPolicyDesc().type(name)
    cy.wait(1000)
    Policy.selectSeverity().click()
    cy.wait(1000)
    Policy.definitionTab().click()
    cy.wait(1000)
    if (policyGroupTemplateName.includes('AWS CloudFormation')) {
        cy.AWScloudFormation(resource, invariantProperty, invariantOperator, invariantValue)
    }
    Policy.clickControlsTab().click()
    Policy.controlsDropDown().click()
    cy.wait(2000)
    policyGroup.inputControl().type(control)
    cy.wait(2000)
    Policy.selectControls(control).first().click()
    Policy.controlBlankClick().click()
    Policy.remediationTab().click()
    cy.wait(1000)
    Policy.remediation().type(remediation)
    cy.wait(1000)
    Policy.finalizePolicyButton().click()
    cy.wait(3000)
})


Cypress.Commands.add('AWScloudFormation', (resource, invariantProperty, invariantOperator, invariantValue) => {

    Policy.chooseResource().should('be.visible')
    Policy.chooseResource().click()
    cy.wait(500)
    Policy.selectResource(resource).click({ multiple: true })
    cy.wait(500)
    // Policy.clickAddRule().click()
    // cy.wait(500) 
    Policy.invariantPropertyDropDown().trigger('mouseover')
    Policy.invariantPropertyDropDown().click()
    Policy.selectInvariantProperty(invariantProperty).first().click()
    cy.wait(500)
    Policy.invariantOperatorDropDown().click()
    Policy.selectCloudInvariantOperator(invariantOperator).click()
    cy.wait(500)
    Policy.invariantDropDown().click()
    cy.wait(1000)
    Policy.invariantDropDown().type(invariantValue)
    cy.wait(1000)
    // Policy.selectInvariantValue(invariantValue).click()
    // cy.wait(1000)
});


Cypress.Commands.add('editPolicy', () => {
    Policy.editButton().click()
    Policy.clickDetailsLink().click()
    cy.wait(1000)
    Policy.editPolicyName().type(' Updated')
    cy.wait(1000)
    Policy.finalizePolicyButton().click()
})

Cypress.Commands.add('deletePolicy', (policyName) => {
    Policy.policylink().trigger('mouseover')
    Policy.policylink().should('be.visible')
    Policy.policylink().click({force: true})
    Policy.institutionMenuOnPolicybank().click({force: true})
    Policy.search().clear()
    cy.reload(true)
    cy.wait(3000)
    Policy.search().type(policyName)
    Policy.selectPolicyBank(policyName).first().click()
    Policy.deleteDropDown().click()
    Policy.deleteButton().click()
    cy.wait(3000)
    Policy.confirmDeleteButton().click()
    cy.wait(5000)
})

Cypress.Commands.add('PublishPolicy', (policyName) => {
    Policy.institutionMenuOnPolicybank().click({force: true})
    cy.wait(3000)
    Policy.search().clear()
    cy.reload(true)
    cy.wait(3000)
    Policy.search().type(policyName)
    cy.wait(1000)
    // Policy.selectPolicyCheckBox().first().check()
    Policy.selectPolicyBank(policyName).first().click()
    Policy.publishButton().click()
    Policy.inputReleaseNote().click()
    Policy.inputReleaseNote().type('Testing')
    Policy.minorButton().click()
    Policy.saveButton().click()
    cy.wait(5000)
})

Cypress.Commands.add('DeployAsPolicyGroup', (policyName, name, desc, group, attributeTag) => {
    Policy.institutionMenuOnPolicybank().click({force: true})
    cy.wait(3000)
    Policy.search().clear()
    cy.reload(true)
    cy.wait(3000)
    Policy.search().type(policyName)
    Policy.visibleDropDown().click()
    cy.wait(2000)
    Policy.selectVisible().click()
    cy.wait(1000)
    Policy.selectedDropDown().click()
    cy.wait(1000)
    Policy.deployButton().click()
    Policy.enterPolicyGroupName().type(name)
    Policy.enterPolicyGroupDesc().type(desc)
    Policy.owningGroupDropDown().click()
    Policy.selectOwningGroup(group).click()
    Policy.attributeTagDropDown().first().click({ multiple: true })
    Policy.enterAttributeTag().type(attributeTag)
    Policy.selectAttributeTag(attributeTag).click()
    Policy.saveOnDeploypage().click()
    cy.wait(2000)
    Policy.closeAndClearSelection().click()
    cy.wait(5000)
})


Cypress.Commands.add('VerifyDeployedPolicyGroup', (policyGroupName) => {
    Policy.clickBackButtonLink().click({force: true})
    cy.wait(3000)
    policyGroup.policyGrouplink().trigger('mouseover')
    policyGroup.policyGrouplink().should('be.visible')
    policyGroup.policyGrouplink().click()
    policyGroup.search().clear()
    policyGroup.search().type(policyGroupName)
    policyGroup.selectSearchData(policyGroupName).click()
    cy.wait(3000)
})

Cypress.Commands.add('policyBankMenu', () => {
    Policy.policylink().trigger('mouseover')
    Policy.policylink().should('be.visible')
    Policy.policylink().click()
    // cy.wait(3000)
})

Cypress.Commands.add('backToMainMenu', (policyGroupName) => {
    Policy.clickBackButtonLink().click({force: true})
    cy.wait(1000)
})

