import { loginPage } from '../../pageObjects/login.page';
import utils from '../specs/utils/utils';
import { surfacePage } from '../../pageObjects/surface.page';

const surface = new surfacePage()
const login = new loginPage()

let surfaceName
let surfaceDescription
let groupName
let identityAdmin
let institutionAdmin
let permissionAdmin
let surfaceAdmin
let user
let owningGroup

describe('Create New surface With Same Name', function () {

    before(function () {
        cy.fixture('testdata').then(function (testdata) {
            this.testdata = testdata
            surfaceName = this.testdata.surfaceName + utils.getUniqueString()
            surfaceDescription = this.testdata.surfaceDescription + utils.getUniqueString()
            owningGroup = this.testdata.owningGroup
            identityAdmin = this.testdata.identityAdmin
            institutionAdmin = this.testdata.institutionAdmin
            permissionAdmin = this.testdata.permissionAdmin
            surfaceAdmin = this.testdata.surfaceAdmin
            user = this.testdata.prodUser
            groupName = surfaceName
            login.login(this.testdata)
        })
    })

    it('Create New surface With Same Name', function () {
        cy.log('Step1: Create Surface')
        surface.createNewSurface(surfaceName, surfaceDescription, owningGroup)
        utils.assertSucessMsg('Surface Created Successfully')
        cy.wait(2000)
        cy.reload(true)

        cy.log('Step2: Create Surface')
        surface.createNewSurface(surfaceName, surfaceDescription, owningGroup)
        utils.assertSurfaceMsg('Name \'' + surfaceName + '\' already exists.')
        cy.wait(5000)
        cy.reload(true)

        cy.log('Step3: Delete Surface')
        surface.deleteSurface(surfaceName)
        utils.assertSucessMsg('Surface Deleted Successfully')
    })
})