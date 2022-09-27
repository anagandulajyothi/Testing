class GroupPage {

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

}
export default GroupPage