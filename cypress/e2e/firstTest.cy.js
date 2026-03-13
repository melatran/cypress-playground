/// <reference types="cypress" />

 beforeEach('Open test applicantion', () => {
        cy.visit('/')
    })

it('Hello world 1', () => {
})

it('Hello world 2', () => {

})

describe('Test suite 1', () => {
    beforeEach('Open test applicantion', () => {
        cy.visit('/')
    })

    it('Hello world 3', () => {
    })

    it('Hello world 4', () => {
    })  
    
    describe('Test suite 2', () => {
    it('Hello world 3', () => {
    })

    it('Hello world 4', () => {
    })  

    // You can also use afterEach() hook to run some code after each test in the suite
    
})
})


describe('Test suite 2', () => {
    it('Hello world 3', () => {
    })

    it('Hello world 4', () => {
    })
})  