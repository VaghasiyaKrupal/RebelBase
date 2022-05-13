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
import { prodSmokeTestPageSelector } from "../../pageObject/pageSelectors/ProdSmokeTest";

// describe('', () => {
const endStr = "&"
const startStr = "token="

function extractData(data, startStr, endStr) {
  var subStrStart = data.indexOf(startStr) + startStr.length
  return data.substring(subStrStart,
    subStrStart + data.substring(subStrStart).indexOf(endStr));

}
const randomEmail = `rebelbasetesthub+${new Date().getTime()}@gmail.com`;
const randomEmail2 = `rebelbasetesthub2+${new Date().getTime()}@gmail.com`;
const randomEmail3 = `rebelbasetesthub3+${new Date().getTime()}@gmail.com`;
const randomEmail4 = `rebelbasetesthub4+${new Date().getTime()}@gmail.com`;
const randomEmail5 = `rebelbasetesthub5+${new Date().getTime()}@gmail.com`;
const randomEmail6 = `rebelbasetesthub6+${new Date().getTime()}@gmail.com`;
const randomEmail7 = `rebelbasetesthub7+${new Date().getTime()}@gmail.com`;
const randomEmail8 = `rebelbasetesthub8+${new Date().getTime()}@gmail.com`;
const randomEmail9 = `rebelbasetesthub9+${new Date().getTime()}@gmail.com`;
const randomEmail10 = `rebelbasetesthub10+${new Date().getTime()}@gmail.com`;
const randomEmail11 = `rebelbasetesthub11+${new Date().getTime()}@gmail.com`;
const randomEmail12 = `rebelbasetesthub12+${new Date().getTime()}@gmail.com`;
const randomEmail13 = `rebelbasetesthub13+${new Date().getTime()}@gmail.com`;
const randomEmail14 = `rebelbasetesthub14+${new Date().getTime()}@gmail.com`;
const randomEmail15 = `rebelbasetesthub15+${new Date().getTime()}@gmail.com`;

// Sign up and try to accept invalid project invitation token
Given('Signup user with token', () => {
  // const randomEmail = `rebelbasetesthub+${new Date().getTime()}@gmail.com`;

  cy.visit(`auth/sign-up?type=project_invitation&token=${Cypress.env('token1')}&email=${randomEmail}`);
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type(randomEmail);
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type(randomEmail);
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).click();
  cy.xpath(smokeTestPageSelector.getStartedButton).click({ force: true });
})

When('Try to accept invalid project invitation', () => {
  cy.get(smokeTestPageSelector.autoCompleteTextbox).type('p');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click({ force: true });
})

And('Verify invitation validation', () => {
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'This invitation has expired!');
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Logout from account', () => {
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
  cy.url().should('include', '/auth/login')
});

// Sign up and try to accept invalid event invitation token
Given('Login to the rebelbase portal', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Verify profile and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

And('Go to event page and send event invitation', () => {
  cy.visit('/events/1449');
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.xpath(eventPageSelectors.inviteButton).click();
  cy.get('.createEvent__title').contains('Invite Participants');
  cy.get('select').select('Competitor').should('have.value', '2');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(randomEmail2)
  cy.get('.btn-wrap > .btn-main').click();
  // cy.get(brainPageSelectors.feedbackNotification).should('have.text', 'Succesfully sent invite to:'+randomEmail)
  cy.xpath(brainPageSelectors.closeModelButton).click();
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

And('Sign up user with token', () => {
  cy.visit(
    `auth/sign-up?type=hub_event_invitation&token=${Cypress.env('token2')}&email=${randomEmail2}`
  );

  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type(randomEmail2);
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type(randomEmail2);
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).click();
  cy.xpath(smokeTestPageSelector.getStartedButton).click({ force: true });
})

And('Try to accept invalid project invitation', () => {
  cy.get(smokeTestPageSelector.autoCompleteTextbox).type('p');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click({ force: true });
})

And('Verify invitation validation', () => {
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'This invitation has expired!');
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Logout from account', () => {
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
  cy.url().should('include', '/auth/login')
});

// Sign up and try to accept invalid hub invitation token using link
Given('Sign up user', () => {
  // const randomEmail = `rebelbasetesthub+${new Date().getTime()}@gmail.com`;
  cy.visit(`auth/sign-up?type=hub_event_invitation&token=${Cypress.env('token2')}&email=${randomEmail3}`);
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type(randomEmail3);
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type(randomEmail3);
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).click();
  cy.xpath(smokeTestPageSelector.getStartedButton).click({ force: true });
})

