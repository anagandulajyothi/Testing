import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
import { policyGroupPage } from '../../pageObjects/policyGroup.page';
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'
import { Violations } from '../../pageObjects/policyViolations.page'
import { Approvals } from '../../pageObjects/approvals.page'

const login = new loginPage()
const policyGroupTemplate = new policyGroupTemplatePage()
const policyGroup = new policyGroupPage()
const attributeTags = new attributeTagPage()
const assetsManager = new assetsManagerPage()
const violation = new Violations()
const approvals = new Approvals()

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

describe('Cfn-Nag Evaluate Test', function () {
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
            login.login(this.testdata)
        })
    })

    it('Cfn-Nag Evaluate Test', function () {

        cy.log('Step 1: Create Attribute Tag')
        attributeTags.createAttributeTag(attributeTagName, description)
        utils.assertSucessMsg('Attribute Tag Created Successfully')
        cy.reload(true)

        cy.log('Step 2: Creating Policy Group Template with  with  Latest Cfn-Nag Policies')
        policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplatedesc, 'Latest cfn-nag Policies')
        utils.assertSucessMsg(this.testdata.policyGroupTemplateCreatedSucessMsg)
        cy.reload(true)

        cy.log('Step 3: Creating Policy Group with Cfn-Nag Policies Template')
        policyGroup.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTagName, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', '', 'Default Surface - Root Surface Layer', '',
        '', '', '', '','', '', '','', '', '', '', '','', '', '', '', '','', '', '', '', '', '')
        cy.wait(15000)
        cy.reload(true)


        cy.log('Step 4: Approve Publish Request')
        approvals.approveRequest(policyGroupName)
        cy.wait(20000)
        cy.reload(true)


        cy.log('Step 5: Create New Enclave Model')
        assetsManager.createEnclaveModel('PUBLISHED', assetName, EnclaveDesc, 'E2E Admin', attributeTag, 'cloudProviderAws', 'cfn_insensitive_authentication.json')
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
            violation.verifyViolation(baseSurface, modelId)
            violation.checkViolationHappened(modelId)
        })

        cy.log('Step 7: Delete Enclave Model')
        assetsManager.deleteEnclaveModel(assetName)

        cy.log('Step 8: CleanUp')
        policyGroup.deletePolicyGroup(policyGroupName)
        cy.wait(25000)
        cy.reload(true)

        cy.log('Step 9: Approve Delete Action')
        approvals.approveRequest(policyGroupName)
        cy.wait(30000)
        cy.reload(true)

        cy.log('Step 10: CleanUp')
        cy.reload(true)
        policyGroupTemplate.deletePolicyGroupTemplate(policyGroupTemplateName)
        utils.assertSucessMsg('Policy Group Template Deleted Successfully')

        cy.log('Step 11: CleanUp')
        attributeTags.deleteAttributeTag(attributeTagName)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')
    })
})