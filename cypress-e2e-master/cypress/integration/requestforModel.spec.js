import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'

TestFilters([], function () {
    describe('Request For Model', function () {
        let attributeTagName
        let description
        let policyGroupTemplateName
        let policyGroupTemplatedesc
        let policyGroupName
        let policyGroupDesc
        let assetName
        let EnclaveDesc
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
                attributeTag = [attributeTagName];
                cy.login(this.testdata)
            })
        })


        it('Request For Model', function () {

            cy.log('Step 1: Create Attribute Tag')
            cy.createAttributeTag(attributeTagName, description)

            cy.log('Step 2: Creating Policy Group Template with  Published')
            cy.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Require Approval of Institutional Entities')
            utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)

            cy.log('Step 3: Creating Policy Group')
            cy.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remediation', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', ' ', 'Default Surface - Root Surface Layer', 'MODEL', 'E2E Admin')
            cy.wait(20000)
            cy.reload(true)

            cy.log('Step 4: Verify Approval Request For Publish')
            cy.verifyApprovalRequest(policyGroupName)

            cy.log('Step 5: Approve Publish Request')
            cy.approveRequest(policyGroupName)
            cy.wait(25000)
            cy.reload(true)
           

            cy.log('Step 6: Create New Enclave Model')
            cy.createEnclaveModel('PUBLISHED', assetName, EnclaveDesc, 'E2E Admin', attributeTag, 'cloudProviderAws', 'ec2template.json')
            cy.wait(10000)
            

            cy.log('Step 7: Verify Approval Request For Publish')
            cy.verifyApprovalRequest(assetName)

            cy.log('Step 8: Approve Publish Request')
            cy.approveRequest(assetName)
            cy.wait(20000)
            cy.reload(true)
            

            cy.log('Step 9: Delete Enclave Model')
            cy.deleteEnclaveModel(assetName)
            cy.wait(20000)
            cy.reload(true)

            cy.log('Step 10: Verify Approval Request For Delete')
            cy.verifyApprovalRequest(assetName)

            cy.log('Step 11: Approve Delete Action')
            cy.approveRequest(assetName)
            cy.wait(10000)

            cy.log('Step 12: Verify Enclave Model Deleted Or Not')
            cy.verifyNestedEnclaveModel(assetName)

            cy.log('Step 13: Approval Request For Delete')
            cy.deletePolicyGroup(policyGroupName)
            cy.wait(20000)           
            cy.reload(true)
            // cy.log('Step 14: Verify Approval Request For Delete')
            // cy.verifyApprovalRequest(policyGroupName)
            // cy.reload(true)

            cy.log('Step 15: Approve Delete Action')
            cy.approveRequest(policyGroupName)
            cy.wait(30000)
            cy.reload(true)
        

            cy.log('Step 16: CleanUp')
            cy.reload(true)
            cy.deletePolicyGroupTemplate(policyGroupTemplateName)

            cy.log('Step 17: CleanUp')
            cy.deleteAttributeTag(attributeTagName)
        })
    })
})