When('Send invitation', () => {
  // cy.url().should('include', 'profile');
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click({ force: true });
})

Then('Verify invitation send', () => {
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'This invitation has expired!');
});

// Autofill email address if exist in url and show warning if user edit email address
Given('Visit autofill email address', () => {
  cy.visit(`auth/sign-up?type=project_invitation&token=${Cypress.env('token1')}&email=${randomEmail4}`);
  cy.get(smokeTestPageSelector.signUpEmail).should('have.value', randomEmail4);
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type(Cypress.env('username2'));
})

Then('Verify invitation is valid', () => {
  cy.get('.inline-warning').should('have.text', 'You will not be able to accept the invitation using this email address.');
});

// tell-us is empty
Given('Visit rebalbase portal', () => {
  cy.visit('/');
})

When('Sign up new user', () => {
  cy.xpath(hubGroupPageSelector.signupButton).click();
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type('test');
  cy.get('.sign-up').click();
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type('rebel12');
  cy.get(smokeTestPageSelector.signUpLastName).click();
  cy.get('.sign-up').click();
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type('rebel12');
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type('rebel12');
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type(randomEmail5);
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).type('true');
  cy.xpath(smokeTestPageSelector.getStartedButton).click({ force: true });
})

Then('Verify tell-us is empty', () => {
  cy.get('.tellus > h2').should('have.text', 'Tell us a little about yourself');
  cy.get('.tellus__dropdown').type('Chennai, Tamil Nadu, India');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click({ force: true });
})

// Required field is missing [SignUpFlowTest]
Given('Verify validation on sign-up user', () => {
  cy.visit('/');
  cy.xpath(hubGroupPageSelector.signupButton).click();
  cy.url().should('include', '/sign-up');
  cy.get(smokeTestPageSelector.signUpFirstName).focus().blur();
  cy.get('.inline-error').should('have.text', 'Required');
  cy.get(smokeTestPageSelector.signUpFirstName).type(Cypress.env('firstName'));
  cy.get(smokeTestPageSelector.signUpLastName).focus().blur();
  cy.get('.inline-error').should('have.text', 'Required');
  cy.get(smokeTestPageSelector.signUpLastName).type(Cypress.env('lastName'));
  cy.get(smokeTestPageSelector.signUpEmail).focus().blur();
  cy.get('.inline-error').should('have.text', 'Required');
  cy.get(smokeTestPageSelector.signUpEmail).type(Cypress.env('invalidEmail'));
  cy.contains('Please enter a valid email.');
  cy.get(smokeTestPageSelector.signUpEmail).clear()
    .type(Cypress.env('username'));
  cy.get(smokeTestPageSelector.signUpPassword).focus().blur();
  cy.get('.inline-error').should('have.text', 'Required');
  cy.get(smokeTestPageSelector.signUpPassword).type('1234');
  cy.get('.inline-error').should('have.text', 'Password must be at least 6 characters long');
  cy.get(smokeTestPageSelector.signUpPassword).clear();
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.signUpConfirmPassword).focus().blur();
  cy.get('.inline-error').should('have.text', 'Required');
  cy.get(smokeTestPageSelector.signUpConfirmPassword).type('123456');
  cy.get('.inline-error').should('have.text', 'Password does not match');
  cy.get(smokeTestPageSelector.signUpConfirmPassword).clear();
  cy.get(smokeTestPageSelector.signUpConfirmPassword).type(Cypress.env('password'));
  cy.xpath(smokeTestPageSelector.getStartedButton).click();
  cy.url().should('include', '/sign-up');
  cy.getCookie('token').should('not.exist');
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Hm... looks like we skipped a mandatory field.');
  cy.get(hubGroupPageSelector.allowID).check();
  cy.get(hubGroupPageSelector.pramotionalEmailID).check();
  cy.xpath(smokeTestPageSelector.getStartedButton).click();

  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Darn...that email address has already been taken. If this is you, log in instead.');
  cy.get(smokeTestPageSelector.signUpEmail).clear();
  cy.get(smokeTestPageSelector.signUpEmail).type(randomEmail6);
  cy.xpath(smokeTestPageSelector.getStartedButton).click();
})

