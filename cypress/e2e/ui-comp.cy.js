/// <reference types="cypress" />

beforeEach('Open test applicantion', () => {
        cy.visit('/')

})

it.only('input fields', () => {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    
    const name = 'MoMo'

    cy.get('#inputEmail1').type('hello@testcom', {delay: 200}).clear().type('hello').clear()
    //cypress is smart enough to know you want to type in the field

    cy.contains('nb-card', 'Using the Grid').find('#inputEmail1').type('Yes "it works"').clear()
    //pay attention to what quotes to use
    //can't use 'Yes 'It works'' -> 'Yes "It works"' or "Yes 'It works'"

    cy.contains('nb-card', 'Using the Grid').find('#inputEmail1').type(`${name}@test.com`)

    //sometimes cypress types faster than the test execution so best to make an assertion to make sure the text is there
    cy.get('#inputEmail1').should('have.value', `${name}@test.com`).clear().type('test@test.com')

    //expect input field would not be empty
    cy.get('#inputEmail1').should('not.have.value', '').clear().type('test@test.com')
        .press(Cypress.Keyboard.Keys.TAB)d

    cy.contains('Auth').click()
    cy.contains('Login').click()

    cy.get('#input-email').type('test@test.com')
    cy.get('#input-password').type('Welcome{enter}')

    //you can also use Shift and Alt if you needed it, for example to type in capital letters
    //tab does not work in cypress, you need to use .press() method
    //if you want to reuse fields, use .invoke('prop', 'value', '')
})