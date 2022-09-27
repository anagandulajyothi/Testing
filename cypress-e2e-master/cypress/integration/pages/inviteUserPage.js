class InviteUser {
    usersLink() { 
        return cy.get('a[data-e2e="linkUsers"]') 
    }
    inviteUserButton() { 
        return cy.xpath('//button[contains(text(),"Invite User")]') 
    }
    enterEmail() { 
        return cy.get('[data-e2e="userEmail"]') 
    }
    inviteButton() { 
        return cy.get('[data-e2e="submit"]') 
    }
    list() { 
        return cy.xpath('//div[@class="list"]') 
    }
    search() { 
        return cy.get('[data-e2e="textSearch"]') 
    }
    surfaceDropDown() { 
        return cy.get('[data-e2e="surfaceSwitcherDropdown"]') 
    }
    selectSurface(Surface) { 
        return cy.xpath(`//option[contains(.,'${Surface}')]`) 
    }
    toast() { 
        return cy.get('#toast-container') 
    }
    alert() { 
        return cy.get('.alert') 
    }
    message() { 
        return cy.get('[validator="email"]') 
    }
}
export default InviteUser