When('Verify validation on location model', () => {
  cy.get('.tellus > h2').should('have.text', 'Tell us a little about yourself');
  cy.get('.tellus__dropdown').type('Chennai, Tamil Nadu, India');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click();
  cy.url().should('contain', 'profile');
  cy.get('.btn-link').contains('Create a Project').click();
  cy.location('pathname').should('equal', '/project/create-project');
  cy.get(':nth-child(1) > :nth-child(2) > .form-control').type(randomEmail6);
  cy.get(smokeTestPageSelector.autoCompleteTextbox).type('Pune, Maharashtra, India');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get('select').select('Energy');
  cy.xpath(smokeTestPageSelector.createButtom).click();

  // // cy.visit('/way-find');
  // // cy.wait(8000);
  // cy.get('.indicator').contains('Browse Projects.').click();
  // // cy.location('pathname').should('equal', '/browse');
  // // cy.visit('/way-find');
  // cy.get(hubGroupPageSelector.popupNotes).should('have.text',`Please verify your email address: ${randomEmail}.`);
  // cy.get(brainPageSelectors.notificationDismiss).click();
  // cy.get('.indicator')
  //   .contains('Contact us to request a Hub Invite.')
  //   .click();
  // cy.location('pathname').should('equal', '/help');
  // cy.visit('/way-find');
  cy.get('.btn-x').contains('button', 'x').click();
  cy.task('setUserId', randomEmail6);
});

// Getting This project invitation has exxpired
// Signup and accept project invitation [SignUpFlowTest]
Given('Send Project invitation', () => {
  // const randomEmail = `rebelbasetesthub+${new Date().getTime()}@gmail.com`;
  cy.login(Cypress.env('emailuser'), Cypress.env('password'))
})

