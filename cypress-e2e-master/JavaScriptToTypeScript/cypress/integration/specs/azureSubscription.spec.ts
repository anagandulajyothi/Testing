// import { loginPage } from '../../pageObjects/login.page';
// import utils from '../specs/utils/utils';
// import { surfacePage } from '../../pageObjects/surface.page';
// import { azureSubscriptionPage } from '../../pageObjects/azureSubscription.page'

// const surface = new surfacePage()
// const login = new loginPage()
// const azureSubscription = new azureSubscriptionPage()

// let azureAccountName
// let azureAccountDescription
// let azureSubscriptionName
// let azureSubscriptionId
// let selectOwningGroup

// describe('Azure Subscriptions', function () {

//     before(function () {
//         cy.fixture('testdata').then(function (testdata) {
//             this.testdata = testdata
//             azureAccountName = testdata.azureAccountName + utils.getUniqueString()
//             azureAccountDescription = testdata.azureAccountDescription + utils.getUniqueString()
//             azureSubscriptionName = testdata.azureSubscriptionName + utils.getUniqueString()
//             azureSubscriptionId = "caf672d4-4336-499a-8a4a-" + utils.getRandomNumber()
//             selectOwningGroup = testdata.selectOwningGroup
//             login.login(this.testdata)
//         })
//     })

//     it('Azure Subscriptions', function () {
//         cy.log('Step1: Create Azure Subscription')
//         azureSubscription.createNewAzureAccount(azureAccountName, azureAccountDescription, azureSubscriptionName, azureSubscriptionId, 'E2E Admin')
//         cy.reload(true)

//         cy.log('Step2: Assign Azure Subscription To Surface')
//         surface.assignAzureSubscriptionToSurface('E2E Surface', azureAccountName)

//         cy.log('Step3: Remove Azure Subscription  From Surface')
//         surface.removeAzureSubscriptionFromSurface('E2E Surface', azureAccountName)

//         cy.log('Step4: Edit Azure Subscription')
//         azureSubscription.editAzureAccount(azureAccountName, azureAccountDescription)

//         cy.log('Step5: Delete Azure Subscription')
//         azureSubscription.deleteAzureAccount()
//     })
// })