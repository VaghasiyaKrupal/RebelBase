import { Before, After, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { builderPageData } from '../../pageObject/pageData/builderPageData'
import { builderPageSelectors } from '../../pageObject/pageSelectors/builderPageSelectors'
import { brainPageSelectors } from '../../pageObject/pageSelectors/brainPageSelectors'
import { smokeTestPageSelector } from "../../pageObject/pageSelectors/smokeTestPageSelector";
import { hubGroupPageData } from "../../pageObject/pageData/HubGroupPageData";
import { hubGroupPageSelector } from "../../pageObject/pageSelectors/hubGroupPageSelector";
import { eventPageSelectors } from "../../pageObject/pageSelectors/eventPageSelectors";
import { eventData } from "../../pageObject/pageData/eventData";


const eventname = `testevent${Math.random()}`;

After(() => {
  cy.wait(2000)
})

// Event details can be seen without login to application
Given('Visit rebelbase event page', () => {
  cy.visit('/events/1449')
})

And('Verify event title', () => {
  cy.get(eventPageSelectors.pageTitle).should('have.text', 'cypresstestevent');
})

And('Verify competitor is visible', () => {
  cy.xpath(eventPageSelectors.compititor).should('be.visible');
})

Then('Verify participants', () => {
  cy.xpath(eventPageSelectors.seeAllLink).should('be.visible');
})

// Create event and invite members
Given('Login to rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Visit event page', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create new event', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
  cy.readFile('cypress/fixtures/example.json').then((profile) => {
    profile.eventName = eventname,
      cy.writeFile('cypress/fixtures/exapmle.json', profile)
  })
  cy.get(smokeTestPageSelector.eventNameTextbox)
    .clear()
    .type(eventname);
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

And('Inviting member to the event', () => {
  cy.xpath(eventPageSelectors.inviteButton).click()
  cy.get('select').select('Competitor');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('rebelbasetesthub+1@gmail.com');
  cy.get('.btn-wrap > .btn-main').click();
  cy.get('select').select('Competitor');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('rebelbasetesthub+2@gmail.com');
  cy.get(eventPageSelectors.inviteTopersonalize).click();
  cy.wait(1000)
  cy.get('.invite-to-hub__message > textarea').click();
  cy.get('.btn-wrap > .btn-main').click();
  cy.get('select').select('2');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('rebelbasetesthub+3@gmail.com');
  cy.get('.btn-wrap > .btn-main').click();
  cy.get('select').select('2');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('testhubadmin+4@rebelbase.co');
  cy.get('.btn-wrap > .btn-main').click();
  cy.get('select').select('5');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('rebelbasetesthub+5@gmail.com');
  cy.get('.btn-wrap > .btn-main').click();
  cy.get('select').select('6');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('rebelbasetesthub+6@gmail.com');
  cy.get('.btn-wrap > .btn-main').click();
  cy.get('select').select('3');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('rebelbasetesthub+7@gmail.com');
  cy.get('.btn-wrap > .btn-main').click();
  cy.xpath(brainPageSelectors.closeModelButton).click();
  cy.reload()
})

Then('Update event', () => {
  cy.get('.ePage__wrap > .edit-pen__btn').click({ force: true });
  cy.xpath(smokeTestPageSelector.deleteButtom).click();
  cy.xpath(eventPageSelectors.noButton).click();
  cy.xpath(eventPageSelectors.updateEventButton).click()
  cy.get('.popUp__note').contains('Event Updated.')
});

// Add event description,edit event details, add post,file upload
Given('Login to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click();
})

When('Go to the event page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Add event description', () => {
  cy.get('h3').contains(eventname).click();
  cy.get(eventPageSelectors.editPen).eq(0).click({ force: true });
  cy.get(eventPageSelectors.descriptionField).eq(1).clear().type(eventData.eventDescription)
  cy.xpath(eventPageSelectors.updateEventButton).click();
  cy.get(hubGroupPageSelector.popupNotes).contains('Event Updated.')
})

And('Add sponsor and upload file', () => {
  cy.log('add sponser to event');
  cy.get(eventPageSelectors.sponsorPlusButton).click();
  cy.get(eventPageSelectors.sponserNameTextbox)
    .clear()
    .type('rebelbase.co');
  cy.get(eventPageSelectors.sponsorWebsiteTextbox)
    .clear()
    .type('http://rebelbase.co');
  cy.fixture("rebelbaselogo.png").then((fileContent) => {
    cy.get(eventPageSelectors.fileType).attachFile({
      fileContent,
      fileName: "rebelbaselogo.png",
      encoding: "base64",
      mimeType: "image/png",
    });
  });
  cy.xpath(eventPageSelectors.addSponsorButton).contains('Add Sponsor').click();
})

And('Add post in event', () => {
  cy.log('add post in event')
  cy.get(eventPageSelectors.postTextbox)
    .click()
    .type(eventData.postMessage)
  cy.xpath(eventPageSelectors.postButton).click();
  cy.get(eventPageSelectors.stickyCheckbox).click();
  cy.get('h4').eq(0).click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

Then('Edit event details', () => {
  cy.log('Edit event details')
  cy.contains(eventname).click();
  cy.get(eventPageSelectors.editPen).eq(0).click();
  cy.get(eventPageSelectors.eventTodate)
    .clear()
    .type('Dec 06, 2022')
  cy.get('.createEvent__question--right > .form__input').select('competition');
  cy.xpath(eventPageSelectors.updateEventButton).contains('Update Event').click({ force: true });
  cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.xpath(eventPageSelectors.postButton).click();
  cy.get(eventPageSelectors.postTextbox).click();
  cy.xpath(eventPageSelectors.postButton).click();
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Change project is not allowed during round is in progress
Given('Login to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})
When('Go to the hub event page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Check for round is in progress', () => {
  cy.get('h3').contains('cypresstestevent').click();
  cy.xpath(eventPageSelectors.roundOne).click({ force: true });
  cy.xpath(eventPageSelectors.startRoundButton).should("not.exist")
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Select project should not be exist', () => {
  cy.login(Cypress.env('username1'), Cypress.env('password'));
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
  cy.get('h3').contains('cypresstestevent').click();
  cy.xpath(eventPageSelectors.selectProjectButton).should("not.exist");
});

// Judge can edit in bio from event page
Given('Login to the rebel base portal', function () {
  cy.login('testhubadmin+2@rebelbase.co', 'testtest')
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Go to the event page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Go to event details page', () => {
  cy.get('h3').contains('cypresstestevent').click();
})

Then('Edit bio from event details page', () => {
  cy.xpath(eventPageSelectors.editYourBioButton).click({ force: true });
  cy.get(eventPageSelectors.bioTitle)
    .clear()
    .type('test4juddebio')
  cy.get(eventPageSelectors.bioDescription)
    .clear()
    .type('cypress automation')
  cy.xpath(eventPageSelectors.updateButton).click();
  cy.get(hubGroupPageSelector.popupNotes).contains(eventData.bioUpdateMessage);
});

// Judge accept invitation redirect to welcome page
Given('Login to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Go to the hub event page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Invite judge to the event', () => {
  cy.get('h3').contains(eventname).click();
  cy.xpath(eventPageSelectors.inviteButton).click();
  // cy.xpath(eventPageSelectors.inviteParticipentButton).click();
  cy.get('select').select('4');
  cy.get('.invite').click();
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('rebelbasetesthub@gmail.com');
  cy.get('.btn-wrap > .btn-main').click();
  cy.xpath(brainPageSelectors.closeModelButton).click();
})

And('Login to the invited user account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
  cy.login(Cypress.env('emailuser'), Cypress.env('password'));
})

Then('Accept invitation and redirect to the welcome page', () => {
  cy.wait(2000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.url().should('include', '/welcome-judge');
  cy.get(eventPageSelectors.bioTitle)
    .clear()
    .type('rebeljudge');
  cy.get(eventPageSelectors.bioDescription).click();
  cy.xpath(eventPageSelectors.submitButton).click();
});

// Compititor accept invitation redirect to select project
Given('Login rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Go to the event page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Invite comititor to the event', () => {
  cy.get('h3').contains(eventname).click();
  cy.xpath(eventPageSelectors.inviteButton).click({ force: true });
  // cy.xpath(eventPageSelectors.inviteParticipentButton).click();
  cy.get('select').select('Competitor');
  cy.get('.invite').click();
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(eventData.compititorEmail);
  cy.get('.btn-wrap > .btn-main').click();
  cy.xpath(brainPageSelectors.closeModelButton).click();
})

And('Login to the user account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
  cy.login(eventData.compititorEmail, Cypress.env('password'));
})

Then('Accept invitation and redirect to the select project page', () => {
  cy.wait(2000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.url().should('include', '/select-project');
  cy.xpath(brainPageSelectors.closeModelButton).click()
});

// Support accept invitation redirect to welcome resource
Given('Login to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Go to event page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Invite support to the event', () => {
  cy.get('h3').contains(eventname).click();
  cy.xpath(eventPageSelectors.inviteButton).click({ force: true });
  // cy.xpath(eventPageSelectors.inviteParticipentButton).click();
  cy.get('select').select('Support');
  cy.get('.invite').click();
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(eventData.supportEmail);
  cy.get('.btn-wrap > .btn-main').click();
  cy.xpath(brainPageSelectors.closeModelButton).click();
})

And('Login to the invited user account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
  cy.login(eventData.supportEmail, Cypress.env('password'));
  cy.wait(2000)
})

Then('Accept invitation and redirect to the welcome resource', () => {
  cy.wait(2000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.url().should('include', '/select-project');
  cy.xpath(brainPageSelectors.closeModelButton).click()
});

// Delete Event
Given('Login to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Go to the event page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Invite support to event', () => {
  cy.get('h3').contains(eventname).click();
  cy.get('.ePage__wrap > .edit-pen__btn > .edit-pen').click({ force: true });
})

Then('Delete Event', () => {
  cy.get('.btn-alarm').click();
  cy.get('.react-confirm-alert-button-group > :nth-child(1)').click();
  cy.url().should('include', '/events');
});

// Create event and send invitation
Given('Login to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Go to the hub event page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create Event', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).click();
  cy.get(smokeTestPageSelector.eventNameTextbox)
    .clear()
    .type('cypressscoreevent');
  cy.get('[title="Select date"]').eq(0).click(); // Click on datepicker icon
  cy.get('#rw_1_calendar_active_cell').eq(0).click(); // select current date
  cy.get('[title="Select time"]').eq(0).click(); // Click on clock icon
  cy.get('.rw-popup ul li').last().click(); // Click on time
  cy.get('[title="Select date"]').eq(1).click(); // Click on datepicker icon
  cy.get('#rw_3_calendar_active_cell').click(); // select current date
  cy.get('[title="Select time"]').eq(1).click(); // Click on clock icon
  cy.get('.rw-popup ul li').last().click(); // Click on time
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pu');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pu');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get(eventPageSelectors.selectType)
    .first()
    .select('selection');
  cy.get(':nth-child(2) > .createEvent__round-choice').click(); // Click on yes
  cy.get(':nth-child(3) > .createEvent__round-choice').click(); // click on 3
  cy.get(eventPageSelectors.descriptionField).eq(1).click();
  cy.xpath(builderPageSelectors.nextButton).click();
})

And('Invite users to the event', () => {
  cy.xpath(eventPageSelectors.inviteButton).contains('invite').click();
  cy.get('select').select('4');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('testhubadmin+1@rebelbase.co{enter}')
    .type('testhubadmin+2@rebelbase.co{enter}')
    .type('testhubadmin+3@rebelbase.co{enter}')
  cy.get('.btn-wrap > .btn-main').click();
  cy.get(brainPageSelectors.feedbackNotification)
    .should('contains.text', 'Succesfully sent invites to')
    .click();
  cy.get('select').select('2');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('testhubadmin+4@rebelbase.co{enter}')
    .type('testhubadmin+5@rebelbase.co{enter}')
    .type('testhubadmin+6@rebelbase.co{enter}')
  cy.get('.btn-wrap > .btn-main').click();
  cy.xpath(brainPageSelectors.closeModelButton).click();
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Judge 1 accept event invitation
Given('Login to the Judge 1 account', function () {
  cy.login(Cypress.env('username1'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Accept invitation', () => {
  cy.wait(2000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).contains('Invitation accepted successfully.')
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true })
});

And('Edit bio', () => {
  cy.get('.ReactModal__Content > a').click({ force: true });
  cy.xpath(eventPageSelectors.editYourBioButton).click({ force: true });
  cy.get(eventPageSelectors.bioTitle)
    .clear()
    .type('test1judge');
  cy.xpath(eventPageSelectors.updateButton).click();
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Judge 2 accept event invitation
Given('Login to the Judge 2 account', function () {
  cy.login(Cypress.env('member'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Accept invitation from judge 2', () => {
  cy.wait(2000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).contains('Invitation accepted successfully.')
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true })
});

And('Judge 2 edit bio', () => {
  cy.get('.ReactModal__Content > a').click({ force: true });
  cy.xpath(eventPageSelectors.editYourBioButton).click();
  cy.get(eventPageSelectors.bioTitle)
    .clear()
    .type('test2judge');
  cy.xpath(eventPageSelectors.updateButton).click();
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

Then('Logout to the Judge 2 account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Judge 3 accept event invitation
Given('Login to the Judge 3 account', function () {
  cy.login(Cypress.env('username2'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Accept invitation', () => {
  cy.wait(2000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).contains('Invitation accepted successfully.')
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true })
});

And('Edit bio', () => {
  cy.get('.ReactModal__Content > a').click({ force: true });
  cy.xpath(eventPageSelectors.editYourBioButton).click();
  cy.get(eventPageSelectors.bioTitle)
    .clear()
    .type('test3judge');
  cy.xpath(eventPageSelectors.updateButton).click();
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Compititor 1 accept event invitation
Given('Login to the compititot 1 account', function () {
  cy.login(Cypress.env('otherUser'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
  cy.wait(2000)
})

When('Accept invitation', () => {
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).contains('Invitation accepted successfully.')
});

And('Select project', () => {
  // cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.get('.projCommit > h4').should('have.text', 'Select Project to compete in');
  cy.get('.projCommit > ul > :nth-child(1)').click();
  cy.xpath(eventPageSelectors.submitMyProjectButton).click();
  cy.wait(1000)
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Change project for event and verify
Given('Login to the compititot account', function () {
  cy.login(Cypress.env('otherUser'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Go to my event page', () => {
  cy.xpath(eventPageSelectors.allMyEventLink).click();
  cy.get('h3').contains('cypressscoreevent').click();
  cy.get('.ePage__title__name').contains('cypressscoreevent')
})

And('Change project', () => {
  cy.xpath(eventPageSelectors.changeProjectButton).click();
  cy.get('.projCommit > h4').should('have.text', 'SELECT PROJECT FOR');
  cy.get('.projCommit > ul > :nth-child(1)').click();
  cy.xpath(eventPageSelectors.submitMyProjectButton).click();
  cy.xpath(brainPageSelectors.notificationDismiss).click({ force: true })
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Compititor 2 accept event invitation
Given('Login to the compititot 2 account', function () {
  cy.login(Cypress.env('supporter'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
  cy.wait(2000)
})

When('Accept invitation', () => {
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).contains('Invitation accepted successfully.')
  cy.wait(1000)
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true })
});

And('Select project', () => {
  cy.get('.projCommit > h4').should('have.text', 'Select Project to compete in');
  cy.get('.projCommit > ul > :nth-child(1)').click();
  cy.xpath(eventPageSelectors.submitMyProjectButton).click();
  cy.wait(1000)
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Compititor 3 accept event invitation
Given('Login to the compititot 3 account', function () {
  cy.login(Cypress.env('eventMember'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
  cy.wait(2000)
})

When('Accept invitation from compititor 3', () => {
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).contains('Invitation accepted successfully.')
  cy.wait(1000)
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true })
});

And('Select projects', () => {
  cy.get('.projCommit > h4').should('have.text', 'Select Project to compete in');
  cy.get('.projCommit > ul > :nth-child(1)').click();
  cy.xpath(eventPageSelectors.submitMyProjectButton).click();
  cy.wait(1000)
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Admin start event round
Given('Login to the Rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
  cy.wait(2000)
})

When('Go to event details', () => {
  cy.xpath(eventPageSelectors.allMyEventLink).click();
  cy.wait(1000)
  cy.get('h3').contains('cypressscoreevent').click();
  cy.xpath(eventPageSelectors.roundOne).click();
  cy.get(eventPageSelectors.pageTitle).click();
  cy.get(eventPageSelectors.pageTitle).last().should('have.text', 'cypressscoreevent');
  cy.xpath(eventPageSelectors.roundOne).click();
})

And('Start round for the event', () => {
  cy.xpath(eventPageSelectors.startRoundButton).click();
  cy.get(eventPageSelectors.roundModelPopupHeading).click();
  cy.get(eventPageSelectors.roundModelPopupHeading).should('have.text', 'Projects being scored in Round 1');
  cy.get(':nth-child(2) > .choice-project').click();
  cy.get(':nth-child(3) > .choice-project').click();
  cy.get(':nth-child(1) > .choice-judge').click();
  cy.get(':nth-child(2) > .choice-judge').click();
  cy.get(':nth-child(3) > .choice-judge').click();
  cy.xpath(eventPageSelectors.openRoundButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Round Opened.');
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Judge 1 score project
Given('Login to the judge 1 account', function () {
  cy.visit("/");
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type('testhubadmin+1@rebelbase.co');
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.loginButton).click();
})

When('Go to the hub event page', () => {
  cy.xpath(eventPageSelectors.allMyEventLink).click();
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

And('Score one project', () => {
  cy.get('h3').contains('cypressscoreevent').click();
  cy.get('.btn-wrap > .btn-main').click();
  cy.get('.side > :nth-child(3)').click();
  cy.get('[for="q1-1"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q2-2"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q3-3"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q4-4"]> span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q5-5"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q6-4"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q3-3"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q7-5"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q8-4"]> span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q9-3"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q10-2"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q11-1"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  // cy.get('form > :nth-child(16)')
  //   .click()
  //   .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q12-5"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get(eventPageSelectors.doneButton).click();
})

And('Score second project', () => {
  cy.get('.side > :nth-child(4)').click({ force: true });
  cy.get('[for="q1-2"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q2-3"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q3-4"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q4-5"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q5-5"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q6-4"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q7-4"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q8-5"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q9-4"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q10-4"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q11-3"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q12-4"] > span')
    .click()
    .should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.xpath(eventPageSelectors.doneButton).click();
  cy.xpath(eventPageSelectors.saveAndLeaveButton).click()
  cy.get(eventPageSelectors.backLink).click({ force: true });
})

Then('Logout to the judge 1 account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Judge 2 score event
Given('Login to the judge 2 account', function () {
  cy.visit("/");
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type('testhubadmin+2@rebelbase.co');
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.loginButton).click();
})

When('Go to the event page', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.xpath(eventPageSelectors.allMyEventLink).click();
})

And('Score first event', () => {
  cy.get('h3').contains('cypressscoreevent').click();
  cy.get('.btn-wrap > .btn-main').click();
  cy.get('.side > :nth-child(3)').click();
  cy.wait(1000)
  cy.get('body').then((body) => {
    if (body.find('.rubric-results__editing button').length > 0) {
      cy.xpath(eventPageSelectors.editYourEvaluationButton).click();
    }
  })
  cy.get('[for="q1-1"]').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q2-2"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q3-3"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q4-4"]> span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q5-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q6-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q3-3"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q7-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q8-4"]> span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q9-3"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q10-2"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q11-1"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  // cy.get('form > :nth-child(16)').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q12-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.xpath(eventPageSelectors.doneButton).click()
  cy.wait(1000)
  cy.get('body').then((body) => {
    if (body.find('.react-confirm-alert div div button:nth-child(2)').length > 0) {
      cy.xpath(eventPageSelectors.saveAndLeaveButton).click()
    }
  })
})

And('scoring second event', () => {
  cy.get('.side > :nth-child(4)').click({ force: true });
  cy.get('[for="q1-2"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q2-3"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q3-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q4-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q5-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q6-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q7-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q8-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q9-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q10-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q11-3"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q12-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.xpath(eventPageSelectors.doneButton).click();
  cy.wait(1000)
  cy.get('body').then((body) => {
    if (body.find('.react-confirm-alert div div button:nth-child(2)').length > 0) {
      cy.xpath(eventPageSelectors.saveAndLeaveButton).click()
    }
  })
  cy.get(eventPageSelectors.backLink).click();
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Judge 3 score event
Given('Login to the judge 3 account', function () {
  cy.visit("/");
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type('testhubadmin+3@rebelbase.co');
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.loginButton).click();
})

When('Go to event page details', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.xpath(eventPageSelectors.allMyEventLink).click();
})

And('Scored first event', () => {
  cy.get('h3').contains('cypressscoreevent').click();
  cy.get('.btn-wrap > .btn-main').click();
  cy.get('.side > :nth-child(3)').click();
  cy.wait(1000)
  cy.get('body').then((body) => {
    if (body.find('.rubric-results__editing button').length > 0) {
      cy.xpath(eventPageSelectors.editYourEvaluationButton).click();
    }
  })
  cy.get('[for="q1-1"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q2-2"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q3-3"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q4-4"]> span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q5-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q6-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q3-3"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q7-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q8-4"]> span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q9-3"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q10-2"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q11-1"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q12-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.xpath(eventPageSelectors.doneButton).click()
  cy.wait(1000)
  cy.get('body').then((body) => {
    if (body.find('.react-confirm-alert div div button:nth-child(2)').length > 0) {
      cy.xpath(eventPageSelectors.saveAndLeaveButton).click()
    }
  })
})

And('score second event', () => {
  cy.get('.side > :nth-child(4)').click({ force: true });
  cy.get('[for="q1-2"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q2-3"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q3-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q4-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q5-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q6-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q7-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q8-5"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q9-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q10-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q11-3"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.get('[for="q12-4"] > span').click().should('have.css', 'border-left', '0px none rgb(255, 255, 255)')
  cy.xpath(eventPageSelectors.doneButton).click();
  cy.wait(1000)
  cy.get('body').then((body) => {
    if (body.find('.react-confirm-alert div div button:nth-child(2)').length > 0) {
      cy.xpath(eventPageSelectors.saveAndLeaveButton).click()
    }
  })
  cy.get(eventPageSelectors.backLink).click();
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Judge close event round and publish score and winner
Given('Login to the rebel base', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.xpath(brainPageSelectors.notificationDismiss).click();
})

When('Go to the hub page event', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Close round', () => {
  cy.get('h3').contains('cypressscoreevent').click();
  cy.get('.ePage__title__name').should('have.text', 'cypressscoreevent');
  cy.xpath(eventPageSelectors.roundOne).click({ force: true });
  cy.xpath(eventPageSelectors.closeThisRound).click();
  cy.xpath(eventPageSelectors.reOpenRoundButton).should('be.visible');
  cy.xpath(eventPageSelectors.publishScoreButton).should('have.text', 'publish scores');
  cy.xpath(eventPageSelectors.publishScoreButton).contains('publish scores').click();
})

And('Award winner', () => {
  cy.xpath(eventPageSelectors.awardTab).click();
  cy.xpath(eventPageSelectors.selectAwardButton).click();
  cy.get('div.form__input > .form__input').select('1');
  cy.get('div.form__input > div > .form__input').select('1511');
  cy.xpath(eventPageSelectors.submitButton).click();
  cy.xpath(eventPageSelectors.yesSubmitButton).click();
  cy.get(eventPageSelectors.editPen).eq(0).click();
  cy.xpath(smokeTestPageSelector.deleteButtom).click();
  cy.xpath(eventPageSelectors.yesButton).click();
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Event Update Notification
Given('Event Detail update and Event Description update', function () {
  cy.log('Event Detail update and Event Description update')
})

When('Details for Event Name have been updated', () => {
  cy.log('“Details for {Event Name} have been updated')
})

And('The location for Event Name has been updated', () => {
  cy.log('The location for {Event Name} has been updated')
})

And('The date and location for Event Name have been updated', () => {
  cy.log('The date and location for {Event Name} have been updated')
})

And('The details and date for Event Name have been updated', () => {
  cy.log('The details and date for {Event Name} have been updated')
})

Then('The details, location, and event type for Event Name have been updated', () => {
  cy.log('The details, location, and event type for {Event Name} have been updated')
});