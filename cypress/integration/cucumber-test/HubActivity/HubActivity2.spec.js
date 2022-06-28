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

const { exists } = require("fs");

Before(() => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    console.log(err);
    return false;
  });
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

After(() => {
  cy.wait(2000)
})

// Q&A create reply delete
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
})

And('Ask question', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectQuestion).click({ force: true })
  cy.get(hubActivityPageSelector.questionTitle)
    .clear()
    .type('question by test automation')
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('description by test automation')
  cy.xpath(hubActivityPageSelector.askButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Question created successfully')
});

And('Answer question', () => {
  cy.get(brainPageSelectors.notificationDismiss).click();
  cy.get('.activity__nav div button').contains('Q+A').click({ force: true })
  cy.get('div:nth-child(4)>div>div>button:nth-child(2)').eq(0).click();
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Editing Question Details ...');
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Editing Question Details...');
  cy.xpath(hubActivityPageSelector.postButton).click();
})

And('Reply answer', () => {
  cy.xpath('//button[normalize-space()="0 Replies"]').click()
  cy.get(smokeTestPageSelector.postTextbox)
    .eq(1)
    .type('add reply to answer...');
  cy.xpath(hubActivityPageSelector.replyButton).click();
})

And('Delete reply from question', () => {
  cy.xpath('(//button[@id="long-button"])[3]').click({ force: true })
  cy.get('ul li button').contains('Delete').click({ force: true })
})

And('Delete answer from question', () => {
  cy.xpath('(//button[@id="long-button"])[2]').click({ force: true })
  cy.get('ul li button').contains('Delete').click({ force: true })
})

Then('Delete Question', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Are you sure you want to delete this?');
  cy.contains('No, go back').click();
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Yes, delete').click();
});

// Create offer reply and delete
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
})

And('Create offer', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectOffer).click()
  cy.get(smokeTestPageSelector.postTextbox)
    .type('cypress offer');
  cy.xpath(hubActivityPageSelector.offerButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Offer created successfully');
  cy.get(brainPageSelectors.notificationDismiss).click();
})

And('Reply to offer', () => {
  cy.xpath("(//button[@type='button'][normalize-space()='0 Replies'])[1]").click();
  cy.get("textarea[placeholder='reply...']").type('reply to offer');
  cy.xpath(hubActivityPageSelector.replyButton).click();
})

And('Give Kudos and edit offer', () => {
  cy.xpath("//button[@type='button'][normalize-space()='0 Kudos']").first().click();
  cy.get('#long-button').click()
  cy.get('ul li button').contains('Edit').click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .eq(0)
    .clear()
    .type('Editing offer...');
  cy.xpath(eventPageSelectors.submitButton).contains('Submit').click();
})

Then('Delete Offer', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Yes, delete').click();
});

// // Edit role from activity page
// Given('Verify profile page and cookies', () => {
//   cy.url().should('include', '/profile/2466');
//   cy.getCookie('token').should('exist');
// })

// When('User at Activity page', () => {
//   cy.visit('/hubs/26/activity');
//   
//   cy.get(brainPageSelectors.notificationDismiss).click()
// })

// And('Edit admin role card', () => {
//   cy.get('.hub__topHeader__dropdown-wrap')
//     .find('.hub__topHeader__dropdown__links')
//     .contains('Edit my role(s)')
//     .click({ force: true });
//   cy.get(hubActivityPageSelector.editLink).contains('edit admin role card').click();
//   cy.xpath(hubActivityPageSelector.saveButton).contains('Save').click(); cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Admin card updated successfully.');
//   cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Admin card updated successfully.');
//   cy.xpath(brainPageSelectors.closeModelButton).contains('x').click({ force: true })
// })

// And('Edit support role card', () => {
//   cy.get('.hub__topHeader__dropdown-wrap')
//     .find('.hub__topHeader__dropdown__links')
//     .contains('Edit my role(s)')
//     .click({ force: true });
//   cy.get(hubActivityPageSelector.editLink).contains('edit support role card').click();
//   cy.get('.rw-input-reset').clear();
//   cy.get('.rw-multiselect-tag-btn').find('span').click({
//     force: true
//   });
//   cy.get('.rw-input-reset').type('Tech Support');
//   cy.get('.rw-list-option').click();
//   cy.get('span').get('.rw-select').click({
//     force: true
//   });
//   cy.get('input').get('.supportCardForm__field').eq(1).clear();
//   cy.get('input')
//     .get('.supportCardForm__field')
//     .eq(1)
//     .type(Cypress.env('username'));
//   cy.get('.supportCardForm__btn').contains('Save').click();
// })

