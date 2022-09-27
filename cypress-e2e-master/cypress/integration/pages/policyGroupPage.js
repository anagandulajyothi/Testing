class policyGroupPage {

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

    selectAWSResource(resource) {
        return cy.xpath(`//span[.='aws_accessanalyzer_analyzer']`)
    }

    selectAzureResource(resource) {
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

    selectAttributeTag(attributeTagName) {
        return cy.xpath(`//span[.='${attributeTagName}']`)
    }

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
        return cy.get('.right-policy-view > div:nth-of-type(2) div:nth-of-type(2) > ng-select:nth-of-type(1)')
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
        return cy.get('.right-policy-view > div:nth-of-type(2) div:nth-of-type(2) > div:nth-of-type(3) input:nth-of-type(1)')
    }

    publishPolicy() {
        return cy.get('.p-button-label')
    }

    inputControl() {
        return cy.xpath(`(//input[contains(@aria-autocomplete,'list')])[5]`)
    }

}

export default policyGroupPage
