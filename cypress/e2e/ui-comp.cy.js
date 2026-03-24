/// <reference types="cypress" />

beforeEach('Open test applicantion', () => {
        cy.visit('/')

})

it('input fields', () => {
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
        .press(Cypress.Keyboard.Keys.TAB)

    cy.contains('Auth').click()
    cy.contains('Login').click()

    cy.get('#input-email').type('test@test.com')
    cy.get('#input-password').type('Welcome{enter}')

    //you can also use Shift and Alt if you needed it, for example to type in capital letters
    //tab does not work in cypress, you need to use .press() method
    //if you want to reuse fields, use .invoke('prop', 'value', '')
})

it('radio buttons', () => {
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    
    cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(allRadioButtons => { 
        cy.wrap(allRadioButtons).eq(0).check({force: true}).should('be.checked')
        //you need the check(force:true) because the radio button is hidden, and cypress cannot click on it, so you need to force it to click
        //don't use force:true for everything, only when you need to, because it can cause problems with your tests if you use it too much
        
        //These use indexes for the radio buttons
        cy.wrap(allRadioButtons).eq(1).check({force: true})
        cy.wrap(allRadioButtons).eq(0).should('not.be.checked')
        cy.wrap(allRadioButtons).eq(2).should('be.disabled')
    })

    //If you wanted to use labels instead of indexes, you can do it like this:
    cy.contains('nb-card', 'Using the Grid').contains('label','Option 1').find('input').check({force: true})

    //From the Cypress docs, use check for radio buttons and checkboxes, and click for everything else
})

it('checkboxes', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    //if you want checkboxes to be checked, use .check() method, if you want them to be unchecked, use .uncheck() method
    //click will not work for checkboxes because they are hidden
    cy.get('[type="checkbox"]').click({force: true, multiple: true})

    cy.get('[type="checkbox"]').check({force: true})
    cy.get('[type="checkbox"]').eq(0).uncheck({force: true}).should('not.be.checked')
    cy.get('[type="checkbox"]').should('be.checked')

})

it('lists and dropdowns', () => {
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    //dropdowns may be seperate from the main dropdown element, so you need to click on the dropdown to open it, and then click on the option you want

    cy.contains('div', 'Toast type:').find('select').select('info').should('have.value', 'info')

    cy.contains('div', 'Position').find('nb-select').click()
    cy.get('.option-list').contains('bottom-right').click()
    cy.contains('div', 'Position').find('nb-select').should('have.text', 'bottom-right')

    cy.contains('div', 'Position:').find('nb-select').then(dropdown => {
        cy.wrap(dropdown).click()
        cy.get('.option-list nb-option').each((option, index, list) => {
            cy.wrap(option).click()
            //errors out since after selecting from dropdown, it collapses/closes
            //the loop is trying to select another item but it doesn't see it (DOM no longer attached)
            //so you have to open drodown again - stay expanded
            if(index < list.length-1) 
                cy.wrap(dropdown).click()
        })

    })
})

it.only('tooltips', () => {
    //difficult to inspect tooltip since it disappears
    //use button tag

    cy.contains('Modal & Overlays').click()
    cy.contains('Tooltip').click()
    cy.contains('button', 'Top').trigger('mouseenter')
    //no hover methods; but there are trigger
    //Event Listeners > Click, MouseEnter event
    cy.get('nb-tooltip').should('have.text', 'This is a tooltip')

    //Cypress freezes in the DOM and that is how you can explore the tooltip to find the right locator

})

