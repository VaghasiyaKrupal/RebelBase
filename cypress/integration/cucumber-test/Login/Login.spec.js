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

const startStr = "token="
const endStr = "&"
var existinguser = Cypress.env('emailuser')

function extractData(data, startStr, endStr) {
  var subStrStart = data.indexOf(startStr) + startStr.length
  return data.substring(subStrStart,
    subStrStart + data.substring(subStrStart).indexOf(endStr));

}

const randomEmail = `rebelbasetesthub+${new Date().getTime()}@gmail.com`;
const randomEmail2 = `rebelbasetesthub1+${new Date().getTime()}@gmail.com`;
const randomEmail3 = `rebelbasetesthub3+${new Date().getTime()}@gmail.com`;

// Show error popup when either email or password is missing
Given('Visit rebelbase portal', () => {
  cy.visit('/');
})

When('Enter only password into textbox', () => {
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
})

And('Click on login button', () => {
  cy.get(smokeTestPageSelector.loginButton).click();
})

Then('Verify email is missing', () => {
  cy.getCookie('token').should('not.exist');
  cy.get('.inline-error').should('have.text', 'Please enter a valid email.');
});

// Password is less than 6 char[loginFlowTest]
Given('Visit rebelbase portal', () => {
  cy.visit('/');
})

When('Enter only email into textbox', () => {
  cy.get(smokeTestPageSelector.signUpEmail).type(Cypress.env('username'));
})

And('Click on login button', () => {
  cy.get(smokeTestPageSelector.loginButton).click();
})

Then('Verify password validation', () => {
  cy.getCookie('token').should('not.exist');
  cy.get('.inline-error').should('have.text', 'Password must be at least 6 characters long');
});

// Invalid login Id or passwd details [loginFlowTest]
Given('Visit rebelbase portal', () => {
  cy.visit('/');
})

When('Verify email validation', () => {
  cy.get(smokeTestPageSelector.signUpEmail).type('invalidtestgroupmember@gmail');
  cy.get(smokeTestPageSelector.signUpPassword).type('testtest');
  cy.get(smokeTestPageSelector.loginButton).click();
  cy.getCookie('token').should('not.exist');
  cy.get('.inline-error').should('have.text', 'Please enter a valid email.');
})

Then('Verify email or password validation', () => {
  cy.get(smokeTestPageSelector.signUpEmail).clear();
  cy.get(smokeTestPageSelector.signUpPassword).clear();
  cy.get(smokeTestPageSelector.signUpEmail).type('testhubadmin@rebelbase.co');
  cy.get(smokeTestPageSelector.signUpPassword).type('testtest12');
  cy.get(smokeTestPageSelector.loginButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Incorrect email or password.');
});

// Autofill email address if exist in url [loginFlowTest]
Given('Visit url', () => {
  cy.visit(`/accept/project-invitation/?token=${Cypress.env('token')}&email_address=${Cypress.env('username')}`);
})

When('Verify email textbox value', () => {
  cy.get(smokeTestPageSelector.signUpEmail).should('have.value', Cypress.env('username'));
})

Then('Verify validation', () => {
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Please signup or login before trying to accept an invitation to create a Hub.');
});

// Should login and redirect to profile [loginFlowTest]
Given('Login to the rebelbase portal', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Verify profile url', () => {
  cy.location('pathname').should('equal', '/dashboard');
})

Then('Verify user redirect to the profile page', () => {
  cy.get(hubGroupPageSelector.popupNotes)
    .should('have.text', `Please verify your email address: ${Cypress.env('username')}`);
});

// Log in, go to profile then logout [loginFlowTest]
Given('Log in to the rebelbase portal', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Confirm we have logged in successfully', () => {
  cy.location('pathname').should('equal', '/dashboard');
})

And('Now we can log out and should redirect to the login page', () => {
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
  cy.location('pathname').should('equal', '/auth/login');
});

