import { Before, After, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import { builderPageData } from '../../pageObject/pageData/builderPageData'
import { builderPageSelectors } from '../../pageObject/pageSelectors/builderPageSelectors'
import { brainPageSelectors } from '../../pageObject/pageSelectors/brainPageSelectors'
import { smokeTestPageSelector } from "../../pageObject/pageSelectors/smokeTestPageSelector";
import { hubGroupPageData } from "../../pageObject/pageData/HubGroupPageData";
import { hubGroupPageSelector } from "../../pageObject/pageSelectors/hubGroupPageSelector";
import { eventPageSelectors } from "../../pageObject/pageSelectors/eventPageSelectors";
import { eventData } from "../../pageObject/pageData/eventData";

const current = new Date();

const prior = new Date().setDate(current.getDate() - 30);

console.log(new Date(prior).toDateString()); //  "Mon Apr 06 2020"

// Verify Hub admin is show when Owners and admin is selected
Given('Login to the portal', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Redirect to Hub group member page', () => {
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.memberLink).eq(0).click();
})

And('Verify member page', () => {
    cy.get('h1').should('have.text', 'Dev Hub')
})

Then('Verify Hub admin is visible', () => {
    cy.get('#mail-text').type(Cypress.env('username'))
    cy.wait(2000)
    cy.get('.MuiButtonBase-root > .MuiCardContent-root').should('have.length', 1)
})

// Verify Hub admin is show when Owners and admin is selected
Given('Login to the Rebelbase portal', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Go to Hub group member page', () => {
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.memberLink).eq(0).click();
})

And('Verify member page is from Hub', () => {
    cy.get('h1').should('have.text', 'Dev Hub')
})

And('Verify Hub admin is present', () => {
    cy.get('#mail-text').type(Cypress.env('username'))
    cy.wait(2000)
    cy.get('.MuiButtonBase-root > .MuiCardContent-root').should('have.length', 1)
})

Then('Verify member is display when Owners and admin is selected', () => {
    cy.get('#members-filter-select').click()
    cy.get('ul > li').contains(`Owner/Admin's Only`).click()
    cy.get('.MuiButtonBase-root > .MuiCardContent-root').should('have.length', 1)
})

// Verify Hub admin is not show when Member's only is selected
Given('Login to Rebelbase portal', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Go to member page', () => {
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.memberLink).eq(0).click();
})

And('Verify member page', () => {
    cy.get('h1').should('have.text', 'Dev Hub')
})

And('Verify Hub is present', () => {
    cy.get('#mail-text').type(Cypress.env('username'))
    cy.wait(2000)
    cy.get('.MuiButtonBase-root > .MuiCardContent-root').should('have.length', 1)
})

Then('Verify Hub admin is not display when Member only is selected', () => {
    cy.get('#members-filter-select').click()
    cy.get('ul > li').contains(`Member's Only`).click()
    cy.get('.MuiButtonBase-root > .MuiCardContent-root').should('not.have.length', 1)
})

// Verify pending invitation
Given('Login to Rebelbase portal', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Go to member page', () => {
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.memberLink).eq(0).click();
})

Then('Verify pending invitation', () => {
    cy.get('h1').should('have.text', 'Dev Hub')
    cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Pending Invites').click()
    cy.get('#mail-text').type('testhubadmin+10@rebelase.co')
    cy.get('.MuiCardActionArea-root > .MuiCardContent-root').should('have.length', 1)
})

// Verify default show all short option is selected
Given('Login to Rebelbase portal', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Go to member page', () => {
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.memberLink).eq(0).click();
})

Then('Verify default show all short option is selected', () => {
    cy.get('h1').should('have.text', 'Dev Hub')
    cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Pending Invites').click()
    cy.get('.MuiOutlinedInput-root > #days-filter-select').first().should('have.text', 'Show All')
})

// Resend all invitation
Given('Login to Rebelbase portal', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Go to member page', () => {
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.memberLink).eq(0).click();
})

