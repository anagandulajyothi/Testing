import { policyGroupTemplatePage } from '../../pageObjects/policyGroupTemplate.page';
import { policyGroupPage } from '../../pageObjects/policyGroup.page';
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
const login = new loginPage()
const policyGroupTemplate = new policyGroupTemplatePage()
const policyGroup = new policyGroupPage()
const attributeTags = new attributeTagPage()

let attributeTag
let attributeTagDescription
let policyGroupTemplateName
let policyGroupTemplateDesc
let policyGroupName
let policyGroupDesc

describe('AWS RT Invariant Policy Group', function () {


    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attributeTag = this.testdata.attributeTagName + utils.getUniqueString()
            attributeTagDescription = this.testdata.attributeTagDesc
            policyGroupTemplateName = 'AWS RT Invariant Policy Group Template' + utils.getUniqueString()
            policyGroupTemplateDesc = 'AWS RT Invariant Policy Group Template'
            policyGroupName = 'AWS RT Invariant Policy Group' + utils.getUniqueString()
            policyGroupDesc = 'AWS RT Invariant Policy Group'
            login.login(this.testdata)
        })
    })

    it('AWS RT Invariant Policy Group', function () {

        cy.log('Step1: Create Attrkibute Tag')
        attributeTags.createAttributeTag(attributeTag, attributeTagDescription)
        utils.assertSucessMsg('Attribute Tag Created Successfully')

        cy.log('Step2: Create Policy Group Template')
        policyGroupTemplate.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplateDesc, 'Custom policy for Resources in Aws Runtime API')
        utils.assertSucessMsg('Policy Group Template Created Successfully')

        cy.log('Step3: Create AWS RT Invariant Policy Group')
        policyGroup.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '', '', '', '', 'ec2', 'AssociateIamInstanceProfile/IamInstanceProfileAssociation.IamInstanceProfile.Arn', 'left is not equal to right', '222')
        utils.assertSucessMsg('Policy Group Created Successfully')
        cy.reload(true)

        cy.log('Step4: Add Policy With IamInstance Profile To The Policy Group')
        policyGroup.addAwsRTInvariantPolicy(policyGroupName, 'ec2/AssociateIamInstanceProfile/IamInstanceProfileAssociation.IamInstanceProfile.Arn', 'left is not equal to right', '222')
        cy.reload(true)

        cy.log('Step5: Delete Published Policy Group')
        policyGroup.deletePolicyGroup(policyGroupName)
        utils.assertSucessMsg('Policy Group Deleted Successfully')

        cy.log('Step6: Delete Policy Group Template')
        policyGroupTemplate.deletePolicyGroupTemplate(policyGroupTemplateName)
        utils.assertSucessMsg('Policy Group Template Deleted Successfully')

        cy.log('Step7: Delete Attribute Tag')
        attributeTags.deleteAttributeTag(attributeTag)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')
    })
})
