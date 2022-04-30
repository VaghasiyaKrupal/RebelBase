import { Before, After, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { builderPageData } from '../../pageObject/pageData/builderPageData'
import { builderPageSelectors } from '../../pageObject/pageSelectors/builderPageSelectors'
import { brainPageSelectors } from '../../pageObject/pageSelectors/brainPageSelectors'
import { smokeTestPageSelector } from "../../pageObject/pageSelectors/smokeTestPageSelector";
import { hubGroupPageData } from "../../pageObject/pageData/HubGroupPageData";
import { hubGroupPageSelector } from "../../pageObject/pageSelectors/hubGroupPageSelector";


const email = Cypress.config('email')
const randomname = Cypress.config('randomname')
const projectName = "cypressautomationgroup" + Math.random().toString(36).substring(2);

After(()=>{
  cy.wait(3000)
})

// Group Overview member
Given("Visit RebelBase portal", () => {
  cy.visit('/');
})

When('Login using username1 email', () => {
  cy.login(Cypress.env('username1'), Cypress.env('password'))
  // cy.xpath(smokeTestPageSelector.emailTextbox).type(hubGroupPageData.emailID);
  // cy.xpath(smokeTestPageSelector.passwordTextbox).type(hubGroupPageData.password);
  // cy.get(smokeTestPageSelector.loginButton).click()
})

And('Verify profile URL and user token', () => {
  cy.url().should('include', '/profile/2467');
  cy.getCookie('token').should('exist');
})

And('Visit Group page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

Then('Verify past created groups is exist', () => {
  cy.get(smokeTestPageSelector.searchBar);
  cy.get(hubGroupPageSelector.existGroupSelector).should('have.length.greaterThan', 0);
  cy.get(smokeTestPageSelector.addGroupButton).should('not.exist');
});

// checking group with no schedule members login
Given("Visit RebelBase portal", () => {
  cy.visit('/');
})

When('Login using username2 email', () => {
  cy.login(Cypress.env('username2'), Cypress.env('password'))
  // cy.xpath(smokeTestPageSelector.emailTextbox).type(Cypress.env('username2'));
  // cy.xpath(smokeTestPageSelector.passwordTextbox).type(Cypress.env('password'));
  // cy.get(smokeTestPageSelector.loginButton).click();
})
And('Verify profile URL and user login token', () => {
  cy.url().should('include', '/profile/2469');
  cy.getCookie('token').should('exist');
})

And('Visit Group page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

Then('Check group schedule', () => {
  cy.get('.search-bar');
  cy.visit('hubs/26/groups/169');
  cy.get(hubGroupPageSelector.groupScheduleSection).contains("No Schedule Added");
});

// Create group with schedule
Given('Login using username email', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Visit Group screen', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Add group', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click({ force: true });
  cy.get(smokeTestPageSelector.groupNameTextbox)
    .clear()
    .type(projectName);
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
})

And('Verify created group', () => {
  cy.get(smokeTestPageSelector.groupHeading).should('have.text', projectName);
})

And('Redirect to group page', () => {
  cy.visit('hubs/26/groups', { timeout: 300000 });
})

Then('Search created group and delete it', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get(smokeTestPageSelector.searchBar)
    .clear()
    .type(projectName);
  cy.get(smokeTestPageSelector.projectHover).click({ force: true });
  cy.xpath(smokeTestPageSelector.deleteButtom).click();
})

// Checking group with schedule members login
Given('Visit rebelbase portal', () => {
  cy.visit('/');
})

When('Login sing eventMember email', () => {
  cy.login(Cypress.env('eventMember'), Cypress.env('password'))
})

And('Verify profile and token', () => {
  cy.url().should('include', '/profile/4431');
  cy.getCookie('token').should('exist');
})

And('Go to group page', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

Then('Verify exist group', () => {
  cy.get(smokeTestPageSelector.searchBar);
  cy.get(hubGroupPageSelector.activeGroupSelector)
    .should('have.length.at.least', 1);
  cy.contains('testproject1645435245352').click();
  cy.url().should('include', 'hubs/26/groups/729');
  cy.get(hubGroupPageSelector.groupNameSelector).should('have.text', 'testproject1645435245352');
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Group Overview from Admin
Given('Visit rebelbase portal', () => {
  cy.visit('/');
})

When('Login to the username email', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  // cy.xpath(smokeTestPageSelector.emailTextbox).type('testhubadmin@rebelbase.co');
  // cy.xpath(smokeTestPageSelector.passwordTextbox).type(Cypress.env('password'));
  // cy.get(smokeTestPageSelector.loginButton).click();
})

And('Verify profile and login user token', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

And('Jump to group page', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

Then('Verify add group button is visible', () => {
  cy.get(smokeTestPageSelector.searchBar);
  cy.get(hubGroupPageSelector.activeGroupSelector)
    .should('have.length.greaterThan', 0);
  cy.get(smokeTestPageSelector.addGroupButton).should('be.visible');
});

// Check Group without Schedule from Admin
Given('Visit rebelbase portal', () => {
  cy.visit('/');
})

When('Login to rebel base portal', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  // cy.xpath(smokeTestPageSelector.emailTextbox).type(Cypress.env('username'));
  // cy.xpath(smokeTestPageSelector.passwordTextbox).type(Cypress.env('password'));
  // cy.get(smokeTestPageSelector.loginButton).click();
})

And('Verify profile, user token', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

And('Navigate to group page', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Verify create group button is visible', () => {
  cy.get(smokeTestPageSelector.searchBar);
  cy.get(hubGroupPageSelector.activeGroupSelector)
    .should('have.length.greaterThan', 0);
  cy.get(smokeTestPageSelector.addGroupButton).should('be.visible');
})

Then('Redirect to test dev group', () => {
  cy.contains('test dev group').click();
  cy.url().should('include', '/hubs/26/groups/149');
  cy.get(hubGroupPageSelector.groupNameSelector).should(
    'have.text',
    'test dev group'
  );
  cy.contains('+ add project').should('not.exist');
  cy.get(hubGroupPageSelector.addMemberButton).should('be.visible');
  cy.get(hubGroupPageSelector.editPenButton).should('be.visible');
  cy.xpath(hubGroupPageSelector.setScheduleEditPen)
    .should('be.visible')
    .should('have.text', 'set schedule')
    .and('have.attr', 'href', '/hubs/26/groups/149/schedule');
  cy.get('.edit-pen').should('be.visible');
  cy.get('.btn-main').should('be.visible');
  cy.get(hubGroupPageSelector.memberPlusButton).should('be.visible');
  cy.xpath(hubGroupPageSelector.setScheduleEditPen).click();
});

// Group with Schedule [Admin]
Given('Visit rebelbase portal', () => {
  cy.visit('/');
})

When('Login to rebelbase', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  // cy.xpath(smokeTestPageSelector.emailTextbox).type(Cypress.env('username'));
  // cy.xpath(smokeTestPageSelector.passwordTextbox).type(Cypress.env('password'));
  // cy.get(smokeTestPageSelector.loginButton).click();
})

And('Verify loggedin user token and profile url', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

And('Visite to group page', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Verify plush button is visible', () => {
  cy.get(smokeTestPageSelector.searchBar);
  cy.get(hubGroupPageSelector.activeGroupSelector)
    .should('have.length.greaterThan', 0);
  cy.get(smokeTestPageSelector.addGroupButton).should('be.visible');
})

Then('Redirect to the test dev group', () => {
  cy.contains('test dev group').click();
  cy.url().should('include', '/hubs/26/groups/149');
  cy.get(hubGroupPageSelector.groupNameSelector).should(
    'have.text',
    'test dev group'
  );
  cy.contains('+ add project').should('not.exist');
  cy.get(hubGroupPageSelector.addMemberButton).should('be.visible');
  cy.get(hubGroupPageSelector.editPenButton).should('be.visible');
  cy.xpath(hubGroupPageSelector.setScheduleEditPen)
    .should('be.visible')
    .should('have.text', 'set schedule')
    .and('have.attr', 'href', '/hubs/26/groups/149/schedule');
  cy.get('.edit-pen').should('be.visible');
  cy.get('.btn-main').should('be.visible');
  cy.get(hubGroupPageSelector.memberPlusButton).should('be.visible');
  cy.xpath(hubGroupPageSelector.setScheduleEditPen).click();
});

// Invite new user to hub from group and create and add project to group
Given('Visit rebelbase portal', () => {
  cy.visit('/');
})

When('Access rebelbase portal', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  // cy.xpath(smokeTestPageSelector.emailTextbox).type(Cypress.env('username'));
  // cy.xpath(smokeTestPageSelector.passwordTextbox).type(Cypress.env('password'));
  // cy.get(smokeTestPageSelector.loginButton).click();
})

And('Redirect to group page for devhub', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Go to test dev group', () => {
  cy.get(smokeTestPageSelector.searchBar)
    .clear()
    .type('test dev')
    .wait(1000)
  cy.get('h4').contains('test dev group').click();
})

And('Add member to the group', () => {
  cy.get(hubGroupPageSelector.addMemberButton).click({ force: true });
  cy.get(hubGroupPageSelector.inviteMemberTextbox).clear();
  cy.xpath(hubGroupPageSelector.inviteThemButton).click();
  cy.get(brainPageSelectors.inviteModelTextbox).clear();
  cy.get(hubGroupPageSelector.supportRole).click();
  cy.wait(1000)
  cy.get(brainPageSelectors.inviteModelTextbox).type('testhubadmin+8@rebelbase.co{enter}');
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(email);
  cy.get(brainPageSelectors.selectProjectFromModel).contains('test dev group').click();
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.get(hubGroupPageSelector.modelCloseButton).click();
  cy.xpath(brainPageSelectors.closeModelButton).click();
})

And('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

And('Signup new user', () => {
  cy.xpath(hubGroupPageSelector.signupButton).click();
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type(randomname);
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type(randomname);
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type(email);
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).check();
  cy.xpath(smokeTestPageSelector.getStartedButton).click();
  cy.wait(1000)
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pu');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).contains('READY!').click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click();
})

Then('Accept invitation', () => {
  cy.get(hubGroupPageSelector.inboxIcon).click();
  cy.xpath(hubGroupPageSelector.acceptButton).contains('accept').click({ force: true });
  cy.wait(2000)
  // cy.get('.popUp__note').contains('Invitation accepted successfully');
  // cy.get('.createHub > :nth-child(1) > h2').contains('Welcome to Dev Hub!');
  // cy.xpath(brainPageSelectors.closeModelButton).click();
  // cy.xpath(brainPageSelectors.notificationDismiss).click();
});

// Duplicate group name
Given('Intercept section blueprint api call', () => {
  cy.intercept({
    method: 'GET',
    url: Cypress.env('section-bluepring'),
  }).as('section-blueprints');
})

When('Login the rebelbase portal', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

And('Verify api response', () => {
  cy.wait('@section-blueprints').then(({
    request,
    response
  }) => {
    expect(response.statusCode).to.eq(200);
  })
})

And('Redirected to group page', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Creating group', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click();
  cy.get(smokeTestPageSelector.groupNameTextbox)
    .clear()
    .type('test dev group');
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
  cy.get(smokeTestPageSelector.loginButton).click();
})

Then('Verify alert message', () => {
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', "Group name has already been taken!")
});

// Add builder schedule
Given('Get access on rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath('//span[@class="notification-dismiss"]').click()
})

