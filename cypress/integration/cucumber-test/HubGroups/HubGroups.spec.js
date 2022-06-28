/// <reference types="cypress" />
import { Before, After, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { builderPageData } from '../../pageObject/pageData/builderPageData'
import { builderPageSelectors } from '../../pageObject/pageSelectors/builderPageSelectors'
import { brainPageSelectors } from '../../pageObject/pageSelectors/brainPageSelectors'
import { smokeTestPageSelector } from "../../pageObject/pageSelectors/smokeTestPageSelector";
import { hubGroupPageData } from "../../pageObject/pageData/HubGroupPageData";
import { hubGroupPageSelector } from "../../pageObject/pageSelectors/hubGroupPageSelector";
import { hubActivityPageSelector } from "../../pageObject/pageSelectors/hubActivityPageSelector";

const endStr = "&"
const startStr = "token="

function extractData(data, startStr, endStr) {
  var subStrStart = data.indexOf(startStr) + startStr.length
  return data.substring(subStrStart,
    subStrStart + data.substring(subStrStart).indexOf(endStr));

}

const email = Cypress.config('email')
const randomname = Cypress.config('randomname')
const projectName = "cypressautomationgroup" + Math.random().toString(36).substring(2);
const randomEmail= "automationgroup." + Math.random().toString(36).substring(2)+"@mailinator.com";
const randomMail = `rebelbasetesthub.${new Date().getTime()}@gmail.com`;
After(() => {
  cy.wait(1000)
})

// Group Overview member
Given('Login using username1 email', () => {
  cy.login(Cypress.env('username1'), Cypress.env('password'))
})

When('Verify profile URL and user token', () => {
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
Given('Login using username2 email', () => {
  cy.login(Cypress.env('username2'), Cypress.env('password'))
})

When('Verify profile URL and user login token', () => {
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
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Add group', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click({ force: true });
  cy.get(hubGroupPageSelector.groupName)
    .clear()
    .type(projectName);
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
})

And('Verify created group', () => {
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects');
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders');
  cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members');
})

And('Redirect to group page', () => {
  cy.visit('hubs/26/groups', { timeout: 300000 });
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Search created group and delete it', () => {
  cy.get(smokeTestPageSelector.searchBar)
    .clear()
    .type(projectName);
  cy.get(smokeTestPageSelector.projectHover).click({ force: true });
  cy.xpath(smokeTestPageSelector.deleteButtom).click();
})

// Checking group with schedule members login
Given('Login using eventMember email', () => {
  cy.login(Cypress.env('eventMember'), Cypress.env('password'))
})

When('Verify profile and token', () => {
  cy.url().should('include', '/profile/4431');
  cy.getCookie('token').should('exist');
})

And('Go to group page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

Then('Verify exist group', () => {
  cy.get(smokeTestPageSelector.searchBar);
  cy.get(hubGroupPageSelector.activeGroupSelector)
    .should('have.length.at.least', 1);
  cy.contains('testproject1645435245352').click();
  cy.url().should('include', 'hubs/26/groups/729');
  cy.get('h1').should('have.text', 'testproject1645435245352');
  cy.get(smokeTestPageSelector.headerDropdown).first().click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

// Group Overview from Admin
Given('Login to the username email', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Verify profile and login user token', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

And('Jump to group page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click()
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
Given('Login to rebel base portal', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Verify profile, user token', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

And('Navigate to group page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click()
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
  const path = '.dev.';
  cy.url().then(($url) => {
    if ($url.includes(path)) {
      cy.url().should('include', '/hubs/26/groups/1153');
    } else {
      cy.url().should('include', '/hubs/26/groups/149');
    }
  })
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects');
  cy.contains('+ add project').should('not.exist');
  cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members').click();
  cy.xpath(hubGroupPageSelector.addMember).should('be.disabled');
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders').click();

  cy.wait(1000)
  cy.get('body').then((body) => {
    if (body.find('.css-192qrng > .MuiButton-root', { settimeout: 300000 }).length > 0) {
      cy.get('button').contains('Add New Builder').click()
      cy.get('.g-templates__side-menu > :nth-child(2)').contains('Growth').click();
      cy.get('.btn-save').contains('open template').click();
    } else {
      cy.get('button').contains('Edit Builder').click()
    }
  })
  cy.url().should('include', 'schedule')
});

// Group with Schedule [Admin]
Given('Login to rebelbase', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Verify loggedin user token and profile url', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

And('Visite to group page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click()
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
  const path = '.dev.';
  cy.url().then(($url) => {
    if ($url.includes(path)) {
      cy.url().should('include', '/hubs/26/groups/1153');
    } else {
      cy.url().should('include', '/hubs/26/groups/149');
    }
  })
  cy.get('h1').should('have.text', 'test dev group');
  cy.contains('+ add project').should('not.exist');
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects');
  cy.contains('+ add project').should('not.exist');
  cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members').click();
  cy.xpath(hubGroupPageSelector.addMember).should('be.disabled');
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders').click();
  cy.get('.edit-pen').should('not.exist');
  cy.get('.btn-main').should('not.exist');
});

// Invite new user to hub from group and create and add project to group
Given('Access rebelbase portal', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Redirect to group page for devhub', () => {
  cy.get(brainPageSelectors.notificationDismiss).click()
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
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects');
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders').click();
  cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members').click();
  cy.xpath(hubGroupPageSelector.addMember).should('be.disabled');
  cy.get(hubGroupPageSelector.inviteMembertoGroup).type('testhubadmin+8@rebelbase.co{enter}');
  cy.xpath(hubGroupPageSelector.addMember).click();
  cy.get(hubGroupPageSelector.inviteMembertoGroup)
    .clear()
    .type(email);
  cy.xpath(hubGroupPageSelector.addMember).click();
})

And('Logout to the account', () => {
  cy.get(smokeTestPageSelector.headerDropdown).first().click();
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
  // cy.get(brainPageSelectors.notificationDismiss).click();
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
  cy.get(brainPageSelectors.notificationDismiss).click();
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Creating group', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click();
  cy.get(hubGroupPageSelector.groupName)
    .clear()
    .type('test dev group');
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
  cy.get(smokeTestPageSelector.loginButton).click();
})

Then('Verify alert message', () => {
  cy.get(hubGroupPageSelector.popupNotes)
    .should('have.text', "Group name has already been taken!")
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
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders').click();
  cy.wait(1000)
  cy.get('body').then((body) => {
    if (body.find('Add New Builder', { settimeout: 300000 }).length > 0) {
      cy.get('.css-192qrng > .MuiButton-root').contains('Add New Builder').click()
      cy.get('.g-templates__side-menu > :nth-child(2)').contains('Growth').click();
      cy.get('.btn-save').contains('open template').click();
    } else {
      cy.get('.css-192qrng > .MuiButton-root').contains('Edit Builder').click()
    }
  })
  cy.get(hubGroupPageSelector.scheduleFromDate).first().clear().type('Feb 02, 2022')
  cy.xpath('(//span/button[@title="Select time"])[1]')
    .dblclick()
  cy.get('div>div>.rw-popup>ul>li').last().click()
  cy.xpath(hubGroupPageSelector.saveScheduleButton).contains('save schedule').click();
})

Then('Verify schedule is save', () => {
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Builder(s) saved successfully.')
  cy.xpath(hubGroupPageSelector.backToGroupButton).click();
});

// Add search and delete member from group
Given('Access to the rebelbase', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click()
})

When('Navigate group page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Go to group details page and delete member', () => {
  cy.get(hubGroupPageSelector.groupHeading).contains('test dev group').click({ force: true });
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects');
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders');
  cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members').click();
  cy.xpath(hubGroupPageSelector.addMember).should('be.disabled');
  cy.get('button').contains('Members Directory').click()
  cy.get(hubGroupPageSelector.inviteMemberTextbox).type('test')
  cy.get(':nth-child(2) > .flex-sb > .clickable__check-round').click()
  cy.wait(1000)
  cy.get('.btn-main')
    .should('be.visible')
    .and('be.enabled')
    .click()
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', "Member(s)  added successfully.")
  cy.get('.MuiGrid-container > :nth-child(1) > .MuiPaper-root > .MuiCardContent-root >div>button').first().click()
  cy.get(hubGroupPageSelector.newNotification).should('have.text', 'Member removed successfully')
})

And('Adding member to the group', () => {
  cy.get('button').contains('Members Directory').click()
  cy.get(hubGroupPageSelector.inviteMemberTextbox).type('test');
  cy.get(':nth-child(1) > .flex-sb > .clickable__check-round').click()
  cy.xpath(hubGroupPageSelector.addMemberBtn).click()
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', "Member(s)  added successfully.")
  cy.get("button[type='submit']").click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', "Member(s)  added successfully.");
})

Then('Deleting member from group', () => {
  cy.get('.MuiGrid-container > :nth-child(1) > .MuiPaper-root > .MuiCardContent-root >div>button').first().click()
  cy.get(hubGroupPageSelector.newNotification).should('have.text', 'Member removed successfully')
});

// Add delete manager in group
Given('Getting access on the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click()
})

When('Jumped to group page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Add new groups', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click();
  cy.get(hubGroupPageSelector.groupName)
    .clear()
    .type(randomname);
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
})

And('Verifing created group', () => {
  cy.get('h1').should('have.text', randomname);
})

And('Redirect to created group page', () => {
  cy.visit('hubs/26/groups', { timeout: 300000 });
  cy.get(brainPageSelectors.notificationDismiss).click();
  cy.get(smokeTestPageSelector.searchBar)
    .clear()
    .type(randomname)
    .wait(2000)
  cy.get("h4").contains(randomname).click();
})

And('Add manager in group', () => {
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects');
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders');
  cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members').click();
  cy.get('button').contains('Members Directory').click()
  cy.get(hubGroupPageSelector.inviteMemberTextbox).type('rebelbasetesthub');
  cy.get(':nth-child(1) > .flex-sb > .clickable__check-round').click()
  cy.xpath(hubGroupPageSelector.addMemberBtn).click()
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', "Member(s)  added successfully.")
  // cy.get(smokeTestPageSelector.headerDropdown).first().click();
  // cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Delete manager from group', () => {
  cy.get('.MuiInput-root > .MuiSelect-select').click()
  cy.get('div>ul>li').contains('Manager').click()
  cy.get(hubGroupPageSelector.newNotification).should('have.text', 'Member role updated successfully')
});

// Invite to user not part of group
Given('Logged in to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click()
})

When('Redirect to group page from DevHub', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Adding group', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click();
  cy.get(hubGroupPageSelector.groupName)
    .clear()
    .type('test dev group');
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', hubGroupPageData.groupNameExistMessage);
  cy.get(hubGroupPageSelector.popupNotes).click();
})

Then('Checking for duplicate group name', () => {
  cy.get('.ReactModal__Overlay').click();
  cy.get(hubGroupPageSelector.groupName)
    .clear()
    .type('testgroup1');
  cy.xpath(smokeTestPageSelector.createGroupButton).click()
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', hubGroupPageData.groupNameExistMessage)
});

// Deactivate group
Given('Get access Rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click()
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
  cy.get(brainPageSelectors.notificationDismiss).click()
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
  cy.get(smokeTestPageSelector.projectHover).click({ force: true });
  cy.xpath(smokeTestPageSelector.deleteButtom).click();
});

// create group with members from different hubs and GROUPS and events
Given('Login to account', () => {
  cy.login('testhubadmin+1@rebelbase.co', Cypress.env('password'))
})

When('Visit Group pages', () => {
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

And('Adding new groups', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click({ force: true });
  cy.get(hubGroupPageSelector.groupName)
    .clear()
    .type(projectName);
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
})

And('Verify group is created successfully', () => {
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects');
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders');
  cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members').click();
})

And('Adding members from different hubs and GROUPS and events', () => {
  cy.get('button').contains('Members Directory').click()
  cy.get('.clickable__check-round').eq(3).click()
  cy.get('.create-group__side-cat__link').eq(0).click()
  cy.get('.clickable__check-round').eq(0).click()
  cy.get('.create-group__side-cat__dropdown--group>span').eq(0).click()
  cy.get('.clickable__check-round').eq(0).click()
  cy.xpath(hubGroupPageSelector.addMemberBtn).should('be.enabled').click({ force: true })
})

Then('Delete group after member added successfully', () => {
  // cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click({ force: true });
  // cy.xpath(smokeTestPageSelector.groupLink).click({ force: true });
  cy.visit('hubs/26/groups')
  cy.get(smokeTestPageSelector.searchBar)
    .clear()
    .type(Cypress.env('groupname'));
  cy.get(smokeTestPageSelector.projectHover).click({ force: true });
  cy.xpath(smokeTestPageSelector.deleteButtom).click();
})

// Invite user and check invitation on web application
Given('Login using hubuser email', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click()
})

When('User is on group page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click()
  cy.xpath(smokeTestPageSelector.groupLink).contains('Groups').click()
})

