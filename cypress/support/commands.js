// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('confirmCaptcha', function () {
  cy.get('iframe')
    .first()
    .then((recaptchaIframe) => {
      const body = recaptchaIframe.contents()
      cy.wrap(body).find('.recaptcha-checkbox-border').should('be.visible').click()
    })
})

Cypress.Commands.add('login', (email, password) => {
  cy.visit("/",{timeout:240000})
  cy.get('input[name="email"]').type(email);
  cy.get('[name="password"]').type(password);
  cy.get('.login__btn').click();
  cy.wait(700)
})

// Cypress.Commands.add('loginViaUISession', (email, password) => {
//   cy.session([email, password], () => {
//   Given('Access the RebelBase Login Page', () => {
//       cy.visit("/", { timeout: 240000 })
//     })

//     When('Enter the username', () => {
//       cy.get('input[name="email"]').type(email);
//     })

//     And('Enter the Password', () => {
//       cy.get('[name="password"]').type(password);
//     })

//     And('Click on the login button', () => {
//       cy.get('.login__btn').click();
//     })

//     Then('Redirect to the profile page', () => {
//       cy.url().should("contain", "profile");
      
//     }, {
//       validate() {
//         cy.visit('/')
//         cy.url().should("contain", "profile");
//       }
//     })
//   })
// })


Cypress.Commands.add('loginViaUISession', (email, password) => {
  cy.session([email, password], () => {
    cy.visit("/",{timeout:240000})
    cy.get('input[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('.login__btn').click();
    cy.wait(700)
    cy.url().should("contain", "dashboard");
  }, {
    validate() {
      cy.visit('/')
      cy.wait(700)
      cy.url().should("contain", "dashboard");
    }
  })
})

Cypress.Commands.add('loginViaAPI', (email, password) => {
  cy.session(
    [email, password],
    () => {
      cy.request({
        method: 'POST',
        url: 'https://core-service.staging.rebelbase.co/api/auth/login',
        //failOnStatusCode: false,
        body: {
          email,
          password
        },
      }).then(({
        body
      }) => {
        window.localStorage.setItem('authToken', body.token)
      })
    }, {
    validate() {
      cy.visit('/')
      cy.url().should("contain", "profile");
    },
  }
  )
})

const startStr = "token="
const endStr = "&"

function extractData(data, startStr, endStr) {
  var subStrStart = data.indexOf(startStr) + startStr.length
  return data.substring(subStrStart,
    subStrStart + data.substring(subStrStart).indexOf(endStr));

}
Cypress.Commands.add('extractToken', extractData);

import 'cypress-file-upload';

const COMMAND_DELAY = 700;

for (const command of ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains']) {
  Cypress.Commands.overwrite(command, (originalFn, ...args) => {
    const origVal = originalFn(...args);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(origVal);
      }, COMMAND_DELAY);
    });
  });
} 