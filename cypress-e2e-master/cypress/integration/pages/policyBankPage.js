class policyBankPage {

    policylink() {
        return cy.get('[data-e2e="linkPolicy"]')
    }

    newPolicyLinkButton() {
        return cy.get('.btn-sm')
    }

    search() {
        return cy.get('[placeholder="Search"]')
    }

    selectSearchData(name) {
        return cy.xpath(`//h5[@class="title-text mb-0"][contains(.,'${name}')]`)
    }

    enterPolicyName() {
        return cy.get('#name');
    }

    enterPolicyDesc() {
        return cy.get('#description');
    }

    clickDetailsLink() {
        return cy.xpath('//a[contains(.,"Details")]')
    }

    clickDefinitionTab() {
        return cy.xpath('//a[contains(.,"Definition")]')
    }

    servicesDropDown() {
        return cy.get('ng-select[placeholder="Select Regions"]')
    }

    selectAllServices() {
        return cy.get('button[data-e2e="dropdownSelectAll"]')
    }

    selectService(service) {
        return cy.xpath(`//span[.='${service}']`)
    }

    remediationTab() {
        return cy.xpath('//a[@role="tab"][contains(.,"Remediation")]')
    }

    remediation() {
        return cy.xpath('//*[@class="tox-edit-area__iframe"]').then(function ($ele) {
            var ifele = $ele.contents().find("#tinymce")
            cy.wrap(ifele).click()
        })
    }

    clickService() {
        return cy.get('.p-picklist-source-wrapper > .p-picklist-filter-container > .p-picklist-filter > .p-picklist-filter-input')
    }

    enterService() {
        return cy.get('.p-picklist-source-wrapper > .p-picklist-filter-container > .p-picklist-filter > .p-picklist-filter-input')
    }

    selectServiece(service) {
        cy.xpath(`//li[@class='cdk-drag p-picklist-item p-ripple ng-star-inserted']/div[@class='ng-star-inserted'][contains(.,'${service}')]`)
    }

    moveToSelectedList() {
        cy.get('.pi-angle-right')
    }

    clickControlsTab() {
        return cy.xpath('//a[@role="tab"][contains(.,"Controls")]')
    }

    controlsDropDown() {
        return cy.get(`[placeholder='Select Controls']`)
    }

    controlBlankClick() {
        return cy.get('app-control-associate-policy > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    selectControls(control) {
        return cy.xpath(`//strong[.='${control}']`)
    }

    selectSeverity() {
        return cy.xpath('//div[@role="button"][contains(.,"Low")]')
    }

    selectStatus(status) {
        return cy.xpath('//p-radiobutton[@value="' + status + '"]')
    }

    clickEvaluateLink() {
        return cy.xpath('//a[contains(.,"Evaluate")]')
    }

    attributeTagDropDown() {
        return cy.get('[module="attribute-tag"] > .list-paginated-ng-select > div')
    }

    attributeBlankClick() {
        return cy.get('app-list-paginated-select > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    enterAttributeTag() {
        return cy.xpath('(//input[contains(@aria-autocomplete,"list")])[3]')
        
    }

    selectAttributeTag(attributeTagName) {
        return cy.xpath(`//span[.='${attributeTagName}']`)
    }

    closeAttributeTagDropDown() {
        return cy.get('div[_ngcontent-cje-c353=""] > :nth-child(1) > .pos-rel > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    attributeControlClick() {
        return cy.get('app-list-paginated-select> .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    selectSurfaceLayer(surfacelayer) {
        return cy.xpath(`//label[.='${surfacelayer}']`)
    }

    evaluateExpandClick() {
        return cy.get('.ms-Icon--SingleColumn')
    }

    searchPolicyTemplate() {
        return cy.get('.p-input-icon-left > .ng-untouched')
    }

    finalizePolicyButton() {
        return cy.get('[data-e2e="savePolicyBtn"]')
    }

    editButton() {
        return cy.get('[data-e2e="editPolicy"]')
    }

    editPolicyName() {
        return cy.get('[placeholder="Name"]').eq(0);
    }

    deleteDropDown() {
        return cy.get('.pos-rel > .btn > .ms-Icon')
    }

    deleteButton() {
        return cy.xpath('//button[contains(.,"Delete")]')
    }
    confirmDeleteButton() {
        return cy.get('.btn-danger')
    }

    clickBackButtonLink() {
        return cy.xpath('//a[@data-e2e="linkDashboard"][contains(.,"Back")]')
    }

    fileClick() {
        return cy.xpath('//a[@role="menuitem"][contains(.,"File")]')
    }
    newFile() {
        return cy.xpath('//a[@role="menuitem"][contains(.,"New")]')
    }

    privatelink() {
        return cy.xpath('//a[@data-e2e="linkPolicyCreate"][contains(.,"Private")]')
    }

    dragList() {
        return cy.xpath('//ul[@id="cdk-drop-list-0"]')
    }

    dropList() {
        return cy.xpath('//ul[@id="cdk-drop-list-1"]')
    }

    selectDirection() {
        return cy.get('.form-select').select('INCOMING')
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

    selectAWSRuntimeResource(resource) {
        return cy.xpath(`//span[.='a4b']`)
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

    clickAddRule() {
        return cy.xpath('//span[.="Add Rule"]')
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

    selectGroup(group) {
        return cy.xpath(`//div[@class='ng-dropdown-panel-items scroll-host']//div[.='${group}']`)
    }

    institutionMenuOnPolicybank() {
        return cy.xpath('//div[@class="ps"]//a[contains(.,"Institution")]')
    }

    selectPolicyBank(policy) {
        return cy.xpath(`//span[.='${policy}']`)
    }

    selectPolicyCheckBox() {
        return cy.get('.btn-group > :nth-child(1) > .ms-Icon')
    }

    visibleDropDown() {
        return cy.get('.dropdown-toggle-split')
    }

    selectVisible() {
        return cy.xpath('//a[contains(.,"Select Visible")]')
    }

    publishButton() {
        return cy.get('.btn-outline-success')
    }

    minorButton() {
        return cy.get('[for="versionBumpMinorRadio"]')
    }

    majorButton() {
        return cy.get('[for="versionBumpMajorRadio"]')
    }

    saveButton() {
        return cy.get('.p-button-label')
    }

    inputReleaseNote() {
        return cy.get('[placeholder="Release Note"]')
    }

    selectedDropDown() {
        return cy.get('#dropdownMenuButton1')
    }

    deployButton() {
        return cy.xpath('//a[contains(.,"Deploy as Policy Group")]')
    }

    enterPolicyGroupName() {
        return cy.get('[placeholder="Name"]')
    }

    enterPolicyGroupDesc() {
        return cy.get('[placeholder="Description"]')
    }

    owningGroupDropDown() {
        return cy.get('[formcontrolname="owningGroupId"] > div > span')
    }

    selectOwningGroup(group) {
        return cy.xpath(`//span[.='${group}']`)
    }

    attributeTagDropDown() {
        return cy.get('.list-paginated-ng-select > div > span')
    }

    inputAttributeTag() {
        return cy.xpath('(//div[@class="ng-select-container"]//input[1]')
    }

    selectAttributeTag(attributeTag) {
        return cy.xpath(`//div[@class='scrollable-content']/div[contains(.,'${attributeTag}')]`)
    }

    saveOnDeploypage() {
        return cy.xpath('//button[@class="btn btn-primary ng-star-inserted"]')
    }

    closeAndClearSelection() {
        return cy.xpath('//button[@class="btn btn-primary"]')
    }

    definitionTab() {
        return cy.xpath('//a[.="Definition"]')
    }
}

export default policyBankPage