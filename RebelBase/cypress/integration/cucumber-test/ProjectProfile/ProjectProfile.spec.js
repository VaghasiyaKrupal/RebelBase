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

// Login and go to project page [Project Profile]
Given('Login to the rebelbase portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.getCookie('token').should('exist');
})

When('Go to project page', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

Then('Verify project title', () => {
  cy.get('.title').should('have.text','CypressTestProject01');
});

// Edit description of project [Project Profile]
Given('Login to rebel base portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.getCookie('token').should('exist');
})

When('Go to project page', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').contains('CypressTestProject01');
})

And('Verify warning message', () => {
  cy.get('.description > .backdrop__btn').click({force:true});
  cy.get(eventPageSelectors.descriptionField).last()
    .click()
    .clear()
  cy.xpath(hubActivityPageSelector.saveButton).contains('Save').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Project description updated!');
  cy.get('.description > .backdrop__btn').click();
  cy.get(eventPageSelectors.descriptionField)
    .last()
    .click()
    .clear()
    .type(`edit description for testing..... ${Math.random()}`);
  cy.xpath(projectProfilePageSelector.cancelButton).click();
  cy.get('.react-confirm-alert-body').contains('Changes Made');
  cy.contains('Are you sure you want to cancel?');
  cy.contains('No, go back').click();
  cy.get('.edit-wrap__field--descript').contains(
    `edit description for testing.....`
  );
  cy.xpath(projectProfilePageSelector.cancelButton).click();
  cy.get('.react-confirm-alert-body').contains('Changes Made');
  cy.get('.react-confirm-alert-button-group').contains('Yes, cancel').click();
})

Then('Change description', () => {
  // descrption is empty since data was not saved
  cy.get('.description__content').click();
  cy.get('.edit-wrap__field').clear();
  cy.get('.edit-wrap__field').type(
    `edit description for testing.....`
  );
  // save description with some data
  cy.xpath(hubActivityPageSelector.saveButton).contains('Save').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Project description updated!');

  // desciption contains data
  cy.get('.description > .backdrop__btn > .edit-pen-light').click();

  // open description again and close it. This time there won't be any warning since data is not changed
  cy.get('.edit-wrap__field').contains('edit description for testing.....');
  cy.xpath(projectProfilePageSelector.cancelButton).click();
  cy.get('.description__content').contains(
    'edit description for testing.....'
  );
  cy.get('.description > .backdrop__btn > .edit-pen-light').click();
  cy.get('.edit-wrap__field').contains('edit description for testing.....');
  cy.get('.btn-save').contains('Save').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text','Project description updated!');
  cy.get('.description__content').contains('edit description for testing.....');
});

// Open logo modal on project page [Project Profile]
Given('Login to rebel base portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.getCookie('token').should('exist');
})

When('Go to project page', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
})

Then('Open project logo model', () => {
  cy.get('.title').contains('CypressTestProject01');
  cy.get('.edit__logo').click();
  cy.get(projectProfilePageSelector.uploadImage).click();
  cy.xpath(projectProfilePageSelector.savelogoButton)
    .contains('Save logo to project page')
    .click();
  //   since no image was selected so warning is shown
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Please select an image to upload.');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.xpath(brainPageSelectors.closeModelButton).last().click();
});

// Change logo, add image file on project page [Project Profile]
Given('Login to rebel base portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.getCookie('token').should('exist');
})

When('Go to project page', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
})

And('Change project logo', () => {
  cy.get('.title').contains('CypressTestProject01');
  cy.get('.edit__logo').click();
  cy.get('.image-upload__upload-btn').click();
  cy.fixture("rebelbaselogo.png").then((fileContent) => {
    cy.get('input[type="file"]').attachFile({
      fileContent,
      fileName: "rebelbaselogo.png",
      encoding: "base64",
      mimeType: "image/png",
    });
  });
  cy.get('.image-upload__save-btn')
    .contains('Save logo to project page')
    .click();
})

Then('Verify project logo changed successfully', () => {
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Project logo uploaded!');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
});

// Open backdrop modal on project page [Project Profile]
Given('Login to rebel base portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.getCookie('token').should('exist');
})

When('Go to project page', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
})

Then('Verify warning message when no logo selected', () => {
  cy.get('.title').contains('CypressTestProject01');
  cy.get('.logo-backdrop__wrap > .backdrop__btn').click();
  cy.get('.image-upload__upload-btn').click();
  cy.get('.image-upload__save-btn')
    .contains('Save backdrop to project page')
    .click();

  // since no image was selected so warning is shown
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Please select an image to upload.');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.xpath(brainPageSelectors.closeModelButton).last().click();
});

