import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from './utils/utils.js'

TestFilters([], function () {
    describe('Invariant Policy Group', function () {
        let attributeTag
        let attributeTagDescription
        let policyGroupTemplateName
        let policyGroupTemplateDesc
        let policyGroupName
        let policyGroupDesc

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTag = this.testdata.attributeTagName + utils.getUniqueString()
                attributeTagDescription = this.testdata.attributeTagDesc
                policyGroupTemplateName = 'Invariant AWS Api Policy Group Template' + utils.getUniqueString()
                policyGroupTemplateDesc = 'Invariant AWS Api Policy Group Template'
                policyGroupName = 'Invariant AWS Api Policy Group' + utils.getUniqueString()
                policyGroupDesc = 'Invariant AWS Api Policy Group'
                cy.login(this.testdata)
            })
        })

        it('Invariant Policy Group', function () {

            cy.log('Step1: Create Attrkibute Tag')
            cy.createAttributeTag(attributeTag, attributeTagDescription)
            utils.assertSucessMsg('Attribute Tag Created Successfully')

            cy.log('Step2: Create Policy Group Template')
            cy.createPolicyGroupTemplate('PUBLISHED', policyGroupTemplateName, policyGroupTemplateDesc, 'Custom policy for Resources in Aws Runtime API')
            utils.assertSucessMsg('Policy Group Template Created Successfully')

            cy.log('Step3: Create Draft Policy Group')
            cy.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'DRAFT', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', 'a4b', 'a4b/CreateAddressBook/AddressBookArn', 'left is not equal to right', '222')
            utils.assertSucessMsg('Policy Group Created Successfully')

            cy.log('Step4: Edit Policy Group Name')
            cy.editPolicyGroup(policyGroupName)
            utils.assertSucessMsg('Policy Group Updated Successfully')

            cy.log('Step5: Delete Draft Policy Group')
            cy.deletePolicyGroup(policyGroupName)
            utils.assertSucessMsg('Policy Group Deleted Successfully')

            cy.log('Step6: Create Published Policy Group')
            cy.createPolicyGroup(policyGroupTemplateName, policyGroupName, policyGroupDesc, 'E2E Admin', 'PUBLISHED', attributeTag, 'Remedition', '1.1 - CIS Microsoft Azure Foundations Security Benchmark Catalog', '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '', '', '', '', 'a4b', 'a4b/CreateAddressBook/AddressBookArn', 'left is not equal to right', '222')
            utils.assertSucessMsg('Policy Group Created Successfully')

            cy.reload(true)
            cy.log('Step7: Delete Published Policy Group')
            cy.deletePolicyGroup(policyGroupName)
            utils.assertSucessMsg('Policy Group Deleted Successfully')

            cy.log('Step8: Delete Policy Group Template')
            cy.deletePolicyGroupTemplate(policyGroupTemplateName)
            utils.assertSucessMsg('Policy Group Template Deleted Successfully')

            cy.log('Step9: Delete Policy Group Template')
            cy.deleteAttributeTag(attributeTag)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })
})