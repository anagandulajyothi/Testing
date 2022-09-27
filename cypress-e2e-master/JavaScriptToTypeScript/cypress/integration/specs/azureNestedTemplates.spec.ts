
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'

let attributeTagName
let attributeTagdescription
let assetName
let description
let NestedTemplate = ['nested-template-1.json']

const login = new loginPage()
const attributeTag = new attributeTagPage()
const assetsManager = new assetsManagerPage()
describe('Azure Nested Template', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attributeTagName = this.testdata.attributeName1 + utils.getUniqueString()
            attributeTagdescription = this.testdata.attributeDescription1
            assetName = this.testdata.azureEnclaveModelName + utils.getUniqueString()
            description = this.testdata.modelDescription
            login.login(this.testdata)
        })
    })

    it('Azure Nested Template', function () {
        cy.log('Step 1: Create Attribute Tag')
        attributeTag.createAttributeTag(attributeTagName, attributeTagdescription)

        cy.log('Step 2: Create New Enclave Model')
        assetsManager.createNestedEnclaveModel('PUBLISHED', assetName, description, 'E2E Admin', attributeTagName, 'cloudProviderAws', 'root-template.json', NestedTemplate)

        cy.log('Step 3: Edit Enclave Model')
        assetsManager.editEnclaveModelName(assetName)

        cy.log('Step 4: Delete Enclave Model')
        assetsManager.deleteEnclaveModel(assetName)

        cy.log('Step 5: Verify Enclave Model Deleted Or Not')
        assetsManager.verifyNestedEnclaveModel(assetName)

        cy.log('Step 6: Clean Up')
        attributeTag.deleteAttributeTag(attributeTagName)
    })
})