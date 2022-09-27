import controlcatlogsPage from "../pages/controlcatlogsPage";
const controlcatlog = new controlcatlogsPage()
import policyGroupPage from '../pages/policyGroupPage.js'
const policyGroup = new policyGroupPage();

Cypress.Commands.add('createCatalog', (catlogName, catalogDesc, value) => {
    controlcatlog.clickcontrolcatlogMenu().click({ multiple: true })
    controlcatlog.clickControlMenu().click()
    controlcatlog.createNewControlCatlog().click()
    controlcatlog.controlname().type(catlogName)
    controlcatlog.controldesc().type(catalogDesc)
    controlcatlog.OwningGroupDropDown().click()
    controlcatlog.OwningGroupValue(value).click()
    controlcatlog.createCatlogButton().click()
})

Cypress.Commands.add('assignControlToCatalog', (catlogName, controlName) => {
    controlcatlog.clickcontrolcatlogMenu().click({ multiple: true })
    controlcatlog.clickControlMenu().click()
    controlcatlog.search().clear()
    controlcatlog.search().type(catlogName)
    controlcatlog.selectSearchData(catlogName).click()
    controlcatlog.controlsBtn().click()
    controlcatlog.editcontrols().click()
    controlcatlog.searchcontrol().type(controlName)
    controlcatlog.selectSearchcontrol().click()
    controlcatlog.Savecontrols().click()
})

Cypress.Commands.add('RemoveControlFromCatalog', (catlogName, controlName) => {
    controlcatlog.clickcontrolcatlogMenu().click({ multiple: true })
    controlcatlog.clickControlMenu().click()
    controlcatlog.search().clear()
    controlcatlog.search().type(catlogName)
    controlcatlog.selectSearchData(catlogName).click()
    controlcatlog.controlsBtn().click()
    controlcatlog.editcontrols().click()
    controlcatlog.searchcontrol().type(controlName)
    controlcatlog.selectSearchcontrol().click()
    controlcatlog.Savecontrols().click()
})

Cypress.Commands.add('PublishCatlog', (catlogName) => {
    controlcatlog.clickcontrolcatlogMenu().click({ multiple: true })
    controlcatlog.clickControlMenu().click()
    controlcatlog.search().clear()
    controlcatlog.search().type(catlogName)
    controlcatlog.selectSearchData(catlogName).click()
    controlcatlog.EditBtn().click()
    controlcatlog.publish().click()
    controlcatlog.Minor().click()
    controlcatlog.SubmitBtn().click()
})

Cypress.Commands.add('deleteCatalog', (catlogName) => {
    controlcatlog.search().clear()
    controlcatlog.search().type(catlogName)
    controlcatlog.selectSearchData(catlogName).click()
    controlcatlog.deleteDropDownButton().click()
    controlcatlog.deleteButton().click()
    controlcatlog.confirmDeleteButton().click()
})

Cypress.Commands.add('globalCatalogsCountOnDashBoard', () => {
    controlcatlog.clickcontrolcatlogMenu().click({ multiple: true })
    return cy.get('div:nth-of-type(1) > .card-count').then((count) => {
        self.globalCatalogCount = count.text();
        cy.log('Global Catalog Count ' + self.globalCatalogCount);
        return new Cypress.Promise((resolve) => {
            return resolve(self.globalCatalogCount);
        });
    });

})

Cypress.Commands.add('globalCatalogsCountOnFilter', () => {
    controlcatlog.clickGlobalCatalog().click()

    let filterCount = ''
    cy.get('.mx-2')
        .then(number => {
            filterCount = number
                .text()
                .split('')
                .pop()
            cy.get('.mx-2')
                .should('contain', self.globalCatalogCount)
            cy.log(filterCount)
        })
})

Cypress.Commands.add('clientCatalogsCountOnDashBoard', () => {
    controlcatlog.dashBoardMenu().click()
    controlcatlog.clickcontrolcatlogMenu().click({ multiple: true })

    return cy.get('div:nth-of-type(2) > .card-count').then((count) => {
        self.clientCatalogCount = count.text();
        cy.log('Global Catalog Count ' + self.clientCatalogCount);
        return new Cypress.Promise((resolve) => {
            return resolve(self.clientCatalogCount);
        });
    });

})

Cypress.Commands.add('clientCatalogsCountOnFilter', () => {
    controlcatlog.clickClientCatalog().click()

    let filterCount = ''
    cy.get('.mx-2')
        .then(number => {
            filterCount = number
                .text()
                .split('')
                .pop()
            cy.get('.mx-2')
                .should('contain', self.clientCatalogCount)
            cy.log(filterCount)
        })
})

Cypress.Commands.add('globalControlsCountOnDashBoard', () => {
    controlcatlog.dashBoardMenu().click()

    controlcatlog.clickcontrolcatlogMenu().click({ multiple: true })

    return cy.get('div:nth-of-type(3) > .card-count').then((count) => {
        self.clientCatalogCount = count.text();
        cy.log('Global Catalog Count ' + self.clientCatalogCount);
        return new Cypress.Promise((resolve) => {
            return resolve(self.clientCatalogCount);
        });
    });

})

Cypress.Commands.add('globalControlsCountOnFilter', () => {

    controlcatlog.clickGlobalControls().click()

    let filterCount = ''
    cy.get('.mx-2')
        .then(number => {
            filterCount = number
                .text()
                .split('')
                .pop()
            cy.get('.mx-2')
                .should('contain', self.clientCatalogCount)
            cy.log(filterCount)
        })
})

Cypress.Commands.add('clientControlsCountOnDashBoard', () => {
    controlcatlog.dashBoardMenu().click()

    controlcatlog.clickcontrolcatlogMenu().click({ multiple: true })

    return cy.get('div:nth-of-type(4) > .card-count').then((count) => {
        self.clientCatalogCount = count.text();
        cy.log('Global Catalog Count ' + self.clientCatalogCount);
        return new Cypress.Promise((resolve) => {
            return resolve(self.clientCatalogCount);
        });
    });

})

Cypress.Commands.add('clientControlsCountOnFilter', () => {

    controlcatlog.clickClientControls().click()

    let filterCount = ''
    cy.get('.mx-2')
        .then(number => {
            filterCount = number
                .text()
                .split('')
                .pop()
            cy.get('.mx-2')
                .should('contain', self.clientCatalogCount)
            cy.log(filterCount)
        })
})

Cypress.Commands.add('EditCatlogwithPublish', (catlogName) => {
    controlcatlog.clickcontrolcatlogMenu().click({ multiple: true })
    controlcatlog.clickControlMenu().click()
    controlcatlog.search().clear()
    controlcatlog.search().type(catlogName)
    controlcatlog.selectSearchData(catlogName).click()
    controlcatlog.EditBtn().click()
    controlcatlog.publish().click()
    controlcatlog.SubmitBtn().click()
})