// C58 Edit about of project page [Project Profile]
Given('Login to rebel base portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.getCookie('token').should('exist');
})

When('Go to project page', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
})

And('Clear about field and save it', () => {
  cy.get('.title').contains('CypressTestProject01');
  cy.get(eventPageSelectors.editPen).eq(1).click({ force: true });
  // clear data from about field ans save it
  cy.get('form > .quill > .ql-container > .ql-editor').clear();
  cy.xpath(hubActivityPageSelector.saveButton).contains('Save').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Project about updated!')
})

And('Close about without saving it should show warning', () => {
  cy.get(eventPageSelectors.editPen).eq(1).click({ force: true });
  // cy.get('.ReactModal__Content > .btn-x').click();
  cy.get('form > .quill > .ql-container > .ql-editor').clear();
  //  add data in about section
  cy.get('.overview__about').type('edit about...');
  cy.get('.btn-cancel').contains('close').click();
  //   try to close about without saving it gives warning
  cy.get('.react-confirm-alert-body')
    .contains('Are you sure you want to close?');
  //   go back
  cy.get('.react-confirm-alert-button-group')
    .contains('No, go back')
    .click();
  cy.get(builderPageSelectors.qlEditor).contains('edit about...');
  cy.get('.btn-cancel').contains('close').click();
  cy.get('.react-confirm-alert-body')
    .contains('Are you sure you want to close?');
  //   close without saving
  cy.get('.react-confirm-alert-button-group')
    .contains('Yes, close')
    .click();
})

Then('Add data in about field', () => {
  //   about is empty
  cy.get('.overview__about__empty');
  cy.get(eventPageSelectors.editPen).eq(1).click({ force: true });
  cy.get('form > .quill > .ql-container > .ql-editor')
    .clear()
    .type('edit about...'); // add data to about
  //   save it
  cy.xpath(hubActivityPageSelector.saveButton).contains('Save').click();
  //   get notication of about being updated
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Project about updated!');
});

// Other User's should not be able to edit anything on project page [Project Profile]
Given('Login to supporter account', () => {
  cy.login(Cypress.env('supporter'), Cypress.env('password'));
})

When('Verify profile and cookies', () => {
  cy.url().should('include', '/profile/2484');
  cy.getCookie('token').should('exist');
})

And('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.get('.title').contains('CypressTestProject01');
})

And('Verify orther user permission', () => {
  // check if any of the edit-pen exist on page
  cy.get('.head').should('not.have.class', '.description > .backdrop__btn > .edit-pen-light');
  cy.get('.head').should('not.have.class', '.edit__logo');
  cy.get('.head').should('not.have.class', '.backdrop__btn');
  cy.get('.overview__about').should('not.have.class', '.edit-pen__about');
  cy.get('.team').should('not.have.class', '.edit-pen__team');
  cy.get('.details').should('not.have.class', '.details__permission__wrap');
});

// Supporter's should only be able to edit his title and see setting's page on project page [Project Profile]
Given('Login to supporter account', () => {
  cy.login(Cypress.env('supporter'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click()
})

When('Verify profile and cookies', () => {
  cy.url().should('include', '/profile/2484');
  cy.getCookie('token').should('exist');
})

And('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click({multiple:true})
  cy.get('.title').should('have.text','CypressTestProject01');
  // cy.xpath(brainPageSelectors.notificationDismiss).click()
})

Then('Verify title, team and advisors edit permission', () => {
  cy.get('.head').should('not.have.class', '.description > .backdrop__btn > .edit-pen-light');
  cy.get('.head').should('not.have.class', '.edit__logo');
  cy.get('.head').should('not.have.class', '.backdrop__btn');
  cy.get('.overview__about').should('not.have.class', '.edit-pen__about');
  // show's 2 section for team and advisors
  cy.get('#brief > div:nth-child(2) > button').should('have.length', 1);
  // Only one pen exist to edit itself title
  cy.get('div.person__info>p.person__role>button').click({
    force: true
  });

  // first empty title then change it
  cy.get('.person__role__edit-wrap').find('input').clear();
  cy.get('.person__role__edit-wrap')
    .find('.btn-save')
    .contains('Save')
    .click();
  // cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Title changed!').click()
  cy.get('div.person__info>p.person__role>button').click();
  // cy.get('.person__role__edit-wrap').find('input').clear();
  cy.get('.person__role__edit-wrap').find('input').type('supporter');
  cy.get('.person__role__edit-wrap')
    .find('.btn-save')
    .contains('Save')
    .click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Title changed!');
  // supporter's can see all the answer's but cannot edit any
  cy.get('.details').should('not.have.class', '.details__permission__wrap');
  cy.get('.details')
    .get('.details__challenge-title')
    .should('have.length', 10);

  // get go to setting's page from team section on clicking on pen
  cy.xpath('//*[@id="brief"]/div[2]/button').click();
  cy.location('pathname').should('equal', '/settings');
  // Cannot see form to edit project details
  cy.get('.content').should('not.have.descendants', 'form');
  // header to show he is supporter
  cy.get('.team').find('span').contains('Supporter');
});

// Member's should be able to view and edit everything on project page except title of other team meamber's
Given('Login to member account', () => {
  cy.login(Cypress.env('member'), Cypress.env('password'))
})

When('Verify profile url and cookies', () => {
  cy.url().should('include', '/profile/2468');
  cy.getCookie('token').should('exist');
})

And('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
  cy.get('.title').should('have.text','CypressTestProject01');
})