// Log in with different email and try to accept project invitation token [loginFlowTest]
Given('Visit Rebelbase url with email exist in url', () => {
  cy.visit(`accept/project-invitation/?token=${Cypress.env('projectinvitation')}&email_address=${Cypress.env('username')}`);
})

When('Verify user is not able to accept invitation', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type(Cypress.env('username2'));
  cy.get('.inline-warning')
    .should('have.text', 'You will not be able to accept the invitation using this email address.');
})

And('Enter password and click on login button', () => {
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get('.login__btn').click();
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

Then('Verify profile url and invitation expired notification', () => {
  cy.location('pathname').should('equal', '/dashboard');
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'This invitation has expired!');
});

// not getting invalid token
// Log in with invalid project invitation token [loginFlowTest]
Given('Visit rebelbase portal', () => {
  cy.visit('/');
})

When('Enter Username, Password and login to account', () => {
  cy.get(smokeTestPageSelector.signUpEmail).type(Cypress.env('username2'));
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.loginButton).click()
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

And('Verify landing profile url', () => {
  cy.location('pathname').should('equal', '/dashboard');
})

Then('Should show invalid token notification', () => {
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invalid token!');
});

// Autofill email address if exist in url, log in and accept event invitation [loginFlowTest]
Given('Visit page url with email exist in url', () => {
  cy.visit(
    `accept/hub-event-invitation/?token=${Cypress.env(
      'token'
    )}&email_address=${Cypress.env('emailuser')}`
  );
})

When('Verify emailid is prefilled', () => {
  cy.get(smokeTestPageSelector.signUpEmail).should('have.value', Cypress.env('emailuser'));
  cy.get(hubGroupPageSelector.popupNotes)
    .should('have.text', 'Please signup or login before trying to accept an invitation to create a Hub.');
})

And('Enter password and login to account', () => {
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.loginButton).click()
})

Then('Verify email notification message', () => {
  cy.location('pathname').should('equal', '/dashboard');
  cy.get(hubGroupPageSelector.popupNotes)
    .should('have.text', `Please verify your email address: ${Cypress.env('emailuser')}`);
});

// log in with different email and try to accept event invitation token [loginFlowTest]
Given('Login to rebelbase url', () => {
  cy.visit(
    `/accept/hub-event-invitation/?token=${Cypress.env(
      'eventinvitation'
    )}&email_address=${Cypress.env('emailuser')}`
  );
})

When('Enter different email and try to login', () => {
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type(Cypress.env('username2'));
  cy.get('.inline-warning')
    .should('have.text', 'You will not be able to accept the invitation using this email address.');
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.loginButton).click();
})