When('Invite member to the team', () => {
  cy.get('div>ul>li:nth-child(2)').first().click()
  cy.get('[aria-label="add teammate"]').click();
  cy.get(smokeTestPageSelector.inviteEmailTextbox)
    .clear()
    .type(randomEmail7);
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.xpath(brainPageSelectors.closeModelButton).click()

  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

And('Verify token from gmail', () => {
  cy.task("gmail:get-messages", {
    options: {
      from: "noreply@rebelbase.co",
      subject: "Join rebebasetestuserproject team on RebelBase",
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
    console.log(body)
    cy.log(body);

    assert.isTrue(
      body.indexOf(
        "/auth/sign-up?type=project_invitation&amp;token="
      ) >= 0,
      "Found link!"
    );

    window.token = extractData(body, startStr, endStr);

    cy.visit(
      `auth/sign-up?type=project_invitation&token=${token}&email=${randomEmail7}`
    );
  })
})

And('Accepiting project invitations', () => {
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type(randomEmail7);
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type(randomEmail7);

  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).click();
  cy.xpath(smokeTestPageSelector.getStartedButton).click();
})

Then('Tell-us about your self', () => {
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .type('p')
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Project invitation accepted!')
  cy.get(brainPageSelectors.notificationDismiss).click();
  cy.url().should('include', '/builders');
});

// user does not have permission to add a team in CypressTestProject01
// Sign up with different email and try to accept project invitation token [signUpFlowTest]
Given('Sent invitation', () => {
  // const randomEmail = `rebelbasetesthub+${new Date().getTime()}@gmail.com`;
  cy.login(Cypress.env('emailuser'), Cypress.env('password'))
  cy.get('div>ul>li:nth-child(3)>div>span').contains('CypressTestProject01').click()
  cy.get('[aria-label="add teammate"]').click();
  cy.get(smokeTestPageSelector.inviteEmailTextbox)
    .clear()
    .type(randomEmail8);
  cy.get('select').select('Member')
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.xpath(brainPageSelectors.closeModelButton).click()

  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

When('Verify gmail token', () => {
  cy.task("gmail:get-messages", {
    options: {
      from: "noreply@rebelbase.co",
      subject: "Join CypressTestProject01 team on RebelBase",
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
    console.log(body)
    cy.log(body);

    assert.isTrue(
      body.indexOf(
        "/auth/sign-up?type=project_invitation&amp;token="
      ) >= 0,
      "Found link!"
    );

    window.token = extractData(body, startStr, endStr);

    cy.visit(
      `auth/sign-up?type=project_invitation&token=${token}&email=${randomEmail8}`
    );
  })
})

And('Sign-Up', () => {
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type(randomEmail8);
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type(randomEmail8);
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type('h' + randomEmail8);
  cy.get('.inline-warning').should('have.text', 'You will not be able to accept the invitation using this email address.');
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).click();
  cy.xpath(smokeTestPageSelector.getStartedButton).click();
})

Then('Tell-us is empty', () => {
  cy.get(smokeTestPageSelector.autoCompleteTextbox).type('p')
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click();

  cy.contains(
    'Make sure you are logged in with the correct email before trying to accept an invitation!'
  );
  cy.get(brainPageSelectors.notificationDismiss).click();
});

// Sign up with different email and try to accept event invitation token [signUpFlowTest]
Given('Login and verify user token', () => {
  // const randomEmail = `rebelbasetesthub+${new Date().getTime()}@gmail.com`;
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
  cy.visit('/events/1449');
  cy.get(brainPageSelectors.notificationDismiss).click()
})

When('Invite participate to the event', () => {
  cy.xpath(eventPageSelectors.inviteButton).click();
  cy.get('.createEvent__title').contains('Invite Participants');
  cy.get('select').select('Competitor').should('have.value', '2');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(randomEmail9)
  cy.get('.btn-wrap > .btn-main').click();
  // cy.get(brainPageSelectors.feedbackNotification).should('have.text','Succesfully sent invite to:')
  cy.xpath(brainPageSelectors.closeModelButton).click();
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

And('Verify email token is sent', () => {
  cy.task("gmail:get-messages", {
    options: {
      from: "noreply@rebelbase.co",
      subject: "Join test at cypresstestevent via RebelBase",
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
      `auth/sign-up?type=hub_event_invitation&token=${token}&email=${Cypress.config('email_verify')}`
    );
  })
})

And('Create new user account', () => {
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type(Cypress.config('email'));
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type(Cypress.config('email'));
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).click();
  cy.xpath(smokeTestPageSelector.getStartedButton).click();
})

Then('Fill tell-uup dailog', () => {
  cy.url().should('include', '/profile');
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click();

  cy.contains(
    'Make sure you are logged in with the correct email before trying to accept an invitation!'
  );
  cy.get(brainPageSelectors.notificationDismiss).click();
});

// Sign up with different email and try to accept hub invitation token [signUpFlowTest]
Given('Sign-up Different email', () => {
  // const randomEmail = `rebelbasetesthub+${new Date().getTime()}@gmail.com`;
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
  cy.visit('/hubs/26/activity');
})

When('Invite different member', () => {
  cy.get('.hub__topHeader__dropdown__links').contains('Invite Members').click({
    force: true
  })
  cy.get('.notification-dismiss').click();
  cy.get('.modal-title-h3').contains('Invite Members to Dev Hub');
  cy.get('.multi_email > input').type(randomEmail10);
  cy.get('.btn-send').click()
  cy.get('.btn-x').click();

  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

And('Verify email token', () => {
  cy.task("gmail:get-messages", {
    options: {
      from: "noreply@rebelbase.co",
      subject: "test invited you to join the Dev Hub hub on RebelBase",
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
        "/auth/sign-up?type=hub_invitation&amp;token="

      ) >= 0,
      "Found reset link!"
    );

    window.token = extractData(body, startStr, endStr);

    cy.visit(
      `auth/sign-up?type=hub_invitation&token=${token}&email=${randomEmail10}`
    );
  })
})

And('Sign-up different email', () => {
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type(randomEmail10);
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type(randomEmail10);
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type('h' + randomEmail10)
  cy.get('.inline-warning').contains('You will not be able to accept the invitation using this email address.');
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).click();
  cy.xpath(smokeTestPageSelector.getStartedButton).click();
})

Then('Verify tell-up dailog received', () => {
  cy.url().should('include', '/profile');
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click();
  cy.contains(
    'Make sure you are logged in with the correct email before trying to accept an invitation!'
  );
  cy.get(brainPageSelectors.notificationDismiss).click();
});

// new user signup and verify email account [SignUpFlowTest]
Given("New user sign-up", function () {
  cy.visit('/');
  cy.xpath(hubGroupPageSelector.signupButton).click();
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type('sur');
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type(randomEmail11);
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).click();
  cy.xpath(smokeTestPageSelector.getStartedButton).click();
})

When('Fill-up tell-us dailog', () => {
  cy.url().should('include', '/profile');
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click();
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

And('login using created user email', () => {
  cy.login(randomEmail11, 'testtest')
})

And('Sent invitation to user', () => {
  cy.get('.notification > :nth-child(3) > div > button').click();
  cy.get('.notification').invoke('text').should('contain', 'A verification email has been sent to ');
  //cy.get('.popUp__note').contains.text('A verification email has been sent to ');
  cy.get(brainPageSelectors.notificationDismiss).click();
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

Then('Verify invitation token', () => {
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
    cy.log(body)
    assert.isTrue(
      body.indexOf(
        "email-verification?token="
      ) >= 0,
      "Found reset link!"
    );
    window.token = extractData(body, startStr, endStr);
    cy.visit(
      `email-verification?token=${token}&email_address=${randomEmail11}`
    );
    //cy.wait(3000);
    cy.get('.notification').contains('Email verified!')
    // cy.get('.notification').contains('Invalid Token!')
    cy.get('.notification-dismiss').click();
  });
});

// Autofill email address if exist in url [SignUpFlowTest]
Given('Verify email is auto filled into textbox', () => {
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
        "/email-verification?token="
      ) >= 0,
      "Found reset link!"
    );


    window.token = extractData(body, startStr, endStr);

    cy.visit(
      `email-verification?token=${token}&email_address=${randomEmail12}`
    );
    cy.wait(3000);
    //cy.get('.notification').contains('Invalid Token!')
    //cy.get('.notification-dismiss').click();

    cy.get('input[name="email"]').should('have.value', randomEmail12);
  });
});

// new  user signup and accept hub invitation [Hub]
Given("Sign Up New user", function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
  cy.visit('/hubs/26/activity');
})

When('Send Invitation To New user', () => {
  cy.get('.hub__topHeader__dropdown__links').contains('Invite Members').click({
    force: true
  })
  cy.get('.notification-dismiss').click();
  cy.get('.modal-title-h3').contains('Invite Members to Dev Hub');
  cy.get('.multi_email > input').type(randomEmail13);
  cy.get('.btn-send').click()
  cy.get('.btn-x').click();

  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

And('Verify user token in the email', () => {
  cy.task("gmail:get-messages", {
    options: {
      from: "noreply@rebelbase.co",
      subject: "test invited you to join the Dev Hub hub on RebelBase",
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
        "/auth/sign-up?type=hub_invitation&amp;token="

      ) >= 0,
      "Found reset link!"
    );

    window.token = extractData(body, startStr, endStr);
  })
})

And('Create New User Account', () => {
  cy.visit(
    `auth/sign-up?type=hub_invitation&token=${token}&email=${randomEmail13}`
  );
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type(randomEmail13);
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type(randomEmail13);
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).click();
  cy.xpath(smokeTestPageSelector.getStartedButton).click();
})

Then('Set location for created user', () => {
  cy.url().should('include', '/profile');
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation accepted successfully.')
  cy.get(brainPageSelectors.notificationDismiss).click();
});

// Invite button not available
// new user signup and accept event invitation [signUpFlowTest]
Given("login for Invite participant", function () {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
  cy.visit('/events/127');
})

When('Invite Participant', () => {
  cy.xpath(eventPageSelectors.inviteButton).click();
  cy.get('.createEvent__title').contains('Invite Participants');
  cy.get('select').select('Competitor').should('have.value', '2');
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(randomEmail14)
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.get(brainPageSelectors.feedbackNotification).should('have.text', 'Succesfully sent invite to:')
  cy.xpath(brainPageSelectors.closeModelButton).click();

  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

And('Verify token from sended email', () => {
  cy.task("gmail:get-messages", {
    options: {
      from: "noreply@rebelbase.co",
      subject: "Join test at cypresstestevent via RebelBase",
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
      `auth/sign-up?type=hub_event_invitation&token=${token}&email=${randomEmail14}`
    );
  })
})

And('Creating new user account', () => {
  //  cy.visit(
  //   `auth/sign-up?type=hub_event_invitation&amp;token=${token}&email=${randomEmail}`
  // );
  //cy.wait(3000);
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type(randomEmail15);
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type(randomEmail15);
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).click();
  cy.xpath(smokeTestPageSelector.getStartedButton).click();
})

Then('Accept invitation for created user', () => {
  cy.url().should('include', '/profile');
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(brainPageSelectors.skipForNowButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation accepted successfully.')
  cy.get(brainPageSelectors.notificationDismiss).click();
});

Given('forget password', () => {
  const startStr = 'x3IhzZ5YUFU3xRWkCJI4aLVPC-2BOoHahfDU-2BROGlySass0TTVgllosmDa-2FaVEbjjZN-2FuCMhKKtmBUzbdxwO9z-2F'
  const endStr = '-3D'
  cy.visit('/');
  cy.get('.login__forgotpass').click();
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type('rebelbasetesthub+2@gmail.com')
  cy.get('.forgot-pass__btn').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Check your email for a link to reset your password!');
  cy.get(brainPageSelectors.notificationDismiss).click();
})

When('Verify forgot password mail is send', () => {
  cy.task("gmail:get-messages", {
    options: {
      from: "noreply@rebelbase.co",
      subject: "Reset your RebelBase account password",
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

    var token = extractData(body, startStr, endStr);

    cy.log(`accept/reset-password?token=${token}-3D`)

    cy.visit(`accept/reset-password?token=${token}-3D`)
  })
})