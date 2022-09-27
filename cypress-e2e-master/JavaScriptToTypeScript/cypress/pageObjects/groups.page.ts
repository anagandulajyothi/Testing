export class GroupPage {

    groupLink() {
        return cy.get('a[data-e2e="linkUserGroups"]')
    }

    createNewGroup() {
        return cy.get('[data-e2e="createNewGroup"]')
    }
    enterTagName() {
        return cy.get('input[formcontrolname="name"]')
    }

    enterDescription() {
        return cy.get('textarea[formcontrolname="description"]')
    }
    saveButton() {
        return cy.get('[data-e2e="submit"]')
    }

    searchButton() {
        return cy.get('.form-control')
    }

    selectGroup(name) {
        return cy.xpath(`//h5[contains(.,'${name}')]`)
    }

    editButton() {
        return cy.get('button[title="Edit Group"]')
    }
    editGroupDescription() {
        return cy.get('textarea[data-e2e="inputGroupDescription"]')
    }

    updateButton() {
        return cy.get('.Save')
    }

    userTab() {
        return cy.xpath('//a[contains(.,"Users 0")]')
    }

    userTabWithUsers() {
        return cy.xpath('//a[contains(.,"Users 1")]')
    }

    selectUserToDelete(user) {
        return cy.xpath(`//div[.='${user}']`)
    }

    userDropDown() {
        return cy.get('#userId > control-validation > .pos-rel > .ng-select > .ng-select-container > .ng-arrow-wrapper')
    }

    searchusers() {
        return cy.get('#userId > control-validation > .pos-rel > .ng-select > .ng-select-container > .ng-value-container > .ng-input > input')
    }

    selectUser(user) {
        return cy.xpath(`//span[.='${user}']`)
    }

    addUser() {
        return cy.get('.Add')
    }

    clickOptionsButton() {
        return cy.get('.pos-rel > .btn > .ms-Icon')
    }

    deleteButton() {
        return cy.get('[data-e2e="deleteGroup"]')
    }

    confirmDelete() {
        return cy.get('data-e2e="confirmDeleteModalBtn"');
    }

    deleteUser() {
        return cy.get('button[data-e2e="deleteUser"]')
    }

    confirmDeleteUser() {
        return cy.get('.btn-outline-danger')
    }

    rolesTab() {
        return cy.xpath('//a[.="Concourse Roles"]')
    }

    rolesDropDown() {
        return cy.get('[placeholder="Select a Role"]')
    }

    enterRole() {
        return cy.get(':nth-child(1) > .pos-rel > .ng-select > .ng-select-container > .ng-value-container > .ng-input > input')
    }

    selectRole(role) {
        return cy.xpath(`//span[.='${role}']`)
    }

    responsibilitiesDropDown() {
        return cy.get('[placeholder="Select a Role First"] > div > span')
    }

    selectAllResponsibilities() {
        return cy.xpath('//ng-multiselect-dropdown[@name="responsibilitiesAssigned"]//div[.="Select All"]')
    }

    selectResponsibility(responsibility) {
        return cy.xpath(`//span[.='${responsibility}']`)
    }

    dropDownClose() {
        return cy.get('.dropdown-up')
    }

    surfaceLayerNodesDropDown() {
        return cy.get('[placeholder="Select Surface Layers"] > div > span')
    }

    selectorganization(organization) {
        return cy.xpath(`//span[.='${organization}']`)
    }

    selectFirstOrganization() {
        return cy.get('div.scroll-host > div > div:nth-of-type(1)')
    }

    submitButton() {
        return cy.xpath('//button[contains(text(),"Submit")]')
    }

    selectRoleToDelete(role) {
        return cy.xpath(`//li[contains(.,'${role}')]//button[@data-e2e='deleteRoleAssignment']`)
    }

    roleElement() {
        return cy.get(`ul.role-assignments > .list-group-item`)
    }

    deleteRoleAssignment() {
        return cy.get('.btn-outline-danger')
    }

    associateGroup() {
        return cy.get('[data-e2e="associateGroup"]')
    }

    surfaceLink() {
        return cy.get('a[data-e2e="linkSurfaces"]')
    }

    surfaceDropDown() {
        return cy.get('[data-e2e="surfaceSwitcherDropdown"]')
    }

    selectSurface(surface) {
        return cy.xpath(`//h5[.='${surface}']`)
    }

    manageSurfaces() {
        return cy.xpath(`//button[contains(text(),'Manage Surface')]`)
    }

    editAllowedGroupsButton() {
        return cy.get('[data-e2e="addGroupsToSurface"]')
    }

    associateGroupDropDown() {
        return cy.get('[data-e2e="assignGroupsSelect"]')
    }

    selectGroupToDeAssociate(groupId) {
        return cy.get(`[data-e2e='${groupId}']`)
    }

    deAssociateButton() {
        return cy.get('.p-button-label')
    }

    createGroup(groupName, groupDesc) {
        this.groupLink().trigger('mouseover');
        this.groupLink().should('be.visible');
        this.groupLink().click();
        this.createNewGroup().click();
        this.enterTagName().type(groupName);
        this.enterDescription().type(groupDesc);
        this.saveButton().click();
        this.associateGroup().should('be.visible');
        this.associateGroup().first().click()
    }

    getId() {
        return cy.url().then(function (url) {
            console.log(url);
            let str = 'currentUrl';
            let entityId = [];
            entityId = url.split('/');
            return entityId[5];
        });

    // getId() {
    // cy.url().then(url => {
    //     var id = url.substring(url.lastIndexOf('/') + 1);
    //     return id;
    // })
}
    editGroup(groupName) {
        this.groupLink().trigger('mouseover');
        this.groupLink().click();
        this.searchButton().should('be.visible');
        this.searchButton().clear();
        this.searchButton().type(groupName);
        this.selectGroup(groupName).should('be.visible');
        this.selectGroup(groupName).click();
        this.editButton().should('be.visible');
        this.editButton().click();
        this.editGroupDescription().type(' Updated');
        this.updateButton().should('be.visible');
        this.updateButton().click();
    }

    addUsers(groupName, user) {
        this.groupLink().trigger('mouseover');
        this.groupLink().click();
        this.searchButton().should('be.visible');
        this.searchButton().clear();
        this.searchButton().type(groupName);
        this.selectGroup(groupName).should('be.visible');
        this.selectGroup(groupName).click();
        this.userTab().should('be.visible');
        this.userTab().click();
        this.userDropDown().should('be.visible');
        this.userDropDown().click();
        this.searchusers().should('be.visible');
        this.searchusers().type(user);
        this.selectUser(user).should('be.visible');
        this.selectUser(user).click( {force: true});
        this.addUser().should('be.visible');
        this.addUser().click();
    }

    removeUser(groupName, user) {
        this.groupLink().trigger('mouseover');
        this.groupLink().click();
        this.searchButton().should('be.visible');
        this.searchButton().clear();
        this.searchButton().type(groupName);
        this.selectGroup(groupName).should('be.visible');
        this.selectGroup(groupName).click();
        this.userTabWithUsers().should('be.visible');
        this.userTabWithUsers().click();
        this.deleteUser().should('be.visible');
        this.deleteUser().click();
        this.confirmDeleteUser().should('be.visible');
        this.confirmDeleteUser().click()
    }

    addRoleAssignments(groupName, role, responsibility, organization, isSurfaceTest) {
        this.groupLink().trigger('mouseover');
        this.groupLink().click();
        this.searchButton().should('be.visible');
        this.searchButton().clear();
        this.searchButton().type(groupName);
        this.selectGroup(groupName).should('be.visible');
        this.selectGroup(groupName).click();
        this.rolesTab().should('be.visible');
        this.rolesTab().click();
        cy.wait(1000)
        for (let roleName of role) {
            cy.log('value', roleName)
            if (!!roleName) {
                this.rolesDropDown().click()
                cy.wait(1000)
                //this.enterRole().type(roleName)
                this.selectRole(roleName).click()
                cy.wait(1000)
            }
        }

        this.responsibilitiesDropDown().click();
        cy.wait(1000)
        for (let responsibilityName of responsibility) {
            cy.log(responsibility[responsibilityName]);
            cy.wait(1000)
            this.selectResponsibility(responsibilityName).click();
            cy.wait(1000)
            cy.log('Responsibilities Selected');
        }
        ;
        if (organization) {
            cy.wait(1000)
            this.addOrganization(organization, isSurfaceTest);
            cy.log(organization, 'Selected');
        }
        this.submitButton().click();
    }


    removeRoleAssignments(groupName, roles) {

        this.groupLink().trigger('mouseover');
        this.groupLink().click();
        this.searchButton().should('be.visible');
        this.searchButton().clear();
        this.searchButton().type(groupName);
        this.selectGroup(groupName).should('be.visible');
        this.selectGroup(groupName).click();
        this.rolesTab().should('be.visible');
        this.rolesTab().click();

        for (let roleName of roles) {
            cy.log('value', roleName);
            //this.selectRoleToDelete(roleName).should('be.visible')
            this.selectRoleToDelete(roleName).click()
            cy.wait(1000)
        };

        this.deleteRoleAssignment().click()
        //this.deleteRoleAssignment().should('be.visible');
        //this.deleteRoleAssignment();
    }


    deleteGroup(groupName) {
        this.groupLink().trigger('mouseover');
        this.groupLink().click();
        this.searchButton().should('be.visible');
        this.searchButton().clear();
        this.searchButton().type(groupName);
        this.selectGroup(groupName).should('be.visible');
        this.selectGroup(groupName).click();
        this.clickOptionsButton().should('be.visible');
        this.clickOptionsButton().click();
        this.deleteButton().should('be.visible');
        this.deleteButton().click();
        this.confirmDeleteUser().should('be.visible');
        this.confirmDeleteUser().click();
    }

    addOrganization(organization, isSurfaceTest = false) {
        for (let OrganizationName of organization) {
            cy.log(organization[OrganizationName]);
            cy.wait(1000)
            this.surfaceLayerNodesDropDown().click();
            if (!isSurfaceTest) {
                cy.wait(1000)
                this.selectorganization(OrganizationName).click();
                cy.log('organization Selected');
            }

            if (isSurfaceTest) {
                cy.wait(1000)
                this.selectFirstOrganization().click();
                cy.log('organization Selected');
            }
        }
    }

    deAssociateGroupFromSurfaceForGroup(surfaceName, groupId) {

        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().should('be.visible');
        this.surfaceLink().click();
        cy.wait(1000)
        this.selectRootSurfaceFromDropDown(surfaceName);
        cy.wait(2000)
        cy.wait(2000)
        cy.url().then((url) => {
            var surfaceList = url.split('surface-list')[0]
            cy.log('Name is :' + surfaceList)
            cy.visit(surfaceList)
        })
        cy.wait(3000)
        this.manageSurfaces().click();
        this.editAllowedGroupsButton().click();
        cy.wait(1000)
        this.selectGroupToDeAssociate(groupId).trigger('mouseover');
        this.selectGroupToDeAssociate(groupId).should('be.visible');
        cy.wait(1000)
        this.selectGroupToDeAssociate(groupId).click({force: true});
        this.deAssociateButton().click();
    }

    selectSurfaceFromDropDown(surfaceName) {
        this.surfaceDropDown().trigger('mouseover');
        this.surfaceDropDown().should('be.visible');
        this.surfaceDropDown().click();
        // this.selectSurface(surfaceName).trigger('mouseover');
        this.selectSurface(surfaceName).should('be.visible');
        cy.wait(1000)
        this.selectSurface(surfaceName).click({ multiple: true });
    }

    searchGroup(surfaceName, groupName) {
        this.selectSurfaceFromDropDown(surfaceName);
        this.groupLink().trigger('mouseover');
        this.groupLink().dblclick();
        this.searchButton().should('be.visible');
        this.searchButton().clear();
        this.searchButton().type(groupName);
        this.selectGroup(groupName).should('be.visible');
        this.selectGroup(groupName).click();
        cy.wait(5000)
    }

    addSameUser(groupName, user) {
        this.groupLink().trigger('mouseover');
        this.groupLink().click();
        this.searchButton().should('be.visible');
        this.searchButton().clear();
        this.searchButton().type(groupName);
        this.selectGroup(groupName).should('be.visible');
        this.selectGroup(groupName).click();
        this.userTab().should('be.visible');
        this.userTab().click();
        this.userDropDown().should('be.visible');
        this.userDropDown().click();
        this.searchusers().should('be.visible');
        this.searchusers().type(user);
        this.selectUser(user).should('be.visible');
        this.selectUser(user).first().click({ force: true });
        this.addUser().should('be.visible');
        this.addUser().click();
    }

    selectRootSurfaceFromDropDown(surfaceName) {
        this.surfaceDropDown().should('be.visible');
        this.surfaceDropDown().click();
        this.selectSurface(surfaceName).should('be.visible');
        this.selectSurface(surfaceName).click({ multiple: true });
    }

    deAssociateGroupFromSurface(surfaceName, groupId) {

        this.surfaceLink().trigger('mouseover');
        this.surfaceLink().should('be.visible');
        this.surfaceLink().click();
        this.selectSurfaceFromDropDown(surfaceName);
        cy.wait(2000)
        cy.url().then((url) => {
            var surfaceList = url.split('surface-list')[0]
            cy.log('Name is :' + surfaceList)
            cy.visit(surfaceList + 'surfaces')
        })
        cy.wait(3000)
        this.manageSurfaces().click();
        this.editAllowedGroupsButton().click();
        cy.wait(2000)
        this.selectGroupToDeAssociate(groupId).trigger('mouseover');
        this.selectGroupToDeAssociate(groupId).should('be.visible');
        cy.wait(1000)
        this.selectGroupToDeAssociate(groupId).click({force: true});
        this.deAssociateButton().click();
    }

    createGroupWithSameName(groupName, groupDesc) {
        this.groupLink().trigger('mouseover');
        this.groupLink().should('be.visible');
        this.groupLink().click();
        this.createNewGroup().click();
        this.enterTagName().type(groupName);
        this.enterDescription().type(groupDesc);
        this.saveButton().click();
        cy.wait(5000)
    }

    addAnotherRoleAssignments(role, responsibility, organization, isSurfaceTest) {
        cy.wait(1000)
        this.rolesTab().should('be.visible');
        this.rolesTab().click();
        for (let roleName of role) {
            cy.log('value', roleName)
            if (!!roleName) {
                cy.wait(1000)
                this.rolesDropDown().click()
                //this.enterRole().type(roleName)
                cy.wait(1000)
                this.selectRole(roleName).click()
            }
            cy.wait(1000)
        }

        this.responsibilitiesDropDown().click();
        for (let responsibilityName of responsibility) {
            cy.log(responsibility[responsibilityName]);
            cy.wait(1000);
            this.selectResponsibility(responsibilityName).click();
            cy.wait(1000);
            cy.log('Responsibilities Selected');
        }
        cy.wait(1000);
        if (organization) {
            this.addOrganization(organization, isSurfaceTest);
            cy.log(organization, 'Selected');
        }
        this.submitButton().click();
        cy.wait(5000)
    }
}
