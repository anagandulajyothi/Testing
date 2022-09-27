// import { loginPage } from '../../pageObjects/login.page';
// import { controlcatlogsPage } from '../../pageObjects/controlcatlogs.page'
// import utils from '../specs/utils/utils';
// const login = new loginPage()
// const controls = new controlcatlogsPage()

// let catalogName = 'E2E Catalog' + utils.getUniqueString()
// let catalogDesc = 'Description For E2E Catalog';
// let controlName = 'Access Agreements';

// describe('Control Catlogs Dash Board Count', function () {
//     before(function () {
//         cy.fixture('testdata').then(function (testdata) {
//             this.testdata = testdata
//             login.login(this.testdata)
//         })
//     })

//     it('Verify Control Catlogs Count on Dash Board and Filter', function () {
//         cy.log('Step 1:Verify Global Catalogs Count')
//         controls.globalCatalogsCountOnDashBoard()
//         controls.globalCatalogsCountOnFilter()

//         cy.log('Step 2:Verify Client Catalogs Count')
//         controls.clientCatalogsCountOnDashBoard()
//         controls.clientCatalogsCountOnFilter()

//         cy.log('Step 3:Verify Global Controls Count')
//         controls.globalControlsCountOnDashBoard()
//         controls.globalControlsCountOnFilter()

//         cy.log('Step 3:Verify Client Controls Count')
//         controls.clientControlsCountOnDashBoard()
//         controls.clientControlsCountOnFilter()
//     })
// })

