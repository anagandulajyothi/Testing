import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
const login = new loginPage()
const attributeTag = new attributeTagPage()

let attributeTagName
let attributeTagDescription

describe('Attribute Tag  With Same Name', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attributeTagName = this.testdata.attributeTagName + utils.getUniqueString()
            attributeTagDescription = this.testdata.attributeTagDesc
            login.login(this.testdata)
        })
    })

    it('Create Attribute Tag With Same Name', function () {
        cy.log('Step1: Create Attribute Tag')
        attributeTag.createAttributeTag(attributeTagName, attributeTagDescription)
        utils.assertSucessMsg('Attribute Tag Created Successfully')

        cy.log('Step2: Create Attribute Tag With Same Name')
        attributeTag.createAttributeTag(attributeTagName, attributeTagDescription)
        utils.assertToastMsg('Name already exists: ' + attributeTagName)
        cy.reload(true)

        cy.log('Step3: Delete Attribute Tag')
        attributeTag.deleteAttributeTag(attributeTagName)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')
    })
})
