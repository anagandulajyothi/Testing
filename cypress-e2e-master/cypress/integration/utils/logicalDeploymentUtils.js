import loginPage from "../pages/loginPage";
import logicalDeploymentPage from '../pages/logicalDeploymentPage.js'
const login = new loginPage()
import assetsManagerPage from '../pages/buildTimeInventory.Page'
const assetsManager = new assetsManagerPage()
const logicalDeployment = new logicalDeploymentPage()

Cypress.Commands.add('createLogicalDeployment', (DeploymentType, assetName, deploymentName, stackName, owningGroup, region, surfaceLayer, account) => {

    assetsManager.clickassetsManagerMenu().click()
    assetsManager.search().clear()
    assetsManager.search().type(assetName)
    assetsManager.selectSearchData(assetName).click()
    logicalDeployment.deployTab().click()
    logicalDeployment.triggerLogicalDeployment().click()
    logicalDeployment.enterDeploymentName().type(deploymentName)

    if (DeploymentType == 'AWS') {
        logicalDeployment.enterStackName().type(stackName)
    }

    logicalDeployment.ownigGroupDropDown().click()
    logicalDeployment.selectOwingGroupOption(owningGroup).click()

    if (DeploymentType == 'AWS') {
        logicalDeployment.cloudRegionDropDown().click()
        logicalDeployment.selectCloudRegionOption(region).click()
    }

    logicalDeployment.AssociateSurfaceLayer().click()
    // logicalDeployment.selectSurfaceLayerOption(surfaceoption).click()
    logicalDeployment.CloudAccountDropdown().click()
    logicalDeployment.selectCloudAccountOption(account).click()
    logicalDeployment.nextBtn().click()

    if (DeploymentType == 'AWS') {
        logicalDeployment.nextBtn().click()
    }

    logicalDeployment.submitbtn().click()
})

Cypress.Commands.add('updateLogicalDeployment', (deploymentName, assetName, version) => {
    logicalDeployment.logicalDeployementMenu().click()
    logicalDeployment.search().type(deploymentName)
    logicalDeployment.selectsearchdata(deploymentName).click()
    logicalDeployment.updateDeploymentButton().click()
    logicalDeployment.versionDropDown().click()
    logicalDeployment.selectVersion(assetName, version).click()
    logicalDeployment.nextBtn().click()
    logicalDeployment.nextBtn().click()
    logicalDeployment.submitbtn().click()
})

Cypress.Commands.add('deleteLogicalDeployment', (deploymentName) => {
    logicalDeployment.logicalDeployementMenu().click()
    logicalDeployment.search().clear()
    logicalDeployment.search().type(deploymentName)
    logicalDeployment.selectsearchdata(deploymentName).click()
    logicalDeployment.deleteDropDownButton().click()
    logicalDeployment.deleteButton().click()
    logicalDeployment.confirmDeleteButton().click({force: true})
})