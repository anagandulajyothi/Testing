import SurfaceLayer from '../pages/surfaceLayerPage.js'
const surfaceLayerPage = new SurfaceLayer();


Cypress.Commands.add('createNewSurfaceLayer', (surface, name, description) => {
    surfaceLayerPage.surfaceMenu().trigger('mouseover');
    surfaceLayerPage.surfaceMenu().should('be.visible');
    surfaceLayerPage.surfaceMenu().click();
    cy.log('Surface Page Displayed');
    cy.selectSurfaceFromDropDown(surface);
    // cy.wait(2000)
    cy.url().then(GetUrl => {
        cy.log("Url Is:" + GetUrl)
        var name = GetUrl.split('surface-list')[0]
        cy.log('name is :' + name)
        cy.visit(name + 'surfaces')
    });
    // cy.wait(2000)
    surfaceLayerPage.dropDownForChildSurfaceLayer().first().click();
    surfaceLayerPage.addChildSurfaceLayer().click();
    surfaceLayerPage.enterSurfaceLayerName().type(name);
    cy.log('Entered Surface Layer Name', name);
    surfaceLayerPage.enterSurfaceLayerDescription().type(description);
    cy.log('Description Entered', description);
    surfaceLayerPage.createButton().click();
    cy.log('Surface Drop Down Selected');

})

Cypress.Commands.add('editSurfaceLayer', (surface, root, name, description) => {
    surfaceLayerPage.surfaceMenu().trigger('mouseover');
    surfaceLayerPage.surfaceMenu().should('be.visible');
    surfaceLayerPage.surfaceMenu().click();
    cy.log('Surface Page Displayed');
    surfaceLayerPage.selectSurfaceFromDropDown(surface);
    // cy.wait(2000)
    cy.url().then(GetUrl => {
        cy.log("Url Is:" + GetUrl)
        var name = GetUrl.split('surface-list')[0]
        cy.log('name is :' + name)
        cy.visit(name + 'surfaces')
    });
    // cy.wait(2000)
    surfaceLayerPage.selectRootSurfaceLayer(root).click();
    cy.log('Edit Button Clicked');
    surfaceLayerPage.manageSurfaceLayers().first().click();
    cy.log('Manage Surface Layers');
    surfaceLayerPage.EditButton().click();
    cy.log('Edit Button Clicked');
    surfaceLayerPage.enterDescriptionOnEdit().type(description + ' Updated');
    name = this.enterDescriptionOnEdit.getAttribute('value');
    cy.log('Surface Layer Description Entered: ', description);
    cy.log('Suface Layer Description Updated');
    surfaceLayerPage.saveButton().click();
})

Cypress.Commands.add('deleteSurfaceLayer', (surface, surfaceLayerName) => {
    surfaceLayerPage.surfaceMenu().trigger('mouseover');
    surfaceLayerPage.surfaceMenu().should('be.visible');
    surfaceLayerPage.surfaceMenu().click();
    cy.log('Surface Page Displayed');
    cy.selectSurfaceFromDropDown(surface);
    // cy.wait(2000)
    cy.url().then(GetUrl => {
        cy.log("Url Is:" + GetUrl)
        var name = GetUrl.split('surface-list')[0]
        cy.log('name is :' + name)
        cy.visit(name + 'surfaces')
    })
    // cy.wait(2000)
    // surfaceLayerPage.selectRootSurfaceLayer(surfaceLayerName).trigger('mouseover');
    // surfaceLayerPage.selectRootSurfaceLayer(surfaceLayerName).trigger('be.visible');
    surfaceLayerPage.selectRootSurfaceLayer(surfaceLayerName).children().click({ multiple: true });
    cy.log('Surface Layer Selected');
    // surfaceLayerPage.manageSurfaceLayers().click();
    // cy.log('Manage Surface Layers');
    cy.wait(3000)
    surfaceLayerPage.deleteSurfaceLayerButton().click();
    cy.log('Clicked On Delete Drop Down');
    surfaceLayerPage.confirmSurfaceLayerDelete().click();
})

