import { keys } from "cypress/types/lodash"
/// <reference types="cypress" />

export class manageInstutionsPage {


    linkInstitutionData() {
        return cy.get('[data-e2e="linkInstitutionData"]')
    }

    institutionData() {
        return cy.get('a[data-e2e="InstitutionData"]')
    }

    newInstitutionData() {
        return cy.get('[data-e2e="newInstitutionData"]')
    }

    institutionDataDropDown() {
        return cy.get('[name="selectInstData"]')
    }

    selectDataAccount(account) {
        return cy.xpath(`//span[.='${account}']`)
    }


    enterKey() {
        return cy.get('[placeholder="Key"]')
    }

    enterValue() {
        return cy.get('[placeholder="Value"]')
    }

    // enterUrl(value: any) {
    // return cy.get('input[ng-reflect-name='${value}']')
    // }

    enterNewValue() {
        return cy.get('[placeholder="Value"]')
    }


    createButton() {
        return cy.get('.ms-auto')
    }

    updateKey() {
        return cy.get(`[novalidate] div:nth-of-type(2) [placeholder='Key']`)
    }

    updateValue() {
        return cy.get(`[novalidate] div:nth-of-type(2) [placeholder='Value']`)
    }


    updateWhiteListValue() {
        // return cy.get('(//textarea[contains(@placeholder,'Value')])[2]')
    }


    addButtton() {
        return cy.get('.fa-plus-circle')
    }

    //removeInstitutionData(num) {
    //return cy.xpath(`div[ng-reflect-name='${num}'] .btn-danger`)
    // }


    selectAccount(account) {
        return cy.get(`h5[data-e2e='${account}']`)
    }


    updateData() {
        return cy.get('.ms-auto')
    }

    deleteAccountButton() {
        return cy.get('[data-e2e="delete"]')
    }


    confirmDeleteButton() {
        return cy.get('[data-e2e="confirmDeleteModalBtn"]')
    }

    surfaceDropDown() {
        return cy.get('[data-e2e="surfaceSwitcherDropdown"]')
    }


    selectSurface() {
        // return cy.get('//option[contains(.,'${surface}')]')
    }

    toast() {
        return cy.get('#toast-container')
    }


    removeWhiteListValue(value) {
        return cy.xpath(`(//*[@type="button"])[${value}]`)
    }

    removePublickKeyValue() {
        return cy.xpath(`(//button[@type='button']//fa-icon)[2]`)
    }

    dataDetailPage() {
        return cy.get('.content')
    }

    dataAccountList() {
        return cy.get('.list')
    }

    createDataForInstitution(Keys, publicKey, KeyValue) {
        this.linkInstitutionData().trigger('mouseover');
        this.linkInstitutionData().should('be.visible');
        this.linkInstitutionData().click();
        this.institutionData().click();
        this.newInstitutionData().click();
        this.institutionDataDropDown().trigger('mouseover');
        this.institutionDataDropDown().should('be.visible');
        this.institutionDataDropDown().click();
        this.selectDataAccount(Keys).click();
        this.enterKey().click();
        this.enterKey().type(publicKey)
        this.enterValue().click();
        this.enterValue().type(KeyValue)
        this.createButton().click();
    }

    updateInstitutionDataAccount(Keys, updatedKey, updatedKeyValue) {
        this.linkInstitutionData().trigger('mouseover');
        this.linkInstitutionData().should('be.visible');
        this.linkInstitutionData().click();
        this.institutionData().click();
        this.selectAccount(Keys).click();
        cy.wait(2000)
        this.updateKey().type(updatedKey)
        cy.wait(2000)
        this.updateValue().type(updatedKeyValue)
        this.updateData().click();
    }

    removeInstitutionData(Keys) {
        this.linkInstitutionData().trigger('mouseover');
        this.linkInstitutionData().should('be.visible');
        this.linkInstitutionData().click();
        this.institutionData().click();
        this.selectAccount(Keys).click();
        cy.wait(2000)
        //this.removePublickKeyValue(Keys).click();
        this.removePublickKeyValue().click();
        cy.wait(2000)
        this.updateData().click();
    }

    deleteInstitutionData(Keys) {
        this.linkInstitutionData().trigger('mouseover');
        this.linkInstitutionData().should('be.visible');
        this.linkInstitutionData().click();
        this.institutionData().click();
        this.selectAccount(Keys).click();
        cy.wait(1000)
        this.deleteAccountButton().click();
        cy.wait(1000)
        this.confirmDeleteButton().click()
    }

}