And('Check all the edit pen exist', () => {
  // check if all the edit pen exist
  cy.get('.head').get('.description > .backdrop__btn > .edit-pen-light');
  cy.get('.head').get('.edit__logo');
  cy.get('.head').get('.backdrop__btn');
  cy.get('.overview__about').get('.edit-pen');
  // show's 2 section for team and advisors
  cy.get('.team').find('.edit-pen').should('have.length', 3);
  // Only one pen exist to edit itself title
  cy.get('.team').find('.edit-pen__btn').should('have.length', 3);
  cy.get('.person').contains('test2').should('be.visible')
  cy.get('.person').contains('test').should('be.visible')
  cy.get(':nth-child(2) > .team__container > :nth-child(1)').find('.edit-pen__btn').should('not.exist')
})

And('Clear title and change it', () => {
  // First empty title then change it
  cy.get('.team').find('span.edit-pen').eq(1).click();
  cy.get('.person__role__edit-wrap').find('input').clear();
  cy.get('.person__role__edit-wrap')
    .find('.btn-save')
    .contains('Save')
    .click();
  cy.wait(2000);
  cy.get('.team').find('.edit-pen__btn').eq(1).click();
  cy.get('.person__role__edit-wrap').find('input').clear();
  cy.get('.person__role__edit-wrap').find('input').type('Member');
  cy.get('.person__role__edit-wrap')
    .find('.btn-save')
    .contains('Save')
    .click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Title changed!');
})

Then('Details permission field for all answer is visible', () => {
  // can edit all the answer's so details permission field for all answer is visible
  cy.get('.details')
    .get('.details__permission__wrap')
    .should('have.length', 10);
  cy.get('.details')
    .get('.details__challenge-title')
    .should('have.length', 10);
  cy.get('.team .edit-pen__btn').first().click({
    force: true
  });
  // Can see form to edit project details
  cy.location('pathname').should('equal', '/settings');
  cy.get('.content').get('form');
  // header to show he is project team member
  cy.get('.team').find('span').contains('Member');
});

// Teammates should be able to see all the builder's [Project Profile]
Given('Login to the rebelbase portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.getCookie('token').should('exist');
})

When('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').should('have.text','CypressTestProject01');
})

Then(`Verify All the builder's are visible irrespective of permission level's`, () => {
  cy.get('.details__challenge-title').should('contain', 'Ecosystem');
  cy.get('.details__challenge-title').should('contain', 'Prototesting');
  cy.get('.details__challenge-title').should('contain', 'Target + Market');
  cy.get('.details__challenge-title').should('contain', 'Version One');
  cy.get('.details__challenge-title')
    .should('contain', 'Competitive Landscape');
  cy.get('.details__challenge-title').should('contain', 'Brand');
  cy.get('.details__challenge-title')
    .should('contain', 'Go-to-Market Strategy');
});

// If user is part of hub then he should  be able to see builder's which
// have permission level for everyone as well as for hub,
// events and groups [Project Profile]
Given('Login to event member account', () => {
  cy.login(Cypress.env('eventMember'), Cypress.env('password'))
})

When('Verify profile page and cookies', () => {
  cy.url().should('include', '/profile/4431');
  cy.getCookie('token').should('exist');
})

