/* Know Case Failing */

import { before, describe } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Logical Deployment Violation', function () {
        let attributeTagName
        let attributeTagDescription
        let assetName
        let EnclaveDesc
        let policyGroupTemplateName
        let policyGroupTemplatedesc
        let policyGroupName
        let policyGroupDesc
        let deploymentName
        let stackName
        let logicalDeploymentId
        let baseSurface
        let attitibuteTag

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTagName = this.testdata.violationAttributeTagName + utils.getUniqueString()
                attributeTagDescription = this.testdata.violationAttributeTagDescription
                assetName = this.testdata.awsModelName + utils.getUniqueString()
                EnclaveDesc = this.testdata.awsModelDesc
                policyGroupTemplateName = this.testdata.policyGroupTemplateNameWithAWSProducts + utils.getUniqueString()
                policyGroupTemplatedesc = this.testdata.policyGroupTemplateDescWithAWSProducts
                policyGroupName = this.testdata.policyGroupNamePublish + utils.getUniqueString()
                policyGroupDesc = this.testdata.policyGroupDescPublish
                deploymentName = this.testdata.deploymentName + utils.getUniqueString()
                stackName = this.testdata.stackName + utils.getUniqueString()
                baseSurface = this.testdata.surfaceName1
                attitibuteTag = [attributeTagName];
                cy.login(this.testdata)
            })
        })

        it('Logical Deployment Violation', function () {

            cy.log('Step 1: Create Attribute Tag')
            cy.createAttributeTag(attributeTagName, attributeTagDescription)

            cy.log('Step 2: Create New Enclave Model')
            cy.createEnclaveModel('PUBLISHED', assetName, EnclaveDesc, 'E2E Admin', attitibuteTag, 'cloudProviderAws', 'ec2template.json')

            cy.log('Step 3: Creating Policy Group Template with  Published')
            cy.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

            cy.log('Step 4: Creating Policy Group')
            cy.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::EC2', 'Default Surface - Root Surface Layer')
            utils.assertSucessMsg('Policy Group Created Successfully')

            cy.log('Step 5: Verify Approval Request For Publish')
            cy.approveRequest(policyGroupName)
            cy.reload(true)
            cy.wait(20000)

            cy.log('Step 6: Logical Deployement')
            cy.createLogicalDeployment('AWS', assetName, deploymentName, stackName, 'E2E Admin', 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456')
            cy.wait(5000)

            cy.log('Step 7: Approve Publish Request')
            cy.approveRequest(deploymentName)
            cy.wait(20000)
            cy.reload(true)

            cy.url().then(myid => {
                cy.log("url is:" + myid)
                logicalDeploymentId = myid.split('/')[5]
                const id = logicalDeploymentId.split('?')[0]
                cy.wrap(id).as('id')
            })
            cy.get('@id').then(DeploymentId => {
                cy.log('LogicalID is :' + DeploymentId)
                cy.log('Step 8: Verify Risk')
                cy.verifyViolation(baseSurface, DeploymentId)
                cy.checkViolationHappened(DeploymentId)
            })
            cy.reload(true)
            cy.log('Step 8: Delete Logical Deployment')
            cy.deleteLogicalDeployment(deploymentName)
            cy.wait(5000)
            cy.reload(true)

            cy.log('Step 9: Approve Delete Request')
            // cy.reload(true)
            // cy.approveRequest(deploymentName)
            // cy.wait(10000)
            // cy.reload(true)

            cy.log('Step 10: Re verifying Risk')
            cy.get('@id').then(DeploymentId => {
                cy.log('LogicalID is :' + DeploymentId)
                // cy.verifyViolation(baseSurface,DeploymentId)
                // cy.checkViolationNotHappened(DeploymentId)     
            })

            cy.log('Step 11: Clean Up')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 12: Clean Up')
            cy.deletePolicyGroup(policyGroupName)
            cy.reload(true)
            cy.wait(20000)

            cy.log('Step 13: Clean Up')
            cy.approveRequest(policyGroupName)
            cy.reload(true)
            cy.wait(20000)

            cy.log('Step 14: Clean Up')
            cy.deletePolicyGroupTemplate(policyGroupTemplateName)

            cy.log('Step 15: Clean Up')
            cy.deleteAttributeTag(attributeTagName)
        })
    })
})