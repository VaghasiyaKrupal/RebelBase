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

// C177 Visit Dev Hub [Hub Activity]
Given('Verify profile and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to the Activity page', () => {
  cy.visit('/hubs/26/activity');
})

And('Close the notification', () => {
  ;
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Verify Dev Hub', () => {
  cy.contains('Dev Hub');
});

// C178 Edit Hub Description[Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity',{timeout:200000});
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

And('Close the notification', () => {
  cy.get(brainPageSelectors.notificationDismiss).click();
})

And('Change hub title', () => {
  cy.get('.hub__show-header__show').contains('show header').click()
  cy.get(eventPageSelectors.editPen).click();
  cy.get(hubActivityPageSelector.pageTitle).contains('Change Hub Details');
})

Then('Change hub description', () => {
  cy.get(hubActivityPageSelector.descriptionTextbox)
    .clear()
    .type('Testing Hub' + Cypress.config('randomname'));
  cy.xpath(hubActivityPageSelector.saveButton).contains('Save').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Hub details updated.');
  cy.get('.hub__hide-header__hide').contains('hide header').click()
});

// // Edit Membership [Hub Activity]
// Given('Verify profile page and cookies', () => {
//   cy.url().should('include', '/profile/2466');
//   cy.getCookie('token').should('exist');
// })

// When('Go to Activity', () => {
//   cy.visit('/hubs/26/activity');
// })

// And('Edit role', () => {
//   cy.get(brainPageSelectors.notificationDismiss).click();
//   cy.get('.hub__topHeader__dropdown-wrap')
//     .find('.hub__topHeader__dropdown__links')
//     .contains('Edit my role(s)')
//     .click({ force: true });
//   cy.contains('Edit Membership');
//   cy.contains('Hub Admin');
//   cy.get(hubActivityPageSelector.editLink).contains('edit admin role card').click();
//   cy.contains('Role at Dev Hub:');
//   cy.get(hubActivityPageSelector.roleTitleTextbox)
//     .clear()
//     .type('Admin');
//   cy.xpath(hubActivityPageSelector.saveButton).contains('Save').click();
//   cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Admin card updated successfully.');
//   cy.xpath(brainPageSelectors.closeModelButton).contains('x').click({ force: true });
// })

// And('Edit Membership', () => {
//   cy.get('.hub__topHeader__dropdown-wrap')
//     .find('.hub__topHeader__dropdown__links')
//     .contains('Edit my role(s)')
//     .click({ force: true });
//   cy.contains('Edit Membership');
//   cy.get('.checkbox-wrapper').find('#rebel').check({ force: true });
//   cy.get(hubActivityPageSelector.editLink).contains('edit rebel role card').click();
//   cy.get('.rebelCardForm__title').contains('Select Projects for Hub');
//   cy.xpath("//li[normalize-space()='CypressTestProject01']").contains('CypressTestProject01').click();
//   cy.xpath("//div[@aria-label='Rebel Card Modal']//button[@class='btn-x'][normalize-space()='x']").click();
//   cy.contains('Edit Membership');
//   cy.get('.checkbox-wrapper').find('#support').check({ force: true });
//   cy.get(hubActivityPageSelector.editLink).contains('edit support role card').click();
//   cy.get('.rw-multiselect-tag-btn').find('span').click({ multiple: true });
//   cy.get('.rw-input-reset').clear();
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
//   cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Support card updated successfully.');
// })

// Then('Verify edited details', () => {
//   cy.get(' div > div > button.btn-x').eq(2).should('be.visible');
//   cy.get(' div > div > button.btn-x').eq(2).click();
//   cy.get(brainPageSelectors.notificationDismiss).click();
//   cy.get('.hub__topHeader__dropdown-wrap')
//     .find('.hub__topHeader__dropdown__links')
//     .contains('Edit my role(s)')
//     .click({
//       force: true
//     });
//   cy.contains('Edit Membership');
//   cy.get('.member-info').contains('Admin');
//   // cy.get('.member-info--sub').contains('CypressTestProject01');
//   cy.get('.tags').contains('Tech Support');
//   cy.contains(Cypress.env('username'));
//   cy.xpath(brainPageSelectors.closeModelButton).contains('x').click({ force: true });
// });

// C180 Make announcement [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity pages', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Make Announcement', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectAnnouncment).contains('Announcement').click();
  cy.get(smokeTestPageSelector.postTextbox).type('Make Announcement');
  cy.get(hubActivityPageSelector.stickyCheckbox).check();
  cy.xpath(hubActivityPageSelector.announceButton).click();
});

// C181 Edit announcement [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Visit Activity page', () => {
  cy.visit('/hubs/26/activity');
  
})

And('Cancel announcement after edit', () => {
  cy.get(brainPageSelectors.notificationDismiss).click();
  cy.get('.activity__nav div button').eq(1)
    .click();
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Edit').click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Editing Announcement...');
  cy.xpath(hubActivityPageSelector.cancelButton).contains('Cancel').click();
})

Then('Save announcement after edit', () => {
  cy.get('.activity__nav div button').eq(1)
    .click();
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Edit').click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Editing Announcement...');
  cy.xpath(eventPageSelectors.submitButton).contains('Submit').click();
  // cy.get(hubGroupPageSelector.popupNotes).should('have.text','Announcement updated successfully.');
});