And('Create group and verify is created successfully', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click({ force: true });
  cy.get(hubGroupPageSelector.groupName)
    .clear()
    .type(projectName);
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects');
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders');
  cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members').click();
})

And('Send invitation to user from group', () => {
  cy.get(hubGroupPageSelector.inviteMembertoGroup).type(Cypress.env('username1'))
  cy.get('button').contains('Add Members').click()
  cy.get(smokeTestPageSelector.headerDropdown).first().click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Check invitation from web Application', () => {
  cy.login(Cypress.env('username1'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)')
    .eq(0)
    .contains('rebelbasetesthub rebelbasetesthub gave a kudos to your Offer in the Dev Hub hub')
})

// Verify the user is logged in to admin account
Given('Login to hub admin account', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click()
})

When('Navigate to member page', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click()
  cy.xpath(smokeTestPageSelector.memberLink).contains('Members').click()
})

Then('Verify user is hub admin', () => {
  cy.url().should('include', 'members')
  cy.get('.css-1qalvlo > .MuiTypography-h4').should('have.text', 'User Management')
  cy.get('[for="invitees"]').should('have.text', 'Invite People')
  cy.get(hubGroupPageSelector.projectTab)
    .should('have.text', 'Members')
  cy.get(hubGroupPageSelector.builderTab)
    .and('have.text', 'Pending Invites')
})

