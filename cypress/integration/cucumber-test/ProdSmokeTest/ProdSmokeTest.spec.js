import { Before, After, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { builderPageData } from '../../pageObject/pageData/builderPageData'
import { builderPageSelectors } from '../../pageObject/pageSelectors/builderPageSelectors'
import { brainPageSelectors } from '../../pageObject/pageSelectors/brainPageSelectors'
import { smokeTestPageSelector } from "../../pageObject/pageSelectors/smokeTestPageSelector";
import { hubGroupPageData } from "../../pageObject/pageData/HubGroupPageData";
import { hubGroupPageSelector } from "../../pageObject/pageSelectors/hubGroupPageSelector";
import { eventPageSelectors } from "../../pageObject/pageSelectors/eventPageSelectors";
import { eventData } from "../../pageObject/pageData/eventData";
import { hubActivityPageSelector } from "../../pageObject/pageSelectors/hubActivityPageSelector";
import { permissionsPageSelector } from "../../pageObject/pageSelectors/permissionPageSelector";
import { projectProfilePageSelector } from "../../pageObject/pageSelectors/projectProfilePageSelector";
import "cypress-real-events/support";
import { prodSmokeTestPageSelector } from "../../pageObject/pageSelectors/ProdSmokeTest";

After(() => {
  cy.wait(1000)
})

// Login application
Given('Visit Rebelbase production url', function () {
  cy.visit("https://rebelbase.co/")
})

When('Accept cookies', () => {
  cy.get(prodSmokeTestPageSelector.acceptCookiesVutton).click()
})

And('Login to the rebelbase portal', () => {
  cy.xpath(prodSmokeTestPageSelector.loginButton).contains('Log In').click();
  cy.get(smokeTestPageSelector.signUpEmail).type(Cypress.env('username'));
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.loginButton).click();
});

Then('Verify profile url', () => {
  cy.url().should('include', '/profile/2466')
})

// Create project
Given('Visit Rebelbase production url', function () {
  cy.visit("https://rebelbase.co/")
})

When('Accept cookies', () => {
  cy.get(prodSmokeTestPageSelector.acceptCookiesVutton).click()
})

And('Login to the rebelbase portal', () => {
  cy.xpath(prodSmokeTestPageSelector.loginButton).contains('Log In').click();
  cy.get(smokeTestPageSelector.signUpEmail).type(Cypress.env('username'));
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.loginButton).click();
});

And('Visit Create project page through url', () => {
  cy.visit('https://app.rebelbase.co/project/create-project');
})

Then('Create project', () => {
  cy.get(smokeTestPageSelector.projectNameTextbox).type(Cypress.config('randomname'));
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune,');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get(smokeTestPageSelector.industryDropdown).select('2');
  cy.xpath(smokeTestPageSelector.createButtom).click();
  cy.url().should('include', '/project');

  cy.get('.index-header__projName').contains(Cypress.config('randomname'));
  cy.get(smokeTestPageSelector.inviteEmailTextbox).click();
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.xpath(brainPageSelectors.closeModelButton).click({ force: true });
});

// Create group
Given('Visit Rebelbase production url', function () {
  cy.visit("https://rebelbase.co/")
})

When('Accept cookies', () => {
  cy.get(prodSmokeTestPageSelector.acceptCookiesVutton).click()
})

And('Login to the rebelbase portal', () => {
  cy.xpath(prodSmokeTestPageSelector.loginButton).contains('Log In').click();
  cy.get(smokeTestPageSelector.signUpEmail).type(Cypress.env('username'));
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.loginButton).click();
});

And('Go to group page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Create group', () => {
  cy.get('.group-overview__add-btn').click();
  cy.get(smokeTestPageSelector.groupNameTextbox)
    .clear()
    .type(Cypress.config('randomname'));
  cy.xpath(smokeTestPageSelector.selectAllButton).click();
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
})

And('Verify group name', () => {
  cy.get('h1').should('have.text', Cypress.config('randomname'))
})

And('Visit group page through url', () => {
  cy.visit('https://app.rebelbase.co/hubs/26/groups');
})

Then('Delete group', () => {
  cy.get(smokeTestPageSelector.searchBar)
    .clear()
    .type(Cypress.config('randomname'));
  cy.get(':nth-child(1) > div.group-overview__title-wrap > div > div > button:nth-child(2)').click({ force: true });
  cy.get('[data-testid=customModal_firstChoice]').contains('Delete').click();
});

// Add Activity
Given('Visit Rebelbase production url', function () {
  cy.visit("https://rebelbase.co/")
})

When('Accept cookies', () => {
  cy.get(prodSmokeTestPageSelector.acceptCookiesVutton).click()
})

And('Login to the rebelbase portal', () => {
  cy.xpath(prodSmokeTestPageSelector.loginButton).contains('Log In').click();
  cy.get(smokeTestPageSelector.signUpEmail).type(Cypress.env('username'));
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.loginButton).click();
});

And('Go to activity page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.activityLink).click();
})

Then('Create post', () => {
  cy.wait(2000)
  cy.xpath(hubActivityPageSelector.addYourThought).click({ force: true });
  cy.xpath(hubActivityPageSelector.selectPost).click();
  cy.get(smokeTestPageSelector.postTextbox)
    .type('post cypress automation');
  cy.xpath(smokeTestPageSelector.postButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Post created successfully');
});

// Create event
Given('Visit Rebelbase production url', function () {
  cy.visit("https://rebelbase.co/")
})

When('Accept cookies', () => {
  cy.get(prodSmokeTestPageSelector.acceptCookiesVutton).click()
})

And('Login to the rebelbase portal', () => {
  cy.xpath(prodSmokeTestPageSelector.loginButton).contains('Log In').click();
  cy.get(smokeTestPageSelector.signUpEmail).type(Cypress.env('username'));
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.loginButton).click();
});

And('Go to the Event page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.wait(1000)
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create new event', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
  cy.get(smokeTestPageSelector.eventNameTextbox)
    .clear()
    .type(Cypress.config('randomname'));
  cy.get(smokeTestPageSelector.fromDate)
    .clear()
    .type('Dec 16, 2021');
  cy.get(smokeTestPageSelector.fromTime)
    .clear()
    .type('7:30am')
  cy.get(smokeTestPageSelector.toDate)
    .clear()
    .type('Dec 06, 2022')
  cy.get(smokeTestPageSelector.toTime)
    .clear()
    .type('7:30am')
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear().type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get('.createEvent__field__type').select('competition');
  cy.get('.createEvent').click();
  cy.get(':nth-child(2) > .createEvent__round-choice').click();
  cy.get(':nth-child(3) > .createEvent__round-choice').click();
  cy.get('.createEvent > .btn-wrap > .btn-main').click();
})

Then('Logout from account', () => {
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
});

// Signup application and logout
Given('User is on signup page', () => {
  cy.visit('https://rebelbase.co/');
  cy.get(prodSmokeTestPageSelector.acceptCookiesVutton).click()
})

When('clicked on signup button and add details', () => {
  cy.xpath(prodSmokeTestPageSelector.signUpButton).click();
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type('sur');
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type(Cypress.config('email'));
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get('#allowAll').click();
  cy.get('#promotionalEmails').click();
})

And('User clicks on signup button', () => {
  cy.xpath(smokeTestPageSelector.getStartedButton).click({ force: true });
})

And('new User is able to sign up successfully', () => {
  cy.url().should('include', '/profile');
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click()
})

Then('Logout from account', () => {
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
  cy.url().should('include', '/auth/login')
})