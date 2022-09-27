import { before, describe } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Model Violation', function () {
        let attributeTagName
        let attributeTagName1
        let description
        let awsPolicyGroupTemplateName
        let awsPolicyGroupTemplateDesc
        let policyGroupName
        let policyGroupDesc
        let policyGroupName1
        let policyGroupDesc1
        let assetName
        let EnclaveDesc
        let logicalDeploymentName
        let stackName
        let attributeTags
        let modelId
        let baseSurface

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTagName = this.testdata.attributeTagName + utils.getUniqueString()
                attributeTagName1 = this.testdata.attributeTagName + utils.getUniqueString()
                description = this.testdata.attributeTagName
                awsPolicyGroupTemplateName = this.testdata.awsPolicyGroupTemplateName + utils.getUniqueString()
                awsPolicyGroupTemplateDesc = this.testdata.awsPolicyGroupTemplateDesc
                policyGroupName = 'E2E Policy Group' + utils.getUniqueString()
                policyGroupDesc = this.testdata.policyGroupDesc
                policyGroupName1 = 'E2E Policy Group' + utils.getUniqueString()
                policyGroupDesc1 = 'E2E Policy Group'
                assetName = this.testdata.awsModelName + utils.getUniqueString()
                EnclaveDesc = this.testdata.awsModelDesc
                logicalDeploymentName = this.testdata.deploymentName + utils.getUniqueString()
                stackName = this.testdata.stackName + utils.getUniqueString()
                baseSurface = this.testdata.surfaceName1
                cy.login(this.testdata)
            })
        })

        it('Model Violation', function () {

            cy.log('Step 1: Creating Attribute Tag')
            cy.createAttributeTag(attributeTagName, description)

            cy.log('Step 2: Creating Second Attribute Tag')
            cy.createAttributeTag(attributeTagName1, description)

            cy.log('Step 3: Creating Policy Group Template with  Published')
            cy.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

            cy.log('Step 4: Creating Policy Group With S3')
            cy.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::S3')
            cy.wait(5000)

            cy.log('Step 5: Creating Policy Group With EC2')
            cy.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName1, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName1, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::EC2')
            cy.wait(5000)

            cy.log('Step 6: Create New Enclave Model')
            attributeTags = [attributeTagName, attributeTagName1];
            cy.createEnclaveModel('PUBLISHED', assetName, EnclaveDesc, 'E2E Admin', attributeTags, 'cloudProviderAws', 'concourse-infrastructure.json')
            cy.wait(30000)
            cy.reload(true)

            cy.url().then(myid => {
                cy.log("url is:" + myid)
                modelId = myid.split('/')[5]
                const id = modelId.split('?')[0]
                cy.wrap(id).as('id')
            })
            cy.get('@id').then(modelId => {
                cy.log('ModelId is :' + modelId)
                cy.log('Step 7: Verify Risk')
                cy.verifyViolation(baseSurface, modelId)
                cy.checkViolationHappened(modelId)
            })

            cy.log('Step 8: Delete Buildtime Inventory')
            cy.deleteEnclaveModel(assetName)
            cy.wait(10000)
            cy.reload(true)

            cy.get('@id').then(modelId => {
                cy.log('ModelId is :' + modelId)
                cy.log('Step 9: Re verifying Risk')
                cy.verifyViolation(baseSurface, modelId)
                cy.checkViolationNotHappened(modelId)
            })

            cy.log('Step 10: Delete Policy Group')
            cy.deletePolicyGroup(policyGroupName)
            cy.wait(10000)
            cy.reload(true)

            cy.log('Step 11: Delete Policy Group')
            cy.deletePolicyGroup(policyGroupName1)
            cy.wait(10000)
            cy.reload(true)

            cy.log('Step 12: Delete Policy Group Template')
            cy.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step 13: Delete Attribute Tag')
            cy.deleteAttributeTag(attributeTagName)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')

            cy.log('Step 14: Delete Attribute Tag1')
            cy.deleteAttributeTag(attributeTagName1)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })
})