// Verify the user is logged in to member account
Given('Login to hub member account', () => {
  cy.login(Cypress.env('member'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Navigate to member page for member account', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click()
  cy.xpath(smokeTestPageSelector.memberLink).contains('Members').click()
})

Then('Verify user is member', () => {
  cy.url().should('include', 'members')
  cy.get('[name="search_params"]')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'search by name')
  cy.get('.member-card')
    .should('have.length.greaterThan', 0)
})

// Verify unsuccessful invitation validation if multiple email are there
Given('Login to hub admin account', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Navigate to member page for admin account', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click()
  cy.xpath(smokeTestPageSelector.memberLink).contains('Members').click()
})

Then('Verify unsuccessful invitation validation if multiple email are there', () => {
  cy.url().should('include', 'members')
  cy.get('[placeholder="Add by email(s)"]')
    .should('be.visible')
    .type('msuryawanshi+3@rebelbase.co{enter}')
    .type('test@getnada.com{enter}')
  cy.xpath(smokeTestPageSelector.sendInviteButton).click()
  cy.get('[data-testid="hub-invite-error-response"]')
    .should('have.text', 'There were issues with some of the emails you provided, for more details Click here')
})

// Verify user is automatically added to the Dev hub and group and verify unaccepted invitations card
Given('Login to hub admin account', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Navigate to Group page for admin account', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click()
  cy.xpath(smokeTestPageSelector.groupLink).contains('Groups').click()
})

