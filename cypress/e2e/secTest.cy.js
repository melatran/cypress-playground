/// <reference types="cypress" />

 beforeEach('Open test applicantion', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click() 
    })

it('Hello world 1', () => {
    //by Tag
    cy.get('input')

    //by iD
    cy.get('#inputEmail1')

    //by Class
    cy.get('.input-full-width')

    //by Attribute
    cy.get('[fullwidth]')

    //by attribute with value
    cy.get('[placeholder="Email"]') //use single quotes since double quotes are used in the value and cypress doesn't know

    // by entire class value
    cy.get('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //how to combine severl attributes
    cy.get('[placeholder="Email"][fullwidth]') //don't need to but a space between the two attributes since we are looking for one element with both of these attributes
    cy.get('input[placeholder="Email"]') //can also combine tag with attribute

    //find by data-cy attribute (best practice to add this attribute to the element you want to interact with)
    cy.get('[data-cy="inputEmail1"]') //will not always be present
})

it.only('Cypress Locator Methods', () => {
    //Theory
    //get() - find element in the page
    //find() - find element within another element (find only child elements)
    //contains() - find the first element with specific text; case sensitive
    //get() - find all elements

    cy.contains('Sign in') //will find the first element with this text
    cy.contains('Sign In', { matchCase: false }) //will find the first element with this text; case insensitive
    cy.contains('Emai')
    cy.contains('[status="warning"]', 'Sign in') //will find the first element with this text and this attribute value
    cy.contains('nb-card', 'Horizontal form').find('button') //will find the first element with this text and then find the button within that element
    cy.contains('nb-card', 'Horizontal form').contains('Sign in') //will find the first element with this text within the element with this text and click it
    cy.contains('nb-card', 'Horizontal form').get('button') //will find all buttons within the element with this text
})