And('Verify url from profile', () => {
  cy.location('pathname').should('equal', '/dashboard');
  cy.wait(1000)
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

Then('Should invitation expired notification', () => {
  cy.get(hubGroupPageSelector.popupNotes)
    .should('have.text', 'This invitation has expired!');
});

// log in with invalid event invitation token [loginFlowTest]
Given('Visit with existed email in url', () => {
  cy.visit(
    `/accept/hub-event-invitation/?token=${Cypress.env(
      'token2'
    )}&email_address=${Cypress.env('emailuser')}`
  );
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Enter username, password and login', () => {
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type(Cypress.env('emailuser'));
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.loginButton).click();
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

Then('Should show invitation has expired notification', () => {
  cy.location('pathname').should('equal', '/dashboard');
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'This invitation has expired!');
});

// log in with different email and try to accept hub invitation token [loginFlowTest]
Given('Visit rebel base portal', () => {
  cy.visit(
    `accept/hub-invitation/?token=${Cypress.env(
      'hubinvitation'
    )}&email_address=${Cypress.config('email_verify')}`
  );
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Should show You will not be able to accept the invitation using this email address.', () => {
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type(Cypress.env('username2'));
  cy.get('.inline-warning')
    .should('have.text', 'You will not be able to accept the invitation using this email address.');
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.loginButton).click();
})

And('Verify user profile url', () => {
  cy.location('pathname').should('equal', '/dashboard');
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

Then('Should shows invitation has expired in the notification', () => {
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'This invitation has expired!');
});

// Not getting invalid token notification
// // log in with invalid hub invitation token [loginFlowTest]
// Given('Visit product URL', () => {
//   cy.visit('/');
// })

// When('Login to the user account', () => {
//   cy.get(smokeTestPageSelector.signUpEmail).type(Cypress.env('username2'));
//   cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
//   cy.get(smokeTestPageSelector.loginButton).click()
// })

// And('Should redirect to the profile page', () => {
//   cy.location('pathname').should('equal', '/dashboard');
// })

// Then('Verify email varification notification', () => {
//   cy.get(hubGroupPageSelector.popupNotes).should('have.text', `Please verify your email address: ${Cypress.env('username2')}`);
//   cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
//   cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invalid token!');
// });

// Show popup message to complete tell-us ,until tell-us is complete
Given('Visit RebelBase URL', () => {
  cy.visit('/');
})

When('Sign-up new user account', () => {
  cy.xpath(hubGroupPageSelector.signupButton).click();
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type('sur');
  cy.get(smokeTestPageSelector.signUpEmail)
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

And('Should redirect to profile page', () => {
  cy.url().should('include', '/dashboard');

})

And('Logout from the account', () => {
  cy.get('[aria-label="menu"] > .MuiTypography-root').should('have.text', 'testtest')
  cy.get('[data-testid=ArrowDropDownIcon]').click({ force: true });
  cy.get('[data-testid=LogoutIcon]').click({ force: true });
  cy.url().should('include', '/auth/login')
})

And('Login to the same account', () => {
  cy.visit('/');
  cy.get(smokeTestPageSelector.signUpEmail).type(randomEmail);
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.get(smokeTestPageSelector.loginButton).click();
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

Then('Should show tell-up about yourself', () => {
  cy.wait(1000)
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', "Tell us about yourself... then we can customize your experience!");
  cy.xpath("(//button[normalize-space()='Click Here'])[1]").click();
  cy.get('.tellus').find('h2').contains('Tell us a little about yourself');
  cy.get('.tellus__dropdown').type('Chennai, Tamil Nadu, India');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.url().should("contain", '/dashboard');
});

// Fails to access protected resource
Given('Make API request verify response', () => {
  cy.request({
    url: 'https://core-service.staging.rebelbase.co/api/v1/rebel/settings/users',
    failOnStatusCode: false,
  })
    .then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body).to.eq('unauthenticated')
    })
});

// Autofill email address if exist in url, existing user log in and accept invitation [loginFlowTest]
Given('Login into rebelbase account', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Invite team member', () => {
  cy.get('div>ul>li').first().click()
  cy.get('[aria-label="add teammate"]').click({
    force: true
  });
  cy.get(smokeTestPageSelector.inviteEmailTextbox)
    .clear()
    .type(randomEmail2);

  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation sent!')
  cy.xpath(brainPageSelectors.closeModelButton).click()
})

And('Logout from account', () => {
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

And('Verify token is received', () => {
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
        "/accept/project-invitation/?token="
      ) >= 0,
      "Found link!"
    );
    window.token = extractData(body, startStr, endStr);
    cy.visit(`accept/project-invitation/?token=${token}&email_address=${randomEmail2}`);
  })
})

Then('Accept project invitation', () => {
  cy.get(smokeTestPageSelector.signUpEmail).should('have.value', randomEmail2);
  cy.contains('Please signup or login before trying to accept an invitation to create a Hub.');
  cy.get('.notification-dismiss').click();
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.contains('button', 'Login >').click();
  cy.contains('Project invitation accepted!');
  cy.get('.notification-dismiss').click({
    multiple: true
  });
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=SettingsIcon]').click();

  cy.get('.sideBar > ul > :nth-child(3)').contains('CypressTestProject01').click({
    force: true
  });
  cy.get('.team__change-role__drop').click();
  cy.get('button.btn-link-alarm').contains('Leave project').click({
    force: true
  })
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'You have left the project!');
});

