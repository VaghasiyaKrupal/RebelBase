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


const endStr = "&"
const startStr = "token="

function extractData(data, startStr, endStr) {
  var subStrStart = data.indexOf(startStr) + startStr.length
  return data.substring(subStrStart,
    subStrStart + data.substring(subStrStart).indexOf(endStr));

}

const eventname = `testevent${Math.random()}`;
const eventname1 = `testevent1${Math.random()}`;

const randomMail = `rebelbasetesthub.${new Date().getTime()}@gmail.com`;

After(() => {
  cy.wait(2000)
})

//Create Assesment type event
Given('Navigate rebelbase and login', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Visit event page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create Assesment type event', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
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
  cy.get('.createEvent__field__type')
    .select('assessment')
    .should('have.value', 'assessment');
  cy.get('.createEvent').click();
  cy.get(':nth-child(2) > .createEvent__round-choice').click();
  cy.get(':nth-child(3) > .createEvent__round-choice').click();
  cy.get('.createEvent > .btn-wrap > .btn-main').click();
})

Then('Verify Assesment event title', () => {
  cy.get('.ePage__title__name').should('have.text', eventname)
})

// Create meet-up type event
Given('Navigate rebelbase and login', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Visit event page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create meet-up type event', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
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
  cy.get('.createEvent__field__type')
    .select('meetup')
    .should('have.value', 'meetup');
  cy.get('.createEvent').click();
  cy.get(':nth-child(2) > .createEvent__round-choice').click();
  cy.get(':nth-child(3) > .createEvent__round-choice').click();
  cy.get('.createEvent > .btn-wrap > .btn-main').click();
})

Then('Verify meet-up event title', () => {
  cy.get('.ePage__title__name').should('have.text', eventname)
})

// Create compitition type event
Given('Navigate rebelbase and login', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Visit event page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create compitition type event', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
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
  cy.get('.createEvent__field__type')
    .select('competition')
    .should('have.value', 'competition')
  cy.get('.createEvent').click();
  cy.get(':nth-child(2) > .createEvent__round-choice').click();
  cy.get(':nth-child(3) > .createEvent__round-choice').click();
  cy.get('.createEvent > .btn-wrap > .btn-main').click();
})

