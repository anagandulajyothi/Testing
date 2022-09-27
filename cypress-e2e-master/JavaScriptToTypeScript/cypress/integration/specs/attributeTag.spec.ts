/// <reference types="cypress-xpath" />
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';

const login = new loginPage()
const attributeTag = new attributeTagPage()
let attributeTagName
let attributeTagDescription

describe('Attribute Tag ', () => {
    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attributeTagName = this.testdata.attributeTagName + utils.getUniqueString()
            attributeTagDescription = this.testdata.attributeTagDesc
            login.login(this.testdata)
        })
    })


    it('Create Attribute Tag', function () {
        cy.log('Step1: Create Attribute Tag')
        attributeTag.createAttributeTag(attributeTagName, attributeTagDescription)
        utils.assertSucessMsg('Attribute Tag Created Successfully')

        cy.log('Step2:Edit Attribute Tag')
        attributeTag.editAttributeTag(attributeTagName)
        utils.assertSucessMsg('Attribute Tag Updated Successfully')

        cy.log('Step3: Delete Attribute Tag')
        attributeTag.deleteAttributeTag(attributeTagName)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')
    })
})
