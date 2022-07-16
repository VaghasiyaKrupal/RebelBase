import { Before, After, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { builderPageData } from '../../pageObject/pageData/builderPageData'
import { builderPageSelectors } from '../../pageObject/pageSelectors/builderPageSelectors'
import { brainPageSelectors } from '../../pageObject/pageSelectors/brainPageSelectors'
import { smokeTestPageSelector } from "../../pageObject/pageSelectors/smokeTestPageSelector";
import { parseBODYSTRUCTURE } from "emailjs-imap-client/dist/command-parser";

Before(() => {
  cy.loginViaUISession(Cypress.env('username'), Cypress.env('password'));
});

After(() => {
  cy.wait(2000)
})

// Empty builder's answer [Builder'sAnswer]
Given("Visit builder answer page", () => {
  cy.visit('/project/1511/builders/1/topics/1/answer');

})

When('Close the notification', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({force:true});
})

Then('Find paragraph from answer', () => {
  cy.get(builderPageSelectors.qlEditor).find('p');
});

// // Builder's answer with some text [Builder'sAnswer]
// Given('Visit builder answer page', () => {
//   cy.visit('/project/1511/builders/1/topics/43/answer');

// })

// When('Close the notification', () => {
//   cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
// })

// Then('Find Lorem Ipsum from answer', () => {
//   cy.get('.ql-editor').find('p').contains('Lorem Ipsum');
// });

// Save builder's answer with some random text [Builder'sAnswer]
Given('Visit builder answer page', () => {
  cy.visit('/project/1511/builders/1/topics/4/answer');

})

When('Close the notification', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
})

And('Enter builder answer with random text', () => {
  cy.get(builderPageSelectors.qlEditor).clear();
  cy.get(builderPageSelectors.qlEditor)
    .find('p')
    .type(
      `Testing with some random text.... ${[...Array(30)]
        .map(() => Math.random().toString(36)[2])
        .join('')}`
    );
})

Then('Click on the save + next button', () => {
  cy.xpath(builderPageSelectors.saveAndNextButton).click();
  cy.location('pathname').should(
    'equal',
    '/project/1511/builders/1/overview'
  );
  cy.wait(2000)
  cy.contains(builderPageData.saveAnswer);
});

// try to redirect to some other page without saving answer [Builder'sAnswer]
Given('Visit builder topic 4 answer page', () => {
  cy.visit('/project/1511/builders/1/topics/4/answer');

})

When('Close the notification', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
})

And('Enter builder answer with random text', () => {
  cy.wait(2000)
  cy.get(builderPageSelectors.qlEditor).clear();
  cy.get(builderPageSelectors.qlEditor)
    .find('p')
    .type(
      `Testing with some random text.... ${[...Array(30)]
        .map(() => Math.random().toString(36)[2])
        .join('')}`
    );
})

Then('Click on MyEvent from side bar', () => {
  cy.get(builderPageSelectors.myEvent).click();
  cy.contains(builderPageData.deleteConfirmMessage);
  cy.get('button').contains('No, go back').click();
  cy.get('.btm-nav > .btn-main').should('be.visible');

  cy.get(builderPageSelectors.myEvent).click();
  cy.contains(builderPageData.deleteConfirmMessage);
  cy.get('button').contains('Yes, close').click();
  cy.visit('/events');
});

// try to close browser without saving answer [Builder'sAnswer]
Given("Visit builder topic 5 answer page", () => {
  cy.visit('/project/1511/builders/1/topics/5/answer');

})

When('Close the notification', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
})

And('Enter builder answer with random text', () => {
  cy.get(builderPageSelectors.qlEditor).clear();
  cy.get(builderPageSelectors.qlEditor).type(`Testing with video and text...${[...Array(30)]
    .map(() => Math.random().toString(36)[2])
    .join('')}`);
})

And('Enter video link', () => {
  cy.get(builderPageSelectors.qlVideo).click();
  cy.get(builderPageSelectors.qlVideo).type('https://www.youtube.com/watch?v=eRGmD2KVEV4');
  cy.get(builderPageSelectors.qlAction).click();
})

And('Save answer and verify location', () => {
  cy.xpath(builderPageSelectors.saveAndNextButton).click();
  cy.location('pathname').should(
    'equal',
    '/project/1511/builders/1/overview'
  );
})

Then('Verify Notification text', () => {
  cy.contains(builderPageData.saveAnswer);
});

