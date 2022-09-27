import { loginPage } from '../../pageObjects/login.page';
import { assetsManagerPage } from '../../pageObjects/buildTimeInventory.Page'
import { attributeTagPage } from '../../pageObjects/attributeTag.page';
import utils from '../specs/utils/utils';

const login = new loginPage()
const assetsManager = new assetsManagerPage()
const attributeTags = new attributeTagPage()

let attribute
let attributeTagDescription
let modelName
let modelDescription
let attributeTag


describe('Buildtime Inventory With YAML', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            attribute = this.testdata.attributeTagName + utils.getUniqueString()
            attributeTagDescription = this.testdata.attributeTagDesc
            modelName = this.testdata.awsModelName + utils.getUniqueString()
            modelDescription = this.testdata.awsModelDesc
            attributeTag = [attribute];
            login.login(this.testdata)
        })
    })

    it('Buildtime Inventory With YAML', function () {
        cy.log('Step1: Create Attribute Tag')
        attributeTags.createAttributeTag(attribute, attributeTagDescription)
        utils.assertSucessMsg('Attribute Tag Created Successfully')

        cy.log('Step2: Create Draft Yaml Enclave Model')
        assetsManager.createEnclaveModel('DRAFT', modelName, modelDescription, 'E2E Admin', attributeTag, 'cloudProviderAws', 'rds.yaml')

        cy.log('Step3: Publish Draft Yaml Enclave Model')
        assetsManager.publishYamlEnclaveModel(modelName)
        utils.assertSucessMsg('Buildtime Asset Updated Successfully')

        cy.log('Step4: Delete Draft Yaml Enclave Model')
        assetsManager.deleteEnclaveModel(modelName)
        utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

        cy.log('Step5: Create Enclave Model With Json')
        assetsManager.createEnclaveModel('PUBLISHED', modelName, modelDescription, 'E2E Admin', attributeTag, 'cloudProviderAws', 'concourseInfra.json')

        cy.log('Step6: Update Enclave Model With Yaml')
        assetsManager.updateEnclaveModelWithYaml(modelName, 'rds.yaml')
        utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

        cy.log('Step7: Delete Updated Enclave Model With Json')
        assetsManager.deleteEnclaveModel(modelName)
        utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

        cy.log('Step8: Delete Updated Enclave Model With Yaml')
        assetsManager.deleteEnclaveModel(modelName)
        utils.assertSucessMsg('Buildtime Asset Deleted Successfully')

        cy.log('Step9: Delete Attribute Tag')
        attributeTags.deleteAttributeTag(attribute)
        utils.assertSucessMsg('Attribute Tag Deleted Successfully')
    })
})