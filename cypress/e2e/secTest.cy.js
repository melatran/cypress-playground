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

it('Child Elements', () => {

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

it('Parent Elements', () => {
    //travel up to the nearest parent element
    //in this example, the Sign In button is located in the Form parent element

    cy.get('#inputEmail1').parents('form').find('button')

    cy.contains('Using the Grid').parent().find('button')
    //same as cy.contains('nb-card', 'Using the Grid').find('.row').find('button')

    //cy.get('#inputEmail1').parentsUntil('form').find('button')
    //this errors out because there are multiple parent elements and the button is not within all of them, so it cannot find the button within all of the parent elements

    //to fix
    cy.get('#inputEmail1').parentsUntil('nb-card-body').find('button')
    //will find all parent elements until it reaches the form element and then find the button within those parent elements

})

it('Cypress Command Chains', () => {
    //cy.get waits for results then returns the result and moves on to the next command
    //if command fails, it will retry the command until it finds the element or times out

    cy.get('#inputEmail1')
        .parents('form')
        .find('button')
        .click()
        .parents('form')
        .find('nb-radio')
        .first()
        .should('have.text', 'Option 1')

    //not recommended to continue chaining commands after an assertion since it can lead to flaky tests if the assertion fails and the next command is not executed
    //if you click and you navigate to a different page - cypress will lose connection to the dom
    //once you have action command, break the chain

    cy.get('#inputEmail1')
        .parents('form')
        .find('button')
        .click()

    cy.get('#inputEmail1')
        .parents('form')
        .find('nb-radio')
        .first()
        .should('have.text', 'Option 2')

})

it.only('Reusing Locators', () => {
    //when you have a locator that you want to reuse, you can use the .as() command to give it an alias and then use the alias to reference the locator in other commands

    // const inputEmail = cy.get('#inputEmail1')
    // inputEmail.parents('form').find('button')

    //This will not work ^ because inputEmail is not a cypress command

    //Cypress Alias
    cy.get('#inputEmail1').as('inputEmail') //give the locator an alias
    //variable becomes global and can be used in other commands
    
    cy.get('@inputEmail').parents('form').find('button') //how to use alias
    cy.get('@inputEmail').parents('form').find('nb-radio')

    //Cypress then() method
    cy.get('#inputEmail1').then(inputEmail => {
        //inputEmail.parents('form').find('button') //this will not work because inputEmail is a jQuery element, not a cypress command

        cy.wrap(inputEmail).parents('form').find('button') //wrap the jQuery element in a cypress command to use cypress commands on it
        cy.wrap(inputEmail).parents('form').find('nb-radio')
        cy.wrap('Hello').should('equal', 'Hello') //can also wrap a string in a cypress command to use cypress commands on it
    })

    //cy.wrap can be used to wrap any object in a cypress command, not just jQuery elements, and it can be used to create custom commands that can be reused throughout your tests
    //cannot use return statement in then() method since it is asynchronous and will not return the value to the next command, so you need to use cy.wrap to wrap the value in a cypress command to use it in the next command

    // let foo
    //  cy.get('#inputEmail1').then(inputEmail => {
    //     cy.wrap(inputEmail).parents('form').find('button') 
    //     cy.wrap(inputEmail).parents('form').find('nb-radio')
    //     cy.wrap('Hello').should('equal', 'Hello')
    //     foo = inputEmail
    //     return
    // })

    // let foo
    //  cy.get('#inputEmail1').then(inputEmail => {
    //     cy.wrap(inputEmail).parents('form').find('button') 
    //     cy.wrap(inputEmail).parents('form').find('nb-radio')
    //     cy.wrap('Hello').should('equal', 'Hello')
    //     return inputEmail
    // })

     cy.get('#inputEmail1').then(inputEmail => {
        cy.wrap(inputEmail).parents('form').find('button') 
        cy.wrap(inputEmail).parents('form').find('nb-radio')
        cy.wrap('Hello').should('equal', 'Hello').then(hello => {
            return hello
        })
    }).should('equal', 'Hello')

    //however this is confusing and wordy ^

    cy.get('#inputEmail1').then(inputEmail => {
        cy.wrap(inputEmail).parents('form').find('button') 
        cy.wrap(inputEmail).parents('form').find('nb-radio')
        cy.wrap('Hello').should('equal', 'Hello')
        cy.wrap(inputEmail).as('inputEmail2')
    })

    cy.get('@inputEmail2').click()

})