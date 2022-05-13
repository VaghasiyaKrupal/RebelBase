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
    cy.get(brainPageSelectors.notificationDismiss).click()
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
    cy.get('.MuiButtonBase-root > .MuiCardContent-root').should('have.length',1)
})

// Verify Hub admin is show when Owners and admin is selected
Given('Login to the Rebelbase portal', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(brainPageSelectors.notificationDismiss).click()
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
    cy.get('.MuiButtonBase-root > .MuiCardContent-root').should('have.length',1)
})

Then('Verify member is display when Owners and admin is selected',()=>{
    cy.get('#members-filter-select').click()
    cy.get('ul > li').contains(`Owner/Admin's Only`).click()
    cy.get('.MuiButtonBase-root > .MuiCardContent-root').should('have.length',1)
})

// Verify Hub admin is not show when Member's only is selected
Given('Login to Rebelbase portal', () => {
    cy.login(Cypress.env('username'), Cypress.env('password'))
    cy.get(brainPageSelectors.notificationDismiss).click()
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