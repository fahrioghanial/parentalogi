// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe("Masuk", () => {
  const email = "parentalogi@gmail.com";
  const password = "abcd1234";

  it("Membuka halaman login", () => {
    cy.visit("http://localhost:3000");
    cy.get("button").contains("Masuk").click();
  });

  it("Masuk menggunakan email yang terdaftar", () => {
    cy.get("div[id=supertokens-root]")
      .shadow()
      .find("input[name=email]")
      .type(email);
    cy.get("div[id=supertokens-root]")
      .shadow()
      .find("input[name=password]")
      .type(password);
    cy.get("div[id=supertokens-root]")
      .shadow()
      .find("button[type=submit]")
      .click();
    cy.url().should("include", "/dashboard");
  });
});
