
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'

let attributeTagName
let attributeTagdescription
let assetName
let description
let NestedTemplate

const login = new loginPage()
const attributeTag = new attributeTagPage()
const assetsManager = new assetsManagerPage()
describe('Nested Template', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attributeTagName = this.testdata.attributeTagName + utils.getUniqueString()
            attributeTagdescription = this.testdata.attributeTagDesc
            assetName = this.testdata.awsModelName + utils.getUniqueString()
            description = this.testdata.awsModelDesc
            NestedTemplate = ['core.json', 'ec2.json', 'S3.json']
            login.login(this.testdata)
        })
    })

    it('Nested Template', function () {

        cy.log('Step 1: Create Attribute Tag')
        attributeTag.createAttributeTag(attributeTagName, attributeTagdescription)

        cy.log('Step 2: Create New Enclave Model With Nested Templates')
        assetsManager.createNestedEnclaveModel('PUBLISHED', assetName, description, 'E2E Admin', attributeTagName, 'cloudProviderAws', 'Root.json', NestedTemplate)

        cy.log('Step 3: Edit Enclave Model')
        assetsManager.editEnclaveModelName(assetName)

        cy.log('Step 4: Delete Enclave Model')
        assetsManager.deleteEnclaveModel(assetName)

        cy.log('Step 6: Clean Up')
        attributeTag.deleteAttributeTag(attributeTagName)
    })
})