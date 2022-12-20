/// <reference types="cypress"/>
export class Laptops {
    getBrand() {
        return cy.get('[data-vars-lb="position:2 | brandName:Dell"]');
    }
}

export const laptopPage= new Laptops();