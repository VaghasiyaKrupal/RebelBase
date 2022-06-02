import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import { brainPageSelectors } from '../../pageObject/pageSelectors/brainPageSelectors'
import { builderPageSelectors } from '../../pageObject/pageSelectors/builderPageSelectors'
import { hubGroupPageSelector } from '../../pageObject/pageSelectors/hubGroupPageSelector'
import { smokeTestPageSelector } from '../../pageObject/pageSelectors/smokeTestPageSelector'

// Login to app staging rebelbase
Given('User is at the login page', () => {
    cy.visit('/')
})

When('User enters username as {string} and password as {string}', (username, password) => {
    cy.xpath(smokeTestPageSelector.emailTextbox).type(username)
    cy.xpath(smokeTestPageSelector.passwordTextbox).type(password)
})

And('User clicks on login button', () => {
    cy.get(smokeTestPageSelector.loginButton).click()
})

Then('User is able to successfully login to the Website', () => {
    cy.url().should('include', '/profile');
})

// create project
Given('User is logged in', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('clicked on + button project and add details', () => {
    cy.visit('project/create-project',{timeout:200000});
    cy.get(smokeTestPageSelector.addProjectButton).click();
    cy.get(smokeTestPageSelector.projectNameTextbox)
        .clear()
        .type(Cypress.config('randomname'));
    cy.get(smokeTestPageSelector.autoCompleteTextbox)
        .clear()
        .type('pune');
    cy.get(smokeTestPageSelector.locationResultInput).click();
    cy.get(smokeTestPageSelector.industryDropdown).select('2');
})

And('User clicks on create project button', () => {
    cy.xpath(smokeTestPageSelector.createButtom).click();
})

Then('User is able to successfully create project', () => {
    cy.get('h3').contains(Cypress.config('randomname'));
    cy.get(smokeTestPageSelector.inviteEmailTextbox)
        .click()
        .clear()
        .type(Cypress.env('member'));

    cy.xpath(smokeTestPageSelector.sendInviteButton).click();
    cy.xpath(brainPageSelectors.closeModelButton).click({ force: true });
})

// create group
Given('admin User is logged in', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('clicked on + button and add details', () => {
    cy.get(brainPageSelectors.notificationDismiss).click({ force: true });
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.groupLink).click();
    cy.get(smokeTestPageSelector.addGroupButton).click();
    cy.get(hubGroupPageSelector.groupName)
        .clear({ force: true })
        .type(Cypress.config('randomname'));
    // cy.xpath(smokeTestPageSelector.selectAllButton).click();
})

And('User clicks on create group button', () => {
    cy.xpath(smokeTestPageSelector.createGroupButton).click();
})

Then('User is able to successfully create group', () => {
    cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders');
    cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects');
    cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members')
    cy.visit('hubs/26/groups',{timeout:200000});
    cy.get(brainPageSelectors.notificationDismiss).click()
    cy.get(smokeTestPageSelector.searchBar)
        .clear({ force: true })
        .type(Cypress.config('randomname'));
    cy.get(smokeTestPageSelector.projectHover).click({ force: true });
    cy.xpath(smokeTestPageSelector.deleteButtom).click();
})

// add activity
Given('User is logged in', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('clicked on add activity button and add details', () => {
    cy.get(brainPageSelectors.notificationDismiss).click({ force: true });
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.activityLink).click();
    cy.wait(1000)
    cy.contains('Add your thoughts').click({ force: true });
    cy.wait(1000)
    cy.xpath(smokeTestPageSelector.post).click();
})

And('User clicks on post button', () => {
    cy.get(smokeTestPageSelector.postTextbox).type('post cypress automation');
})

Then('User is able to create post', () => {
    cy.xpath(smokeTestPageSelector.postButton).click();
})

// create event
Given('User is logged in', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('clicked on new event button and add details', () => {
    cy.get(brainPageSelectors.notificationDismiss).click({ force: true });
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.eventLink).first().click();
    cy.xpath(smokeTestPageSelector.newEventButton).click();
    cy.get(smokeTestPageSelector.eventNameTextbox)
        .clear({ force: true })
        .type(Cypress.config('randomname'));
    cy.get(smokeTestPageSelector.fromDate)
        .click({ force: true })
        .type('Aug 20, 2021');
    cy.get(smokeTestPageSelector.fromTime)
        .click({ force: true })
        .type('8:00am');
    cy.get(smokeTestPageSelector.toDate)
        .click({ force: true })
        .type('Dec 30, 2021');
    cy.get(smokeTestPageSelector.toTime)
        .click({ force: true })
        .type('8:00am');
    cy.get(smokeTestPageSelector.autoCompleteTextbox)
        .clear()
        .type('pune');
    cy.get(smokeTestPageSelector.locationResultInput).click({ force: true });
    cy.get('.createEvent__field__type')
        .select('competition')
        .should('have.value', 'competition')
    cy.xpath(smokeTestPageSelector.yesButton).click();
    cy.get(':nth-child(3) > .createEvent__round-choice').click();
})

And('User clicks on create event button', () => {
    cy.xpath(builderPageSelectors.nextButton).click();
})

Then('User is able to successfully create event', () => {
    cy.get(smokeTestPageSelector.headerDropdown).click();
    cy.get(smokeTestPageSelector.logoutButton).click();
})

// Signup application
Given('User is on signup page', () => {
    cy.visit('/');
})

When('clicked on signup button  and add details', () => {
    cy.get('.login__noaccount > button').click();
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

Then('new User is able to sign up successfully', () => {
    cy.url().should('include', '/profile');
    cy.get(smokeTestPageSelector.autoCompleteTextbox)
        .clear()
        .type('pune');
    cy.get(smokeTestPageSelector.locationResultInput).click();
    cy.xpath(smokeTestPageSelector.readyButton).click();
    cy.get('.btn-skip').click({ force: true });
    cy.get('[aria-label="menu"] > .css-70qvj9 > .MuiBox-root > .MuiTypography-root').contains('test')
})
