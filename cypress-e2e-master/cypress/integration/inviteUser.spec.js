import { before } from 'mocha';
import TestFilters from '../support/filterTests.js';
import utils from '../integration/utils/utils.js';


TestFilters([], function () {
    describe('Invite Users', function () {
        let userMail

        before(function () {
            cy.fixture('testdata').then(function (testdata) {
                this.testdata = testdata
                userMail = 'chandrakanth.vedicharala' + utils.getUniqueString() + '@concourselabs.com'
                cy.login(this.testdata)
            })
        })

        it('Invite Users', function () {
            cy.log('Step1: Invite User')
            cy.inviteNewUser(userMail)
            utils.assertSucessMsg('User Invitation Email Sent')
        })
    })
})