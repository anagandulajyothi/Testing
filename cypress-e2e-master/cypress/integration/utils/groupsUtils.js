import GroupPage from '../pages/groupsPage.js'
const groupPage = new GroupPage();

Cypress.Commands.add('createGroup', (groupName, groupDesc) => {
    groupPage.groupLink().trigger('mouseover');
    groupPage.groupLink().should('be.visible');
    groupPage.groupLink().click();
    groupPage.createNewGroup().click();
    groupPage.enterTagName().type(groupName);
    groupPage.enterDescription().type(groupDesc);
    groupPage.saveButton().click();
    groupPage.associateGroup().should('be.visible');
    groupPage.associateGroup().first().click()
})

Cypress.Commands.add('getId', () => {
    cy.url().then(url => {
        var id = url.substring(url.lastIndexOf('/') + 1);
        // var id = url.substring(url.lastIndexOf('/') + 1);
        // return url.split("/").pop()
        // return parseInt(url.split("/").pop())
        // return id;
        return id;
    })
})

Cypress.Commands.add('editGroup', (groupName) => {
    groupPage.groupLink().trigger('mouseover');
    groupPage.groupLink().click();
    groupPage.searchButton().should('be.visible');
    groupPage.searchButton().clear();
    groupPage.searchButton().type(groupName);
    groupPage.selectGroup(groupName).should('be.visible');
    groupPage.selectGroup(groupName).click();
    groupPage.editButton().should('be.visible');
    groupPage.editButton().click();
    groupPage.editGroupDescription().type(' Updated');
    groupPage.updateButton().should('be.visible');
    groupPage.updateButton().click();
})

Cypress.Commands.add('addUsers', (groupName, user) => {
    groupPage.groupLink().trigger('mouseover');
    groupPage.groupLink().click();
    groupPage.searchButton().should('be.visible');
    groupPage.searchButton().clear();
    groupPage.searchButton().type(groupName);
    groupPage.selectGroup(groupName).should('be.visible');
    groupPage.selectGroup(groupName).click();
    groupPage.userTab().should('be.visible');
    groupPage.userTab().click();
    groupPage.userDropDown().should('be.visible');
    groupPage.userDropDown().click();
    groupPage.searchusers().should('be.visible');
    groupPage.searchusers().type(user);
    groupPage.selectUser(user).should('be.visible');
    groupPage.selectUser(user).click();
    groupPage.addUser().should('be.visible');
    groupPage.addUser().click();
})

Cypress.Commands.add('removeUser', (groupName, user) => {
    groupPage.groupLink().trigger('mouseover');
    groupPage.groupLink().click();
    groupPage.searchButton().should('be.visible');
    groupPage.searchButton().clear();
    groupPage.searchButton().type(groupName);
    groupPage.selectGroup(groupName).should('be.visible');
    groupPage.selectGroup(groupName).click();
    groupPage.userTabWithUsers().should('be.visible');
    groupPage.userTabWithUsers().click();
    groupPage.deleteUser().should('be.visible');
    groupPage.deleteUser().click();
    groupPage.confirmDeleteUser().should('be.visible');
    groupPage.confirmDeleteUser().click()
})

Cypress.Commands.add('addRoleAssignments', (groupName, role, responsibility, organization, isSurfaceTest) => {
    groupPage.groupLink().trigger('mouseover');
    groupPage.groupLink().click();
    groupPage.searchButton().should('be.visible');
    groupPage.searchButton().clear();
    groupPage.searchButton().type(groupName);
    groupPage.selectGroup(groupName).should('be.visible');
    groupPage.selectGroup(groupName).click();
    groupPage.rolesTab().should('be.visible');
    groupPage.rolesTab().click();
    cy.wait(1000)
    for (let roleName of role) {
        cy.log('value', roleName)
        if (!!roleName) {
            groupPage.rolesDropDown().click()
            cy.wait(1000)
            // groupPage.enterRole().type(roleName)
            groupPage.selectRole(roleName).click()
            cy.wait(1000)
        }
    }

    groupPage.responsibilitiesDropDown().click();
    cy.wait(1000)
    for (let responsibilityName of responsibility) {
        cy.log(responsibility[responsibilityName]);
        cy.wait(1000)
        groupPage.selectResponsibility(responsibilityName).click();
        cy.wait(1000)
        cy.log('Responsibilities Selected');
    }
    ;
    if (organization) {
        cy.wait(1000)
        cy.addOrganization(organization, isSurfaceTest);
        cy.log(organization, 'Selected');
    }
    groupPage.submitButton().click();
})


