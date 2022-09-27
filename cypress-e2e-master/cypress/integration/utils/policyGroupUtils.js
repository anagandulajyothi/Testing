import loginPage from '../pages/loginPage.js'
import policyGroupPage from '../pages/policyGroupPage.js'
const login = new loginPage();
const policyGroup = new policyGroupPage();

Cypress.Commands.add('createPolicyGroup', (policyGroupTemplateName, policyGroupName, policyGroupDesc,
    owningGroup, status, attributeTagName, remediation, control, service, surfaceLayer, entityType, group, awsName, awsDesc, awscontrol, awsProperty, awsOperator, awsValue,
    azureName, azureDesc, azureControl, azureProperty, azureOperator, azureValue, gcpName, gcpDesc, gcpControl, gcpProperty, gcpOperator, gcpvalue, resource, invariantProperty, invariantOperator, invariantValue) => {

    policyGroup.policyGrouplink().trigger('mouseover')
    policyGroup.policyGrouplink().should('be.visible')
    policyGroup.policyGrouplink().click()
    policyGroup.newPolicyGroup().should('be.visible')
    policyGroup.newPolicyGroup().click()
    policyGroup.policyGroupTemplateDropDown().click()
    policyGroup.policyGroupTemplateDropDown().type(policyGroupTemplateName)
    policyGroup.selectPolicyGroupTemplate(policyGroupTemplateName).click()
    policyGroup.enterPolicyGroupName().type(policyGroupName)
    policyGroup.enterPolicyGroupDesc().type(policyGroupDesc)
    policyGroup.ownigGroupDropDown().click()
    policyGroup.enterOwnigGroup().type(owningGroup)
    policyGroup.selectOwningGroup(owningGroup).click()

    if (status == 'PUBLISHED') {
        policyGroup.selectStatus(status).check()
        policyGroup.policyGroupMinor().check()
    }

    policyGroup.selectStatus(status).check()
    policyGroup.attributeTagDropDown().click()
    policyGroup.enterAttributeTag().type(attributeTagName)
    policyGroup.selectAttributeTag(attributeTagName).click()

    if (surfaceLayer === 'Default Surface - Root Surface Layer') {
        policyGroup.selectSurfaceLayer(surfaceLayer).click()
    }

    if (policyGroupTemplateName.includes('AWS Products')) {
        cy.awsProducts(remediation, control, service);
    }

    if (policyGroupTemplateName.includes('Require')) {
        cy.approval(remediation, control, entityType, group);
    }

    if (policyGroupTemplateName.includes('Terraform')) {
        cy.terraformTemplate(awsName, awsDesc, awscontrol, awsProperty, awsOperator, awsValue,
            azureName, azureDesc, azureControl, azureProperty, azureOperator, azureValue, gcpName, gcpDesc, gcpControl, gcpProperty, gcpOperator, gcpvalue);
    }

    if (policyGroupTemplateName.includes('Invariant AWS Api')) {
        cy.invariantPolicy(remediation, control, resource, invariantProperty, invariantOperator, invariantValue)
    }

    if (policyGroupTemplateName.includes('Invariant Cloud Formation')) {
        cy.cloudFormationInvarientPolicy(remediation, control, resource, invariantProperty, invariantOperator, invariantValue)
    }

    if (policyGroupTemplateName.includes('CFN NAG')) {
        cy.cfnNagPolicy(remediation, control);
    }

    if (policyGroupTemplateName.includes('AWS RT Invariant')) {
        cy.awsRTInvariantPolicy(remediation, control, resource, invariantProperty, invariantOperator, invariantValue);
    }

    // policyGroup.createPolicyGroupButton().trigger('mouseover')
    policyGroup.createPolicyGroupButton().should('be.visible')
    policyGroup.createPolicyGroupButton().click({ force: true })
    cy.wait(3000)
})

