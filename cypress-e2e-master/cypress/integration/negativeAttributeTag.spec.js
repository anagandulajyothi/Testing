import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js';

TestFilters([], function () {
    describe('Attribute Tag  With Same Name', function () {
        let attributeTagName
        let attributeTagDescription

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                attributeTagName = this.testdata.attributeTagName + utils.getUniqueString()
                attributeTagDescription = this.testdata.attributeTagDesc
                cy.login(this.testdata)
            })
        })

        it('Create Attribute Tag With Same Name', function () {
            cy.log('Step1: Create Attribute Tag')
            cy.createAttributeTag(attributeTagName, attributeTagDescription)
            utils.assertSucessMsg('Attribute Tag Created Successfully')

            cy.log('Step2: Create Attribute Tag With Same Name')
            cy.createAttributeTag(attributeTagName, attributeTagDescription)
            utils.assertToastMsg('Name already exists: ' + attributeTagName)
            cy.reload(true)

            cy.log('Step3: Delete Attribute Tag')
            cy.deleteAttributeTag(attributeTagName)
            utils.assertSucessMsg('Attribute Tag Deleted Successfully')
        })
    })
})