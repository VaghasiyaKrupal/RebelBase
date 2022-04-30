import { Before, Given, When, And, Then, After } from "cypress-cucumber-preprocessor/steps";
import { brainPageSelectors } from "../../pageObject/pageSelectors/brainPageSelectors";
import { brainPageData } from "../../pageObject/pageData/brainPageData";

Before(() => {
  cy.loginViaUISession(Cypress.env('username'), Cypress.env('password'));
});

After(()=>{
  cy.wait(2000)
})

// Send hub invitation from brain page ,delete invitation and resend invitation to user
Given('I access the brain section page', () => {
  cy.visit(brainPageData.brainURL); // Visit Brain screen
})

When('I send hub invitation from brain page', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click(); // Click on the Notification dismiss button
  cy.xpath(brainPageSelectors.inviteMemberButton).click(); // Click on invite member button
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(brainPageData.testHubAdmin2Email); // Clear textbox in the dialog box
  cy.get(brainPageSelectors.selectProjectFromModel)
    .eq(1)
    .click({ force: true }); // Select project
  cy.xpath(brainPageSelectors.sendInviteButton).click(); // Click on send invite button
  cy.xpath(brainPageSelectors.closeModelButton).click(); // Click on cross button to close model
})

And('Send nudge and delete invitation', () => {
  cy.xpath(brainPageSelectors.seeAllLink).click(); // Click on see all link
  cy.get(brainPageSelectors.sendNudgeButton).eq(0).click(); // Click on send nudge button from pop-up
  cy.wait(500)
  cy.get(brainPageSelectors.notification).contains(brainPageData.invitationResentMessage).should('be.visible'); // Verifing notication text
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get(brainPageSelectors.deleteButton) // Click on the delete button from the pop-up
    .eq(0)
    .click();
  cy.get(brainPageSelectors.notification).contains(brainPageData.invitationDeleteMessage); // Verifing notification
  cy.xpath(brainPageSelectors.notificationDismiss).click(); // Close the notification
})

And('Reend invitation', () => {
  cy.xpath(brainPageSelectors.inviteMemberButtonInModel).click(); // Click on invite member from model
  cy.get(brainPageSelectors.inviteModelTextbox)
    .clear()
    .type(Cypress.config('randomname') + '@gmail.com');
  cy.get(brainPageSelectors.selectProjectFromModel)
    .eq(1)
    .click(); // Select project
  cy.xpath(brainPageSelectors.sendInviteButton).click(); // Click on send invite button
  cy.get(brainPageSelectors.feedbackNotification).contains(brainPageData.invitationSuccessMessage); // verifing notification text
  cy.xpath(brainPageSelectors.closeModelButton)
    .eq(1)
    .click(); // Click on cross button to close model
})

And('Resend nudge', () => {
  cy.get(brainPageSelectors.sendNudgeButton).eq(0).click(); // Click on the send nudge button from model
  cy.xpath(brainPageSelectors.notificationDismiss).click(); // Close the notification
  cy.xpath(brainPageSelectors.closeModelButton).click(); // Click on cross button to close model
});

// Navigate through the links using loops
Given('I access the brain section page', () => {
  Cypress.Cookies.preserveOnce('session_id', 'remember_token')
  cy.visit(brainPageData.brainURL); // Visit Brain screen
})

When('Close Notification', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click(); // Close the notification
})

And('Nevigate to RebelBase Hub 101', () => {
  cy
    .xpath("//a[1]")
    .then(link => {
      cy
        .request(link.prop('href'))
        .its('status')
        .should('eq', 200);
    });
})

And('Nevigate to Projects + Builders', () => {
  cy
    .xpath("//a[2]")
    .then(link => {
      cy
        .request(link.prop('href'))
        .its('status')
        .should('eq', 200);
    });
})

And('Nevigate to Collaboration', () => {
  cy
    .xpath("//a[3]")
    .then(link => {
      cy
        .request(link.prop('href'))
        .its('status')
        .should('eq', 200);
    });
})

And('Nevigate to Invite to Your Hub', () => {
  cy
    .xpath("//a[4]")
    .then(link => {
      cy
        .request(link.prop('href'))
        .its('status')
        .should('eq', 200);
    });
})

And('Nevigate to Groups', () => {
  cy
    .xpath("//a[5]")
    .then(link => {
      cy
        .request(link.prop('href'))
        .its('status')
        .should('eq', 200);
    });
})

And('Nevigate to Events', () => {
  cy
    .xpath("//a[6]")
    .then(link => {
      cy
        .request(link.prop('href'))
        .its('status')
        .should('eq', 200);
    });
})

// And('Nevigate to Onboard Cohorts', () => {
//   cy
//     .xpath("//a[7]")
//     .then(link => {
//       cy
//         .request(link.prop('href'))
//         .its('status')
//         .should('eq', 200);
//     })
// })

// And('Nevigate to Troubleshooting', () => {
//   cy
//     .xpath("//a[8]")
//     .then(link => {
//       cy
//         .request(link.prop('href'))
//         .its('status')
//         .should('eq', 200);
//     })
// });
