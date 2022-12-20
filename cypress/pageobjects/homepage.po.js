/// <reference types="cypress"/>
const homepageObjects={
    searchBox:'#term-desktop'
}
export class Homepage {

    searchText(){
        return cy.get(homepageObjects.searchBox).clear()
    }
}

export const homePage = new Homepage();