/// <reference types ="cypress"/>
const data = require("../../fixtures/data.json")

describe("Testing the create booking API", () => {
    
  //Passing correct payload data
  it("Create booking with the correct data provided", () => {
      cy.request({
        method: "POST",
        url: Cypress.config().apiUrl,
        body:data.body.requestValidData,
      }).then((Response) => {
        expect(Response.status).eq(200); 
        expect(JSON.stringify(Response.body.booking)).eq(JSON.stringify(data.body.requestValidData))
      });
  });


  // Incorrect date passed 
  it("Validate booking with false date i.e changing date format to string", () => {
      cy.request({
        method: "POST",
        url: Cypress.config().apiUrl,
        body:data.body.requestInvalidData,
      }).then((Response) => {
        expect(Response.status).eq(200);
        expect(Response.body.booking.bookingdates.checkin).eql("0NaN-aN-aN"); // response error
      });
  });



//Data type mismatch with name as integer
  it("Create booking with corrupted data i.e add integer in Name field", () => {
      cy.request({
        method: "POST",
        url: Cypress.config().apiUrl,
        body:data.bodyrequestInvalidNameData,
        failOnStatusCode: false,
      }).then((Response) => {
        expect(Response.status).eq(500);
        expect(Response.body).eql("Internal Server Error");
      });
  });
});
