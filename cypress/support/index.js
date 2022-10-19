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

import failOnConsoleError, { consoleType } from 'cypress-fail-on-console-error';
import './commands';

const config = {
    excludeMessages: ['Invalid code received for user', 'object unsubscribed', 'The map container element should be empty', '[Error: Container \'map\' not found.]'],
    includeConsoleTypes: [
        consoleType.ERROR,
        consoleType.WARN,
        consoleType.INFO,
    ],
};

failOnConsoleError(config);


before(() => {
    // Creating a db pool
});

after(() => {
    // cy.task('closeDbPool');
});

require('cypress-grep')()