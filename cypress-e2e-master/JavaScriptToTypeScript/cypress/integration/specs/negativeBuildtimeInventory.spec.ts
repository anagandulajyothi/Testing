import { loginPage } from '../../pageObjects/login.page';
import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import utils from '../specs/utils/utils';
const login = new loginPage()
const assetsManager = new assetsManagerPage()
const attributeTag = new attributeTagPage()

let attribute
let attributeTagDescription
let modelName
let modelDescription
let attributeTags

describe('Buildtime Inventory With Same Name', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attribute = this.testdata.attributeTagName + utils.getUniqueString()
            attributeTagDescription = this.testdata.attributeTagDesc
            modelName = this.testdata.awsModelName + utils.getUniqueString()
            modelDescription = this.testdata.awsModelDesc
            attributeTags = [attribute];
            login.login(this.testdata)
        })
    })

    it('Buildtime Inventory With Same Name', function () {
        cy.log('Step1: Create Attribute Tag')
        attributeTag.createAttributeTag(attribute, attributeTagDescription)

        cy.log('Step2: Create Enclave Model')
        assetsManager.createEnclaveModel('PUBLISHED', modelName, modelDescription, 'E2E Admin', attributeTags, 'cloudProviderAws', 'concourseInfra.json')
        utils.assertSucessMsg('Buildtime Asset Created Successfully')

        cy.log('Step3: Create Enclave Model With Same Name')
        assetsManager.createEnclaveModel('PUBLISHED', modelName, modelDescription, 'E2E Admin', attributeTags, 'cloudProviderAws', 'concourseInfra.json')
        utils.assertToastMsg('Name already exists: ' + modelName)
        cy.reload(true)

        cy.log('Step4: Delete Enclave Model')
        assetsManager.deleteEnclaveModel(modelName)
        utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

        cy.log('Step5: Delete Attribute Tag')
        attributeTag.deleteAttributeTag(attribute)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')
    })
})