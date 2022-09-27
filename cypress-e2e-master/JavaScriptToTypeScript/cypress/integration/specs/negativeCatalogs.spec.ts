import { loginPage } from '../../pageObjects/login.page';
import { controlcatlogsPage } from '../../pageObjects/controlcatlogs.page'
import utils from '../specs/utils/utils';
const login = new loginPage()
const controls = new controlcatlogsPage()

let catalogName = 'E2E Catalog' + utils.getUniqueString()
let catalogDesc = 'Description For E2E Catalog';
let controlName = 'Access Agreements';

describe('Create Catlogs With Same Name', function () {
    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            login.login(this.testdata)
        })
    })

    it('Create Catlogs With Same Name', function () {

        cy.log('Step 1:Create Catalog')
        controls.createCatalog(catalogName, catalogDesc, 'E2E Admin')
        cy.reload(true)

        cy.log('Step 2:Create Catalog With Same Name')
        controls.createCatalog(catalogName, catalogDesc, 'E2E Admin')
        utils.assertToastMsg('Name already exists: ' + catalogName)
        cy.reload(true)

        cy.log('Step 3:Try To Publish With Out Selecting Increment By')
        controls.EditCatlogwithPublish(catalogName)
        utils.assertToastPublishMsg('Error ?increment must be set to MAJOR or MINOR when publishing a versioned entity.')
        cy.reload(true)

        cy.log('Step 4:Delete Catalog')
        controls.deleteCatalog(catalogName)
    })
})