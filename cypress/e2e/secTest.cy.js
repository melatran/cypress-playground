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

it('Cypress Locator Methods', () => {
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

it.only('Child Elements', () => {

    cy.contains('nb-card', 'Using the Grid').find('.row').find('button')

    cy.get('nb-card').find('nb-radio-group').contains('Option 1')

    cy.get('nb-card nb-radio-group').contains('Option 1')
    //can also use this syntax to find the element with this text within the element with this text
    // the space between the two elements means that we are looking for the element with this text within the element with this text
    // try to combine two child elements into a single locator

    cy.get('nb-card > nb-card-body')

    cy.get('nb-card > nb-card-body [placeholder="Email"]')
    //can also combine the child element with the attribute to find the element with this attribute within the child element
    //found 5 elements since there are 5 cards on the page and each card has an email input field

    cy.get('nb-card > nb-card-body [placeholder="Jane Doe"]')
    // when you build selectors, make them as short as possibe but as long as necessary to make them unique and stable
    
    cy.get('[placeholder="Jane Doe"]')
    //since there is only one element with this placeholder, we don't need to add the parent element to make it unique
})