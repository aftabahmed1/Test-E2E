import { laptopPage } from '../../pageobjects/laptops.po'
import { dressesPage } from '../../pageobjects/dresses.po'
import { homePage } from '../../pageobjects/homepage.po';
const testdata = require('../../fixtures/uiData.json')

beforeEach(function () {
  cy.intercept('GET', '**/dresses/?sort=price.net_desc').as('desc')
  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
})

describe('iPrice', () => {

  it('Users are able to filter for an item by brand under the Computing > Laptop section', () => {
    cy.visit('/computing/laptops', { failOnStatusCode: false });
    laptopPage.getBrand()
      .contains(testdata.searchBrand)
      .click()
      .then(() => {
        cy.productResults()
          .each(($el, index) => {
            const actual = $el.text();
            const actualToUppercase = actual.toUpperCase()
            expect(actualToUppercase).to.contains(testdata.searchBrand.toUpperCase())
          })
      })
  })

  it('Users are able to sort results under dresses by price in descending order', () => {
    cy.visit('/clothing/dresses', { failOnStatusCode: false });
    dressesPage.getPrice()
      .click()
      .then(() => {
        dressesPage.getPriceIconSorting()
          .dblclick()
        dressesPage.getDescResult()
        dressesPage.getProducts()
          .each(($el, index) => {
            const actualPrice = $el.text();
            let priceConvertToInt = actualPrice.replace(/\D/g, "");
            const price = parseInt(priceConvertToInt)
            expect(price).to.be.greaterThan(999999)
          })
      })
  })

  it('Users are able to search for an item', () => {
    cy.visit('/', { failOnStatusCode: false });
    homePage.searchText()
      .type(`${testdata.searchItem}{enter}`, { delay: 40 })
      .then(() => {
        cy.productResults()
          .each(($el, index) => {
            const actual = $el.text();
            expect(actual).to.contains(testdata.searchItem)
          })
      })
  })
})