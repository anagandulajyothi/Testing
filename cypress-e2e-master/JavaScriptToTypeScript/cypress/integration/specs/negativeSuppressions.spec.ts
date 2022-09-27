import { suppressionsPage } from '../../pageObjects/suppressions.page';
import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { attributeTagPage } from '../../pageObjects/attributeTag.page';

const supression = new suppressionsPage()
const login = new loginPage()
const attributeTag = new attributeTagPage()


describe('Create Supression With Same Name', function () {
    let allowedKinesisAttributeTag = 'Allowed Kinesis Only' + utils.getUniqueString()
    let description = 'Allowed Kinesis Only'
    let allowedAWSProductsSupression = 'Allowed AWS Products in Stacks ' + utils.getUniqueString()

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            login.login(this.testdata)
        })
    })

    it('Create Supression With Same Name', function () {

        cy.log('Step 1: Create Allowed Kinesis Only Attribute Tag')
        attributeTag.createAttributeTag(allowedKinesisAttributeTag, description)

        cy.log('Step 2: Create Supression')
        supression.createSupression(allowedAWSProductsSupression, allowedAWSProductsSupression, 'E2E Admin', 'DRAFT', allowedKinesisAttributeTag, 'Allowed AWS Products in Stacks', 'Wildcard', '', '', '')

        cy.log('Step 3: Create Supression With Same Name')
        supression.createSupressionwithSameName(allowedAWSProductsSupression, allowedAWSProductsSupression, 'E2E Admin', 'DRAFT')
        cy.wait(1000)
        cy.reload(true)

        cy.log('Step 4: Publish Supression With Out Increment By')
        supression.editSuppression(allowedAWSProductsSupression, 'PUBLISHED')
        utils.assertToastPublishMsg('Error ?increment must be set to MAJOR or MINOR when publishing a versioned entity.')
        cy.wait(1000)
        cy.reload(true)

        cy.log('Step 5: Delete Allowed AWS ProductsSupression')
        supression.deleteSupression(allowedAWSProductsSupression)

        cy.log('Step 6: Delete Allowed Kinesis AttributeTag')
        attributeTag.deleteAttributeTag(allowedKinesisAttributeTag)
    })
})