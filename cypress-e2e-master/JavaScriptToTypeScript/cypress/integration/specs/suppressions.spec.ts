import { suppressionsPage } from '../../pageObjects/suppressions.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { attributeTagPage } from '../../pageObjects/attributeTag.page';

const supressionpolicyTemplate = new suppressionsPage()
const login = new loginPage()
const attributeTag = new attributeTagPage()

describe('Supression Policy Template', function () {
    let allowedKinesisAttributeTag = 'Allowed Kinesis Only' + utils.getUniqueString()
    let description = 'Allowed Kinesis Only'
    let encryptSupression = 'Encrypt Stateful Data in Stacks SUpression ' + utils.getUniqueString();
    let restrictSupression = 'Restrict Internet Ingress in Stacks Supression ' + utils.getUniqueString()
    let allowedAWSProductsSupression = 'Allowed AWS Products in Stacks ' + utils.getUniqueString()
    let allowedAWSRegionsSupression = 'Allowed AWS Regions in Accounts ' + utils.getUniqueString()

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            login.login(this.testdata)
        })
    })

    it('SupressionpolicyTemplate', function () {

        cy.log('Step 1: Create Allowed Kinesis Only Attribute Tag')
        attributeTag.createAttributeTag(allowedKinesisAttributeTag, description)

        cy.log('Step 2: Create Encryption Supression With Supressed')
        supressionpolicyTemplate.createSupression(encryptSupression, encryptSupression, 'E2E Admin', 'PUBLISHED', allowedKinesisAttributeTag, 'Encrypt Stateful Data in Stacks', '', '', '', '')

        cy.log('Step 3: Create Restrict Supression With Supressed')
        supressionpolicyTemplate.createSupression(restrictSupression, restrictSupression, 'E2E Admin', 'PUBLISHED', allowedKinesisAttributeTag, 'Restrict Internet Ingress in Stacks', '', '', '', '')

        cy.log('Step 4: Create Allowed AWS Products Supression With Supressed')
        supressionpolicyTemplate.createSupression(allowedAWSProductsSupression, allowedAWSProductsSupression, 'E2E Admin', 'PUBLISHED', allowedKinesisAttributeTag, 'Allowed AWS Products in Stacks', 'Wildcard', '', '', '')

        cy.log('Step 5: Create Allowed AWS Regions Supression With Supressed')
        supressionpolicyTemplate.createSupression(allowedAWSRegionsSupression, allowedAWSRegionsSupression, 'E2E Admin', 'PUBLISHED', allowedKinesisAttributeTag, 'Allowed AWS Regions in Accounts', 'Wildcard', '', '', '')

        cy.log('Step 6: Delete Allowed AWS Regions Supression')
        supressionpolicyTemplate.deleteSupression(allowedAWSRegionsSupression)

        cy.log('Step 7: Delete Restrict Supression')
        supressionpolicyTemplate.deleteSupression(restrictSupression)

        cy.log('Step 8: Delete Allowed AWS ProductsSupression')
        supressionpolicyTemplate.deleteSupression(allowedAWSProductsSupression)

        cy.log('Step 9: Delete Encrypt Supression')
        supressionpolicyTemplate.deleteSupression(encryptSupression)

        cy.log('Step 10: Delete Allowed Kinesis AttributeTag')
        attributeTag.deleteAttributeTag(allowedKinesisAttributeTag)
    })
})