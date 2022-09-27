import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'
import { attributeTagPage } from '../../pageObjects/attributeTag.page';

const login = new loginPage()
const attributeTag = new attributeTagPage()
const assetsManager = new assetsManagerPage()
describe('Cloud Assests Template', function () {
    let attributeTagName
    let description
    let assetName
    let EnclaveDesc
    let NestedTemplate = ['core.json', 'ec2.json', 'S3.json']
    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attributeTagName = this.testdata.attributeName1 + utils.getUniqueString()
            description = this.testdata.attributeDescription1
            assetName = this.testdata.awsModelName + utils.getUniqueString()
            EnclaveDesc = this.testdata.awsModelDesc
            login.login(this.testdata)
        })
    })

    it('Cloud Assests Template', function () {

        cy.log('Step 1: Create Attribute Tag')
        attributeTag.createAttributeTag(attributeTagName, description)

        cy.log('Step 2: Create New Enclave Model')
        assetsManager.createNestedEnclaveModel('PUBLISHED', assetName, EnclaveDesc, 'E2E Admin', attributeTagName, 'cloudProviderAws', 'Root.json', NestedTemplate)

        cy.log('Step 3: Edit Enclave Model')
        assetsManager.editEnclaveModelName(assetName)

        cy.log('Step 4: Delete Enclave Model')
        assetsManager.deleteEnclaveModel(assetName)

        cy.log('Step 5: Verify Enclave Model Deleted Or Not')
        assetsManager.verifyNestedEnclaveModel(assetName)

        cy.log('Step 6: Delete Attribute Tag')
        attributeTag.deleteAttributeTag(attributeTagName)
        utils.assertSucessMsg('Attribute Tag Deleted')
    })
})