// Then('Send invitation', () => {
//   cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Support card updated successfully.');
//   cy.xpath(brainPageSelectors.closeModelButton).contains('x').click({ force: true })
//   cy.get('.hub__topHeader__dropdown-wrap')
//     .find('.hub__topHeader__dropdown__links')
//     .contains('Invite Members')
//     .click({ force: true });
//   cy.get(brainPageSelectors.inviteModelTextbox)
//     .type('testhubadmin+12@rebelbase.co');
//   cy.get(':nth-child(6) > .invite-to-hub__group__label').click();
//   cy.xpath(brainPageSelectors.sendInviteButton).click();
//   cy.xpath(brainPageSelectors.closeModelButton).click();
// });

// Check announcement notification on web application
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
})

And('Make announcement for web application', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectAnnouncment).click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('cypress automation announcement')
  cy.xpath(hubActivityPageSelector.announceButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Announcement created successfully')
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

And('Login and give kudos to announcment', () => {
  cy.login(Cypress.env('emailuser'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get('.activity__nav div button').eq(1)
    .click();
  cy.xpath("//button[contains(text(),'0 Kudos')]").eq(0).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Check activity notification for announcement', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).contains('rebelbasetesthub rebelbasetesthub gave a kudos to your Announcement in the Dev Hub hub')
})

// Check Q+A notification on web application
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
})

And('Make question for web application', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectQuestion).click({ force: true })
  cy.get(hubActivityPageSelector.questionTitle).type('Cypress Question')
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('cypress automation question')
  cy.xpath(hubActivityPageSelector.askButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Question created successfully')
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

And('Login and give kudos to question', () => {
  cy.login(Cypress.env('emailuser'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get('.activity__nav div button').eq(3)
    .click();
  cy.xpath("//button[contains(text(),'0 Kudos')]").eq(0).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Check activity notification for question', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).contains('rebelbasetesthub rebelbasetesthub gave a kudos to your Question in the Dev Hub hub')
})

// Check idea notification on web application
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
})

And('Make idea for web application', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectIdea).click({ force: true })
  cy.get('[name="idea"]').type('Test idea')
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('cypress automation idea')
  cy.xpath('//button[text()="Add"]').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Idea created successfully')
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

And('Login and give kudos to idea', () => {
  cy.login(Cypress.env('emailuser'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get('.activity__nav div button').eq(4)
    .click();
  cy.xpath("//button[contains(text(),'0 Kudos')]").eq(0).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Check activity notification for idea', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).contains('rebelbasetesthub rebelbasetesthub gave a kudos to your Idea in the Dev Hub hub')
})

// Check offer notification on web application
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
})

And('Make offer for web application', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectOffer).click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('cypress automation offer')
  cy.xpath(hubActivityPageSelector.offerButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Offer created successfully')
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

And('Login and give kudos to Offer', () => {
  cy.login(Cypress.env('emailuser'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get('.activity__nav div button').eq(5)
    .click();
  cy.xpath("//button[contains(text(),'0 Kudos')]").eq(0).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Check activity notification for Offer', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(1).contains('rebelbasetesthub rebelbasetesthub gave a kudos to your Offer in the Dev Hub hub')
})

// Check read more button if post have long text
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
})

And('Make offer for read more button', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectOffer).click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type(`In publishing and graphic design, Lorem ipsum is a 
    placeholder text commonly used to demonstrate the visual 
    form of a document or a typeface without relying on 
    meaningful content. Lorem ipsum may be used as a placeholder 
    before final copy is available.In publishing and graphic 
    design, Lorem ipsum is a placeholder text commonly used to 
    demonstrate the visual form of a document or a typeface without 
    relying on meaningful content. Lorem ipsum may be used as a 
    placeholder before final copy is available.`)
  cy.xpath(hubActivityPageSelector.offerButton).click();
  cy.get('div>div>div:nth-child(3)>div>div:nth-child(2)>button').eq(2).should('have.text', 'read more')
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Offer created successfully')
})

// Check expand button for offer, announcement, and post
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
})

And('Check expand button for announcement',()=>{
  cy.get('.activity__nav div button').contains('Announcements')
    .click();
  cy.get('#long-button').click()
  cy.get('ul li button').contains('Expand').should('be.exist').click()
  cy.contains('back to activities').click({force:true})
})

And('Check expand button for post',()=>{
  cy.get('.activity__nav div button').contains('Posts')
    .click();
    cy.get('#long-button').click()
    cy.get('ul li button').contains('Expand').should('be.exist').click()
    cy.contains('back to activities').click({force:true})
})

Then('Check expand button for offer',()=>{
  cy.get('.activity__nav div button').contains('Offers')
    .click();
    cy.get('#long-button').click()
    cy.get('ul li button').contains('Expand').should('be.exist').click()
    cy.contains('back to activities').click({force:true})
})