Then('Verify resend all has been sent', () => {
    cy.get('h1').should('have.text', 'Dev Hub')
    cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Pending Invites').click()
    cy.contains('Resend All Invites').click({ force: true })
    cy.get(hubGroupPageSelector.newNotification).should('have.text', 'Your invites have been sent!')
})

// Resend single invitation
Given('Login to Rebelbase portal', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Go to member page', () => {
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.memberLink).eq(0).click();
})

Then('Verify resend single invitation has been sent', () => {
    cy.get('h1').should('have.text', 'Dev Hub')
    cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Pending Invites').click()
    cy.contains('Resend Invite').eq(0).click()
    cy.get(hubGroupPageSelector.newNotification).should('have.text', 'Your invites have been sent!')
})

// Delete pending invitation
Given('Login to Rebelbase portal', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Go to member page', () => {
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.memberLink).eq(0).click();
})

And('Send invitation', () => {
    cy.get('h1').should('have.text', 'Dev Hub')
    cy.get(hubGroupPageSelector.builderTab).should('have.text', 'Pending Invites').click()
    cy.xpath(smokeTestPageSelector.sendInviteButton).contains('Send Invite').should('be.disabled')
    cy.get('[placeholder="Add by email(s)"]').type('testhubadmin+1@gmail.com')
    cy.xpath(smokeTestPageSelector.sendInviteButton).contains('Send Invite').click()
    cy.get('[data-testid="hub-invite-success-response"]').should('have.text', 'Your invites have been sent!')
    cy.get('button').contains('Members').click()
})

Then('Delete pending invitation', () => {
    cy.get('button').contains('Pending Invites').click()
    cy.get('.infinite-scroll-component>div>div>div>div>div>div>div:nth-child(2)>div').eq(0).should('have.text', 'testhubadmin+1@gmail.com')
    cy.get(hubGroupPageSelector.deleteButton).first().click()
    cy.get(hubGroupPageSelector.newNotification).should('have.text', 'Your Invites have been removed')
})

// Verify placeholder should be decapitalized
Given('Login to Rebelbase portal', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(brainPageSelectors.notificationDismiss).click({ multiple: true })
})

When('Go to member page', () => {
    cy.get(smokeTestPageSelector.devHub).contains('Dev Hub').click();
    cy.xpath(smokeTestPageSelector.memberLink).eq(0).click();
})

And('Verify button and placeholder text', () => {
    cy.get('h1').should('have.text', 'Dev Hub')
    cy.get('[placeholder="Add by email(s)"]')
        .should('have.attr', 'placeholder', 'Add by email(s)')
    cy.xpath(smokeTestPageSelector.sendInviteButton)
        .should('have.text', 'Send Invite')
    cy.get('[placeholder="Search members by name or email"]')
        .should('have.attr', 'placeholder', 'Search members by name or email')
})

Then('Verify button and placeholder text in spanish version', () => {
    cy.get(smokeTestPageSelector.headerDropdown).first().click();
    cy.get('[data-testid="ExpandMoreIcon"]').click();
    cy.get('.MuiList-root > :nth-child(5) > .css-70qvj9 > .MuiBox-root > .MuiTypography-root').click(); // Select language
    cy.get('form>label').should('have.text', 'Invitar a la gente').click()
    cy.get('[placeholder="Añadir por correo electrónico"]')
        .should('have.attr', 'placeholder', 'Añadir por correo electrónico')
    cy.get('[data-testid="hub-send-invite-btn"]').should('have.text', 'enviar invitación')
    cy.get('[placeholder="Buscar por nombre o email"]').should('have.attr', 'placeholder', 'Buscar por nombre o email')
    cy.get(smokeTestPageSelector.headerDropdown).first().click();
    cy.get('#more-menu > .MuiPaper-root > .MuiList-root').click({ force: true });
    cy.get('.MuiList-root > :nth-child(4) > .css-70qvj9 > .MuiBox-root > .MuiTypography-root').click();
})