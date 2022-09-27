import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Add AtributeTag For Policy Group', function () {
        let attributeTagName = 'Attribute Tag For Violation' + utils.getUniqueString()
        let attributeTagDesc = 'Attribute Tag For Violation';
        let attributeTagName1 = 'E2E Attribute Tag' + utils.getUniqueString()
        let attributeTagDesc1 = 'E2E Attribute Tag';
        let assetName = 'AWS Enclave Model For Violation' + utils.getUniqueString()
        let description = 'AWS Enclave Model For Violation';
        let attitibuteTag = [attributeTagName1];
        let deploymentName
        let stackName
        let modelid
        let policyGroupTemplateName = 'AWS Products Policy Group Template For Violation' + utils.getUniqueString()
        let policyGroupTemplatedesc = 'AWS Products Policy Group Template For Violation';
        let policyGroupName = 'Policy Group For Violation' + utils.getUniqueString()
        let policyGroupDesc = 'Policy Group For Violation';
        let baseSurface
        let policyid

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                deploymentName = this.testdata.deploymentName + utils.getUniqueString()
                stackName = this.testdata.stackName + utils.getUniqueString()
                baseSurface = this.testdata.surfaceName1
                cy.login(this.testdata)
            })
        })

        it('Add AtributeTag For Policy Group', function () {

            cy.log('Step 1: Create First Attribute Tag')
            cy.createAttributeTag(attributeTagName, attributeTagDesc)

            cy.log('Step 2: Create Second Attribute Tag')
            cy.createAttributeTag(attributeTagName1, attributeTagDesc1)

            cy.log('Step 3: Create Enclave Model With EC2 Template and Second Attribute Tag ')
            cy.createEnclaveModel('PUBLISHED', assetName, description, 'E2E Admin', attitibuteTag, 'cloudProviderAws', 'concourseInfra.json')
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

            cy.log('Step 4: Create Logical Deployement')
            cy.createLogicalDeployment('AWS', assetName, deploymentName, stackName, 'E2E Admin', 'us-east-1', 'Default Surface - Root Surface Layer', 'Account-123456987456')
            cy.wait(6000)

            cy.log('Step 5: Creating Policy Group Template with  Published')
            cy.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Allowed AWS Products in Stacks')
            utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

            cy.log('Step 6: Creating Policy Group with EC2 and S3 and First Attribute Tag')
            cy.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'AWS::EC2')
            utils.assertSucessMsg('Policy Group Created Successfully')
            cy.wait(10000)
            cy.reload(true)

            cy.log('Step 8: Verify Risk - Violation Should Not Happen')
            cy.log(modelid)
            cy.get('@modelid').then(modelid => {
                cy.log('Modelid is :' + modelid)
                cy.verifyViolation(baseSurface, modelid)
                cy.checkViolationNotHappened(modelid)
            })

            cy.log('Step 9: Add Second Attribute Tag For Policy Group')
            cy.addAttributeTagForPG(policyGroupName, attributeTagName1)
            cy.wait(30000)
            cy.reload(true)
            
            cy.log('Step 10: Verify Violation After Adding Second Attribute Tag For Policy Group')
            cy.log(modelid)
            cy.get('@modelid').then(modelid => {
                cy.log('Modelid is :' + modelid)
                cy.verifyViolation(baseSurface, modelid)
                cy.checkViolationHappened(modelid)
            })
            cy.reload(true)
            cy.log('Step 11: CleanUp - Delete Policy Group')
            cy.deletePolicyGroup(policyGroupName)

            cy.log('Step 12: CleanUp - Delete Policy Group Template')
            cy.deletePolicyGroupTemplate(policyGroupTemplateName)

            cy.log('Step 13: CleanUp - Delete Logical Deployment')
            cy.deleteLogicalDeployment(deploymentName)

            cy.log('Step 14: CleanUp - Delete Enclave Model')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 15: CleanUp - Delete First Attribute Tag')
            cy.deleteAttributeTag(attributeTagName)

            cy.log('Step 16: CleanUp - Delete Second Attribute Tag')
            cy.deleteAttributeTag(attributeTagName1)
        })
    })
})