// Go to review and publish section after savng answer [Builder'sAnswer]
Given("Visit builder topic 44 answer page", () => {
  cy.visit('/project/1511/builders/16/topics/44/answer');
  
})

When('Close the notification', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
})

And('Enter random answer', () => {
  cy.get(builderPageSelectors.qlEditor).clear();
  cy.get(builderPageSelectors.qlEditor)
    .find('p')
    .type(
      `Save data and go to review and publish section... ${[...Array(30)]
        .map(() => Math.random().toString(36)[2])
        .join('')}`
    );
})

And('Save the answer', () => {
  cy.get(builderPageSelectors.saveButton).contains('Save ').click({ force: true });
  // cy.contains(builderPageData.saveAnswer);
  // cy.xpath(builderPageSelectors.notificationDismiss).click();
})

And('Publish answer', () => {
  cy.get(builderPageSelectors.topicMainLink).contains('go to review + publish >').click();
  cy.location('pathname').should('equal', '/project/1511/builders/16/review');
})

Then('Verify project path', () => {
  cy.get(builderPageSelectors.finishButton).contains('finish').click({ force: true });
  cy.location('pathname').should('equal', '/project/1511/builders');
});

// should show "save answers" warning message when moving from builder answer page during answering questions
Given('Visit the rebelbase portal', () => {
  cy.intercept({
    method: 'GET',
    url: Cypress.env('section-bluepring'),
  }).as('apis');
  cy.visit('/')
})

When('Verify page is loaded successfully', () => {
  cy.wait('@apis').then(({
    request,
    response
  }) => {
    expect(response.statusCode).to.eq(200);
  })
})

And('Close the notification', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
})

And('Go to the builder page', () => {
  cy.xpath(builderPageSelectors.projectBuilderLink).click()
})

And('Go to answer page', () => {
  cy.xpath(builderPageSelectors.solutionLink).click();
  cy.xpath(builderPageSelectors.revisitButton).eq(1).click();
})

And('Go to direct answer page', () => {
  cy.xpath(builderPageSelectors.skipAnswerButton).click();
})

And('Enter video url ans save answer', () => {
  cy.get(builderPageSelectors.qlEditor).click({
    force: true
  });
  cy.get(builderPageSelectors.strikeButton).click();
  cy.get(builderPageSelectors.strikeButton).click();
  cy.get(builderPageSelectors.qlEditorImageButton).click({
    force: true
  });
  cy.get('[height="2"]').click();
  cy.get(builderPageSelectors.toolTipInput).clear();
  cy.get(builderPageSelectors.toolTipInput).type('cy.getCookie');
  cy.get('.ql-tooltip').click();
  cy.get(builderPageSelectors.toolTipInput).clear();
  cy.get(builderPageSelectors.toolTipInput).type(builderPageData.ansLink);
  cy.get(builderPageSelectors.qlAction).click();
  cy.get(':nth-child(2) > li').first().click();
  cy.get(builderPageSelectors.saveAnswerButton).click();
})

And('Enter Image url and save answer', () => {
  cy.get(builderPageSelectors.qlEditor).click({
    force: true
  });
  cy.get(builderPageSelectors.strokeButton).click({
    force: true
  });
  cy.get(builderPageSelectors.videoIcon).click();
  cy.get(builderPageSelectors.toolTipInput).clear();
  cy.get(builderPageSelectors.toolTipInput).type(builderPageData.ansLink);
  cy.get(builderPageSelectors.qlAction).click();
  cy.get('.ql-link > svg').click();
  cy.get(':nth-child(2) > li').first().click();
  cy.get(builderPageSelectors.saveAnswerButton).click();
})

Then('Enter answer and save it', () => {
  cy.get('[href="/project/1511/builders/2/topics/7/answer"] > li').click();
  cy.get(builderPageSelectors.qlEditor).click({
    force: true
  });
  cy.get('.ql-image > svg').click();
  cy.get(builderPageSelectors.videoIcon).click({
    force: true
  });
  cy.get(builderPageSelectors.toolTipInput).clear();
  cy.get(builderPageSelectors.toolTipInput).type(builderPageData.ansLink);
  cy.get(builderPageSelectors.qlAction).click();
  cy.get(':nth-child(4) > li').first().click();
  cy.get(builderPageSelectors.saveAnswerButton).click();
  cy.get('.btm-nav > .btn-main').click();
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
});

// change track on builder page > it should change builders types
Given('Visit builder page on rebelbase portal', function () {
  cy.intercept({
    method: 'GET',
    url: Cypress.env('section-bluepring'),
  }).as('apis');
  cy.visit('/project/1511/builders', { timeout: 300000 })
})