Cypress.Commands.add('editPolicyGroup', (policyGroupName) => {
    policyGroup.policyGrouplink().trigger('mouseover')
    policyGroup.policyGrouplink().should('be.visible')
    policyGroup.policyGrouplink().click()
    policyGroup.search().clear()
    policyGroup.search().type(policyGroupName)
    policyGroup.selectSearchData(policyGroupName).click()
    policyGroup.editButton().click()
    policyGroup.editPolicyGroupName().type(' Updated')
    policyGroup.submitButton().click()
})

Cypress.Commands.add('deletePolicyGroup', (policyGroupName) => {
    policyGroup.policyGrouplink().trigger('mouseover')
    cy.wait(2000)
    policyGroup.policyGrouplink().should('be.visible').click()
    policyGroup.policyGrouplink().click()
    policyGroup.search().clear()
    cy.wait(10000)
    policyGroup.search().type(policyGroupName)
    cy.wait(5000)
    policyGroup.selectSearchData(policyGroupName).should('be.visible');
    policyGroup.selectSearchData(policyGroupName).click()
    policyGroup.deleteDropDown().click()
    policyGroup.deleteButton().click()
    policyGroup.confirmDeleteButton().click()
    cy.wait(10000)
})

Cypress.Commands.add('awsProducts', (remediation, control, service) => {
    policyGroup.remediation().type(remediation)
    policyGroup.controlsDropDown().click()
    cy.wait(2000)
    policyGroup.inputControl().type(control)
    cy.wait(2000)
    policyGroup.selectControls(control).first().click()
    policyGroup.controlBlankClick().click() 
    policyGroup.selectSeverity()
    policyGroup.servicesDropDown().click()
    policyGroup.selectService(service).click()
})

Cypress.Commands.add('cfnNagPolicy', (remediation, control) => {
    policyGroup.remediation().type(remediation)
    policyGroup.controlsDropDown().click()
    cy.wait(2000)
    policyGroup.inputControl().type(control)
    cy.wait(2000)
    policyGroup.selectControls(control).first().click()
    policyGroup.controlBlankClick().click()
    policyGroup.selectSeverity()
    // policyGroup.servicesDropDown().click()
    // policyGroup.selectRule().click()
})

Cypress.Commands.add('approval', (remediation, control, entityType, group) => {
    policyGroup.remediation().type(remediation)
    policyGroup.controlsDropDown().click()
    cy.wait(2000)
    policyGroup.inputControl().type(control)
    cy.wait(2000)
    policyGroup.selectControls(control).first().click()
    policyGroup.controlBlankClick().click()
    // policyGroup.entityTypeDropDown()
    policyGroup.selectPolicyGroupEntityType(entityType)
    policyGroup.eventDropDown().click()
    policyGroup.selectAllEvents().click()
    policyGroup.approvalGroupsDropDown().click()
    // policyGroup.enterGroupName().type(group)
    policyGroup.selectGroup(group).click()
})