And('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').should('have.text','CypressTestProject01');
})

Then('Verify permission', () => {
  cy.get('.details__challenge-title')
    .should('contain', 'Ecosystem');
  cy.get('.details__challenge-title')
    .should('contain', 'Prototesting');
  cy.get('.details__challenge-title')
    .should('contain', 'Target + Market');
  cy.get('.details__challenge-title')
    .should('contain', 'Version One');
  cy.get('.details__challenge-title')
    .should('contain', 'Competitive Landscape');
  cy.get('.details__challenge-title')
    .should('contain', 'Brand');
  cy.get('.details__challenge-title')
    .should('contain', 'Go-to-Market Strategy');
});

// If user is part of event then he should  be able to see builder's which
// have permission level for everyone, for events and for hub,
// events and groups [Project Profile]
Given('Login to event member account', () => {
  cy.login(Cypress.env('eventMember'), Cypress.env('password'));
})

When('Verify profile', () => {
  cy.url().should('include', '/profile/4431');
  cy.getCookie('token').should('exist');
})

And('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').should('have.text','CypressTestProject01');
})

Then('Verify project permission', () => {
  cy.get('.details__challenge-title')
    .should('contain', 'Ecosystem');
  cy.get('.details__challenge-title')
    .should('contain', 'Prototesting');
  cy.get('.details__challenge-title')
    .should('contain', 'Target + Market');
  cy.get('.details__challenge-title')
    .should('contain', 'Version One');
  cy.get('.details__challenge-title')
    .should('contain', 'Competitive Landscape');
  cy.get('.details__challenge-title')
    .should('contain', 'Brand');
  cy.get('.details__challenge-title')
    .should('contain', 'Go-to-Market Strategy');
});

// Other user's should not be able to see builder's page of project's they are not part of  [Project Profile]
Given('Login to rebelbase portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.getCookie('token').should('exist');
})

When('Go to project page', () => {
  cy.visit('/project/824');
})

And('Verify title', () => {
  cy.get('.title').should('have.text','HappyPaws');
})

Then(`Go to project's builder page and verify permission`, () => {
  cy.visit('/project/824/builders');
  cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.get('.noPermission').contains('You are not permitted to view this page.')
});

// raise ticket for below
// Other user's should only be able to see answer's with permission level for everyone [Project Profile]
Given('Login to rebelbase portal', () => {
  cy.login('msuryawanshi+1@rebelbase.co', 'manoj@123')
})

When('Verify profile, cookies', () => {
  cy.url().should('include', '/profile/4439');
  cy.getCookie('token').should('exist');
})

And('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').should('have.text','CypressTestProject01');
})

Then('Verify permission for project', () => {
  cy.get('.details__challenge-title')
    .should('contain', 'Problem');
  cy.get('.details__challenge-title')
    .should('not.contain', 'Ecosystem');
  cy.get('.details__challenge-title')
    .should('contain', 'Prototesting');
  cy.get('.details__challenge-title')
    .should('contain', 'Target + Market');
  cy.get('.details__challenge-title')
    .should('not.contain', 'Version One');
  cy.get('.details__challenge-title')
    .should('contain', 'Competitive Landscape');
  cy.get('.details__challenge-title')
    .should('not.contain', 'Brand');
  cy.get('.details__challenge-title')
    .should('not.contain', 'Go-to-Market Strategy');
});

// Logged out user's should not be able to edit anything [Project Profile]
Given('Go to browse page', () => {
  cy.visit('browse');
})

When('Verify url and href', () => {
  cy.location('pathname').should('equal', '/browse');
  cy.get('.browse__results').find('li').first().click();
  cy.location().should((loc) => {
    expect(loc.href).to.include('project');
  });
})

Then('Verify if any of the edit-pen exist on page', () => {
  cy.get('.head').should('not.have.class', '.description > .backdrop__btn > .edit-pen-light');
  cy.get('.head').should('not.have.class', '.edit__logo');
  cy.get('.head').should('not.have.class', '.backdrop__btn');
  cy.get('.overview__about').should('not.have.class', '.edit-pen__about');
  cy.get('.team').should('not.have.class', '.edit-pen__team');
  cy.get('.details').should('not.have.class', '.details__permission__wrap');
  cy.get('.details').find('.details__display').last().get('.loaderWrapper');
});

