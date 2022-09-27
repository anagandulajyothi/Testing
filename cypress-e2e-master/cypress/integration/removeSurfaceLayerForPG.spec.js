/* Know issue Step 12 not working*/

import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('removeSurfaceLayerForPG', function () {
        let attributeTagName
        let attributeTagDesc
        let attributeTagName1
        let attributeTagDesc1
        let assetName
        let description
        let deploymentName
        let stackName
        let id
        let modelid
        let policyGroupTemplateName
        let policyGroupTemplatedesc
        let policyGroupName, policyGroupDesc
        let baseSurface
        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTagName = this.testdata.violationAttributeTagName + utils.getUniqueString()
                attributeTagDesc = this.testdata.violationAttributeTagDescription
                attributeTagName1 = this.testdata.violationAttributeTagName + utils.getUniqueString()
                attributeTagDesc1 = this.testdata.violationAttributeTagDescription
                assetName = 'AWS ' + this.testdata.ec2ModelName + utils.getUniqueString()
                description = this.testdata.ec2ModelDescription
                deploymentName = this.testdata.deploymentName + utils.getUniqueString()
                stackName = this.testdata.stackName + utils.getUniqueString()
                policyGroupTemplateName = this.testdata.policyGroupTemplateNameWithAWSProducts + utils.getUniqueString()
                policyGroupTemplatedesc = this.testdata.policyGroupTemplateDescWithAWSProducts + utils.getUniqueString()
                policyGroupName = this.testdata.violationPolicyGroupName + utils.getUniqueString()
                policyGroupDesc = this.testdata.violationPolicyGroupDescription
                baseSurface = this.testdata.surfaceName1
                cy.login(this.testdata)
            })
        })

        it('removeSurfaceLayerForPG', function () {

            cy.log('Step 1: Create Attribute Tag')
            cy.createAttributeTag(attributeTagName, attributeTagDesc)

            cy.log('Step 2: Create Another Attribute Tag')
            cy.createAttributeTag(attributeTagName1, attributeTagDesc1)

            cy.log('Step 3: Create New Enclave Model')
            cy.createEnclaveModel('PUBLISHED', assetName, description, 'E2E Admin', [attributeTagName], 'cloudProviderAws', 'concourseInfra.json')
            utils.assertSucessMsg('Buildtime Asset Created Successfully')

            cy.url().then(url => {
                cy.log(url)
                const modelid = url.split('/')[5]
                cy.wrap(modelid).as('modelid')
            })
            cy.log(modelid)
            cy.get('@modelid').then(modelid => {
                cy.log('Modelid is one :' + modelid)

            })

            cy.log('Step 4: Create Logical Deployment')
            cy.createLogicalDeployment('AWS', assetName, deploymentName, stackName, 'E2E Admin', 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456')
            cy.reload(true)

            cy.url().then(url => {
                cy.log(url)
                let LDID = url.split('/')[5]
                let LDID2 = LDID.split('?')[0]
                cy.wrap(LDID2).as('LDeploymentID')
            })

            cy.log('Step 6: Creating Policy Group Template with  Published')
            cy.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

            cy.log('Step 7: Creating Policy Group with  Published')
            cy.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::AmazonMQ', 'Default Surface - Root Surface Layer')
            utils.assertSucessMsg('Policy Group Created Successfully')
            cy.wait(10000)

            cy.log('Step 8: Approve Publish Request')
            cy.approveRequest(policyGroupName)
            cy.wait(30000)
            cy.reload(true)

            cy.log('Step 9: Verify Risk')
            cy.log(modelid)
            cy.get('@modelid').then(modelid => {
                cy.log('Modelid is :' + modelid)
                cy.verifyViolation(baseSurface, modelid)
                cy.checkViolationHappened(modelid)
            })

            cy.log('Step 10: Remove Surface Layer From Policy Group ')
            cy.removeSurfaceLayerForPG(policyGroupName)
            cy.wait(30000)
            cy.reload(true)

            cy.log('Step 11:  Re-Verify Risk')
            cy.log(modelid)

            cy.get('@modelid').then(modelid => {
                cy.log('Modelid is :' + modelid)
                cy.verifyViolation(baseSurface, modelid)
                cy.checkViolationNotHappened(modelid)
            })

            cy.log('Step 12: CleanUp')
            cy.deleteLogicalDeployment(deploymentName)
            cy.wait(10000)

            cy.log('Step 13: CleanUp')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 14: CleanUp')
            cy.deletePolicyGroup(policyGroupName)

            cy.log('Step 15: CleanUp')
            cy.deletePolicyGroupTemplate(policyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step 16: Delete Attribute Tag')
            cy.deleteAttributeTag(attributeTagName)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })
})