Cypress.Commands.add('terraformTemplate', (awsName, awsDesc, awscontrol, awsProperty, awsOperator, awsValue,
    azureName, azureDesc, azureControl, azureProperty, azureOperator, azureValue, gcpName, gcpDesc, gcpControl, gcpProperty, gcpOperator, gcpvalue) => {
    policyGroup.policyGroupName(1).type(awsName)
    policyGroup.policyGroupDesc(1).type(awsDesc)
    policyGroup.selectcontrolsforTerraForm(5).click()
    policyGroup.selectControls(awscontrol).first().click()
    policyGroup.awsControlsBlanckClick().click()
    // policyGroup.chooseAWSResource().should('be.visible')
    policyGroup.chooseAWSResource().click()
    policyGroup.selectAWSResource().click()
    // policyGroup.clickAddRule().click()
    policyGroup.awsResourcesProperty().click()
    policyGroup.enterAWSProperty().type(awsProperty).should('have.value', awsProperty)
    policyGroup.selectAwsResourcesPropertyOption(awsProperty).click()
    policyGroup.awsResourcesOperator(1).click()
    policyGroup.selectawsResourcesOperatorOption(awsOperator).click()
    policyGroup.selectValueDropdown(1).type(awsValue)
    policyGroup.selectValueOption().click()
    policyGroup.policyGroupName(2).type(azureName)
    policyGroup.policyGroupDesc(2).type(azureDesc)
    policyGroup.selectcontrolsforTerraForm(10).click()
    policyGroup.selectControlAzure(azureControl).click()
    policyGroup.azureControlsBlanckClick().click()
    // policyGroup.chooseAzureResource().should('be.visible')
    policyGroup.chooseAzureResource().click()
    policyGroup.selectAzureResource().click()
    policyGroup.clickAddRule().click()
    policyGroup.azureProperty().click()
    policyGroup.inputAzureProperty().type(azureProperty).should('have.value', azureProperty)
    policyGroup.selectAzurePropertyOption(azureProperty).click()
    policyGroup.clickonOperator(2).click()
    policyGroup.selectOperatorOption(azureOperator).click()
    policyGroup.selectValueDropdown(2).type(azureValue)
    policyGroup.selectValueOption().click()
    policyGroup.policyGroupName(3).type(gcpName)
    policyGroup.policyGroupDesc(3).type(gcpDesc)
    policyGroup.selectcontrolsforTerraForm(15).click()
    policyGroup.selectControlAzure(gcpControl).click()
    policyGroup.gcpControlsBlanckClick().click()
    policyGroup.chooseGCPResource().click()
    policyGroup.selectGCPResource().click()
    policyGroup.clickAddRule().click()
    policyGroup.clickOnGCPProperty().click()
    policyGroup.inputGcpTerraformProperty().type(gcpProperty).should('have.value', gcpProperty)
    policyGroup.selectGCPProperty(gcpProperty).click()
    policyGroup.clickonOperator(3).click()
    policyGroup.selectOperatorOption(gcpOperator).click()
    policyGroup.selectValueDropdown(3).type(gcpvalue)
    policyGroup.selectValueOption().click()
    policyGroup.createPolicyGroupButton().trigger('mouseover')
})

Cypress.Commands.add('invariantPolicy', (remediation, control, resource, invariantProperty, invariantOperator, invariantValue) => {
    policyGroup.remediation().type(remediation)
    policyGroup.controlsDropDown().click()
    cy.wait(2000)
    policyGroup.inputControl().type(control)
    cy.wait(2000)
    policyGroup.selectControls(control).first().click()
    policyGroup.controlBlankClick().click()
    policyGroup.chooseResource().should('be.visible')
    policyGroup.chooseResource().click()
    policyGroup.selectResource(resource).click({ multiple: true })
    // policyGroup.clickAddRule().click()
    // policyGroup.invariantPropertyDropDown().should('be.visible')
    policyGroup.invariantPropertyDropDown().trigger('mouseover')
    policyGroup.invariantPropertyDropDown().click()
    // cy.wait(10000)
    // policyGroup.inputInvariantProperty().click()
    // policyGroup.inputInvariantProperty().type(invariantProperty).should('have.value', invariantProperty)
    // policyGroup.selectInvariantProperty(invariantProperty).trigger('mouseover')
    policyGroup.selectInvariantProperty(invariantProperty).first().click()
    // policyGroup.invariantOperatorDropDown().should('be.visible')
    policyGroup.invariantOperatorDropDown().click()
    // policyGroup.selectInvariantOperator(invariantOperator).should('be.visible')
    policyGroup.selectInvariantOperator(invariantOperator).click()
    // policyGroup.inputInvariantValue().should('be.visible')
    policyGroup.invariantDropDown().click()
    policyGroup.invariantDropDown().type(invariantValue)
    // policyGroup.selectInvariantValue(invariantValue).click()
});