Cypress.Commands.add('removeRoleAssignments', (groupName, roles) => {

    groupPage.groupLink().trigger('mouseover');
    groupPage.groupLink().click();
    groupPage.searchButton().should('be.visible');
    groupPage.searchButton().clear();
    groupPage.searchButton().type(groupName);
    groupPage.selectGroup(groupName).should('be.visible');
    groupPage.selectGroup(groupName).click();
    groupPage.rolesTab().should('be.visible');
    groupPage.rolesTab().click();

    for (let roleName of roles) {
        cy.log('value', roleName);
        // groupPage.selectRoleToDelete(roleName).should('be.visible')
        groupPage.selectRoleToDelete(roleName).click()
        cy.wait(1000)
    };

    groupPage.deleteRoleAssignment().click()
    // groupPage.deleteRoleAssignment().should('be.visible');
    // groupPage.deleteRoleAssignment();
})


Cypress.Commands.add('deleteGroup', (groupName) => {
    groupPage.groupLink().trigger('mouseover');
    groupPage.groupLink().click();
    groupPage.searchButton().should('be.visible');
    groupPage.searchButton().clear();
    groupPage.searchButton().type(groupName);
    groupPage.selectGroup(groupName).should('be.visible');
    groupPage.selectGroup(groupName).click();
    groupPage.clickOptionsButton().should('be.visible');
    groupPage.clickOptionsButton().click();
    groupPage.deleteButton().should('be.visible');
    groupPage.deleteButton().click();
    groupPage.confirmDeleteUser().should('be.visible');
    groupPage.confirmDeleteUser().click();
})

Cypress.Commands.add('addOrganization', (organization, isSurfaceTest = false) => {
    for (let OrganizationName of organization) {
        cy.log(organization[OrganizationName]);
        cy.wait(1000)
        groupPage.surfaceLayerNodesDropDown().click();
        if (!isSurfaceTest) {
            cy.wait(1000)
            groupPage.selectorganization(OrganizationName).click();
            cy.log('organization Selected');
        }

        if (isSurfaceTest) {
            cy.wait(1000)
            groupPage.selectFirstOrganization(OrganizationName).click();
            cy.log('organization Selected');
        }
    }
})

Cypress.Commands.add('deAssociateGroupFromSurfaceForGroup', (surfaceName, groupId) => {

    groupPage.surfaceLink().trigger('mouseover');
    groupPage.surfaceLink().should('be.visible');
    groupPage.surfaceLink().click();
    cy.wait(1000)
    cy.selectRootSurfaceFromDropDown(surfaceName);
    cy.wait(2000)
    cy.url().then(GetUrl => {
        cy.log("Url Is:" + GetUrl)
        var name = GetUrl.split('surface-list')[0]
        cy.visit(name)
    })
    cy.wait(3000)
    groupPage.manageSurfaces().click();
    groupPage.editAllowedGroupsButton().click();
    cy.wait(1000)
    groupPage.selectGroupToDeAssociate(groupId).trigger('mouseover');
    groupPage.selectGroupToDeAssociate(groupId).should('be.visible');
    groupPage.selectGroupToDeAssociate(groupId).click();
    groupPage.deAssociateButton().click();
})

Cypress.Commands.add('selectSurfaceFromDropDown', (surfaceName) => {
    groupPage.surfaceDropDown().trigger('mouseover');
    groupPage.surfaceDropDown().should('be.visible');
    groupPage.surfaceDropDown().click();
    groupPage.selectSurface(surfaceName).trigger('mouseover');
    groupPage.selectSurface(surfaceName).should('be.visible');
    cy.wait(1000)
    groupPage.selectSurface(surfaceName).click({ multiple: true });
});

