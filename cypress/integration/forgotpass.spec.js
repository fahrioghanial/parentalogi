// login.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="cypress" />

describe("Lupa Password", () => {
  const email = "parentalogi@gmail.com";
  const password = "abcd1234";

  it("Membuka halaman login", () => {
    cy.visit("http://localhost:3000");
    cy.get("button").contains("Masuk").click();
  });

  it("Membuka halaman lupa password dan memasukkan email", () => {
    cy.get("div[id=supertokens-root]")
      .shadow()
      .find("div")
      .contains("Forgot password?")
      .click();
    cy.get("div[id=supertokens-root]")
      .shadow()
      .find("input[name=email]")
      .focus()
      .type("parentalogi@gmail.com");
    cy.get("div[id=supertokens-root]")
      .shadow()
      .find("button[type=submit]")
      .click();
    cy.url().should("include", "/reset-password");
  });
});