// Logged out user's should only be able to see builder's with permission level for everyone [Project Profile]
Given('Visit project page on Rebelbase portal', () => {
  cy.visit('/');
  cy.visit('/project/1511');
})

When('Verify project title', () => {
  cy.get('.title').should('have.text','CypressTestProject01');
})

Then('Verify permission', () => {
  cy.get('.details__challenge-title')
    .should('not.contain', 'Ecosystem');
  cy.get('.details__challenge-title')
    .should('contain', 'Prototesting');
  cy.get('.details__challenge-title')
    .should('contain', 'Target + Market');
  cy.get('.details__challenge-title')
    .should('not.contain', 'Version One');
  cy.get('.details__challenge-title')
    .should('contain', 'Competitive Landscape');
  cy.get('.details__challenge-title')
    .should('not.contain', 'Brand');
});

// Logged out user's should not be able to see builder's page  [Project Profile]
Given('Login to rebelbase portal', () => {
  cy.login('msuryawanshi@rebelbase.co', 'manoj@123');
})

When('Verify profile, logout from account', () => {
  cy.url().should('include', '/profile/4439');
  cy.get('[data-testid=ArrowDropDownIcon]').click({ force: true });
  cy.get('[data-testid=LogoutIcon]').click();
})

And('Go to project and verify project title', () => {
  cy.visit('/project/1511');
  cy.get('.title').should('have.text','CypressTestProject01');
})

Then(`Go to project's builder page and verify url`, () => {
  cy.visit('/project/1511/builders');
  cy.url().should('include', '/auth/login');
});

// Logged out user's should not be able to give kudos and notes and should be redirected to login/signup page [Project Profile]
Given('Visit project page and verify project title', () => {
  cy.visit('/');
  cy.visit('/project/1511');
  cy.get('.title').should('have.text','CypressTestProject01');
})

When('Redirect to login when clicked on kudos', () => {
  cy.get('.interactions__btn').contains('kudos').first().click();
  cy.location('pathname').should('equal', '/auth/login');
})

And('Show login link when click on notes and redirect to login page', () => {
  cy.visit('/project/1511');
  cy.get('.title').should('have.text','CypressTestProject01');
  cy.get('.interactions__btn--active').contains('note').first().click();
  cy.get('.interactions__notes__not-logged-in').contains('log in').click();
  cy.location('pathname').should('equal', '/auth/login');
})

Then('Show sign up link when click on notes and redirect to sign up page', () => {
  cy.visit('/project/1511');
  cy.get('.title').should('have.text','CypressTestProject01');
  cy.get('.interactions__notes__not-logged-in').contains('sign up').click();
  cy.location('pathname').should('equal', '/auth/sign-up');
});

// Teammates should not be able to give kudos
Given('Login to team mate member account', () => {
  cy.login(Cypress.env('member'), Cypress.env('password'))
})

When('Verify profile and cookies', () => {
  cy.url().should('include', '/profile/2468');
  cy.getCookie('token').should('exist');
})

And('Go to project page and give kudos', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click({ multiple: true });
  cy.get('.interactions__btn--disabled')
    .contains('kudos')
    .first()
    .should('have.css', 'cursor', 'auto');
});

// User's can remove their notes but not other's
Given('Login to rebelbase portal', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
})

When('Go to project page', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
})

And('Add notes', () => {
  cy.get('.interactions__btn--active').contains('note').first().click();
  cy.get('.interactions__notes__input').first().type('give notes');
  cy.get('button').contains('note >').first().click();
})

Then('Delete notes', () => {
  cy.get('.note__actions--gray').contains('Delete').first().click();
});

// Check if teammates are properly populated and visible on UI
Given('Verify team mate 1 is properly populate on UI', () => {
  cy.request('GET', 'https://core-service.staging.rebelbase.co/api/v2/public/projects/teammates/1511')
    .its('body')
    .then((res) => {
      cy.login(Cypress.env('username'), Cypress.env('password'))
      cy.visit('/project/1511');
      cy.get('.person__info')
        .find('.person__name')
        .should('have.length', res.data.length);
    });
})

When('Verify team mate 2 is properly populate on UI', () => {
  cy.request('GET', 'https://core-service.staging.rebelbase.co/api/v2/public/projects/teammates/1024')
    .its('body')
    .then((res) => {
      cy.visit('/project/1024');
      cy.get('.person__info')
        .find('.person__name')
        .should('have.length', res.data.length);
    });
})

