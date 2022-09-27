// import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
// import { policyGroupPage } from '../../pageObjects/policyGroup.page';
// import { attributeTagPage } from '../../pageObjects/attributeTag.page';
// import { loginPage } from '../../pageObjects/login.page';
// import utils from '../specs/utils/utils';
// import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'
// import { Violations } from '../../pageObjects/policyViolations.page'
// import { GroupPage } from '../../pageObjects/groups.page'

// const login = new loginPage()
// const policyGroupTemplate = new policyGroupTemplatePage()
// const policyGroup = new policyGroupPage()
// const attributeTags = new attributeTagPage()
// const assetsManager = new assetsManagerPage()
// const violation = new Violations()
// const group = new GroupPage()

// describe('Aws Nested Template Evaluation', function () {
//     let attributeTagName = 'Terraform Attribute Tag' + utils.getUniqueString()
//     let tagDescription = 'Terraform Attribute Tag';
//     let policyGroupTemplateName = 'Terraform Policy Group Template' + utils.getUniqueString()
//     let policyGroupTemplatedesc = 'Description For Terraform Policy Group Template';
//     let policyGroupName = 'Terraform Policy Group' + utils.getUniqueString()
//     let policyGroupDesc = 'Description For Terraform Policy Group Template';
//     let assetName = 'AWS Terraform Cloud Asset' + utils.getUniqueString();
//     let description = 'AWS Description For Terraform Cloud Asset';
//     let modelId
//     let NestedTemplate = ['nested-template-1.json']
//     let baseSurface

//     before(function () {
//         cy.fixture('testdata').then(function (testdata) {
//             this.testdata = testdata
//             login.login(this.testdata)
//             baseSurface = this.testdata.surfaceName1
//             cy.wait(5000)

//         })

//     })

//     it('Aws Nested Template Evaluation', function () {
//         cy.log('Step 1: Create Attribute Tag')
//         attributeTags.createAttributeTag(attributeTagName, tagDescription)

//         cy.log('Step 2: Create Policy Group Template With  10100,10110,10120')
//         policyGroupTemplate.createPolicyGroupTemplateWithTerraform('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Created With Terraform', '3')

//         cy.log('Step 3: Creating Policy Group')
//         // policyGroup.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, '', '', '', '', '', '', 'AWSName', 'AWS Desc',
//         //     '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'aws_accessanalyzer_analyzer.analyzer_name', 'left is equal to right', '222', 'Azure Name', 'Azure Desc', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'azuread_application.api.oauth2_permission_scope.admin_consent_description', 'left is equal to right', '222', 'GCP Name', 'GCP Desc', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'google_access_context_manager_access_level.basic.combining_function', 'left is equal to right', '222',
//         //     '', '', '', '')
//         policyGroup.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, '', '', '', '', '', '', 'AWSName', 'AWS Desc',
//         '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'aws_accessanalyzer_analyzer.analyzer_name', 'left is equal to right', '222', 'Azure Name', 'Azure Desc', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'azuread_application.api.oauth2_permission_scope.admin_consent_description', 'left is equal to right', '222', 'GCP Name', 'GCP Desc', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', 'google_access_context_manager_access_level.basic.combining_function', 'left is equal to right', '222',
//         '', '', '', '')

//         cy.log('Step 4: Create New Enclave Model')
//         assetsManager.createNestedEnclaveModel('PUBLISHED', assetName, description, 'E2E Admin', attributeTagName, 'cloudProviderAws', 'root-template.json', NestedTemplate)
//         cy.wait(10000)
//         cy.reload(true)

//         group.getId().then(myid => {
//             let modelId = myid
//             cy.wrap(modelId).as('modelId')
//         })
//         cy.url().then(myid => {
//             cy.log("url is:" + myid)
//             modelId = myid.split('/')[5]
//             const id = modelId.split('?')[0]
//             cy.wrap(id).as('id')
//         })
//         cy.get('@id').then(modelId => {
//             cy.log('ModelId is :' + modelId)
//             cy.log('Step 5: Verify Risk')
//             violation.verifyViolation(baseSurface, modelId)
//             violation.checkViolationHappened(modelId)
//         })

//         cy.log('Step 6: Delete Enclave Model')
//         assetsManager.deleteEnclaveModel(assetName)

//         cy.log('Step 7: CleanUp')
//         policyGroup.deletePolicyGroup(policyGroupName)

//         cy.log('Step 8: CleanUp')
//         policyGroupTemplate.deletePolicyGroupTemplate(policyGroupTemplateName)

//         cy.log('Step 9: CleanUp')
//         attributeTags.deleteAttributeTag(attributeTagName)

//     })
// })
