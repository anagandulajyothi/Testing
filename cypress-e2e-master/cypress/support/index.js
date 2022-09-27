// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '../integration/utils/login.js'
import '../integration/utils/attributeTagUtils.js'
import '../integration/utils/policyGroupUtils.js'
import '../integration/utils/policyGroupTemplatesUtils.js'
import '../integration/utils/buildTimeInventoryUtils.js'
import '../integration/utils/manageinstutionsUtils.js'
import '../integration/utils/logicalDeploymentUtils.js'
import '../integration/utils/approvalsUtils.js'
import '../integration/utils/suppressionsUtils.js'
import '../integration/utils/groupsUtils.js'
import '../integration/utils/surfaceUtils.js'
import '../integration/utils/awsAccountUtils.js'
import '../integration/utils/crontrolcatlogUtils'
import '../integration/utils/surfaceLayerUtils.js'
import '../integration/utils/inviteUserUtils.js'
import '../integration/utils/azureSubscriptionUtils.js'
import '../integration/utils/baseLineAssetsUtils.js'
import '../integration/utils/policyViolationUtils.js'
import "cypress-real-events/support"
import '../integration/utils/policyBankUtils.js'

// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })


  Cypress.Server.defaults({
    delay: 500,
    force404: false,
    whitelist: (xhr) => {
      // handle custom logic for whitelisting
      return true;
    }
  })