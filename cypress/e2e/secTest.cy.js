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