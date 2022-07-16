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

  Given('Verify dashbboard and cookies - Hub Activity Script', () => {
    cy.url().should('include', '/dashboard');
    cy.getCookie('token').should('exist');
  })

  When('Go to Activity page - Hub Activity Script', () => {
    cy.visit('/hubs/26/activity');
    cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
  })
})

After(() => {
  cy.wait(1000)
})

// Visit Dev Hub - Hub Activity Script
Then('Verify Dev Hub - Hub Activity Script', () => {
  cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').should('exist');
});

// Edit Hub Description - Hub Activity Script
And('Change hub title - Hub Activity Script', () => {
  cy.get('.activity__wrap__posted-by-me').contains('Posted By Me').should('be.visible')
  cy.get('body').then((body) => {
    if (body.find('.hub__show-header__show').length > 0) {
      cy.get('.hub__show-header__show').click()
    }
  })
  cy.get(eventPageSelectors.editPen).click();
  cy.get(hubActivityPageSelector.pageTitle).contains('Change Hub Details');
})

Then('Change hub description - Hub Activity Script', () => {
  cy.get(hubActivityPageSelector.descriptionTextbox)
    .clear()
    .type('Testing Hub' + Cypress.config('randomname'));
  cy.xpath(hubActivityPageSelector.saveButton).contains('Save').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Hub details updated.');
  cy.get('.hub__hide-header__hide').contains('hide header').click()
});

// // Edit Membership - Hub Activity Script
// And('Edit role - Hub Activity Script', () => {
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

// And('Edit Membership - Hub Activity Script', () => {
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

// Then('Verify edited details - Hub Activity Script', () => {
//   cy.get(' div > div > button.btn-x').eq(2).should('be.visible');
//   cy.get(' div > div > button.btn-x').eq(2).click();
//   cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
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

// Make announcement - Hub Activity Script
Then('Make Announcement - Hub Activity Script', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectAnnouncment).contains('Announcement').click();
  cy.get(smokeTestPageSelector.postTextbox).type('Make Announcement');
  cy.get(hubActivityPageSelector.stickyCheckbox).check();
  cy.xpath(hubActivityPageSelector.announceButton).click();
});

// Edit announcement - Hub Activity Script
And('Cancel announcement after edit - Hub Activity Script', () => {
  cy.get('.activity__nav div button').eq(1)
    .click();
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Edit').click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Editing Announcement...');
  cy.xpath(hubActivityPageSelector.cancelButton).contains('Cancel').click();
})

Then('Save announcement after edit - Hub Activity Script', () => {
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

// Unstick announcement - Hub Activity Script
Then('Make announcement unsticky - Hub Activity Script', () => {
  cy.get('.activity__nav div button').eq(1)
    .click();
  cy.get('#long-button').eq(0).click()
  cy.wait(1000)
  cy.get('ul li button').contains('Unstick').click({ force: true })
});

// Make announcement sticky - Hub Activity Script
Then('Make announcement sticky - Hub Activity Script', () => {
  cy.get('.activity__nav div button').eq(1)
    .click();
  cy.wait(1000)
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Sticky').click({ force: true })
});

// Delete announcement - Hub Activity Script
And('Verify announcement not deleted - Hub Activity Script', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Are you sure you want to delete this?');
  cy.contains('No, go back').click();
})

Then('Delete announcement - Hub Activity Script', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Yes, delete').click();
});

// Create a Post - Hub Activity Script
Then('Create post - Hub Activity Script', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectPost).click();
  cy.get(smokeTestPageSelector.postTextbox).type('Make Post');
  cy.xpath(smokeTestPageSelector.postButton).click();
  cy.get(hubGroupPageSelector.popupNotes).contains('Post created successfully');
});

// Switch to Post - Hub Activity Script
Then('Go to post page - Hub Activity Script', () => {
  cy.get('.activity__nav div button').eq(2).click();
})

// Edit post - Hub Activity Script
And('Verify post is not edit - Hub Activity Script', () => {
  cy.get('.activity__nav div button').eq(2)
    .click();
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Edit').click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear().type('Editing Post...');
  cy.xpath(hubActivityPageSelector.cancelButton).contains('Cancel').click();
})

Then('Edit post - Hub Activity Script', () => {
  cy.get('.activity__nav div button').eq(2)
    .click();
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Edit').click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear().type('Editing Post...');
  cy.xpath(eventPageSelectors.submitButton).contains('Submit').click();
});

// Delete post - Hub Activity Script
And('Verify post is not deleted - Hub Activity Script', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Are you sure you want to delete this?');
  cy.contains('No, go back').click();
})

