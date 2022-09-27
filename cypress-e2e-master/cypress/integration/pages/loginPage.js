class loginPage {

    usernameInput() {
        return cy.get('[data-e2e="inputUsername"]')
    }

    passwordInput() {
        return cy.get('[data-e2e="inputPassword"]')
    }

    loginBtn() {
        return cy.get('[data-e2e="loginButton"]')
    }

    toast() {
        return cy.get('#toast-container')
    }

    logout() {
        return cy.xpath('//i[contains(@class,"ms-Icon ms-Icon--SignOut sidebar-icon")]')
    }
}
export default loginPage