When('Verify builder page is loaded', () => {
  cy.wait('@apis').then(({
    request,
    response
  }) => {
    expect(response.statusCode).to.eq(200);
  });
})

And('Close the notification', () => {
  cy.get('.notification-dismiss').click();
})

And('Switch track from builder page', () => {
  cy.get('.change-btn').contains('switch tracks').click();
  cy.get('.selection-wrap > :nth-child(1)').click();
})

Then('Verify next track', () => {
  cy.get('.index__title--track')
  cy.contains('Ideation');
  cy.get('.change-btn')
  cy.contains('next track').click();
  cy.get('.index__title--track')
  cy.contains('Validation');
});

// change track on project builder page and complete one type of builder answers
Given('Visit builder page on rebel base portal', function () {
  cy.visit('/');
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true})
})

When('Go to project builder page', () => {
  cy.xpath(builderPageSelectors.projectBuilderLink).click()
})

And('Change project track', () => {
  cy.xpath(builderPageSelectors.switchTrackButton).click();
  cy.get('.track h4').contains('Validation').click();
  cy.get('h4').contains('Ecosystem ').click();
})

And('Complete answer one type of answer', () => {
  cy.xpath(builderPageSelectors.revisitButton).eq(0).click();
  cy.get(builderPageSelectors.stepMenuRightSide).click();
  cy.xpath(builderPageSelectors.nextButton).first().click();
  cy.xpath(builderPageSelectors.revisitButton).eq(0).click();
  cy.xpath(builderPageSelectors.nextButton).first().click();
  cy.xpath(builderPageSelectors.revisitButton).eq(1).click();
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.get('.rebelMap__btn--minimize').click();
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.get(builderPageSelectors.qlEditor).click();
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.saveAndNextButton).click();
})

And('Go to review and publish page and publish answer', () => {
  cy.xpath(builderPageSelectors.reviewPublishButton).click();
  cy.get(builderPageSelectors.publishDropdown)
    .click()
  cy.xpath(builderPageSelectors.publishItem)
    .click();
  cy.get('.sidebar__pub__btn').click();
  cy.get('.btn-main').contains('finish').click();
})

And('Re check answer', () => {
  cy.get('h4').contains('Ecosystem ').click();
  cy.xpath(builderPageSelectors.revisitButton).eq(0).click();
  cy.get('.not-mobile-btn-wrap > .btn-main').click();
  cy.xpath(builderPageSelectors.revisitButton).eq(0).click();
  cy.get('.not-mobile-btn-wrap > .btn-main').click();
  cy.xpath(builderPageSelectors.revisitButton).eq(1).click();
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.xpath(builderPageSelectors.gotItNextButton).click({ force: true });
  cy.get(builderPageSelectors.qlEditor).click();
  cy.xpath(builderPageSelectors.saveAndNextButton).click();
})

Then('Re publish the answer', () => {
  cy.xpath(builderPageSelectors.reviewPublishButton).click();
  cy.get(builderPageSelectors.publishDropdown)
    .click()
  cy.xpath(builderPageSelectors.publishItem)
    .click();
  cy.get('.btn-main').contains('finish').click();
});

// Language change
Given('Login to the rebelbase portal', function () {
  cy.visit('/');
})

When('Expand language', () => {
  cy.get(brainPageSelectors.notificationDismiss).click({multiple:true});
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get('[data-testid="ExpandMoreIcon"]').click();
})

Then('Change language and verify menu name', () => {
  cy.get('div ul li div div span').contains('Español').click(); // Select language
  cy.wait(1000)
  cy.get('.nav-menu__link--builders').find('div span')
    .should('have.text', 'Tus builders')
  cy.get('.nav-menu__link--project-page')
    .should('have.text', 'Tu proyecto')
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click()
  cy.get('.nav-menu__link--activity')
    .should('have.text', 'Muro')
  cy.get('.nav-menu__link--brain')
    .should('have.text', 'Brain')
  cy.get('.nav-menu__link--groups')
    .should('have.text', 'Grupos')
  cy.get('.nav-menu__link--events')
    .should('have.text', 'Eventos')
  cy.get('.nav-menu__link--members')
    .should('have.text', 'Comunidad')
  cy.get('.nav-menu__link--builders').last()
    .should('have.text', 'Builders')
  cy.get(smokeTestPageSelector.headerDropdown).click();
  cy.get('div ul li div div span').contains('English').click()
});