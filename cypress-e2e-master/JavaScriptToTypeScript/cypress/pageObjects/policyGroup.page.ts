export class policyGroupPage {

    policyGrouplink() {
        return cy.get('[data-e2e="policyGroupMenu"]')
    }
    newPolicyGroup() {
        return cy.get('.me-0.btn')
    }
    policyGroupTemplateDropDown() {
        return cy.get('[placeholder="Select Policy Group Template"]')
    }
    selectPolicyGroupTemplate(policyGroupTemplateName) {
        return cy.xpath(`//h5[contains(.,'${policyGroupTemplateName}')]`)
    }
    enterPolicyGroupName() {
        return cy.get('[data-e2e="policyGroupName"]')
    }
    enterPolicyGroupDesc() {
        return cy.get('[data-e2e="policyGroupDescription"]')
    }
    ownigGroupDropDown() {
        return cy.get('[data-e2e="selectOwningGroup"]')
    }
    enterOwnigGroup() {
        return cy.get('.ng-star-inserted > .pos-rel > .ng-select > .ng-select-container > .ng-value-container > .ng-input > input')
    }
    selectOwningGroup(owningGroup) {
        return cy.xpath(`//div[@class='ng-dropdown-panel-items scroll-host']/div[.='${owningGroup}']`)
    }
    selectStatus(status) {
        return cy.get('[value="' + status + '"]')
    }
    policyGroupMinor() {
        return cy.get('[value="MINOR"]')
    }
    attributeTagDropDown() {
        return cy.get('[formcontrolname="attributeTagIds"]')
    }
    enterAttributeTag() {
        return cy.xpath('(//input[contains(@aria-autocomplete,"list")])[4]')
    }
    selectAttributeTag(attributeTagName) {
        return cy.xpath(`//span[.='${attributeTagName}']`)
    }
    closeAttributeTagDropDown() {
        return cy.get('div[_ngcontent-cje-c353=""] > :nth-child(1) > .pos-rel > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }
    surfaceDropDown() {
        return cy.get('[data-e2e="surfaceSwitcherDropdown"]')
    }
    selectSurfaceLayer(surfacelayer) {
        return cy.xpath(`//label[.='${surfacelayer}']`)
    }
    remediation() {
        return cy.xpath('//textarea[@id="policyRemediation"]')
    }
    severityDropDown() {
        return cy.get(':nth-child(5) > .form-control')
    }
    low() {
        return cy.xpath(`//option[.='Low']`)
    }
    selectSeverity() {
        return cy.get('select').select('Low')
    }
    controlsDropDown() {
        return cy.get(`[placeholder='Select Controls']`)
    }
    selectControls(control) {
        return cy.xpath(`//strong[.='${control}']`)
    }
    controlBlankClick() {
        return cy.get('app-control-associate-policy > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }
    servicesDropDown() {
        return cy.get('ng-select[placeholder="Select Product"]')
    }
    selectAllServices() {
        return cy.get('button[data-e2e="dropdownSelectAll"]')
    }
    selectService(service) {
        return cy.xpath(`//span[.='${service}']`)
    }
    toast() {
        return cy.get('#toast-container')
    }
    createPolicyGroupButton() {
        return cy.get('.p-button-label')
    }
    search() {
        return cy.get('input[placeholder="Search"]')
    }
    selectSearchData(name) {
        return cy.xpath(`//h5[contains(.,'${name}')]`)
    }
    editButton() {
        return cy.get('[data-e2e="editPolicyGroup"]')
    }
    editPolicyGroupName() {
        return cy.get('[placeholder="Name"]')
    }
    submitButton() {
        return cy.xpath('//span[.="Submit"]')
    }
    deleteDropDown() {
        return cy.get('.pos-rel > .btn > .ms-Icon')
    }
    deleteButton() {
        return cy.xpath('//button[contains(.,"Delete")]')
    }
    confirmDeleteButton() {
        return cy.get('[data-e2e="confirmDeleteModalBtn"]')
    }

    entityTypeDropDown() {
        return cy.get('select').select('1')
    }

    selectPolicyGroupEntityType(entityType) {
        return cy.get('[data-e2e="entityType"]').select(`${entityType}`);
    }

    eventDropDown() {
        return cy.get('[data-e2e="eventType"] > div > span')
    }

    selectAllEvents() {
        return cy.get('button[data-e2e="dropdownSelectAll"]')
    }

    selectEvent(events) {
        return cy.xpath(`//span[.='${events}']`)
    }

    eventsBlankClick() {
        return cy.get('app-policy-template-form>div:nth-of-type(1)>div:nth-of-type(1)')
    }

    approvalGroupsDropDown() {
        return cy.get('[placeholder="Select Approval Groups"] > div > span')
    }

    enterGroupName() {
        return cy.get('[placeholder="Select Approval Groups"]').children('input')
    }

    selectGroup(group) {
        return cy.xpath(`//div[@class='ng-dropdown-panel-items scroll-host']//div[.='${group}']`)
    }

    policyGroupName(index) {
        return cy.xpath('(//input[@id="policyName"])[' + index + ']')
    }

    policyGroupDesc(index) {

        return cy.xpath("(//input[@id='policyDescription'])[" + index + "]")
    }

    controlForawsResources(index) {
        return cy.xpath('(//div[@role="combobox"])[' + index + ']')
    }

    awsResourcesOperator(index) {
        return cy.xpath('(//ng-select[@formcontrolname="operator"])[' + index + ']')
    }

    selectawsResourcesOperatorOption(option) {
        return cy.xpath("//div//small[contains(., '" + option + "')]")
    }

    awsResourcesProperty() {
        return cy.xpath('(//ng-select[@formcontrolname="property"])[1]')
    }

    enterAWSProperty() {
        return cy.xpath('//div[@aria-expanded="true"]//input[@type="text"]')
    }

    selectAwsResourcesPropertyOption(property) {
        return cy.xpath(`//div[@data-e2e='${property}']`)
    }

    azureProperty() {
        return cy.xpath('(//ng-select[@formcontrolname="property"])[2]')
    }

    inputAzureProperty() {
        return cy.xpath(`(//input[contains(@aria-autocomplete,'list')])[12]`)
    }

    selectControlAzure(control) {
        return cy.xpath(`(//strong[contains(.,'${control}')])[3]`)
    }

    selectAzurePropertyOption(property) {
        return cy.xpath(`//div[@data-e2e='${property}']`)
    }

    clickOnGCPProperty() {
        return cy.xpath('(//ng-select[@formcontrolname="property"])[3]')
    }

    inputGcpTerraformProperty() {
        return cy.xpath(`(//input[contains(@aria-autocomplete,'list')])[17]`)
    }

    selectGCPProperty(property) {
        return cy.xpath(`//div[@data-e2e='${property}']`)
    }

    selectValueDropdown(index) {
        return cy.xpath('(//ng-select[@placeholder="Type a Value"])[' + index + ']')
    }

    selectValueOption() {
        return cy.xpath('//div[@role="option"]/span')
    }

    clickonOperator(index) {
        return cy.xpath('(//ng-select[@formcontrolname="operator"])[' + index + ']')
    }

    selectOperatorOption(option) {
        return cy.xpath("//div//small[contains(., '" + option + "')]")
    }

    selectcontrolsforTerraForm(index) {
        return cy.xpath('(//div[@role="combobox"])[' + index + ']')
    }

    awsControlsBlanckClick() {
        return cy.get(':nth-child(1) > .p-0 > .policy-control-grid_item > :nth-child(4) > app-control-associate-policy > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    azureControlsBlanckClick() {
        return cy.get(':nth-child(2) > .p-0 > .policy-control-grid_item > :nth-child(4) > app-control-associate-policy > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    gcpControlsBlanckClick() {
        return cy.get(':nth-child(3) > .p-0 > .policy-control-grid_item > :nth-child(4) > app-control-associate-policy > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    chooseResource() {
        return cy.get('[placeholder="Search Resources"]')
    }

    chooseAWSResource() {
        return cy.get('app-invariant-aws-terraform.ng-star-inserted > :nth-child(3) > .ng-untouched > .card > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    chooseAzureResource() {
        return cy.get('app-invariant-azure-terraform.ng-star-inserted > :nth-child(3) > .ng-untouched.ng-star-inserted > .card > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    chooseGCPResource() {
        return cy.get('app-invariant-gcp-terraform.ng-star-inserted > :nth-child(3) > .ng-untouched > .card > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    selectResource(resource) {
        return cy.xpath(`//span[.='${resource}']`)
    }

    selectAWSResource() {
        return cy.xpath(`//span[.='aws_accessanalyzer_analyzer']`)
    }

    selectAzureResource() {
        return cy.xpath(`//span[.='azuread_application']`)
    }

    selectGCPResource() {
        return cy.xpath(`//span[.='google_access_context_manager_access_level']`)
    }

    invariantPropertyDropDown() {
        return cy.get('[formcontrolname="property"] > div > span')
    }

    inputInvariantProperty() {
        return cy.get('[formcontrolname="property"]').children('input')
    }

    selectInvariantProperty(invariantProperty) {
        return cy.xpath(`//div[@class='scrollable-content']/div[contains(.,'${invariantProperty}')]`)
    }

    invariantOperatorDropDown() {
        return cy.get('[formcontrolname="operator"] > div > span')
    }

    selectInvariantOperator(Operator) {
        return cy.xpath(`//div[.='${Operator}']`)
    }

    selectCloudInvariantOperator(Operator) {
        return cy.get(`[data-e2e='${Operator}'] small`)
        // return cy.xpath(`//small[.='${Operator}']`)
    }

    invariantDropDown() {
        return cy.get('[data-e2e="value-0"]')
    }

    inputInvariantValue() {
        return cy.get('[data-e2e="value-0"]').children('input')
    }

    selectInvariantValue(value) {
        return cy.xpath(`//span[.='Add item"${value}"']`)
    }

    assignments() {
        return cy.get('[panel="surface-layers"]')
    }

    editSurfaceLayerButton() {
        return cy.get('.btn-outline-primary[data-e2e="editSurfaceLayers"]')
    }

    removeSurfaceLayer() {
        return cy.get('.btn-danger')
    }

    updateSurfaceLayers() {
        return cy.get('[data-e2e="updateSurfaceLayers"]')
    }

    publishButton() {
        return cy.xpath('//span[@class="p-button-label ng-star-inserted"]')
    }

    SelectDraft(data) {
        return cy.xpath(`//div[contains(., '${data}')]//div//div//div//div//span[contains(., 'Draft')][1]`)
    }

    selectRule() {
        return cy.xpath(`//div[.='Include CFN warning messages as violations']`)
    }

    attributeTagsTab() {
        return cy.get('[panel="attribute-tags"]')
    }

    editAttributeTag() {
        return cy.get('.btn[data-e2e="editAttributeTag"]')
    }

    editAttributeTagDropDown() {
        return cy.get('ng-select[formcontrolname="attributeTagIds"]')
    }

    searchAttributeTagOnEdit() {
        return cy.xpath('//div[@aria-expanded="true"]//input[@type="text"]')
    }

    // selectAttributeTag(attributeTagName) {
    //     return cy.xpath(`//span[.='${attributeTagName}']`)
    // }

    updateButton() {
        return cy.get('.p-button-label')
    }

    publishButtonForAttribute() {
        return cy.get('p-button[data-e2e="quickPublish"]')
    }

    removeAttributeTag(attributeTag) {
        return cy.xpath(`//span[contains(., '${attributeTag}')]//preceding-sibling::span`)
    }

    removePreviousAttribute() {
        return cy.xpath('(//div[@class="ng-value ng-star-inserted"]/span[1])[2]')
    }

    clickAddRule() {
        return cy.xpath('//span[.="Add Rule"]')
    }

    inputInvariant() {
        return cy.get('[aria-expanded="true"]')
    }

    editPoliciesButton() {
        return cy.get('.btn[data-e2e="editPoliciesv2"]')
    }

    addPolicies() {
        return cy.get('.mt-1.btn')
    }

    confirmChanges() {
        return cy.get('[data-e2e="submitPolicyGroupChanges"]')
    }

    addRuleButtonOnEdit() {
        return cy.get('.right-policy-view > div:nth-of-type(2) app-custom-policy-cross-resource-related:nth-of-type(1) > div:nth-of-type(1) > button:nth-of-type(1) > span:nth-of-type(1)')
    }

    invariantPropertyDropDownOnEdit() {
        return cy.get('.right-policy-view > div:nth-of-type(2) div:nth-of-type(2) > div:nth-of-type(1) span:nth-of-type(2)')
    }

    invariantOperatorDropDownOnEdit() {
        return cy.get(':nth-child(3) > app-custom-policy-cross-resource-rule > .card > :nth-child(1) > .invariant-rule > .op-select > .ng-select-searchable > .ng-select-container > .ng-arrow-wrapper')
    }

    invariantPath() {
        return cy.get('[placeholder="Search Paths"] > div > span')
    }

    inputPath() {
        return cy.get('[placeholder="Search Paths"] [role="combobox"]')
    }

    selectPath(path) {
        return cy.get(`[data-e2e='${path}'] .me-2`)
    }

    invariantValueOnEdit() {
        return cy.get('[data-e2e="value-1"]')
    }

    publishPolicy() {
        return cy.get('.p-button-label')
    }

    inputControl() {
        return cy.xpath(`(//input[contains(@aria-autocomplete,'list')])[5]`)
    }

    createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc,
        owningGroup, status, attributeTagName, remediation, control, service, surfaceLayer, entityType, group, awsName, awsDesc, awscontrol, awsProperty, awsOperator, awsValue,
        azureName, azureDesc, azureControl, azureProperty, azureOperator, azureValue, gcpName, gcpDesc, gcpControl, gcpProperty, gcpOperator, gcpvalue, resource, invariantProperty, invariantOperator, invariantValue) {

        this.policyGrouplink().trigger('mouseover')
        this.policyGrouplink().should('be.visible')
        this.policyGrouplink().click()
        this.newPolicyGroup().should('be.visible')
        this.newPolicyGroup().click()
        this.policyGroupTemplateDropDown().click()
        this.policyGroupTemplateDropDown().type(policyGroupTemplateName)
        this.selectPolicyGroupTemplate(policyGroupTemplateName).click()
        this.enterPolicyGroupName().type(policyGroupName)
        this.enterPolicyGroupDesc().type(policyGroupDesc)
        this.ownigGroupDropDown().click()
        this.enterOwnigGroup().type(owningGroup)
        this.selectOwningGroup(owningGroup).click()

        if (status == 'PUBLISHED') {
            this.selectStatus(status).check()
            this.policyGroupMinor().check()
        }

        this.selectStatus(status).check()
        this.attributeTagDropDown().click()
        this.enterAttributeTag().type(attributeTagName)
        this.selectAttributeTag(attributeTagName).click()

        if (surfaceLayer === 'Default Surface - Root Surface Layer') {
            this.selectSurfaceLayer(surfaceLayer).click()
        }

        if (policyGroupTemplateName.includes('AWS Products')) {
            this.awsProducts(remediation, control, service);
        }

        if (policyGroupTemplateName.includes('Require')) {
            this.approval(remediation, control, entityType, group);
        }

        if (policyGroupTemplateName.includes('Terraform')) {
            this.terraformTemplate(awsName, awsDesc, awscontrol, awsProperty, awsOperator, awsValue,
                azureName, azureDesc, azureControl, azureProperty, azureOperator, azureValue, gcpName, gcpDesc, gcpControl, gcpProperty, gcpOperator, gcpvalue);
        }

        if (policyGroupTemplateName.includes('Invariant AWS Api')) {
            this.invariantPolicy(remediation, control, resource, invariantProperty, invariantOperator, invariantValue)
        }

        if (policyGroupTemplateName.includes('Invariant Cloud Formation')) {
            this.cloudFormationInvarientPolicy(remediation, control, resource, invariantProperty, invariantOperator, invariantValue)
        }

        if (policyGroupTemplateName.includes('CFN NAG')) {
            this.cfnNagPolicy(remediation, control);
        }

        if (policyGroupTemplateName.includes('AWS RT Invariant')) {
            this.awsRTInvariantPolicy(remediation, control, resource, invariantProperty, invariantOperator, invariantValue);
        }

        // this.createPolicyGroupButton().trigger('mouseover')
        this.createPolicyGroupButton().should('be.visible')
        this.createPolicyGroupButton().click({ force: true })
        cy.wait(3000)
    }

    editPolicyGroup(policyGroupName) {
        this.policyGrouplink().trigger('mouseover')
        this.policyGrouplink().should('be.visible')
        this.policyGrouplink().click()
        this.search().clear()
        this.search().type(policyGroupName)
        this.selectSearchData(policyGroupName).click()
        this.editButton().click()
        this.editPolicyGroupName().type(' Updated')
        this.submitButton().click()
    }

    deletePolicyGroup(policyGroupName) {
        this.policyGrouplink().trigger('mouseover')
        cy.wait(2000)
        this.policyGrouplink().should('be.visible').click()
        this.policyGrouplink().click()
        this.search().clear()
        cy.wait(10000)
        this.search().type(policyGroupName)
        cy.wait(5000)
        this.selectSearchData(policyGroupName).should('be.visible');
        this.selectSearchData(policyGroupName).click()
        this.deleteDropDown().click()
        this.deleteButton().click()
        this.confirmDeleteButton().click()
        cy.wait(10000)
    }

    awsProducts(remediation, control, service) {
        this.remediation().type(remediation)
        this.controlsDropDown().click()
        cy.wait(2000)
        this.inputControl().type(control)
        cy.wait(2000)
        this.selectControls(control).first().click()
        this.controlBlankClick().click()
        this.selectSeverity()
        this.servicesDropDown().click()
        this.selectService(service).click()
    }

    cfnNagPolicy(remediation, control) {
        this.remediation().type(remediation)
        this.controlsDropDown().click()
        cy.wait(2000)
        this.inputControl().type(control)
        cy.wait(2000)
        this.selectControls(control).first().click()
        this.controlBlankClick().click()
        this.selectSeverity()
        // this.servicesDropDown().click()
        // this.selectRule().click()
    }

    approval(remediation, control, entityType, group) {
        this.remediation().type(remediation)
        this.controlsDropDown().click()
        cy.wait(2000)
        this.inputControl().type(control)
        cy.wait(2000)
        this.selectControls(control).first().click()
        this.controlBlankClick().click()
        // this.entityTypeDropDown()
        this.selectPolicyGroupEntityType(entityType)
        this.eventDropDown().click()
        this.selectAllEvents().click()
        this.approvalGroupsDropDown().click()
        // this.enterGroupName().type(group)
        this.selectGroup(group).click()
    }


    terraformTemplate(awsName, awsDesc, awscontrol, awsProperty, awsOperator, awsValue,
        azureName, azureDesc, azureControl, azureProperty, azureOperator, azureValue, gcpName, gcpDesc, gcpControl, gcpProperty, gcpOperator, gcpvalue) {
        this.policyGroupName(1).type(awsName)
        this.policyGroupDesc(1).type(awsDesc)
        cy.wait(2000)
        this.inputControl().type(awscontrol)
        cy.wait(2000)
        this.selectcontrolsforTerraForm(5).click()
        this.selectControls(awscontrol).first().click()
        this.awsControlsBlanckClick().click()
        // this.chooseAWSResource().should('be.visible')
        this.chooseAWSResource().click()
        this.selectAWSResource().click()
        // this.clickAddRule().click()
        this.awsResourcesProperty().click()
        this.enterAWSProperty().type(awsProperty).should('have.value', awsProperty)
        this.selectAwsResourcesPropertyOption(awsProperty).click()
        this.awsResourcesOperator(1).click()
        this.selectawsResourcesOperatorOption(awsOperator).click()
        this.selectValueDropdown(1).type(awsValue)
        this.selectValueOption().click()
        this.policyGroupName(2).type(azureName)
        this.policyGroupDesc(2).type(azureDesc)
        this.selectcontrolsforTerraForm(10).click()
        cy.wait(2000)
        cy.get('(//input[contains(@aria-autocomplete,"list")])[6]').type(azureControl)
        cy.wait(2000)
        this.selectControlAzure(azureControl).click()
        this.azureControlsBlanckClick().click()
        // this.chooseAzureResource().should('be.visible')
        this.chooseAzureResource().click()
        this.selectAzureResource().click()
        // this.clickAddRule().click()
        this.azureProperty().click()
        this.inputAzureProperty().type(azureProperty).should('have.value', azureProperty)
        this.selectAzurePropertyOption(azureProperty).click()
        this.clickonOperator(2).click()
        this.selectOperatorOption(azureOperator).click()
        this.selectValueDropdown(2).type(azureValue)
        this.selectValueOption().click()
        this.policyGroupName(3).type(gcpName)
        this.policyGroupDesc(3).type(gcpDesc)
        this.selectcontrolsforTerraForm(15).click()
        cy.wait(2000)
        cy.get('(//input[contains(@aria-autocomplete,"list")])[10]').type(gcpControl)
        cy.wait(2000)
        this.selectControlAzure(gcpControl).click()
        this.gcpControlsBlanckClick().click()
        this.chooseGCPResource().click()
        this.selectGCPResource().click()
        // this.clickAddRule().click()
        this.clickOnGCPProperty().click()
        this.inputGcpTerraformProperty().type(gcpProperty).should('have.value', gcpProperty)
        this.selectGCPProperty(gcpProperty).click()
        this.clickonOperator(3).click()
        this.selectOperatorOption(gcpOperator).click()
        this.selectValueDropdown(3).type(gcpvalue)
        this.selectValueOption().click()
        this.createPolicyGroupButton().trigger('mouseover')
    }

    invariantPolicy(remediation, control, resource, invariantProperty, invariantOperator, invariantValue) {
        this.remediation().type(remediation)
        this.controlsDropDown().click()
        cy.wait(2000)
        this.inputControl().type(control)
        cy.wait(2000)
        this.selectControls(control).first().click()
        this.controlBlankClick().click()
        this.chooseResource().should('be.visible')
        this.chooseResource().click()
        this.chooseResource().type(resource)
        this.selectResource(resource).click()
        // this.clickAddRule().click()
        // this.invariantPropertyDropDown().should('be.visible')
        this.invariantPropertyDropDown().trigger('mouseover')
        this.invariantPropertyDropDown().click()
        // cy.wait(10000)
        // this.inputInvariantProperty().click()
        // this.inputInvariantProperty().type(invariantProperty).should('have.value', invariantProperty)
        // this.selectInvariantProperty(invariantProperty).trigger('mouseover')
        this.selectInvariantProperty(invariantProperty).first().click()
        // this.invariantOperatorDropDown().should('be.visible')
        this.invariantOperatorDropDown().click()
        // this.selectInvariantOperator(invariantOperator).should('be.visible')
        this.selectInvariantOperator(invariantOperator).click()
        // this.inputInvariantValue().should('be.visible')
        this.invariantDropDown().click()
        this.invariantDropDown().type(invariantValue)
        // this.selectInvariantValue(invariantValue).click()
    }

    cloudFormationInvarientPolicy(remediation, control, resource, invariantProperty, invariantOperator, invariantValue) {
        this.remediation().type(remediation)
        this.controlsDropDown().click()
        cy.wait(2000)
        this.inputControl().type(control)
        cy.wait(2000)
        this.selectControls(control).first().click()
        this.controlBlankClick().click()
        this.chooseResource().should('be.visible')
        this.chooseResource().click()
        this.selectResource(resource).click({ multiple: true })
        // this.clickAddRule().click()
        // this.invariantPropertyDropDown().should('be.visible')
        this.invariantPropertyDropDown().trigger('mouseover')
        this.invariantPropertyDropDown().click()
        // cy.wait(1000)
        // this.selectInvariantProperty(invariantProperty).should('have.value', invariantProperty)
        this.selectInvariantProperty(invariantProperty).first().click()
        this.invariantOperatorDropDown().click()
        // cy.wait(1000)
        this.selectCloudInvariantOperator(invariantOperator).click()
        this.invariantDropDown().click()
        this.invariantDropDown().type(invariantValue)
        // this.selectInvariantValue(invariantValue).click()
    };

    removeSurfaceLayerForPG(policyGroupName) {
        this.policyGrouplink().trigger('mouseover')
        this.policyGrouplink().should('be.visible')
        this.policyGrouplink().click()
        this.search().clear()
        this.search().type(policyGroupName)
        this.selectSearchData(policyGroupName).should('be.visible');
        this.selectSearchData(policyGroupName).click()
        this.assignments().click()
        this.editSurfaceLayerButton().click()
        this.removeSurfaceLayer().click()
        this.updateSurfaceLayers().click()
        cy.wait(5000)
        this.policyGrouplink().trigger('mouseover')
        this.policyGrouplink().should('be.visible')
        this.policyGrouplink().click()
        this.search().clear()
        this.search().type(policyGroupName)
        this.SelectDraft(policyGroupName).first().click()
        this.publishButton().click({ force: true })
    }

    addAttributeTagForPG(policyGroupName, attributeTagName) {
        this.policyGrouplink().trigger('mouseover')
        this.policyGrouplink().should('be.visible')
        this.policyGrouplink().click()
        this.search().clear()
        this.search().type(policyGroupName)
        this.selectSearchData(policyGroupName).should('be.visible');
        this.selectSearchData(policyGroupName).click()
        this.attributeTagsTab().click()
        this.editAttributeTag().click()
        this.editAttributeTagDropDown().click()
        this.searchAttributeTagOnEdit().type(attributeTagName)
        this.selectAttributeTag(attributeTagName).click()
        this.updateButton().click()
        cy.wait(5000)
        // this.SelectDraft(policyGroupName).click()
        this.publishButtonForAttribute().click({ force: true })
    }

    removeAttributeTagForPG(policyGroupName, attributeTag) {

        this.policyGrouplink().trigger('mouseover')
        this.policyGrouplink().should('be.visible')
        this.policyGrouplink().click()
        this.search().clear()
        this.search().type(policyGroupName)
        this.selectSearchData(policyGroupName).click()
        this.attributeTagsTab().click()
        this.editAttributeTag().click()
        this.removeAttributeTag(attributeTag).click()
        this.updateButton().click()
        // this.policyGrouplink().click()
        // this.search().clear()
        // 
        // this.search().type(policyGroupName)
        // this.SelectDraft(policyGroupName).click()
        cy.wait(5000)
        this.publishButtonForAttribute().click({ force: true })
    }

    editPolicyGroupwithStatus(policyGroupName, status) {
        this.policyGrouplink().trigger('mouseover')
        this.policyGrouplink().should('be.visible')
        this.policyGrouplink().click()
        this.search().clear()
        this.search().type(policyGroupName)
        this.selectSearchData(policyGroupName).click()
        this.editButton().click()
        this.editPolicyGroupName().type(' Updated')

        if (status == 'PUBLISHED') {
            this.selectStatus(status).check()
        }
        this.selectStatus(status).check()
        this.submitButton().click()
    }

    awsRTInvariantPolicy(remediation, control, resource, invariantProperty, invariantOperator, invariantValue) {
        this.remediation().type(remediation)
        this.controlsDropDown().click()
        cy.wait(2000)
        this.inputControl().type(control)
        cy.wait(2000)
        this.selectControls(control).first().click()
        this.controlBlankClick().click()
        this.chooseResource().should('be.visible')
        this.chooseResource().click()
        this.inputInvariant().click()
        this.inputInvariant().type(resource)
        this.selectResource(resource).click()
        // this.clickAddRule().click()
        this.invariantPropertyDropDown().trigger('mouseover')
        this.invariantPropertyDropDown().click()
        this.inputInvariant().click()
        this.inputInvariant().type(invariantProperty)
        this.selectInvariantProperty(invariantProperty).click()
        this.invariantOperatorDropDown().click()
        this.selectInvariantOperator(invariantOperator).click()
        this.invariantDropDown().click()
        this.invariantDropDown().type(invariantValue)
        // this.selectInvariantValue(invariantValue).click()
    }

    addAwsRTInvariantPolicy(policyGroupName, invariantProperty, invariantOperator, invariantValue) {
        this.policyGrouplink().trigger('mouseover')
        this.policyGrouplink().should('be.visible')
        this.policyGrouplink().click()
        this.search().clear()
        this.search().type(policyGroupName)
        this.selectSearchData(policyGroupName).click()
        this.editPoliciesButton().click()
        this.addPolicies().click()
        this.invariantPath().trigger('mouseover')
        this.invariantPath().click()
        this.inputPath().click()
        this.inputPath().type(invariantProperty)
        this.selectPath(invariantProperty).click()
        this.invariantOperatorDropDownOnEdit().trigger('mouseover')
        this.invariantOperatorDropDownOnEdit().click()
        this.selectInvariantOperator(invariantOperator).click()
        this.invariantValueOnEdit().click()
        this.invariantValueOnEdit().type(invariantValue)
        // this.selectInvariantValue(invariantValue).click()
        this.confirmChanges().click()
        cy.wait(3000)
        this.policyGrouplink().trigger('mouseover')
        this.policyGrouplink().should('be.visible')
        this.policyGrouplink().click()
        this.search().clear()
        this.search().type(policyGroupName)
        this.SelectDraft(policyGroupName).first().click({ multiple: true })
        this.publishPolicy().click()
        cy.wait(15000)  // wait till data is commited to database. 
    }

}

