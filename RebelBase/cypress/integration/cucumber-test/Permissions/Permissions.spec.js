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

const projectName = "cypressautomation-" + Math.random().toString(36).substring(2);

// Test project support member permissions
Given('Login to the supporter account', () => {
  cy.login(Cypress.env('supporter'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Verify supporter email', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(permissionsPageSelector.selectSetting).click();
  cy.get(permissionsPageSelector.selectCypressProject1).click();
  cy.get('.team__permission__descript > span').contains('Supporter');
  cy.get('.team__list__email').contains(Cypress.env('supporter'));
  cy.get(eventPageSelectors.editPen).should('have.length', 1);
  cy.get('.edit-pen').click();
  cy.get('.person__role__edit-wrap > input').clear();
  cy.get('.person__role__edit-wrap > input').type('supporter');
  cy.get('.btn-save').click();
})

And('Changing basic account settings', () => {
  cy.get(permissionsPageSelector.accountSetting).click();
  cy.get(permissionsPageSelector.firstnameTextbox)
    .clear()
    .type('test5');
  cy.get(permissionsPageSelector.lastnameTextbox)
    .clear()
    .type('test55');
  cy.get('.settings').click();
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune,');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get(permissionsPageSelector.valueSaveButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Account settings saved!')
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

And('Add Alternative Email and remove it', () => {
  cy.xpath(permissionsPageSelector.addEmailButton).click();
  cy.get(permissionsPageSelector.emailTextbox).type('testhubadmin+5@rrebelbase.co');
  cy.xpath(permissionsPageSelector.addButton).click();
  // cy.xpath(brainPageSelectors.closeModelButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Alternative email added. Please check your email to verify.').click();
  cy.xpath(permissionsPageSelector.removeButton).contains('remove').click();
})

And('Verify supporter permission', () => {
  cy.get(permissionsPageSelector.accountSetting).click();
  cy.get('.emails').click();
  cy.get(permissionsPageSelector.selectCypressProject1).click();
  cy.get('.team__list:nth-child(3) > .team__list__name').click();
  cy.get('.team__list:nth-child(2) > p > span').click();
  cy.get('.team__list:nth-child(2) > p').click();
  cy.get('.settings').click();
  cy.get('.settings').dblclick();
})

Then('Create project and redirect to project page', () => {
  cy.get(permissionsPageSelector.plushButton).click();
  cy.get(smokeTestPageSelector.projectNameTextbox).type(projectName);
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune,');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get(smokeTestPageSelector.industryDropdown).select('2');
  cy.xpath(smokeTestPageSelector.createButtom).click();
  cy.url().should('include', '/project');
});

// Check project members permissons
Given('Login to the member account', () => {
  cy.login(Cypress.env('member'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Changing basic settings', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.get(smokeTestPageSelector.devHub).should('be.visible');
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(permissionsPageSelector.selectSetting).click();
  cy.get(permissionsPageSelector.accountSetting).click();
  cy.get(permissionsPageSelector.lastnameTextbox)
    .clear()
    .type('test22');
  cy.get(permissionsPageSelector.valueSaveButton).click();
  cy.xpath(permissionsPageSelector.addEmailButton).click();
  cy.get(permissionsPageSelector.emailTextbox)
    .clear()
    .type('testhubadmin+5@rrebelbase.co');
  cy.get(permissionsPageSelector.emailTextbox)
    .clear()
    .type('testhubadmin+2@rrebelbase.co');
  cy.xpath(permissionsPageSelector.addButton).click();
  cy.xpath(brainPageSelectors.closeModelButton).click();
})

And('Changing project setting', () => {
  cy.get(permissionsPageSelector.selectCypressProject1).contains('CypressTestProject01').click();
  cy.get(eventPageSelectors.editPen).click({ force: true });
  cy.get('.settings').click();
  cy.get(permissionsPageSelector.teamMemberTextbox)
    .clear()
    .type('Member');
  cy.xpath(hubActivityPageSelector.saveButton).click();
  cy.get(permissionsPageSelector.projectStageSelection).select('planning');
  cy.get(permissionsPageSelector.valueSaveButton).click();
  cy.wait(2000);
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Project settings saved!').click();
})

Then('Invite user to team', () => {
  cy.get(':nth-child(1) > .team__pending__actions > li > .btn-second').should('have.text', 'Resend invite');
  cy.get(':nth-child(1) > .team__pending__actions > li > .btn-second').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation resent!');
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(builderPageSelectors.projectBuilderLink).click();
  cy.get('.css-g45jk2 > .MuiBox-root > [data-testid="AddIcon"]').click();
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type('testhubadmin@rebelbase.co');
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type('testhubadmin+6@rebelbase.co');
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'This email has already been sent an invitation!');
  cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.get(':nth-child(1) > .pending--btn-wrap > .inviteTeam__btn__nudge').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation resent!');
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
  cy.xpath(brainPageSelectors.closeModelButton).click();
});

// Check rebelbase members permissons
Given('Login to the Rebelbase member account', () => {
  cy.login(Cypress.env('rebelbasemember'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

When('Go to setting page', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(permissionsPageSelector.selectSetting).click();
})

Then('Check Rebelbase member permission', () => {
  cy.get(permissionsPageSelector.accountSetting).click();
  cy.get(permissionsPageSelector.lastnameTextbox)
    .clear()
    .type('rebelbase2');
  cy.get(permissionsPageSelector.valueSaveButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Account settings saved!')
  cy.get('ul > :nth-child(4) > span').should('not.exist');
  cy.get('.edit-pen').should('not.exist');
  cy.get('[data-testid="AddIcon"]').should('exist');
  cy.get('.btn-link').contains(' click here').should('not.exist');
});

// Check public members permissons
Given('Go to project page', () => {
  cy.visit('project/1511');
})

When('Verify public member permission', () => {
  cy.get('.menu__sub').contains('Problem').should('be.visible');
  cy.get('.menu__sub').contains('Prototesting').should('be.visible');
  cy.get('.menu__sub').contains('Version').should('not.exist');
})

Then('Verify settings permission', () => {
  cy.get('[data-testid=ArrowDropDownIcon]').should('not.exist');
  cy.get('[data-testid=SettingsIcon]').should('not.exist');
});

// Check Hub event member permissons
Given('Login to event member account', () => {
  cy.login(Cypress.env('eventMember'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click();
})

When('Verify permission from settings', () => {
  cy.get('[data-testid=ArrowDropDownIcon]').click()
  cy.get('[data-testid=SettingsIcon]').click()
  cy.get(permissionsPageSelector.accountSetting).click();
  cy.get(permissionsPageSelector.lastnameTextbox)
    .clear()
    .type('test6');
  cy.get(permissionsPageSelector.valueSaveButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Account settings saved!');
  cy.get('.edit-pen').should('not.exist');
  cy.get('[data-testid="AddIcon"]').should('exist');
  cy.get('.btn-link').should('not.exist');
})

And('Creating post', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.activityLink).click();
  cy.wait(2000)
  cy.xpath(hubActivityPageSelector.addYourThought).click({ force: true });

  cy.xpath(hubActivityPageSelector.selectPost).click();
  cy.get(smokeTestPageSelector.postTextbox).type('post cypress automation');
  cy.xpath(hubActivityPageSelector.postButton).last().click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Post created successfully');
})

Then('Edit post', () => {
  cy.get('#long-button').eq(0).click() // Click on first post three dot
  cy.get('ul li button').contains('Edit').click({ force: true }) // Click on edit for first port
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('cypress automation update'); // Clear textarea and typre into
  cy.xpath(hubActivityPageSelector.cancelButton).contains('Cancel').click();
})

// Check Hub member but not event member permissons
Given('Login to hub member account', () => {
  cy.login(Cypress.env('hubmemberonly'), Cypress.env('password'));
  cy.get('.notification-dismiss').click();
})

When('Go to setting page', () => {
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=SettingsIcon]').click();
})

And('Verify setting permission', () => {
  cy.get(permissionsPageSelector.accountSetting).click();
  cy.get(permissionsPageSelector.lastnameTextbox)
    .clear()
    .type('test6');
  cy.get(permissionsPageSelector.valueSaveButton).click();
  cy.get('ul > :nth-child(4) > span').should('not.exist');
  cy.get(eventPageSelectors.editPen).should('not.exist');
  cy.get('[data-testid="AddIcon"]').should('exist');
  // cy.get('.btn-link').should('not.exist');
})

And('Creating post', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.activityLink).click();
  cy.wait(2000)
  cy.xpath(hubActivityPageSelector.addYourThought).click({ force: true });

  cy.xpath(hubActivityPageSelector.selectPost).click();
  cy.get(smokeTestPageSelector.postTextbox).type('post cypress automation');
  cy.xpath(hubActivityPageSelector.postButton).last().click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Post created successfully');
})

And('Edit post', () => {
  cy.get('#long-button').eq(0).click() // Click on first post three dot
  cy.get('ul li button').contains('Edit').click({ force: true }) // Click on edit for first port
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('cypress automation update'); // Clear textarea and typre into
  cy.xpath(hubActivityPageSelector.cancelButton).contains('Cancel').click();
})

Then('Verify permission from event page', () => {
  cy.visit('/events');
  cy.get('.eList__empty > p').should('contain.text', 'There are no events yet.');
  cy.visit('/hubs/26/events');
  cy.get(':nth-child(1) > .eSum__listing__top > .eSum__listing__left > .eSum__listing__title > h3').click(); // Click on the first event from the list
  cy.get(eventPageSelectors.editPen).should('not.exist');
});

// Logout members can browse projects, open profile page and can see events details
Given('Go to project page and verify title', () => {
  cy.visit('project/1511');
  cy.get('.title').contains('CypressTestProject01');
})

When('Go to profile page and verify title', () => {
  cy.visit('profile/2470');
  cy.get('h2').contains('test test');
})

And('Verify event detail page', () => {
  cy.visit('events/141');
  cy.get('.button-close').should('not.exist');
  cy.get('.ePage__title__name').should('not.exist');
  cy.get('h6').should('not.exist');
});

// logout members cannot able to see activity,groups,brain,builders,hub,members
Given('Verify Activity page permission', () => {
  cy.visit('hubs/26/activity');
  cy.url().should('include', 'auth/login');
})

When('Verify brain page permission', () => {
  cy.visit('hubs/26/brain');
  cy.url().should('include', 'auth/login');
})

And('Verify builder permission', () => {
  cy.visit('project/1511/builders');
  cy.url().should('include', 'auth/login');
})

And('Verify hub permission', () => {
  cy.visit('hubs/26');
  cy.url().should('include', 'auth/login');
})

Then('Verify member permission', () => {
  cy.visit('hubs/26/members');
  cy.url().should('include', 'auth/login');
});

// User is event member but not a hub member
Given('Login to the event member account', function () {
  cy.login('testhubadmin+8@rebelbase.co', Cypress.env('password'));
})

When('Create project', () => {
  cy.xpath(eventPageSelectors.allMyEventLink).click();
  cy.get('[data-testid="AddIcon"]').first().click();
  cy.get(smokeTestPageSelector.addProjectButton).click();
  cy.get(smokeTestPageSelector.projectNameTextbox)
    .clear()
    .type(Cypress.config('randomname'));
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get(smokeTestPageSelector.industryDropdown).select('18');
  cy.xpath(smokeTestPageSelector.createButtom).click();
})

And('Send invitation', () => {
  cy.get(smokeTestPageSelector.inviteEmailTextbox)
    .clear()
    .type('testhubadmin@rebelbase.co');
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation sent!')
  cy.xpath(brainPageSelectors.closeModelButton).click();
})

Then('Go to setting page', () => {
  cy.xpath(eventPageSelectors.allMyEventLink).click();
  cy.get('[data-testid=ArrowDropDownIcon]').click() // Click on headr dropdown
  cy.get('[data-testid=SettingsIcon]').click() // Click on setting
  cy.get('.sideBar > ul > :nth-child(3) > span').click(); // Click on project
  cy.get('.sideNav__link--myevents').click(); // click on my event link
});