Then('Verify team mate 3 is properly populate on UI', () => {
  cy.request('GET', 'https://core-service.staging.rebelbase.co/api/v2/public/projects/teammates/1511')
    .its('body')
    .then((res) => {
      cy.visit('/project/1511');
      cy.get('.person__info')
        .find('.person__name')
        .should('have.length', res.data.length);
    });
});

// in brief section if we open different business cases it should highlight that section[Project Profile]
Given('Login to rebelbase portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.getCookie('token').should('exist');
})

When('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.get('.title').should('have.text','CypressTestProject01');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
})

Then('Verify section is highlighting', () => {
  cy.get('#menu > :nth-child(4)').click({ force: true });
  cy.get('.details__challenge-title')
    .contains('Problem')
    .realPress("Shift", "ArrowLeft", "ArrowLeft");
  cy.get('#menu > :nth-child(5)').click({ force: true });
  cy.get('.details__challenge-title')
    .contains('Ecosystem')
    .realPress("Shift", "ArrowLeft", "ArrowLeft");
  cy.get('#menu > :nth-child(6)').click({ force: true });
  cy.get('.details__challenge-title')
    .contains('Prototesting')
    .realPress("Shift", "ArrowLeft", "ArrowLeft");
  cy.get('#menu > :nth-child(7)').click({ force: true });
  cy.get('.details__challenge-title')
    .contains('Target + Market')
    .realPress("Shift", "ArrowLeft", "ArrowLeft");
  cy.get('#menu > :nth-child(8)').click({ force: true });
  cy.get('.details__challenge-title')
    .contains('Version One ')
    .realPress("Shift", "ArrowLeft", "ArrowLeft");
  cy.get('#menu > :nth-child(9)').click({ force: true });
  cy.get('.details__challenge-title')
    .contains('Competitive Landscape ')
    .realPress("Shift", "ArrowLeft", "ArrowLeft");
  cy.get('#menu > :nth-child(10)').click({ force: true });
  cy.get('.details__challenge-title')
    .contains('Brand')
    .realPress("Shift", "ArrowLeft", "ArrowLeft");
  cy.get('#menu > :nth-child(11)').click({ force: true });
  cy.get('.details__challenge-title')
    .contains('Go-to-Market Strategy')
    .realPress("Shift", "ArrowLeft");
});

// Change publish setting on project page from my events to others vice versa
Given('Login to the rebelbase portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.getCookie('token').should('exist');
})

When('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').should('have.text','CypressTestProject01');
})

And('Change publish settings on project page from my event to others', () => {
  cy.get('#publishedFor-18017').select('Team Only');
  cy.get('#publishedFor-18017').should('contain.value', 'team');
})

Then('Change publish settings on project page from other to my event', () => {
  cy.get('#publishedFor-18017').select('My Events');
  cy.get('#publishedFor-18017').should('contain.value', 'event');
});

// Open team member profile from project page[Project Profile]
Given('Login to rebelbase portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.getCookie('token').should('exist');
})

When('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').should('have.text','CypressTestProject01');
})

Then('Open team member profile from project page', () => {
  cy.get('a.person__name').should('have.text','test2').click()
  cy.url().should('include', '/profile/2468')
});

// Add team meber from project page by edit project page[Project Profile]
Given('Login to rebelbase portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.getCookie('token').should('exist');
})

When('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').should('have.text','CypressTestProject01');
})

And('Go to setting page from project page', () => {
  cy.get('.title-wrap > [type="button"]').click();
  cy.get('.sideBar--selected').should('have.text','CypressTestProject01');
  cy.get('.btn-link').click();
})

Then('Invite team member', () => {
  cy.get(smokeTestPageSelector.inviteEmailTextbox)
    .clear()
    .type(Cypress.config('email'));
  cy.get('select.form-control').select('Admin');
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation sent!')
  cy.xpath(brainPageSelectors.notificationDismiss).click()
  cy.xpath(brainPageSelectors.closeModelButton).click();
  cy.url().should('include', '/settings');
});

// Resend project invitation from edit project page and from invite member page[Project Profile]
Given('Login to rebelbase portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.getCookie('token').should('exist');
})

When('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').should('have.text','CypressTestProject01');
})

And('Go to setting page from project page', () => {
  cy.get('.title-wrap > [type="button"]').click();
  cy.get('.sideBar--selected').should('have.text','CypressTestProject01');
  cy.get('.btn-link').click();
})

