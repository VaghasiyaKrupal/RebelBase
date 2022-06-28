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
import './commands';
import "cypress-real-events/support";
require('cypress-xpath');
// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.config('email', `testhubadmin+${new Date().getTime()}@rebelbase.co`);
Cypress.config('email_verify', `rebelbasetesthub+${new Date().getTime()}@gmail.com`);
Cypress.config('randomname', `testproject${Date.now()}`);

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})

// Hide fetch/XHR requests
const app = window.top;

if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}