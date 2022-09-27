import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
import { policyGroupPage } from '../../pageObjects/policyGroup.page';
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { Approvals } from '../../pageObjects/approvals.page'
const login = new loginPage()
const policyGroupTemplate = new policyGroupTemplatePage()
const policyGroup = new policyGroupPage()
const attributeTags = new attributeTagPage()
const approvals = new Approvals()

let attributeTag
let attributeTagDescription
let awsPolicyGroupTemplateName
let awsPolicyGroupTemplateDesc
let policyGroupName
let policyGroupDesc

    describe('Approvals', function () {
            before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTag = this.testdata.attributeTagName + utils.getUniqueString()
                attributeTagDescription = this.testdata.attributeTagDesc
                awsPolicyGroupTemplateName = this.testdata.approvalPolicyGroupTemplateName + utils.getUniqueString()
                awsPolicyGroupTemplateDesc = this.testdata.approvalPolicyGroupTemplateDesc
                policyGroupName = this.testdata.awsPolicyGroupName + utils.getUniqueString()
                policyGroupDesc = this.testdata.awsPolicyGroupDesc
                login.login(this.testdata)
            })
        })

        it('Approvals', function () {

            cy.log('Step1: Create Attrkibute Tag')
            attributeTags.createAttributeTag(attributeTag, attributeTagDescription)
            utils.assertSucessMsg('Attribute Tag Created Successfully')
            // cy.reload(true)

            cy.log('Step2: Create Policy Group Template')
            policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', awsPolicyGroupTemplateName, awsPolicyGroupTemplateDesc, 'Require Approval of Institutional Entities')
            utils.assertSucessMsg('Policy Group Template Created Successfully')
            // cy.reload(true)

            cy.log('Step3: Create Published Policy Group')
            policyGroup.createPolicyGroup(awsPolicyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', '', 'Default Surface - Root Surface Layer', 'POLICY_GROUP', 'E2E Admin', '',
            '','','','','','','','','','','','','','','','','','','','','')
            utils.assertSucessMsg('Policy Group Created Successfully')
            cy.wait(10000)
            cy.reload(true)

            cy.log('Step4: Approve Publish Request For Policy Group')
            approvals.approveRequest(policyGroupName)
            cy.wait(30000)
            cy.reload(true)
          

            cy.log('Step5: Delete Policy Group')
            policyGroup.deletePolicyGroup(policyGroupName)
            cy.wait(25000)
            cy.reload(true)
         

            cy.log('Step6: Approve Delete Request For Policy Group')
            approvals.approveRequest(policyGroupName)
            cy.wait(35000)
            cy.reload(true)

            cy.log('Step7: Delete Policy Group Template')
            policyGroupTemplate.deletePolicyGroupTemplate(awsPolicyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step8: Delete Policy Group Template')
            attributeTags.deleteAttributeTag(attributeTag)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })