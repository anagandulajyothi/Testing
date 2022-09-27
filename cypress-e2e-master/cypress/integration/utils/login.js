import loginPage from '../pages/loginPage.js'
import dashboardPage from '../pages/attributeTagPage.js'
const login = new loginPage();

Cypress.Commands.add('login', (data) => {
    cy.visit('/')
    login.usernameInput().type(data.username)
    login.passwordInput().type(data.password)
    login.loginBtn().click()
    cy.wait(5000);   
    // login.toast().should('be.hidden', {timeout:3000})
})

Cypress.Commands.add('reLogin', (username, password) => { 
    login.logout().click()
    cy.wait(3000)
    login.usernameInput().clear()
    cy.wait(2000)
    login.usernameInput().type(username)
    login.passwordInput().type(password)
    login.loginBtn().click()
    cy.wait(5000);   
}) 