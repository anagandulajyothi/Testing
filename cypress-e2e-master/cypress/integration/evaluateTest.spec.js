import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Cfn-Nag Evaluate Test', function () {
        let attributeTagName
        let description
        let policyGroupTemplateName
        let policyGroupTemplatedesc
        let policyGroupName
        let policyGroupDesc
        let assetName
        let EnclaveDesc
        let attributeTag
        let modelId
        let baseSurface

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTagName = this.testdata.attributeName1 + utils.getUniqueString()
                description = this.testdata.attributeDescription1
                policyGroupTemplateName = 'CFN NAG PGT' + utils.getUniqueString()
                policyGroupTemplatedesc = 'CFN NAG PGT';
                policyGroupName = 'CFN NAG Policy' + utils.getUniqueString()
                policyGroupDesc = 'CFN NAG Policy';
                assetName = 'AWS CFN NAG Cloud Asset' + utils.getUniqueString()
                EnclaveDesc = 'AWS CFN NAG Cloud Asset';
                attributeTag = [attributeTagName];
                baseSurface = this.testdata.surfaceName1
                cy.login(this.testdata)

            })
        })


        it('Cfn-Nag Evaluate Test', function () {

            cy.log('Step 1: Create Attribute Tag')
            cy.createAttributeTag(attributeTagName, description)
            utils.assertSucessMsg('Attribute Tag Created Successfully')
            cy.reload(true)

            cy.log('Step 2: Creating Policy Group Template with  with  Latest Cfn-Nag Policies')
            cy.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Latest cfn-nag Policies')
            utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)
            cy.reload(true)

            cy.log('Step 3: Creating Policy Group with Cfn-Nag Policies Template')
            cy.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', '', 'Default Surface - Root Surface Layer')
            cy.wait(15000)
            cy.reload(true)
           

            cy.log('Step 4: Approve Publish Request')
            cy.approveRequest(policyGroupName)
            cy.wait(20000)
            cy.reload(true)
            

            cy.log('Step 5: Create New Enclave Model')
            cy.createEnclaveModel('PUBLISHED', assetName, EnclaveDesc, 'E2E Admin', attributeTag, 'cloudProviderAws', 'cfn_insensitive_authentication.json')
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
                cy.log('Step 6: Verify Risk')
                cy.verifyViolation(baseSurface, modelId)
                cy.checkViolationHappened(modelId)
            })

            cy.log('Step 7: Delete Enclave Model')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 8: CleanUp')
            cy.deletePolicyGroup(policyGroupName)
            cy.wait(25000)
            cy.reload(true)
          
            cy.log('Step 9: Approve Delete Action')
            cy.approveRequest(policyGroupName)  
            cy.wait(30000)
            cy.reload(true)
          
            cy.log('Step 10: CleanUp')
            cy.reload(true)
            cy.deletePolicyGroupTemplate(policyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step 11: CleanUp')
            cy.deleteAttributeTag(attributeTagName)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })
})