import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Request For Logical Deployment', function () {
        let attributeTagName
        let description
        let policyGroupTemplateName
        let policyGroupTemplatedesc
        let policyGroupName
        let policyGroupDesc
        let assetName
        let EnclaveDesc
        let logicalDeploymentName
        let stackName
        let attributeTag

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTagName = this.testdata.attributeName1 + utils.getUniqueString()
                description = this.testdata.attributeDescription1
                policyGroupTemplateName = this.testdata.requireApprovalPolicyGroupTemplateName + utils.getUniqueString()
                policyGroupTemplatedesc = this.testdata.requireApprovalPolicyGroupTemplateDesc
                policyGroupName = this.testdata.policyGroupName + utils.getUniqueString()
                policyGroupDesc = this.testdata.policyGroupDesc
                assetName = this.testdata.awsModelName + utils.getUniqueString()
                EnclaveDesc = this.testdata.awsModelDesc
                logicalDeploymentName = this.testdata.deploymentName + utils.getUniqueString()
                stackName = this.testdata.stackName + utils.getUniqueString()
                attributeTag = [attributeTagName];
                cy.login(this.testdata)
            })
        })

        it('Request For Logical Deployment', function () {

            cy.log('Step 1: Creating Attribute Tag')
            cy.createAttributeTag(attributeTagName, description)

            cy.log('Step 2: Creating Policy Group Template with  Published')
            cy.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Require Approval of Institutional Entities')
            utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

            cy.log('Step 3: Creating Policy Group')
            cy.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remediation', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', ' ', 'Default Surface - Root Surface Layer', 'Deployment', 'E2E Admin')
            cy.reload(true)
            cy.wait(15000)
            cy.reload(true)

            cy.log('Step 4: Approve Publish Request')
            cy.approveRequest(policyGroupName)
            cy.wait(25000)
            cy.reload(true)
          

            cy.log('Step 5: Create New Enclave Model')
            cy.createEnclaveModel('PUBLISHED', assetName, EnclaveDesc, 'E2E Admin', attributeTag, 'cloudProviderAws', 'ec2template.json')

            cy.log('Step 6: Logical Deployement')
            cy.createLogicalDeployment('AWS', assetName, logicalDeploymentName, stackName, 'E2E Admin', 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456')
            cy.wait(10000)
             cy.reload(true)

            cy.log('Step 7: Approve Publish Request')
            cy.approveRequest(logicalDeploymentName)
            cy.wait(25000)
            cy.reload(true)
         

            cy.log('Step 8: Delete Logical Deployment')
            cy.deleteLogicalDeployment(logicalDeploymentName)
            cy.wait(15000)

            cy.log('Step 9: Approve Delete Action')
            cy.approveRequest(logicalDeploymentName)
            cy.wait(20000)
            cy.reload(true)
          
            cy.log('Step 10: Delete Buildtime Inventory')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 11: Delete Policy Group')
            cy.deletePolicyGroup(policyGroupName)
            cy.wait(25000)
            cy.reload(true)

            cy.log('Ste 12: Approve Delete Request For Policy Group')
            cy.approveRequest(policyGroupName)
            cy.wait(30000)
            cy.reload(true)

            cy.log('Step 13: Delete Policy Group Template')
            cy.deletePolicyGroupTemplate(policyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step 14: Delete Attribute Tag')
            cy.deleteAttributeTag(attributeTagName)
            utils.assertSucessMsg('Attribute Tag Deleted')
        })
    })
})