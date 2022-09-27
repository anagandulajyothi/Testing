export class logicalDeploymentPage {

    deployTab() {
        return cy.get('sl-tab[panel="deployments"]')
    }

    triggerLogicalDeployment() {
        return cy.get('button[title="Deploy Asset"]')
    }

    enterDeploymentName() {
        return cy.get('[placeholder="Deployment Name"]')
    }

    enterStackName() {
        return cy.get('[placeholder="Stack Name"]')
    }

    ownigGroupDropDown() {
        return cy.get('[placeholder="Select Owning Group"]')
    }

    selectOwingGroupOption(optionvalue) {
        return cy.xpath('//span[contains(., "' + optionvalue + '")]')
    }

    cloudRegionDropDown() {
        return cy.get('ng-select[formcontrolname="cloudRegion"]')
    }

    selectCloudRegionOption(regionvalue) {
        return cy.xpath('//span[contains(., "' + regionvalue + '")]')

    }

    AssociateSurfaceLayer() {
        return cy.get('ng-select[placeholder="Select a Surface Layer"]')
    }

    selectSurfaceLayerOption(layeroption) {
        return cy.xpath('//span[contains(., "' + layeroption + '")]')
    }

    CloudAccountDropdown() {
        // return cy.get('ng-select[placeholder="Select AWS Account"]')
        return cy.get('ng-select[formcontrolname="awsAccount"]')
    }

    selectCloudAccountOption(accountoption) {
        //return cy.xpath('//span[contains(., "'+accountoption+'")]')
        return cy.xpath('//span[normalize-space()="' + accountoption + '"]')
    }

    nextBtn() {
        return cy.get('[data-e2e="next"]')
    }

    submitbtn() {
        return cy.get('[data-e2e="submit"]')
    }

    logicalDeployementMenu() {
        return cy.xpath('//a[contains(.,"Logical Deployments")]')
    }

    search() {
        return cy.get('[placeholder="Search"]')
    }

    selectsearchdata(name) {
        return cy.xpath(`//h5[contains(.,'${name}')]`)
    }

    updateDeploymentButton() {
        return cy.get('[data-e2e="changeDeploymentVersion"]')
    }

    versionDropDown() {
        return cy.get('[placeholder="Select a different version"]')
    }

    selectVersion(assetName, version) {
        return cy.xpath(`//span[contains(.,'${(assetName) + (version)}')]`)
    }

    deleteDropDownButton() {
        return cy.get('.pos-rel > .btn > .ms-Icon')
    }
    deleteButton() {
        return cy.get('[data-e2e="deleteLogicalDeployment"]')
    }

    confirmDeleteButton() {
        return cy.xpath('//span[contains(., "Delete")]')
    }
    clickassetsManagerMenu() {
        return cy.get('a[data-e2e="linkAssets"]')
    }

    createLogicalDeployment(DeploymentType, assetName, deploymentName, stackName, owningGroup, region, surfaceLayer, account) {

        this.clickassetsManagerMenu().click()
        this.search().clear()
        this.search().type(assetName)
        this.selectsearchdata(assetName).click()
        this.deployTab().click()
        this.triggerLogicalDeployment().click()
        this.enterDeploymentName().type(deploymentName)

        if (DeploymentType == 'AWS') {
            this.enterStackName().type(stackName)
        }

        this.ownigGroupDropDown().click()
        this.selectOwingGroupOption(owningGroup).click()

        if (DeploymentType == 'AWS') {
            this.cloudRegionDropDown().click()
            this.selectCloudRegionOption(region).click()
        }

        this.AssociateSurfaceLayer().click()
        // logicalDeployment.selectSurfaceLayerOption(surfaceoption).click()
        this.CloudAccountDropdown().click()
        this.selectCloudAccountOption(account).click()
        this.nextBtn().click()

        if (DeploymentType == 'AWS') {
            this.nextBtn().click()
        }

        this.submitbtn().click()
    }

    updateLogicalDeployment(deploymentName, assetName, version) {
        this.logicalDeployementMenu().click()
        this.search().type(deploymentName)
        this.selectsearchdata(deploymentName).click()
        this.updateDeploymentButton().click()
        this.versionDropDown().click()
        this.selectVersion(assetName, version).click()
        this.nextBtn().click()
        this.nextBtn().click()
        this.submitbtn().click()
    }

    deleteLogicalDeployment(deploymentName) {
        this.logicalDeployementMenu().click()
        this.search().clear()
        this.search().type(deploymentName)
        this.selectsearchdata(deploymentName).click()
        this.deleteDropDownButton().click()
        this.deleteButton().click()
        this.confirmDeleteButton().click({ force: true })
    }

}