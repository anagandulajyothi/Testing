import { before } from "mocha"
import TestFilters from "../support/filterTests"
import utils from '../integration/utils/utils.js'
import verifyViolation from '../integration/utils/policyViolationUtils';

TestFilters([], function () {
    describe('Aws Nested Template Evaluation', function () {
        let attributeTagName = 'Terraform Attribute Tag' + utils.getUniqueString()
        let tagDescription = 'Terraform Attribute Tag';
        let policyGroupTemplateName = 'Terraform Policy Group Template' + utils.getUniqueString()
        let policyGroupTemplatedesc = 'Description For Terraform Policy Group Template';
        let policyGroupName = 'Terraform Policy Group' + utils.getUniqueString()
        let policyGroupDesc = 'Description For Terraform Policy Group Template';
        let assetName = 'AWS Terraform Cloud Asset' + utils.getUniqueString();
        let description = 'AWS Description For Terraform Cloud Asset';
        let modelId
        let NestedTemplate = ['nested-template-1.json']
        let baseSurface

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                cy.login(this.testdata)
                baseSurface = this.testdata.surfaceName1
                cy.wait(5000)

            })

        })

        it('Aws Nested Template Evaluation', function () {
            cy.log('Step 1: Create Attribute Tag')
            cy.createAttributeTag(attributeTagName, tagDescription)

            cy.log('Step 2: Create Policy Group Template With  10100,10110,10120')
            cy.createPolicyGroupTemplateWithTerraform('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Created With Terraform', '3')

            cy.log('Step 3: Creating Policy Group')
            cy.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, '', '', '', '', '', '', 'AWSName', 'AWS Desc',
                '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'aws_accessanalyzer_analyzer.analyzer_name', 'left is equal to right', '222', 'Azure Name', 'Azure Desc', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'azuread_application.api.oauth2_permission_scope.admin_consent_description', 'left is equal to right', '222', 'GCP Name', 'GCP Desc', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'google_access_context_manager_access_level.basic.combining_function', 'left is equal to right', '222',
                '', '', '', '')

            cy.log('Step 4: Create New Enclave Model')
            cy.createNestedEnclaveModel('PUBLISHED', assetName, description, 'E2E Admin', attributeTagName, 'cloudProviderAws', 'root-template.json', NestedTemplate)
            cy.wait(10000)
            cy.reload(true)

            cy.getId().then(myid => {
                let modelId = myid
                cy.wrap(modelId).as('modelId')
            })
            cy.url().then(myid => {
                cy.log("url is:" + myid)
                modelId = myid.split('/')[5]
                const id = modelId.split('?')[0]
                cy.wrap(id).as('id')
            })
            cy.get('@id').then(modelId => {
                cy.log('ModelId is :' + modelId)
                cy.log('Step 5: Verify Risk')
                cy.verifyViolation(baseSurface, modelId)
                cy.checkViolationHappened(modelId)
            })

            cy.log('Step 6: Delete Enclave Model')
            cy.deleteEnclaveModel(assetName)

            cy.log('Step 7: CleanUp')
            cy.deletePolicyGroup(policyGroupName)

            cy.log('Step 8: CleanUp')
            cy.deletePolicyGroupTemplate(policyGroupTemplateName)

            cy.log('Step 9: CleanUp')
            cy.deleteAttributeTag(attributeTagName)

        })
    })
})