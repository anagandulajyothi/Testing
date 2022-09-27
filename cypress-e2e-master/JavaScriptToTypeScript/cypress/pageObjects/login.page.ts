export class loginPage {

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

    login(data) {
        cy.visit('/')
        this.usernameInput().type(data.username)
        this.passwordInput().type(data.password)
        this.loginBtn().click()
        cy.wait(5000);
    }

    reLogin(username, password) {
        this.logout().click()
        cy.wait(3000)
        this.usernameInput().clear()
        cy.wait(2000)
        this.usernameInput().type(username)
        this.passwordInput().type(password)
        this.loginBtn().click()
        cy.wait(5000);
    }
}
