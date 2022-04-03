// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe("Daftar", () => {
  const email = "parentalogi@gmail.com";
  const password = "abcd1234";

  it("Membuka halaman sign up", () => {
    cy.visit("http://localhost:3000");
    cy.get("button").contains("Daftar").click();
  });

  it("Daftar dengan mengisikan email dan password", () => {
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
    cy.url().should("include", "/verify-email");
  });
});
