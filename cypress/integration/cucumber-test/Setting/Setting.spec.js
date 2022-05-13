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

After(() => {
  cy.wait(1000)
})

// Send,snudge delete project invitation from setting page
Given('Login to rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
})

When('Go to setting page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click();
  cy.get('[data-testid="ArrowDropDownIcon"]').click();
  cy.get('[data-testid="SettingsIcon"]').click();
})

Then('Send Invitation and nudge', () => {
  cy.get('.sideBar > ul > :nth-child(5) > span').click();
  cy.get('.btn-link').click();
  cy.get(smokeTestPageSelector.signUpEmail)
    .clear()
    .type('testhubadmin+2@rebelbase.co');
  cy.xpath(smokeTestPageSelector.sendInviteButton).click();
  cy.get(brainPageSelectors.notificationDismiss).click();
  cy.get('.inviteTeam__btn__nudge').first().click();
  cy.get(hubGroupPageSelector.popupNotes).click();
  cy.get('.btn-delete').first().click();
  cy.xpath(brainPageSelectors.closeModelButton).click();
});

// Change project details
Given('Login to rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
})

When('Go to setting page', () => {
  cy.get(brainPageSelectors.notificationDismiss).click();
  cy.get('[data-testid="ArrowDropDownIcon"]').click();
  cy.get('[data-testid="SettingsIcon"]').click();
})

And('Edit basic project details', () => {
  cy.get('.sideBar > ul > :nth-child(5) > span').click();
  cy.get('#name')
    .clear()
    .type('myproejt22');
  cy.get(smokeTestPageSelector.autoCompleteTextbox)
    .clear()
    .type('pune');
  cy.get(smokeTestPageSelector.locationResultInput).click();
  cy.get('#industry_id').select('12');
  cy.get('#project_stage').select('planning');
  cy.get(permissionsPageSelector.valueSaveButton).click();
})

Then('Change the title', () => {
  cy.get(eventPageSelectors.editPen).click();
  cy.get(`input[placeholder="Team Member's Title"]`)
    .clear()
    .type('admin');
  cy.xpath(hubActivityPageSelector.saveButton).click();
});

// Language change
Given('Login to the rebelbase portal', function () {
  cy.login(Cypress.env('username'), Cypress.env('password'));
})

When('Expand language', () => {
  cy.get(brainPageSelectors.notificationDismiss).click();
  cy.get('[data-testid="ArrowDropDownIcon"]').click();
  cy.get('[data-testid="ExpandMoreIcon"]').click();
})

Then('Change language', () => {
  cy.get('.MuiList-root > :nth-child(5) > .css-70qvj9 > .MuiBox-root > .MuiTypography-root').click(); // Select language
  cy.get('[data-testid="ArrowDropDownIcon"]').click();
  cy.get('#more-menu > .MuiPaper-root > .MuiList-root').click({ force: true });
  cy.get('.MuiList-root > :nth-child(4) > .css-70qvj9 > .MuiBox-root > .MuiTypography-root').click();
});