And('Send a nudge and close model', () => {
  cy.get('.inviteTeam > :nth-child(1)').should('have.text','Invite a Teammate');
  cy.get('.inviteTeam__btn__nudge').eq(0).click({ force: true });
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.xpath(brainPageSelectors.closeModelButton).click();
})

Then('Resend invitation from setting page', () => {
  cy.get('h3').contains('Pending Invitations').should('be.visible')
  cy.get('.btn-second').first().click()
  cy.get('.btn-link').click();
  cy.url().should('include', '/settings');
});

// Default project should open when dashboard loads[Project Profile]
Given('Login to rebelbase portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.getCookie('token').should('exist');
})

When('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').should('have.text','CypressTestProject01');
})

Then('Verify default project is open', () => {
  cy.get(':nth-child(1) > .MuiList-padding > :nth-child(2)').contains('CypressTestProject01')
});

// Change defualt project and check project profile should open[Project Profile]
Given('Login to rebelbase portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.getCookie('token').should('exist');
})

When('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').should('have.text','CypressTestProject01');
})

Then('Change default project', () => {
  cy.get('[data-testid="FiberManualRecordIcon"]').click()
  cy.get('.selectProj__defaultProj').contains('CypressTestProject0').click();
  cy.get(':nth-child(1) > .MuiList-padding > :nth-child(2) > .MuiListItemText-root > .MuiTypography-root').contains('CypressTestProject0');
  cy.get('.nav-menu__link--builders').should('be.visible');
  cy.get('.nav-menu__link--project-page').should('be.visible')
  cy.get('ul > :nth-child(1)').contains('CypressTestProject0').click();
  cy.get(':nth-child(1) > .MuiList-padding > :nth-child(2) > .MuiListItemText-root > .MuiTypography-root').contains('CypressTestProject0');
});

// Resend project invitation from edit project page [Project Profile]
Given('Login to rebelbase portal and verify cookies', () => {
  cy.login(Cypress.env('username'), Cypress.env('password'))
  cy.getCookie('token').should('exist');
})

When('Go to project page and verify project title', () => {
  cy.visit('/project/1511');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.get('.title').should('have.text','CypressTestProject01');
})

Then('Resend project invitation from edit project page', () => {
  cy.get('.title-wrap > [type="button"]').click();
  cy.get('.sideBar--selected').contains('CypressTestProject01');
  cy.get('h3').contains('Pending Invitations').should('be.visible')
  cy.get().first().click()
  cy.get('.btn-link').click();
  cy.wait(3000);
  cy.url().should('include', '/settings');
});

// Duplicate users in team
Given('Login to rebelbase portal', function () {
  cy.login('testhubadmin@rebelbase.co', 'testtest')
})

When('Go to project builder page', () => {
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.xpath(builderPageSelectors.projectBuilderLink).click();
  cy.get(':nth-child(4) > .index__content > :nth-child(4) > .build__cover > .build__flex > .build__info > .build__title').contains('Competitive Landscape').click();
  cy.get('.builder-head__back-btn').contains('back to all builders').click();
})

And('Go to project page', () => {
  cy.xpath(builderPageSelectors.projectPageLink).click();
  cy.get('.overview__about > .edit-pen__btn').click({ force: true }); // Edit pen for about
  cy.get('.btn-cancel').click(); // Close button
  cy.get(':nth-child(2) > .css-1e6qmxi > .edit-pen').click({ force: true }); // Edit pen for team
  cy.get(':nth-child(1) > .team__list__email').click(); // first woner
  cy.get('.settings').click();
  cy.get(':nth-child(1) > .team__list__email').should('have.class', 'team__list__email');
})

Then('Check for duplicate email id', () => {
  const list = []
  cy.get('.team__list__email')
    .each(($li) => {
      list.push(($li.text()))
    })

    .wrap(list)
    //check for duplicate email id
    .should('not.deep.own.include', ['testhubadmin@rebelbase.co'])
});


Given('Login to rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
  cy.xpath(brainPageSelectors.notificationDismiss).click();
})

When('Edit about', () => {
  cy.get(eventPageSelectors.editPen).eq(1).click();
  cy.get('textarea').click();
  cy.xpath(hubActivityPageSelector.saveButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'About saved!');
})