Then('Delete post - Hub Activity Script', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Yes, delete').click();
});

// Ask a question - Hub Activity Script
Then('Ask a question - Hub Activity Script', () => {
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

// Edit a question - Hub Activity Script
And('Check cancel edit - Hub Activity Script', () => {
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

Then('Edit a question - Hub Activity Script', () => {
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

// Redirect to question page - Hub Activity Script
Then('Go to Question page - Hub Activity Script', () => {
  cy.get('.activity__nav div button').eq(3).click()
});

// Add answer - Hub Activity Script
Then('Add answer - Hub Activity Script', () => {
  cy.get('.activity__nav div button').eq(3).click()
  cy.xpath(hubActivityPageSelector.answerButton).eq(0).click();
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Add answer..test.')
  cy.xpath(hubActivityPageSelector.postButton).click();
});

// Add reply to answer - Hub Activity Script
And('Reply to answer - Hub Activity Script', () => {
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

Then('Add more reply to answer - Hub Activity Script', () => {
  cy.get(smokeTestPageSelector.postTextbox)
    .eq(1)
    .clear()
    .type('add more reply to answer...');
  cy.xpath(hubActivityPageSelector.replyButton).click();
});

// Delete reply - Hub Activity Script
Then('Delete Replay - Hub Activity Script', () => {
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

// Add more answer - Hub Activity Script
Then('Add more answer - Hub Activity Script', () => {
  cy.wait(2000)
  cy.get('.activity__nav div button').eq(3).click()
  cy.get('div:nth-child(4)>div>div>button:nth-child(2)').eq(0).click({ force: true });
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('Add more answer...')
  cy.xpath(hubActivityPageSelector.postButton).click();
});

// Give upvote to answer - Hub Activity Script
Then('Upvote answer - Hub Activity Script', () => {
  cy.wait(2000)
  cy.get('.activity__nav div button').contains('Q+A').click({ force: true })
  cy.get('div:nth-child(4)>div>div>button:nth-child(2)').eq(0).click({ force: true });
  cy.get(hubActivityPageSelector.upVoteAnswer).click({ multiple: true });
});

// QandA create reply delete - Hub Activity Script
And('Ask question - Hub Activity Script', () => {
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

And('Answer question - Hub Activity Script', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
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

And('Reply answer - Hub Activity Script', () => {
  cy.xpath('//button[normalize-space()="0 Replies"]').click()
  cy.get(smokeTestPageSelector.postTextbox)
    .eq(1)
    .type('add reply to answer...');
  cy.xpath(hubActivityPageSelector.replyButton).click();
})

And('Delete reply from question - Hub Activity Script', () => {
  cy.xpath('(//button[@id="long-button"])[3]').click({ force: true })
  cy.get('ul li button').contains('Delete').click({ force: true })
})

And('Delete answer from question - Hub Activity Script', () => {
  cy.xpath('(//button[@id="long-button"])[2]').click({ force: true })
  cy.get('ul li button').contains('Delete').click({ force: true })
})

Then('Delete Question - Hub Activity Script', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Are you sure you want to delete this?');
  cy.contains('No, go back').click();
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Yes, delete').click();
});

// Create offer reply and delete - Hub Activity Script
And('Create offer - Hub Activity Script', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectOffer).click()
  cy.get(smokeTestPageSelector.postTextbox)
    .type('cypress offer');
  cy.xpath(hubActivityPageSelector.offerButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Offer created successfully');
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true });
})

And('Reply to offer - Hub Activity Script', () => {
  cy.xpath("(//button[@type='button'][normalize-space()='0 Replies'])[1]").click();
  cy.get("textarea[placeholder='reply...']").type('reply to offer');
  cy.xpath(hubActivityPageSelector.replyButton).click();
})

And('Give Kudos and edit offer - Hub Activity Script', () => {
  cy.xpath("//button[@type='button'][normalize-space()='0 Kudos']").first().click();
  cy.get('#long-button').click()
  cy.get('ul li button').contains('Edit').click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .eq(0)
    .clear()
    .type('Editing offer...');
  cy.xpath(eventPageSelectors.submitButton).contains('Submit').click();
})

Then('Delete Offer - Hub Activity Script', () => {
  cy.get('#long-button').eq(0).click()
  cy.get('ul li button').contains('Delete').click({ force: true })
  cy.contains('Yes, delete').click();
});

// // Edit role from activity page - Hub Activity Script
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

// Check announcement notification on web application - Hub Activity Script
And('Make announcement for web application - Hub Activity Script', () => {
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

And('Login and give kudos to announcment - Hub Activity Script', () => {
  cy.login(Cypress.env('emailuser'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get('.activity__nav div button').eq(1)
    .click();
  cy.xpath("//*[text()='0 Kudos']").eq(0).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Check activity notification for announcement - Hub Activity Script', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');

  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).contains('rebelbasetesthub rebelbasetesthub gave a kudos to your Announcement in the Dev Hub hub')
})

// Check Q+A notification on web application - Hub Activity Script
And('Make question for web application - Hub Activity Script', () => {
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

And('Login and give kudos to question - Hub Activity Script', () => {
  cy.login(Cypress.env('emailuser'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get('.activity__nav div button').eq(3)
    .click();
  cy.xpath("//*[text()='0 Kudos']").eq(0).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Check activity notification for question - Hub Activity Script', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).contains('rebelbasetesthub rebelbasetesthub gave a kudos to your Question in the Dev Hub hub')
})

// Check idea notification on web application - Hub Activity Script
And('Make idea for web application - Hub Activity Script', () => {
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

And('Login and give kudos to idea - Hub Activity Script', () => {
  cy.login(Cypress.env('emailuser'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get('.activity__nav div button').eq(4)
    .click();
  cy.xpath("//*[text()='0 Kudos']").eq(0).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Check activity notification for idea - Hub Activity Script', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).contains('rebelbasetesthub rebelbasetesthub gave a kudos to your Idea in the Dev Hub hub')
})

// Check offer notification on web application - Hub Activity Script
And('Make offer for web application - Hub Activity Script', () => {
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

And('Login and give kudos to Offer - Hub Activity Script', () => {
  cy.login(Cypress.env('emailuser'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get('.activity__nav div button').eq(5)
    .click();
  cy.xpath("//*[text()='0 Kudos']").eq(0).click()
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Check activity notification for Offer - Hub Activity Script', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');

  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).contains('rebelbasetesthub rebelbasetesthub gave a kudos to your Offer in the Dev Hub hub')
})

// Check read more button if post have long text - Hub Activity Script
Then('Make offer for read more button - Hub Activity Script', () => {
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

// Check expand button for offer, announcement, and post - Hub Activity Script
And('Check expand button for announcement - Hub Activity Script', () => {
  cy.get('.activity__nav div button').contains('Announcements')
    .click();
  cy.get('#long-button').click()
  cy.get('ul li button').contains('Expand').should('be.exist').click()
  cy.contains('back to activities').click({ force: true })
})

And('Check expand button for post - Hub Activity Script', () => {
  cy.get('.activity__nav div button').contains('Posts')
    .click();
  cy.get('#long-button').click()
  cy.get('ul li button').contains('Expand').should('be.exist').click()
  cy.contains('back to activities').click({ force: true })
})

Then('Check expand button for offer - Hub Activity Script', () => {
  cy.get('.activity__nav div button').contains('Offers')
    .click();
  cy.get('#long-button').click()
  cy.get('ul li button').contains('Expand').should('be.exist').click()
  cy.contains('back to activities').click({ force: true })
})

// Check notification when hub is not owner of the post - Hub Activity Script
And('Make Post - Hub Activity Script', () => {
  cy.xpath(hubActivityPageSelector.addYourThought).contains('Add your thoughts').click({
    force: true
  });
  cy.xpath(hubActivityPageSelector.selectPost).click({ force: true })
  cy.get(smokeTestPageSelector.postTextbox)
    .clear()
    .type('cypress automation post')
  cy.get('.ReactModal__Content--after-open').find('button').contains('Post').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Post created successfully')
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
});

And('Login and give reply to the post - Hub Activity Script', () => {
  cy.login(Cypress.env('member'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get('.activity__nav div button').eq(2)
    .click();
  cy.xpath('//button[normalize-space()="0 Replies"]').first().click()
  cy.get(smokeTestPageSelector.postTextbox)
    .eq(0)
    .type('add reply to post...');
  cy.xpath(hubActivityPageSelector.replyButton).click();
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get(smokeTestPageSelector.logoutButton).click();
})

Then('Check activity notification for post - Hub Activity Script', () => {
  cy.login(Cypress.env('username1'), Cypress.env('password'))
  cy.visit('/hubs/26/activity');
  cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
  cy.get(hubActivityPageSelector.bellIcon).click()
  cy.get('div> div >li>a>div>div:nth-child(2)').eq(0).should('not.include.text', 'test2 test22 replied to your Post in the Dev Hub hub')
})