// C182 Unstick announcement [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Redirect to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Make announcement unsticky', () => {
  cy.get('.activity__nav div button').eq(1)
    .click();
  cy.get('#long-button').eq(0).click()
  cy.wait(1000)
  cy.get('ul li button').contains('Unstick').click({ force: true })
});

// C183 Make announcement sticky [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity pages', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Make announcement sticky', () => {
  cy.get('.activity__nav div button').eq(1)
    .click();
  cy.wait(1000)
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Sticky').click({ force: true })
});

// C184 Delete announcement [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

And('Verify announcement not deleted', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Are you sure you want to delete this?');
  cy.contains('No, go back').click();
})

Then('Delete announcement', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Yes, delete').click();
});

// C185 Create a Post [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Create post', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectPost).click();
  cy.get(smokeTestPageSelector.postTextbox).type('Make Post');
  cy.xpath(smokeTestPageSelector.postButton).click();
  cy.get(hubGroupPageSelector.popupNotes).contains('Post created successfully');
});

// C186 Switch to Post [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Go to post page', () => {
  cy.get('.activity__nav div button').eq(2).click();
})

// C187 Edit post [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

And('Verify post is not edit', () => {
  cy.get('.activity__nav div button').eq(2)
    .click();
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Edit').click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear().type('Editing Post...');
  cy.xpath(hubActivityPageSelector.cancelButton).contains('Cancel').click();
})

Then('Edit post', () => {
  cy.get('.activity__nav div button').eq(2)
    .click();
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Edit').click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear().type('Editing Post...');
  cy.xpath(eventPageSelectors.submitButton).contains('Submit').click();
});

// C188 Delete post [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

And('Verify post is not deleted', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Are you sure you want to delete this?');
  cy.contains('No, go back').click();
})

Then('Delete post', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Yes, delete').click();
});

// C189 Ask a question [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
})

Then('Ask a question', () => {
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

// C190 Edit a question [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

And('Check cancel edit', () => {
  cy.get('.activity__nav div button').contains('Q+A').click({ force: true })
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Edit').click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Editing Question. test..');
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Editing Question Details test...');
  cy.xpath(hubActivityPageSelector.cancelButton).contains('Cancel').click();
})

Then('Edit a question', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Edit').click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Editing Question Details test...');
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Editing Question Details.tse ..');
  cy.xpath(eventPageSelectors.submitButton).contains('Submit').click();
});

// C191 Redirect to question page [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Go to Question page', () => {
  cy.get('.activity__nav div button').eq(3).click()
});

// C192 Add answer [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Add answer', () => {
  cy.get('.activity__nav div button').eq(3).click()
  cy.xpath(hubActivityPageSelector.answerButton).eq(0).click();
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Add answer..test.')
  cy.xpath(hubActivityPageSelector.postButton).click();
});

// C193 Add reply to answer [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

And('Reply to answer', () => {
  cy.wait(2000)
  cy.get('.activity__nav div button').eq(3).click()
  cy.get('div:nth-child(4)>div>div>button:nth-child(2)').eq(0).click({ force: true });
  cy.wait(1000)
  cy.xpath('//button[normalize-space()="0 Replies"]').click()
  cy.get(smokeTestPageSelector.postTextbox)
    .eq(1)
    .type('add reply to answer...');
  cy.xpath(hubActivityPageSelector.replyButton).click();
})

Then('Add more reply to answer', () => {
  cy.get(smokeTestPageSelector.postTextbox)
    .eq(1)
    .clear()
    .type('add more reply to answer...');
  cy.xpath(hubActivityPageSelector.replyButton).click();
});

// C194 Delete reply [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Delete Replay', () => {
  cy.wait(2000)
  cy.get('.activity__nav div button').eq(3).click()
  cy.get('div:nth-child(4)>div>div>button:nth-child(2)').eq(0).click({ force: true });
  cy.wait(1000)
  cy.xpath('//button[normalize-space()="2 Replies"]').click()
  cy.xpath('(//button[@id="long-button"])[3]').click({ force: true })
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.xpath('(//button[@id="long-button"])[3]').click({ force: true })
  cy.get('ul li button').contains('Delete').click({ force: true })
});

// C195 Add more answer [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click();
})

Then('Add more answer', () => {
  cy.wait(2000)
  cy.get('.activity__nav div button').eq(3).click()
  cy.get('div:nth-child(4)>div>div>button:nth-child(2)').eq(0).click({ force: true });
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Add more answer...')
  cy.xpath(hubActivityPageSelector.postButton).click();
});

//C196 Give upvote to answer [Hub Activity]
Given('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/2466');
  cy.getCookie('token').should('exist');
})

When('Go to Activity page', () => {
  cy.visit('/hubs/26/activity');
  
  cy.get(brainPageSelectors.notificationDismiss).click()
})

And('Upvote answer', () => {
  cy.wait(2000)
  cy.get('.activity__nav div button').contains('Q+A').click({ force: true })
  cy.get('div:nth-child(4)>div>div>button:nth-child(2)').eq(0).click({ force: true });
  cy.get(hubActivityPageSelector.upVoteAnswer).click({ multiple: true });
});