Cypress.Commands.add('cloudFormationInvarientPolicy', (remediation, control, resource, invariantProperty, invariantOperator, invariantValue) => {
    policyGroup.remediation().type(remediation)
    policyGroup.controlsDropDown().click()
    cy.wait(2000)
    policyGroup.inputControl().type(control)
    cy.wait(2000)
    policyGroup.selectControls(control).first().click()
    policyGroup.controlBlankClick().click()
    policyGroup.chooseResource().should('be.visible')
    policyGroup.chooseResource().click()
    policyGroup.selectResource(resource).click({ multiple: true })
    // policyGroup.clickAddRule().click()
    // policyGroup.invariantPropertyDropDown().should('be.visible')
    policyGroup.invariantPropertyDropDown().trigger('mouseover')
    policyGroup.invariantPropertyDropDown().click()
    // cy.wait(1000)
    // policyGroup.selectInvariantProperty(invariantProperty).should('have.value', invariantProperty)
    policyGroup.selectInvariantProperty(invariantProperty).first().click()
    policyGroup.invariantOperatorDropDown().click()
    // cy.wait(1000)
    policyGroup.selectCloudInvariantOperator(invariantOperator).click()
    policyGroup.invariantDropDown().click()
    policyGroup.invariantDropDown().type(invariantValue)
    // policyGroup.selectInvariantValue(invariantValue).click()
});

Cypress.Commands.add('removeSurfaceLayerForPG', (policyGroupName) => {
    policyGroup.policyGrouplink().trigger('mouseover')
    policyGroup.policyGrouplink().should('be.visible')
    policyGroup.policyGrouplink().click()
    policyGroup.search().clear()
    policyGroup.search().type(policyGroupName)
    policyGroup.selectSearchData(policyGroupName).should('be.visible');
    policyGroup.selectSearchData(policyGroupName).click()
    policyGroup.assignments().click()
    policyGroup.editSurfaceLayerButton().click()
    policyGroup.removeSurfaceLayer().click()
    policyGroup.updateSurfaceLayers().click()
    cy.wait(5000)
    policyGroup.policyGrouplink().trigger('mouseover')
    policyGroup.policyGrouplink().should('be.visible')
    policyGroup.policyGrouplink().click()
    policyGroup.search().clear()
    policyGroup.search().type(policyGroupName)
    policyGroup.SelectDraft(policyGroupName).first().click()
    policyGroup.publishButton().click({force: true})
})

Cypress.Commands.add('addAttributeTagForPG', (policyGroupName, attributeTagName) => {
    policyGroup.policyGrouplink().trigger('mouseover')
    policyGroup.policyGrouplink().should('be.visible')
    policyGroup.policyGrouplink().click()
    policyGroup.search().clear()
    policyGroup.search().type(policyGroupName)
    policyGroup.selectSearchData(policyGroupName).should('be.visible');
    policyGroup.selectSearchData(policyGroupName).click()
    policyGroup.attributeTagsTab().click()
    policyGroup.editAttributeTag().click()
    policyGroup.editAttributeTagDropDown().click()
    policyGroup.searchAttributeTagOnEdit().type(attributeTagName)
    policyGroup.selectAttributeTag(attributeTagName).click()
    policyGroup.updateButton().click()
    cy.wait(5000)
    // policyGroup.SelectDraft(policyGroupName).click()
    policyGroup.publishButtonForAttribute().click({force: true})
})

Cypress.Commands.add('removeAttributeTagForPG', (policyGroupName, attributeTag) => {

    policyGroup.policyGrouplink().trigger('mouseover')
    policyGroup.policyGrouplink().should('be.visible')
    policyGroup.policyGrouplink().click()
    policyGroup.search().clear()
    policyGroup.search().type(policyGroupName)
    policyGroup.selectSearchData(policyGroupName).click()
    policyGroup.attributeTagsTab().click()
    policyGroup.editAttributeTag().click()
    policyGroup.removeAttributeTag(attributeTag).click()
    policyGroup.updateButton().click()
    // policyGroup.policyGrouplink().click()
    // policyGroup.search().clear()
    // 
    // policyGroup.search().type(policyGroupName)
    // policyGroup.SelectDraft(policyGroupName).click()
    cy.wait(5000)
    policyGroup.publishButtonForAttribute().click({force: true})
})

