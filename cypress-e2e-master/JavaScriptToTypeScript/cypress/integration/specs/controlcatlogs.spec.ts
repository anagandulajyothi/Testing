import { loginPage } from '../../pageObjects/login.page';
import { controlcatlogsPage } from '../../pageObjects/controlcatlogs.page'
import utils from '../specs/utils/utils';
const login = new loginPage()
const controls = new controlcatlogsPage()

let catalogName = 'E2E Catalog' + utils.getUniqueString()
let catalogDesc = 'Description For E2E Catalog';
let controlName = 'Access Agreements';

describe('Control Catlogs', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            login.login(this.testdata)
        })
    })

    it('Control Catlogs', function () {

        cy.log('Step 1:Creatge Catalog')
        controls.createCatalog(catalogName, catalogDesc, 'E2E Admin')

        cy.log('Step 2: Assign Control Catalog')
        controls.assignControlToCatalog(catalogName, controlName)

        cy.log('Step 3: Remove Updated Control Catalog')
        controls.RemoveControlFromCatalog(catalogName, controlName)

        cy.log('Step 4 Publish catlog')
        controls.PublishCatlog(catalogName)

        cy.log('Step 5:Delete Catalog')
        controls.deleteCatalog(catalogName)
    })
})