// Project invitation from support member
Given('login to account', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'));
})

When('Send support member invitation', () => {
  cy.get('[aria-label="add teammate"]').click();
  cy.get(smokeTestPageSelector.inviteEmailTextbox)
    .clear()
    .type(randomEmail3);
  cy.get('select.form-control').select('4');
  cy.get('.inviteTeam__btn').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation sent!')
  cy.xpath(brainPageSelectors.closeModelButton).click()
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

And('Verify user token', () => {
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
        "/accept/project-invitation/?token="
      ) >= 0,
      "Found link!"
    );

    window.token = extractData(body, startStr, endStr);

    cy.visit(
      `accept/project-invitation/?token=${token}&email_address=${randomEmail3}`
    );
  })
})

Then('Accept support member invitaion', () => {
  cy.get(smokeTestPageSelector.signUpEmail).should('have.value', randomEmail3);
  cy.contains('Please signup or login before trying to accept an invitation to create a Hub.');
  cy.get('.notification-dismiss').click();
  cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
  cy.contains('button', 'Login >').click();
  cy.contains('Project invitation accepted!');
  cy.get('.notification-dismiss').click({
    multiple: true
  });
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=SettingsIcon]').click();

  cy.get('.sideBar > ul > :nth-child(3)').contains('CypressTestProject01').click({
    force: true
  });
  cy.get('.team__change-role__drop').click();
  cy.get('button.btn-link-alarm').contains('Leave project').click({
    force: true
  })
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'You have left the project!');
});

// Autofill email address if exist in url, log in and accept hub invitation [loginFlowTest]
Given('Create new user account', () => {
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
    .type(Cypress.config('email_verify'));
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

When('Select location for user', () => {
  cy.url().should('include', '/dashboard');
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get('.tellus__wrap > .btn-main').click();
  cy.get('.btn-skip').click({
    force: true
  });
  cy.get('[aria-label="menu"] > .MuiTypography-root').contains('test');
  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();
})

Then('Accept new project invitation', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.url().should('include', '/dashboard');
  cy.getCookie('token').should('exist');
  cy.visit('/hubs/26/activity');
  cy.get('.hub__topHeader__dropdown__links').contains('Invite Members').click({
    force: true
  })
  cy.get('.notification-dismiss').click();
  cy.get('.modal-title-h3').contains('Invite Members to Dev Hub');
  cy.get('.multi_email > input').click({
    force: true
  });
  cy.get('.multi_email > input').type(Cypress.config('email_verify'));
  cy.get('.btn-send').click()
  cy.get('.btn-x').click({
    force: true
  });

  cy.get('[data-testid=ArrowDropDownIcon]').click();
  cy.get('[data-testid=LogoutIcon]').click();

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
        "/accept/hub-invitation/?token="

      ) >= 0,
      "Found reset link!"
    );

    window.token = extractData(body, startStr, endStr);

    cy.visit(
      `accept/hub-invitation/?token=${token}&email_address=${Cypress.config('email_verify')}`
    );

    //cy.contains('Got it').click();
    cy.get(smokeTestPageSelector.signUpEmail).should('have.value', Cypress.config('email_verify'));
    cy.contains(
      'Please signup or login before trying to accept an invitation to create a Hub.'
    );
    cy.get(smokeTestPageSelector.signUpPassword).type(Cypress.env('password'));
    cy.get('.login__btn').click();
    cy.wait(5000);
    cy.location('pathname').should('equal', `/hubs/26/welcome`);
    cy.get('.notification').contains('Invitation accepted successfully.')
  });
});
