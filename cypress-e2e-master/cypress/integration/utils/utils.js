
export default class utils {

    static getUniqueString() {
        return Math.floor(Math.random() * 1000) + '-' + (new Date()).getTime().toString(36);
    }

    static getRandomNumber() {
        return Math.floor(Math.random() * 900000000000) + 1
    }

    static assertSucessMsg(message) {
        cy.get('[id="toast-container"]').contains(message)
    }

    static assertToastMsg(message) {
        cy.get('.alert-container > bs-alert.ng-star-inserted > .alert').contains(message)
    }

    static assertToastPublishMsg(message) {
        cy.get('bs-alert.ng-star-inserted > .alert').contains(message)
    }

    static assertSurfaceMsg(message) {
        cy.get('.alert-container > bs-alert > .alert').contains(message)
    }

    static getIdFromUrl() {

        cy.url().then(url => {
            let id = url.substring(url.lastIndexOf('/') + 1);
            returnid = id;
            return id;
        })
        // return returnid;
    }

    static verifyAWSAccount(account) {
        cy.get('[data-e2e="accountIds"] div:nth-of-type(2)').contains(account)
    }

    static verifyAWSRegion(region) {
        cy.get('[data-e2e="regions"] > div > div span:nth-of-type(2)').contains(region)
    }

    static verifyAWSProducts(product) {
        cy.get('[data-e2e="products"] > div > div span:nth-of-type(2)').contains(product)
    }

    static verifyAWSResourceType(type) {
        cy.get('[data-e2e="resourceTypes"] > div > div span:nth-of-type(2)').contains(type)
    }

    static verifyAWSResourceTag(tag) {
        cy.get('app-pretty-array > :nth-child(1) > label').contains(tag)
    }

    static assertSuppressionMsg(message) {
        cy.xpath('//p[contains(.,"' + message + '")]')
    }
}