Cypress.Commands.add('editPolicyGroupwithStatus', (policyGroupName, status) => {
    policyGroup.policyGrouplink().trigger('mouseover')
    policyGroup.policyGrouplink().should('be.visible')
    policyGroup.policyGrouplink().click()
    policyGroup.search().clear()
    policyGroup.search().type(policyGroupName)
    policyGroup.selectSearchData(policyGroupName).click()
    policyGroup.editButton().click()
    policyGroup.editPolicyGroupName().type(' Updated')

    if (status == 'PUBLISHED') {
        policyGroup.selectStatus(status).check()
    }
    policyGroup.selectStatus(status).check()
    policyGroup.submitButton().click()
})

Cypress.Commands.add('awsRTInvariantPolicy', (remediation, control, resource, invariantProperty, invariantOperator, invariantValue) => {
    policyGroup.remediation().type(remediation)
    policyGroup.controlsDropDown().click()
    cy.wait(2000)
    policyGroup.inputControl().type(control)
    cy.wait(2000)
    policyGroup.selectControls(control).first().click()
    policyGroup.controlBlankClick().click()
    policyGroup.chooseResource().should('be.visible')
    policyGroup.chooseResource().click()
    policyGroup.inputInvariant().click()
    policyGroup.inputInvariant().type(resource)
    policyGroup.selectResource(resource).click()
    // policyGroup.clickAddRule().click()
    policyGroup.invariantPropertyDropDown().trigger('mouseover')
    policyGroup.invariantPropertyDropDown().click()
    policyGroup.inputInvariant().click()
    policyGroup.inputInvariant().type(invariantProperty)
    policyGroup.selectInvariantProperty(invariantProperty).click()
    policyGroup.invariantOperatorDropDown().click()
    policyGroup.selectInvariantOperator(invariantOperator).click()
    policyGroup.invariantDropDown().click()
    policyGroup.invariantDropDown().type(invariantValue)
    // policyGroup.selectInvariantValue(invariantValue).click()
});

Cypress.Commands.add('addAwsRTInvariantPolicy', (policyGroupName, invariantProperty, invariantOperator, invariantValue) => {
    policyGroup.policyGrouplink().trigger('mouseover')
    policyGroup.policyGrouplink().should('be.visible')
    policyGroup.policyGrouplink().click()
    policyGroup.search().clear()
    policyGroup.search().type(policyGroupName)
    policyGroup.selectSearchData(policyGroupName).click()
    policyGroup.editPoliciesButton().click()
    policyGroup.addPolicies().click()
    policyGroup.invariantPath().trigger('mouseover')
    policyGroup.invariantPath().click()
    policyGroup.inputPath().click()
    policyGroup.inputPath().type(invariantProperty)
    policyGroup.selectPath(invariantProperty).click()
    // policyGroup.invariantOperatorDropDownOnEdit().trigger('mouseover')
    policyGroup.invariantOperatorDropDownOnEdit().click()
    policyGroup.selectInvariantOperator(invariantOperator).click()
    policyGroup.invariantValueOnEdit().click({ multiple: true })
    policyGroup.invariantValueOnEdit().type(invariantValue)
    // policyGroup.selectInvariantValue(invariantValue).click()
    policyGroup.confirmChanges().click()
    policyGroup.policyGrouplink().trigger('mouseover')
    policyGroup.policyGrouplink().should('be.visible')
    policyGroup.policyGrouplink().click()
    policyGroup.search().clear()
    policyGroup.search().type(policyGroupName)
    policyGroup.SelectDraft(policyGroupName).first({ multiple: true }).click()
    policyGroup.publishPolicy().click()
    cy.wait(15000)  // wait till data is commited to database. 
});