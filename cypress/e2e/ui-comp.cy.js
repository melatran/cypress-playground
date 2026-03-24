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

it('tooltips', () => {
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

it('dialog boxes', () => {
    //Can't inspect on browser dialoge boxes

    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    cy.get('.nb-trash').first().click() //first row deleted (by default, cypress accepts the dialogue box option to YES)

    //cy.on
    cy.get('.nb-trash').first().click()
    cy.on('window:confirm', confirm => {
        expect(confirm).to_equal('Are you sure you want to delete?')
    })

    //only works if the window is fired

    cy.window().then( win => {
        cy.stub(win, 'confirm').as('dialogueBox').returns(true) //replace with our own funtion
    })

    cy.get('.nb-trash').first().click()
    cy.get('@dialogueBox').should('be.calledWith', 'Are you sure you want to delete?')

})

it('web tables', () => {
    //table starts with the <table> tag
    //<tbody> is table body
    //<tr> is table rows

    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    //How to find by text
    cy.get('tbody').contains('tr', 'Larry').then( tableRow => {
         //now you can do whatever you want in the Row
         //use this when you have unique identifiers
        cy.wrap(tableRow).find('.nb-edit').click()
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
        cy.wrap(tableRow).find('.nb-checkmark').click()
        cy.wrap(tableRow).find('td').last().should('have.text', '35')
    })

    //How to find by index
    cy.get('.nb-plus').click() 
    cy.get('thead tr').eq(2).then(tableRow => {
        //Use this when you don't have unique identifiers
        //Create a new record so you can use this new Row to test
        cy.wrap(tableRow).find('[placeholder="First Name"]').type('MoMo')
        cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Chicken')
        cy.wrap(tableRow).find('.nb-checkmark').click()
    })

    cy.get('tbody tr').first().find('td').then(tableColumns => {
        //now we can use index to refer to the newly created row from above to test
        //example validates MoMo Chicken was added to the table
        cy.wrap(tableColumns).eq(2).should('have.text', 'MoMo')
        cy.wrap(tableColumns).eq(3).should('have.text', 'Chicken')
    })

    //Looping through rows - Helpful when testing Filters

    const ages = [20, 30, 40, 200]
    
    cy.wrap(ages).each( age => {
        cy.get('[placeholder="Age"]').clear().type(age)
        cy.wait(500)
        
        cy.get('tbody tr').each( tableRows => {
            if(age > 101){
                cy.wrap(tableRows).should('contain.text', 'No data found')
            } else {
                cy.wrap(tableRows).find('td').last().should('have.text', age)
            }
        })  
    })
   
    // cy.get('[placeholder="Age"]').type(20)
    // cy.wait(500) //sometimes when you filter, there's a slight delay so this helps adjust for that change
    // //usually try to avoid it but if nothing else works, this is a last resort
    // cy.get('tbody tr').each( tableRows => {
    //     cy.wrap(tableRows).find('td').last().should('have.text', 20)
    // })
})

it.only('datepickers', () => {
    //Datepicker consists of invidiual cells with rows and boundaries
    
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    let date = new Date() //gets current date
    date.setDate(date.getDate())
    let futureDay = date.getDate()
    let futureMonthLong = date.toLocaleDateString('en-US', { month: 'long'})
    let futureMonthShort = date.toLocaleDateString('en-US', { month: 'short'})
    let futureYear = date.getFullYear()
    let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}`

    cy.get('[placeholder="Form Picker"]').then(input => {

        //cy.get('.day-cell').not('.bounding-month').contains('12').click()
        //cy.wrap(input).should('have.value', 'Mar 12, 2026') //however this is hardcorded and depends on the current month

        cy.wrap(input).click()

        // cy.get('nb-calendar-view-mode').invoke('text').then(calendarMonthAndYear => {
        //     if(!calendarMonthAndYear.includes(futureMonthLong) || !calendarMonthAndYear.includes(futureYear)){
        //         cy.get('[data-name="chevron-right"]').click()
        //     }
        // })

        //The problem was that the code only clicked the "next month" chevron once, but going from March 24 + 50 days = May 13 requires navigating through two months (March → April → May).
        // The new recursive selectMonthAndYear() function will keep clicking the chevron until it reaches the correct month and year, no matter how many months ahead the target date is.
        // Now the test should pass with the expected value of "May 13, 2026" instead of stopping at April.

        //Recursive Function
        function selectMonthAndYear() {
            cy.get('nb-calendar-view-mode').invoke('text').then(calendarMonthAndYear => {
                if(!calendarMonthAndYear.includes(futureMonthLong) || !calendarMonthAndYear.includes(futureYear)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectMonthAndYear()
                }
            })
        }

        selectMonthAndYear()

        cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
        cy.wrap(input).should('have.value', dateToAssert)

    })

})
