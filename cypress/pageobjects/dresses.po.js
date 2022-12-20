/// <reference types="cypress"/>
const dressObjects={
    checkPrice:'[data-vars-lb="Price"]',
    iconPrice: '[data-vars-lb="Price"] i',
    productShop: `a[data-vars-action='shop'] div:nth-child(3) div`
}
export class Dresses {

    getPrice() {
        return cy.get(dressObjects.checkPrice)
            .contains('Price');
    }

    getPriceIconSorting() {
        return cy.get(dressObjects.iconPrice);
    }

    getDescResult() {
        cy.wait('@desc').its('response.statusCode')
          .should('eq',200)
    }

    getProducts() {
        return cy.get(dressObjects.productShop);
    }
}

export const dressesPage = new Dresses();