Cypress.Commands.add('searchGroup', (surfaceName, groupName) => {
    cy.selectSurfaceFromDropDown(surfaceName);
    groupPage.groupLink().trigger('mouseover');
    groupPage.groupLink().click();
    groupPage.searchButton().should('be.visible');
    groupPage.searchButton().clear();
    groupPage.searchButton().type(groupName);
    groupPage.selectGroup(groupName).should('be.visible');
    groupPage.selectGroup(groupName).click();
})

Cypress.Commands.add('addSameUser', (groupName, user) => {
    groupPage.groupLink().trigger('mouseover');
    groupPage.groupLink().click();
    groupPage.searchButton().should('be.visible');
    groupPage.searchButton().clear();
    groupPage.searchButton().type(groupName);
    groupPage.selectGroup(groupName).should('be.visible');
    groupPage.selectGroup(groupName).click();
    groupPage.userTab().should('be.visible');
    groupPage.userTab().click();
    groupPage.userDropDown().should('be.visible');
    groupPage.userDropDown().click();
    groupPage.searchusers().should('be.visible');
    groupPage.searchusers().type(user);
    groupPage.selectUser(user).should('be.visible');
    groupPage.selectUser(user).first().click({ force: true });
    groupPage.addUser().should('be.visible');
    groupPage.addUser().click();
})

Cypress.Commands.add('selectRootSurfaceFromDropDown', (surfaceName) => {
    groupPage.surfaceDropDown().should('be.visible');
    groupPage.surfaceDropDown().click();
    groupPage.selectSurface(surfaceName).should('be.visible');
    groupPage.selectSurface(surfaceName).click({ multiple: true });
});

Cypress.Commands.add('deAssociateGroupFromSurface', (surfaceName, groupId) => {

    groupPage.surfaceLink().trigger('mouseover');
    groupPage.surfaceLink().should('be.visible');
    groupPage.surfaceLink().click();
    cy.selectSurfaceFromDropDown(surfaceName);
    cy.wait(2000)
    cy.url().then(GetUrl => {
        cy.log("Url Is:" + GetUrl)
        var name = GetUrl.split('surface-list')[0]
        cy.visit(name + 'surfaces')
    })
    cy.wait(3000)
    groupPage.manageSurfaces().click();
    groupPage.editAllowedGroupsButton().click();
    cy.wait(2000)
    groupPage.selectGroupToDeAssociate(groupId).trigger('mouseover');
    groupPage.selectGroupToDeAssociate(groupId).should('be.visible');
    cy.wait(1000)
    groupPage.selectGroupToDeAssociate(groupId).click();
    groupPage.deAssociateButton().click();
})

Cypress.Commands.add('createGroupWithSameName', (groupName, groupDesc) => {
    groupPage.groupLink().trigger('mouseover');
    groupPage.groupLink().should('be.visible');
    groupPage.groupLink().click();
    groupPage.createNewGroup().click();
    groupPage.enterTagName().type(groupName);
    groupPage.enterDescription().type(groupDesc);
    groupPage.saveButton().click();
    cy.wait(5000)
})

Cypress.Commands.add('addAnotherRoleAssignments', (role, responsibility, organization, isSurfaceTest) => {
    cy.wait(1000)
    groupPage.rolesTab().should('be.visible');
    groupPage.rolesTab().click();
    for (let roleName of role) {
        cy.log('value', roleName)
        if (!!roleName) {
            cy.wait(1000)
            groupPage.rolesDropDown().click()
            // groupPage.enterRole().type(roleName)
            cy.wait(1000)
            groupPage.selectRole(roleName).click()
        }
        cy.wait(1000)
    }

    groupPage.responsibilitiesDropDown().click();
    for (let responsibilityName of responsibility) {
        cy.log(responsibility[responsibilityName]);
        cy.wait(1000);
        groupPage.selectResponsibility(responsibilityName).click();
        cy.wait(1000);
        cy.log('Responsibilities Selected');
    }
    cy.wait(1000);
    if (organization) {
        cy.addOrganization(organization, isSurfaceTest);
        cy.log(organization, 'Selected');
    }
    groupPage.submitButton().click();
    cy.wait(5000)
})