And('Create group and Invite new user to the group', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click({ force: true });
  cy.get(hubGroupPageSelector.groupName)
    .clear()
    .type(projectName);
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
  cy.get('h1').should('have.text',projectName)
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects');
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders');
  cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members').click();
  cy.get('.css-1yuhvjn')
  .should('have.css','color','rgba(0, 0, 0, 0.87)').click()
  cy.get(hubGroupPageSelector.inviteMembertoGroup).type(randomMail)
  cy.xpath(hubGroupPageSelector.addMember).click()
  cy.get('[data-testid="hub-invite-success-response"]').should('have.text','Your invites have been sent!')
  cy.get('div>div>div>div>div>img')
  .first()
  .should('have.attr', 'src').should('include','/static/media/empty_profile.ad39df0f.png')
  cy.get('div>div>div>div>div:nth-child(2)>p').first().should('have.text',randomMail)
  cy.get('div>div>div>div>div:nth-child(2)>p:nth-child(2)').first().should('have.text','Hub invitation not yet accepted')
  cy.get('[data-testid=ArrowDropDownIcon]').first().click();
  cy.get('[data-testid=LogoutIcon]').click();
})

And('Verify token from received email', () => {
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

        "token="

      ) >= 0,
      "Found reset link!"
    );

    window.token = extractData(body, startStr, endStr);
    cy.visit(
      `auth/sign-up?type=hub_event_invitation&token=${token}&email=${randomMail}`
    );
  })
  cy.get(smokeTestPageSelector.signUpFirstName)
    .clear()
    .type(randomMail);
  cy.get(smokeTestPageSelector.signUpLastName)
    .clear()
    .type(randomMail);
  cy.get(smokeTestPageSelector.signUpPassword)
    .clear()
    .type('testtest');
  cy.get(smokeTestPageSelector.signUpConfirmPassword)
    .clear()
    .type('testtest');
  cy.get(hubGroupPageSelector.allowID).click();
  cy.get(hubGroupPageSelector.pramotionalEmailID).click();
  cy.xpath(smokeTestPageSelector.getStartedButton).click({ force: true });
  cy.get(smokeTestPageSelector.autoCompleteTextbox).type('p');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.xpath(smokeTestPageSelector.readyButton).click();
  cy.xpath(hubGroupPageSelector.skipForNowButton).click({ force: true });
  cy.get(hubGroupPageSelector.popupNotes).should('have.text','Invitation acceped')
})

