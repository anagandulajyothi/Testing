
import InviteUser from '../pages/inviteUserPage'
const userPage = new InviteUser();


Cypress.Commands.add('inviteNewUser', (mail) => {

    userPage.usersLink().trigger('mouseover')
    userPage.usersLink().should('be.visible')
    userPage.usersLink().click()
    cy.log('Users Menu Clicked')

    userPage.inviteUserButton().should('be.visible')
    userPage.inviteUserButton().click();
    cy.log('Clicked Invite User Button');

    userPage.enterEmail().should('be.visible')
    userPage.enterEmail().type(mail);
    cy.log(mail, 'Entered');

    userPage.inviteButton().should('be.visible')
    userPage.inviteButton().click()
    cy.log('Invite Button Clicked');
    cy.wait(5000)
})