Then('Verify compitition event title', () => {
  cy.get('.ePage__title__name').should('have.text', eventname)
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
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create new event', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
  cy.readFile('cypress/fixtures/exapmle.json').then((profile) => {
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
  cy.get('.createEvent__field__type')
    .select('competition')
    .should('have.value', 'competition')
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
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
  cy.get('.ePage__wrap > .edit-pen__btn').click({ force: true });
  cy.xpath(smokeTestPageSelector.deleteButtom).click();
  cy.xpath(eventPageSelectors.noButton).click();
  cy.xpath(eventPageSelectors.updateEventButton).click()
  cy.get(hubGroupPageSelector.popupNotes).should('have.text','Event Updated.')
});

// Add event description, Edit event details, Add post, File upload
Given('Login to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
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
  cy.get(hubGroupPageSelector.popupNotes).should('have.text','Event Updated.')
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
  cy.get(hubGroupPageSelector.popupNotes).should('have.text',' Sponsor added successfully. ')
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
  cy.get('h3').contains(eventname).click();
  cy.get(eventPageSelectors.editPen).eq(0).click();
  cy.get(eventPageSelectors.eventTodate)
    .clear()
    .type('Dec 06, 2022')
  cy.get('.createEvent__question--right > .form__input').select('competition');
  cy.xpath(eventPageSelectors.updateEventButton).contains('Update Event').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text','Event Updated.')
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
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
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
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
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
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
  cy.wait(4000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
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
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
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
  cy.wait(4000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.url().should('include', '/select-project');
  cy.xpath(brainPageSelectors.closeModelButton).click()
});

// Support accept invitation redirect to welcome resource
Given('Login to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
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
  cy.wait(5000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.url().should('include', '/select-project');
  cy.xpath(brainPageSelectors.closeModelButton).click()
});

// Delete Event
Given('Login to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
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
  cy.get('.notification-dismiss').click({ multiple: true });
})

When('Go to the hub event page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create Event', () => {
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const day = new Date();
  let name = month[day.getMonth()];

  cy.xpath(smokeTestPageSelector.newEventButton).click();
  cy.get(smokeTestPageSelector.eventNameTextbox)
    .clear()
    .type(eventname1);
  cy.get('[title="Select date"]').eq(0).click(); // Click on datepicker icon
  cy.get('#rw_1_calendar_active_cell').click()
  cy.get('[title="Select time"]').eq(0).click(); // Click on clock icon
  cy.get('.rw-popup ul li').last().click(); // Click on time
  cy.get('[title="Select date"]').eq(1).click(); // Click on datepicker icon
  cy.get('table>tbody>tr:nth-child(5)>td').last().click(); // select current date
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
    .select('selection')
    .should('have.value', 'selection')
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
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Accept invitation', () => {
  cy.wait(2000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text','Invitation accepted successfully.')
  // cy.wait(2000)
  // cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
});

And('Edit bio', () => {
  cy.get('.ReactModal__Content > a').click({ force: true });
  cy.xpath(eventPageSelectors.editYourBioButton).click({ force: true });
  cy.get(eventPageSelectors.bioTitle)
    .clear()
    .type('test1judge');
  cy.xpath(eventPageSelectors.updateButton).click();
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Judge 2 accept event invitation
Given('Login to the Judge 2 account', function () {
  cy.login(Cypress.env('member'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Accept invitation from judge 2', () => {
  cy.wait(2000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).contains('Invitation accepted successfully.')
  cy.wait(1000)
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
});

And('Judge 2 edit bio', () => {
  cy.get('.ReactModal__Content > a').click({ force: true });
  cy.xpath(eventPageSelectors.editYourBioButton).click();
  cy.get(eventPageSelectors.bioTitle)
    .clear()
    .type('test2judge');
  cy.xpath(eventPageSelectors.updateButton).click();
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
})

Then('Logout to the Judge 2 account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Judge 3 accept event invitation
Given('Login to the Judge 3 account', function () {
  cy.login(Cypress.env('username2'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Accept invitation', () => {
  cy.wait(2000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).contains('Invitation accepted successfully.')
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
});

And('Edit bio', () => {
  cy.get('.ReactModal__Content > a').click({ force: true });
  cy.xpath(eventPageSelectors.editYourBioButton).click();
  cy.get(eventPageSelectors.bioTitle)
    .clear()
    .type('test3judge');
  cy.xpath(eventPageSelectors.updateButton).click();
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Compititor 1 accept event invitation
Given('Login to the compititot 1 account', function () {
  cy.login(Cypress.env('otherUser'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
  cy.wait(2000)
})

When('Accept invitation', () => {
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).contains('Invitation accepted successfully.')
});

And('Select project', () => {
  // cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get('.projCommit > h4').should('have.text', 'Select Project to compete in');
  cy.get('.projCommit > ul > :nth-child(1)').click();
  // cy.get('.projCommit > ul > :nth-child(2)').click();
  cy.xpath(eventPageSelectors.submitMyProjectButton).click();
  cy.wait(1000)
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Change project for event and verify
Given('Login to the compititor account', function () {
  cy.login(Cypress.env('otherUser'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

When('Go to my event page', () => {
  cy.xpath(eventPageSelectors.allMyEventLink).click();
  cy.get('h3').contains(eventname1).click();
  cy.get('.ePage__title__name').contains(eventname1)
})

And('Change project', () => {
  cy.xpath(eventPageSelectors.changeProjectButton).click();
  cy.get('.projCommit > h4').should('have.text', 'SELECT PROJECT FOR');
  cy.get('.projCommit > ul > :nth-child(1)').click();
  cy.xpath(eventPageSelectors.submitMyProjectButton).click();
  cy.get(brainPageSelectors.notificationDismiss).click({ force: true })
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Compititor 2 accept event invitation
Given('Login to the compititot 2 account', function () {
  cy.login(Cypress.env('supporter'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
  cy.wait(2000)
})

When('Accept invitation', () => {
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).contains('Invitation accepted successfully.')
  cy.wait(1000)
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
});

And('Select project', () => {
  cy.get('.projCommit > h4').should('have.text', 'Select Project to compete in');
  cy.get('.projCommit > ul > :nth-child(1)').click();
  cy.xpath(eventPageSelectors.submitMyProjectButton).click();
  cy.wait(1000)
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Compititor 3 accept event invitation
Given('Login to the compititot 3 account', function () {
  cy.login(Cypress.env('eventMember'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
  cy.wait(2000)
})

When('Accept invitation from compititor 3', () => {
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).contains('Invitation accepted successfully.')
  cy.wait(1000)
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
});

And('Select projects', () => {
  cy.get('.projCommit > h4').should('have.text', 'Select Project to compete in');
  cy.get('.projCommit > ul > :nth-child(1)').click();
  cy.xpath(eventPageSelectors.submitMyProjectButton).click();
  cy.wait(1000)
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
})

Then('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Admin start event round
Given('Login to the Rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
  cy.wait(2000)
})

When('Go to event details', () => {
  cy.xpath(eventPageSelectors.allMyEventLink).click();
  cy.wait(1000)
  cy.get('h3').contains(eventname1).click();
  cy.xpath(eventPageSelectors.roundOne).click();
  cy.get(eventPageSelectors.pageTitle).click();
  cy.get(eventPageSelectors.pageTitle).last().should('have.text', eventname1);
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
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
})

And('Score one project', () => {
  cy.get('h3').contains(eventname1).click();
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
  cy.xpath(eventPageSelectors.doneButton).click();
  cy.wait(1000)
  cy.get('body').then((body) => {
    if (body.find('.react-confirm-alert div div button:nth-child(2)').length > 0) {
      cy.xpath(eventPageSelectors.saveAndLeaveButton).click()
    }
  })
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
  cy.wait(1000)
  cy.get('body').then((body) => {
    if (body.find('.react-confirm-alert div div button:nth-child(2)').length > 0) {
      cy.xpath(eventPageSelectors.saveAndLeaveButton).click()
    }
  })
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
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.xpath(eventPageSelectors.allMyEventLink).click();
})

And('Score first event', () => {
  cy.get('h3').contains(eventname1).click();
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
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.xpath(eventPageSelectors.allMyEventLink).click();
})

And('Scored first event', () => {
  cy.get('h3').contains(eventname1).click();
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

// Admin close event round and publish score and winner
Given('Login to the rebel base', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
})

When('Go to the hub page event', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Close round', () => {
  cy.get('h3').contains(eventname1).click();
  cy.get('.ePage__title__name').should('have.text', eventname1);
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

// accept event invitation from web application
Given('Navigate rebel base and login', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Visit event page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create event for web application', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
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
  cy.get('.createEvent__field__type')
    .select('selection')
    .should('have.value', 'selection');
  cy.get('.createEvent').click();
  cy.get(':nth-child(2) > .createEvent__round-choice').click();
  cy.get(':nth-child(3) > .createEvent__round-choice').click();
  cy.get('.createEvent > .btn-wrap > .btn-main').click();
})

And('Verify event title and invite member', () => {
  cy.get('.ePage__title__name').should('have.text', eventname)
  cy.xpath(eventPageSelectors.inviteButton).click()
  cy.get('select').select('General');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('rebelbasetesthub@gmail.com');
  cy.get('.btn-wrap > .btn-main').click();
  cy.xpath(brainPageSelectors.closeModelButton).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Accept event invitation from web application', function () {
  cy.login(Cypress.env('emailuser'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.wait(5000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation accepted successfully.')
})

// Check thread notification for the event
Given('Navigate rebel base and login', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Visit event page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create event for web application', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
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
  cy.get('.createEvent__field__type')
    .select('selection')
    .should('have.value', 'selection');
  cy.get('.createEvent').click();
  cy.get(':nth-child(2) > .createEvent__round-choice').click();
  cy.get(':nth-child(3) > .createEvent__round-choice').click();
  cy.get('.createEvent > .btn-wrap > .btn-main').click();
})

And('Invite all member to the event', () => {
  cy.get('.ePage__title__name').should('have.text', eventname)
  cy.xpath(eventPageSelectors.inviteButton).click()
  cy.get('select').select('General');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(Cypress.env('username1'))
    .type('{enter}')
    .type(Cypress.env('member'))
    .type('{enter}')
    .type(Cypress.env('username2'))
    .type('{enter}')
    .type(Cypress.env('otherUser'))
    .type('{enter}')
    .type(Cypress.env('supporter'))
    .type('{enter}')
    .type(Cypress.env('eventMember'))
    .type('{enter}')
  cy.get('.btn-wrap > .btn-main').click();
  cy.xpath(brainPageSelectors.closeModelButton).click()
  cy.get('.post-form__area').type('Host message')
  cy.get('div>button').contains('post').click()
  cy.wait(500)
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

And('Accept event invitation from from username1', function () {
  cy.login(Cypress.env('username1'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.wait(5000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation accepted successfully.')
  cy.get('.ePage__title__name').should('have.text', eventname)
  cy.get('.btm-actions__reply-btn').click()
  cy.get('[placeholder="reply.."]').type('Test thread reply 1')
  cy.get('div>button').contains('reply').click()
  cy.wait(500)
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

And('Accept event invitation from from username2', function () {
  cy.login(Cypress.env('username2'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.wait(5000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation accepted successfully.')
  cy.get('.ePage__title__name').should('have.text', eventname)
  cy.get('.btm-actions__reply-btn').click()
  cy.get('[placeholder="reply.."]').type('Test thread reply 2')
  cy.get('div>button').contains('reply').click()
  cy.wait(500)
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

And('Accept event invitation from from otherUser', function () {
  cy.login(Cypress.env('otherUser'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.wait(5000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation accepted successfully.')
  cy.get('.ePage__title__name').should('have.text', eventname)
  cy.get('.btm-actions__reply-btn').click()
  cy.get('[placeholder="reply.."]').type('Test thread reply 3')
  cy.get('div>button').contains('reply').click()
  cy.wait(500)
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

And('Check notification for the event thread', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).contains('test4 test and test3 test replied to your post on the ' + eventname + ' event')
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(1).contains('test1 test replied to a post you commented on the ' + eventname + ' event')
  cy.reload()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

And('Login to the event member account', () => {
  cy.login(Cypress.env('eventMember'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.wait(5000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation accepted successfully.')
  cy.get('.ePage__title__name').should('have.text', eventname)
  cy.get('.btm-actions__reply-btn').click()
  cy.get('[placeholder="reply.."]').type('Test thread reply 6')
  cy.get('div>button').contains('reply').click()
  cy.wait(500)
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Check notification for evenr member when post is created', () => {
  cy.login(Cypress.env('username1'), Cypress.env('password'))
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).contains('test6 test6, test4 test and test3 test replied to a post you commented on the ' + eventname + ' event')
})

// Check notificatin for delete event
Given('Navigate rebel base and login', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Visit event page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create event for web application', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
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
  cy.get('.createEvent__field__type')
    .select('selection')
    .should('have.value', 'selection');
  cy.get('.createEvent').click();
  cy.get(':nth-child(2) > .createEvent__round-choice').click();
  cy.get(':nth-child(3) > .createEvent__round-choice').click();
  cy.get('.createEvent > .btn-wrap > .btn-main').click();
})

And('Invite member to the event', () => {
  cy.get('.ePage__title__name').should('have.text', eventname)
  cy.xpath(eventPageSelectors.inviteButton).click()
  cy.get('select').select('General');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(Cypress.env('username1'))
    .type('{enter}')
  cy.get('.btn-wrap > .btn-main').click();
  cy.xpath(brainPageSelectors.closeModelButton).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

And('Accept invitation from from username1', function () {
  cy.login(Cypress.env('username1'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.wait(5000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation accepted successfully.')
  cy.get('.ePage__title__name').should('have.text', eventname)
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

And('Delete event', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
  cy.get('h3').contains(eventname).click()
  cy.get(eventPageSelectors.editPen).eq(0).click()
  cy.get('.btn-alarm').click()
  cy.get('.react-confirm-alert-body').contains('Are you sure to do this?')
  cy.get('.react-confirm-alert-body').find('button').contains('Yes').click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Verify event deletion notification for the member', () => {
  cy.login(Cypress.env('username1'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.wait(3000)
  cy.get(hubActivityPageSelector.bellIcon).click();
  cy.wait(1000)
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).contains(eventname + " has been deleted in the Dev Hub hub")
})

// Chech notification when the user update event details
Given('Navigate rebel base and login', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Visit event page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create event for web application', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
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
  cy.get('.createEvent__field__type')
    .select('selection')
    .should('have.value', 'selection');
  cy.get('.createEvent').click();
  cy.get(':nth-child(2) > .createEvent__round-choice').click();
  cy.get(':nth-child(3) > .createEvent__round-choice').click();
  cy.get('.createEvent > .btn-wrap > .btn-main').click();
})

And('Invite member to the event', () => {
  cy.get('.ePage__title__name').should('have.text', eventname)
  cy.xpath(eventPageSelectors.inviteButton).click()
  cy.get('select').select('General');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(Cypress.env('username1'))
    .type('{enter}')
  cy.get('.btn-wrap > .btn-main').click();
  cy.xpath(brainPageSelectors.closeModelButton).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

And('Accept invitation from invited user account', function () {
  cy.login(Cypress.env('username1'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.wait(5000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(2000)
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation accepted successfully.')
  cy.get('.ePage__title__name').should('have.text', eventname)
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

And('Update event details', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
  cy.get('h3').contains(eventname).click()
  cy.get(eventPageSelectors.editPen).eq(0).click({force:true})
  cy.get(smokeTestPageSelector.fromDate)
    .clear()
    .type('Dec 17, 2021');
  cy.get(smokeTestPageSelector.toDate)
    .clear()
    .type('Dec 05, 2022')
  cy.get('#-google-places-autocomplete-input').clear().type('rajkot')
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get('.createEvent__question--right > .form__input')
    .select('competition')
    .should('have.value', 'competition');
  cy.get(eventPageSelectors.descriptionField).eq(1).clear().type(eventData.eventDescription)
  cy.get('.createEvent > .btn-wrap > .btn-main').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Event Updated.')
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Verify event updation notification for the member', () => {
  cy.login(Cypress.env('username1'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.wait(3000)
  cy.get(hubActivityPageSelector.bellIcon).click();
  cy.wait(1000)
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).contains("The location, start date, end date, event type and description for " + eventname + " have been updated")
})

// Update event and check updated details
Given('login to the app', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Visit event page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create event with full details', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
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
  cy.get('.createEvent__field__type')
    .select('selection')
    .should('have.value', 'selection');
  cy.get('.createEvent').click();
  cy.get(':nth-child(2) > .createEvent__round-choice').click();
  cy.get(':nth-child(3) > .createEvent__round-choice').click();
  cy.get('.createEvent > .btn-wrap > .btn-main').click();
})

And('Update Event details',()=>{
  cy.wait(2000)
  cy.get(eventPageSelectors.editPen).eq(0).should('be.visible').click({force:true})
  cy.get('.createEvent__question--right > .form__input')
    .select('competition')
    .should('have.value', 'competition');
  cy.get(eventPageSelectors.descriptionField).eq(1).type('Test description')
  cy.get('button').contains('Update Event').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text','Event Updated.')
})

And('Check event details',()=>{
  cy.get(eventPageSelectors.editPen).eq(0).click()
  cy.get('.createEvent__question--right > .form__input')
    .should('have.value', 'competition');
  cy.get('.createEvent__question>textarea').should('have.text','Test description')
})

Then('Delete created event',()=>{
  cy.get('.btn-alarm').click();
  cy.get('.react-confirm-alert-button-group > :nth-child(1)').click();
  cy.url().should('include', '/events');
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

// Signup new user and go to all event page
Given('User is on signup page', () => {
  cy.visit('/');
})

When('clicked on signup button and add details', () => {
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

And('New User is able to sign up successfully', () => {
  cy.url().should('include', '/dashboard');
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
      .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.get('.btn-skip').click({ force: true });
})

And('Visit all event page',()=>{
  cy.xpath(eventPageSelectors.allMyEventLink).click()
  cy.get('.eList__empty').find('p').should('have.text','There are no events yet. create a new event.')
})

And('Check alternative email pop-up',()=>{
  cy.get(smokeTestPageSelector.headerDropdown).click()
  cy.get(smokeTestPageSelector.settingLink).click()
  cy.get('button').contains('add email').click()
  cy.get(permissionsPageSelector.emailTextbox).type(randomMail);
  cy.xpath(permissionsPageSelector.addButton).click()
  cy.get(hubGroupPageSelector.popupNotes).should('have.text','Alternative email added. Please check your email to verify.')
  cy.get(smokeTestPageSelector.headerDropdown).click()
  cy.get(smokeTestPageSelector.logoutButton).click()
})

Then('Verify Email from received email', () => {
  cy.task("gmail:get-messages", {
    options: {
      from: "noreply@rebelbase.co",
      subject: "Verify your email for your RebelBase account",
      include_body: true,
      // before: new Date(2021, 9, 24, 12, 31, 13), // Before September 24rd, 2019 12:31:13
      //  after: new Date(2021, 7, 23) // After August 23, 2019
    }
  }).then(emails => {
    assert.isAtLeast(
      emails.length,
      1,
      "Expected to find at least one email, but none were found!"
    );

    const body = emails[0].body.html;
    assert.isTrue(
      body.indexOf(

        "token="

      ) >= 0,
      "Found reset link!"
    );

    window.token = extractData(body, startStr, endStr);
    cy.visit(
      `auth/sign-up?type=hub_event_invitation&token=${token}&email=${randomMail}`
    );
    cy.get(hubGroupPageSelector.popupNotes).should('have.text','Email verified!')
  })
})

// Decline event invitation
Given('Navigate rebel base and login', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Visit event page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
})

And('Create event for web application', () => {
  cy.xpath(smokeTestPageSelector.newEventButton).contains('New Event').click();
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
  cy.get('.createEvent__field__type')
    .select('selection')
    .should('have.value', 'selection');
  cy.get('.createEvent').click();
  cy.get(':nth-child(2) > .createEvent__round-choice').click();
  cy.get(':nth-child(3) > .createEvent__round-choice').click();
  cy.get('.createEvent > .btn-wrap > .btn-main').click();
})

And('Invite member to the event', () => {
  cy.get('.ePage__title__name').should('have.text', eventname)
  cy.xpath(eventPageSelectors.inviteButton).click()
  cy.get('select').select('General');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(Cypress.env('username1'))
    .type('{enter}')
  cy.get('.btn-wrap > .btn-main').click();
  cy.xpath(brainPageSelectors.closeModelButton).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

And('Decline invitation from invited user account', function () {
  cy.login(Cypress.env('username1'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.wait(3000)
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.wait(1000)
  cy.get('button').contains('decline').eq(0).click({ force: true });
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Delete the same event', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.eventLink).eq(0).click();
  cy.get('h3').contains(eventname).click()
  cy.get(eventPageSelectors.editPen).eq(0).click()
  cy.get('.btn-alarm').click();
  cy.get('.react-confirm-alert-button-group > :nth-child(1)').click();
  cy.url().should('include', '/events');
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})