// Add member to the group if the user already member of the hub group
Given('Login to hub admin account', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Navigate to Group page for admin account', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click()
  cy.xpath(smokeTestPageSelector.groupLink).contains('Groups').click()
})

And('Create group and add member to the group', () => {
  cy.get(smokeTestPageSelector.addGroupButton).click({ force: true });
  cy.get(hubGroupPageSelector.groupName)
    .clear()
    .type(projectName);
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
  cy.get('h1').should('have.text',projectName)
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects');
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders');
  cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members').click();
  cy.get('button').contains('Members Directory').click()
  cy.get(hubGroupPageSelector.inviteMemberTextbox).type('Krupal')
  cy.get('div>label>span>span').contains('Krupal Patel').click()
  cy.wait(1000)
  cy.get('.btn-main')
    .should('be.visible')
    .and('be.enabled')
    .click()
  // cy.xpath(hubGroupPageSelector.addMemberBtn).click()
  cy.get(hubGroupPageSelector.popupNotes).should('have.text','Member(s)  added successfully.')
  cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Builders').click();
  cy.get(hubGroupPageSelector.groupMemberTab).should('have.text', 'Group Members').click();
  cy.get('.MuiGrid-container > :nth-child(1)').find('a').should('have.text','Patel, Krupal')
})

// Verify project tab
Given('Login to Rebelbase portal and navigate to group page', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
  cy.xpath(smokeTestPageSelector.groupLink).click();
})

When('Searching for existing group', () => {
  cy.get(smokeTestPageSelector.searchBar)
    .clear()
    .type('testproject1645634204712');
    cy.get('.group-overview__title-wrap > h4').contains('testproject1645634204712').click()
})

And('Verify project is appears when the user search using project name and member name',()=>{
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects').click();
  cy.get('#search-projects').type('CypressTestProject01')
  cy.get('#simple-tabpanel-0>div>p>div>div:nth-child(2)>div>div>div>div')
  .should('have.length',1)
  cy.get('#search-projects').clear().type('Sarvaratchagan').should('have.length',1)
  cy.get('#search-projects').clear()
})

And('Verify default sortby is selected',()=>{
  cy.xpath(smokeTestPageSelector.groupLink).click();
  cy.get(smokeTestPageSelector.addGroupButton).click({ force: true });
  cy.get(hubGroupPageSelector.groupName)
    .clear()
    .type(projectName);
  cy.xpath(smokeTestPageSelector.createGroupButton).click();
  cy.get('h1').should('have.text',projectName)
  cy.get(hubGroupPageSelector.projectTab).should('have.text', 'Projects').click();
  cy.get('#sort-by-filter-select').should('have.text','A-Z (project name)')
  cy.get('#simple-tabpanel-0').find('h4').should('have.text','Projects (0)')
  cy.get('#simple-tabpanel-0').contains('No projects found')
})