When('Visit DevHub group page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Go to group and set schedule', () => {
  cy.get(hubGroupPageSelector.firstExistGroup).first().click();
  cy.xpath(hubGroupPageSelector.setScheduleEditPen).contains('set schedule').click();
  cy.wait(4000)
  cy.get('body').then((body) => {
    if (body.find('.g-templates__side-menu > :nth-child(2)', { settimeout: 300000 }).length > 0) {
      cy.get('.g-templates__side-menu > :nth-child(2)').contains('Growth').click();
      cy.get('.btn-save').contains('open template').click();
    }
  })
  cy.get(hubGroupPageSelector.scheduleFromDate).first().type('Feb 02,2022')
  cy.get(hubGroupPageSelector.scheduleTime).first().type('9:30am')
  cy.xpath(hubGroupPageSelector.saveScheduleButton).contains('save schedule').click();
})

Then('Verify schedule is save', () => {
  cy.get(hubGroupPageSelector.popupNotes).contains('Builder(s) saved successfully.')
  cy.xpath(hubGroupPageSelector.backToGroupButton).click();
  cy.get('h3').contains('Competitive Landscape')
});

// Add search and delete member from group
Given('Access to the rebelbase', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

When('Navigate group page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Go to group details page and delete member', () => {
  cy.get(hubGroupPageSelector.groupHeading).first().click({ force: true });
  cy.xpath(hubGroupPageSelector.editPen).click({ force: true });
  cy.wait(4000)
  cy.get('body').then((body) => {
    if (body.find('.g-templates__side-menu > :nth-child(2)', { settimeout: 300000 }).length > 0) {
      cy.get('.g-templates__side-menu > :nth-child(2)').contains('Growth').click();
      cy.get('.btn-save').contains('open template').click();
    }
  })
  cy.get(hubGroupPageSelector.radioCheck).last().click();
  cy.xpath(smokeTestPageSelector.deleteButtom).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', "Member(s) deleted successfully.");
  cy.xpath(brainPageSelectors.notificationDismiss).click({ force: true });
})

And('Adding member to the group', () => {
  cy.xpath(hubGroupPageSelector.editPen).click();
  cy.xpath(hubGroupPageSelector.addMemberButton).click();
  cy.get(hubGroupPageSelector.inviteMemberTextbox).type('test');
  cy.get(hubGroupPageSelector.radioCheck).first().click();
  cy.get(hubGroupPageSelector.radioCheck).last().click();
  cy.get("button[type='submit']").click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', "Member(s)  added successfully.");
})

Then('Deleting member from group', () => {
  cy.xpath(hubGroupPageSelector.editPen).click();
  cy.xpath("//input[@type='text']").type('test');
  cy.get(hubGroupPageSelector.radioCheck).first().click();
  cy.get(hubGroupPageSelector.deleteButtom).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', "Member(s) deleted successfully.");
  cy.xpath(brainPageSelectors.notificationDismiss).click({ force: true });;
});

// Add delete manager in group
Given('Getting access on the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

When('Jumped to group page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Add new groups', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click();
  cy.get(smokeTestPageSelector.groupNameTextbox)
    .clear()
    .type(randomname);
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
})

And('Verifing created group', () => {
  cy.get(smokeTestPageSelector.groupHeading).should('have.text', randomname);
})

And('Redirect to created group page', () => {
  cy.visit('hubs/26/groups', { timeout: 300000 });
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get(smokeTestPageSelector.searchBar)
    .clear()
    .type(randomname)
    .wait(2000)
  cy.get("h4").contains(randomname).click();
})

And('Add manager in group', () => {
  cy.xpath(hubGroupPageSelector.addManagerPlushSign).click();
  cy.get(hubGroupPageSelector.inviteMemberTextbox).type('testtest');
  cy.xpath(smokeTestPageSelector.selectAllButton).click();
  cy.xpath(hubGroupPageSelector.addMenagerButton).click();
  cy.wait(1000)
})

Then('Delete manager from group', () => {
  cy.get(hubGroupPageSelector.editPenManager).click();
  cy.xpath(hubGroupPageSelector.editManagerButton)
  cy.get(hubGroupPageSelector.searchManagerTextbox).type('testtest')
  cy.xpath(hubGroupPageSelector.addMenagerButton).click()
  cy.get(hubGroupPageSelector.radioCheck).first().click();
  cy.visit('hubs/26/groups', { timeout: 300000 });
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get(smokeTestPageSelector.searchBar)
    .clear()
    .type(randomname)
    .wait(2000)
  cy.get(smokeTestPageSelector.projectHover).click({
    force: true
  });
  cy.xpath(smokeTestPageSelector.deleteButtom).click();
});

// Invite to user not part of group
Given('Logged in to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

When('Redirect to group page from DevHub', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Adding group', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click();
  cy.get(smokeTestPageSelector.groupNameTextbox)
    .clear()
    .type('test dev group');
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', hubGroupPageData.groupNameExistMessage);
  cy.get(hubGroupPageSelector.popupNotes).click();
})

Then('Checking for duplicate group name', () => {
  cy.get('.ReactModal__Overlay').click();
  cy.get(smokeTestPageSelector.groupNameTextbox)
    .clear()
    .type('testgroup1');
  cy.xpath(hubGroupPageSelector.inviteThemButton).click();
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type('testhubadmin+123@rebelbase.co');
  cy.get(':nth-child(5) > .invite-to-hub__group__label').click();
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.get(brainPageSelectors.feedbackNotification).click();
  cy.get(brainPageSelectors.feedbackNotification).click();
  cy.get(brainPageSelectors.feedbackNotification).click();
  cy.get(brainPageSelectors.feedbackNotification).should('be.visible');
  cy.get(hubGroupPageSelector.modelCloseButton).click();
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
  cy.url().should('include', '/groups');
});

// Deactivate group
Given('Get access Rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

When('Redirect the group page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Searching for group', () => {
  cy.get(smokeTestPageSelector.searchBar)
    .clear()
    .type(Cypress.env('groupname'));
})

Then('Deactivate group', () => {
  cy.get(hubGroupPageSelector.projectDeactiveHover).click({ force: true });
  cy.xpath(hubGroupPageSelector.deactivateButton).click();
});

// Delete group
Given('Username login to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

When('Visit directly to group page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Search for group', () => {
  cy.get(smokeTestPageSelector.searchBar)
    .clear()
    .type(Cypress.env('groupname'));
})

Then('Delete group', () => {
  cy.get(smokeTestPageSelector.projectHover).click({force:true});
  cy.xpath(smokeTestPageSelector.deleteButtom).click();
});