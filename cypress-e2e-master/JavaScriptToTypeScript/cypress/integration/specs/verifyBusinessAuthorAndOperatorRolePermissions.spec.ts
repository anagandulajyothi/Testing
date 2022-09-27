import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'
import { logicalDeploymentPage } from '../../pageObjects/logicalDeployment.page'
import { GroupPage } from '../../pageObjects/groups.page'

const login = new loginPage()
const attributeTags = new attributeTagPage()
const assetsManager = new assetsManagerPage()
const logicalDeployment = new logicalDeploymentPage()
const group = new GroupPage()

let groupName
let desc
let user
let businessAuthorRole
let businessAuthorResponsibilities
let organization
let groupId
let baselineAssetName
let description
let attribute
let attributeTag
let attributeTagDescription
let modelName
let modelDescription
let deploymentName
let stackName
let businessOperatorRole
let businessOperatorResponsibilities

describe('Verify Business Author&Operator Permissions', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            groupName = this.testdata.groupName + utils.getUniqueString()
            desc = this.testdata.groupDesc
            user = this.testdata.user
            businessAuthorRole = this.testdata.businessAuthor
            businessAuthorResponsibilities = this.testdata.businessAuthorResponsibilities
            businessOperatorRole = this.testdata.businessOperator
            businessOperatorResponsibilities = this.testdata.businessOperatorResponsibilities
            organization = this.testdata.organization
            attribute = this.testdata.attributeTagName + utils.getUniqueString()
            attributeTagDescription = this.testdata.attributeTagDesc
            modelName = this.testdata.awsModelName + utils.getUniqueString()
            modelDescription = this.testdata.awsModelDesc
            baselineAssetName = this.testdata.baselineAssetName + utils.getUniqueString()
            description = this.testdata.baselineAssetDesc
            deploymentName = this.testdata.deploymentName + utils.getUniqueString()
            stackName = this.testdata.stackName + utils.getUniqueString()
            attributeTag = [attribute];
            login.login(this.testdata)
        })
    })

    it('Verify Business Author&Operator Permission', function () {
        cy.log('Step 1: Create Group')
        group.createGroup(groupName, desc)
        return groupId = group.getId().then(myid => {
            groupId = myid
            cy.wrap(groupId).as('groupId')
            cy.log('id is', groupId)
            groupId = (groupId.slice(0, 5))
            cy.log('Latest Id', groupId)

            cy.log('Step 2: Add User To Group')
            group.addSameUser(groupName, user)
            utils.assertSucessMsg('User Added Successfully')

            cy.log('Step 3: Add Business Author Role Assignment To Group')
            group.addRoleAssignments(groupName, businessAuthorRole, businessAuthorResponsibilities, organization, true)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            cy.log('Step 4: Add Business Operator Role Assignment To Group')
            group.addAnotherRoleAssignments(businessOperatorRole, businessOperatorResponsibilities, organization, true)
            utils.assertSucessMsg('Role Assignment Created Successfully')

            // cy.log('Step 5: Create New BaseLine Asset')
            // cy.createBaseLine(baselineAssetName, description, groupName)

            // cy.log('Step 6: Delete BaseLine Asset')
            // cy.deleteBaseLine(baselineAssetName)

            cy.log('Step 7: Create Attribute Tag')
            attributeTags.createAttributeTag(attribute, attributeTagDescription)
            utils.assertSucessMsg('Attribute Tag Created Successfully')

            cy.log('Step 8: Create Enclave Model With Publish')
            assetsManager.createEnclaveModel('PUBLISHED', modelName, modelDescription, groupName, attributeTag, 'cloudProviderAws', 'concourseInfra.json')
            utils.assertSucessMsg('Buildtime Asset Created Successfully')
            cy.wait(5000)

            cy.log('Step 9: Create Logical Deployment')
            logicalDeployment.createLogicalDeployment('AWS', modelName, deploymentName, stackName, groupName, 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456')
            cy.wait(3000)

            cy.log('Step 10: Delete Logical Deployment')
            logicalDeployment.deleteLogicalDeployment(deploymentName)
            cy.wait(1000)

            cy.log('Step 11: Delete Enclave Model With Publish')
            assetsManager.deleteEnclaveModel(modelName)
            utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

            cy.log('Step 12: Delete Attribute Tag')
            attributeTags.deleteAttributeTag(attribute)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')

            cy.log('Step 13: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, businessAuthorRole)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step 14: Remove Role Assignment From Group')
            group.removeRoleAssignments(groupName, businessOperatorRole)
            utils.assertSucessMsg('Role Assignment Deleted Successfully')

            cy.log('Step 15: Remove user From Group')
            group.removeUser(groupName, user)
            utils.assertSucessMsg('User Removed Successfully')

            cy.log('Step 16: De-associate Group From Surface')
            cy.log(groupId)
            cy.get('@groupId').then(groupId => {
                cy.log('EntityId ' + groupId)
                group.deAssociateGroupFromSurfaceForGroup('E2E Surface', groupId)
            })

            cy.log('Step 17: Delete Group')
            group.deleteGroup(groupName)
            utils.assertSucessMsg('Group Deleted Successfully')
        })
    })
})