And('Add experience', () => {
  cy.get('[class="plus-sign"]').click({ force: true }); // experience plush sign
  cy.get('[title="Select date"]').first().click();
  cy.get('.rw-calendar-btn-left > .rw-i').click();
  cy.get('.rw-calendar-btn-left > .rw-i').click();
  cy.get('.rw-calendar-btn-left > .rw-i').click();
  cy.get('.rw-calendar-btn-left > .rw-i').click();
  cy.get('.rw-calendar-btn-left > .rw-i').click();
  cy.get('.rw-calendar-btn-left > .rw-i').click();
  cy.get('.rw-calendar-btn-left > .rw-i').click();
  cy.get('tbody>tr:nth-child(1)>td:nth-child(1)').click();
  cy.get('[title="Select date"]').last().click();
  cy.get('#rw_2_date > .rw-calendar-header > .rw-calendar-btn-left > .rw-i').click();
  cy.get('#rw_2_date > .rw-calendar-header > .rw-calendar-btn-left > .rw-i').click();
  cy.get('#rw_2_date > .rw-calendar-header > .rw-calendar-btn-left > .rw-i').click();
  cy.get('#rw_2_calendar_active_cell').click();
  cy.get(builderPageSelectors.titleTextbox)
    .clear()
    .type('cypress experience');
  cy.get(builderPageSelectors.companySchoolTextbox)
    .clear()
    .type('amdocs');
  cy.get(eventPageSelectors.descriptionField).eq(1).click({ force: true });
  cy.xpath('//button[text()="Save"]').click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Experience added!')
})

And('Edit experience', () => {
  cy.get('[class="plus-sign"]').click({ force: true }); // experience plush sign
  cy.get('[title="Select date"]').first().click();
  cy.get('.rw-calendar-btn-right').click();
  cy.get('.rw-calendar-btn-right').click();
  cy.get('.rw-calendar-btn-right').click();
  cy.get('.rw-calendar-btn-right').click();
  cy.get('.rw-calendar-btn-right').click();
  cy.get('.rw-calendar-btn-left').click();
  cy.get('.rw-calendar-btn-left').click();
  cy.get('.rw-calendar-btn-left').click();
  cy.get('.rw-calendar-btn-left').click();
  cy.get('.rw-calendar-btn-left > .rw-i').click();
  cy.get('.rw-calendar-btn-left > .rw-i').click();
  cy.get('.rw-calendar-btn-left > .rw-i').click();
  cy.get('tbody>tr:nth-child(1)>td:nth-child(1)').click();
  cy.get('[title="Select date"]').last()
  cy.get('.experience__fields__date-wrap').click();
  cy.get('.experience__enddate__present__label__check').click({
    force: true
  });

  cy.get(builderPageSelectors.titleTextbox)
    .clear()
    .type('rebel');
  cy.get(eventPageSelectors.descriptionField).eq(1).click({ force: true });
  cy.xpath('//button[text()="Save"]').click();
  cy.get(builderPageSelectors.companySchoolTextbox)
    .clear()
    .type('cypress');
  cy.xpath('//button[text()="Save"]').click();
  cy.get(':nth-child(2) > .experience__edit > .edit-pen__btn').click(); // Edit experience
  cy.get(builderPageSelectors.companySchoolTextbox)
    .clear()
    .type('cypress auto');
  cy.xpath('//button[text()="Save"]').click();
  cy.get(hubGroupPageSelector.popupNotes).should('be.visible');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
})

And('Edit social media links', () => {
  cy.get(eventPageSelectors.editPen).eq(0).click({ force: true });
  cy.get('[name="linkedin"]')
    .clear()
    .type('http://linkedln.com');
  cy.get('[name="twitter"]')
    .clear()
    .type('http://twitter.co');
  cy.get('[name="facebook"]')
    .clear()
    .type('http://facebook.com');
  cy.xpath(hubActivityPageSelector.saveButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Social Links saved!');
})

Then('Create new project', () => {
  const projectName = "cypressautomation-" + Math.random().toString(36).substring(2);

  cy.xpath("//a[contains(text(),'Create a new project')]").click();
  cy.get(smokeTestPageSelector.projectNameTextbox)
    .clear()
    .type(projectName);
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get(':nth-child(3) > .form-control').select('13');
  cy.xpath(smokeTestPageSelector.createButtom).click();
  cy.wait(3000);
  cy.get(smokeTestPageSelector.inviteEmailTextbox)
    .clear()
    .type('testhubadmin+2@rebelbase.co');
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.get(hubGroupPageSelector.popupNotes).should('have.text', 'Invitation sent!');
  cy.xpath(brainPageSelectors.notificationDismiss).click();
  cy.xpath(brainPageSelectors.closeModelButton).click();
});