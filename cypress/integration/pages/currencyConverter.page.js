/// <reference types="cypress" />

import { utils } from "../../support/utility"

// const ext_facility_id = utils.getRandomChar();
// const facility_name = 'AUTOMATE' + utils.getRandomChar();

export class CurrencyConverterPage {
  //Element - Locators
  elements = {
    currencyConverterContainer: () => cy.get('div.tab-box__MainTabContainer-sc-28io75-0'),
    amountInput: () => cy.get('span.amount-input'),
    fromCurrency: () => cy.get('#midmarketFromCurrency'),
    toCurrency: () => cy.get('#midmarketToCurrency'),
    convertButton: () => cy.get('button[type=submit]'),
    calculatedAmount: () => cy.get('p.result__BigRate-sc-1bsijpp-1'),
    enterValidAmountError: () => cy.get('.currency-converter__ErrorText-zieln1-2'),
    descriptiveTextOfFromCurrency: () => cy.get('div#midmarketFromCurrency-descriptiveText'),
    signInAndSend: () => cy.get('a[href*="https://transfer.xe.com/signup/personal/step1?ctaPosition=tab"]'),
    acceptCookies: () => cy.get('div:nth-child(4) > button.button__BaseButton-sc-1qpsalo-0.haqezJ'),
    email: () => cy.get('input#email'),
    password: () => cy.get('input#password'),
    registerBtn: () => cy.get('button[type=submit]'),
    listbox: () => cy.get('[role="listbox"]')
  }

  inputAmount(Amount) {
    this.elements.amountInput().should('be.visible').type(Amount);
  }

  clickOnFromCurrencyItem(currency) {
    this.elements.fromCurrency().should('be.visible').click().then(() => {
      this.elements.listbox().contains(currency).parent().invoke('show').click();
    });
  }

  clickOnToCurrencyItem(currency) {
    this.elements.toCurrency().should('be.visible').click().then(() => {
      this.elements.listbox().contains(currency).parent().invoke('show').click();
    });
  }

  verifyFromCurrency(currency) {
    this.elements.descriptiveTextOfFromCurrency().invoke('text').then((text) => {
      expect(text).to.contain(currency);
    });
  }

  verifyConvertButton(convert) {
    this.elements.convertButton().invoke('text').then((text) => {
      expect(text).to.contain(convert);
    });
  }

  clickOnConvertButton() {
    this.elements.convertButton().should('exist').click();
  }

  verifyConvertedAmount(calculatedAmount) {
    this.elements.calculatedAmount().invoke('text').then((text) => {
      expect(text.trim()).to.contain(calculatedAmount);
    });
  }

  verifyEnterAmountError(EnterAmountError) {
    this.elements.enterValidAmountError().invoke('text').then((text) => {
      expect(text.trim()).to.contain(EnterAmountError);
    });
  }

  acceptCookies() {
    this.elements.acceptCookies().contains('Accept').click({force: true})
  }

  clickOnSignIn() {
    this.elements.signInAndSend().scrollIntoView().should('exist').click();
  }

  inputUsername(email){
  this.elements.email().should('be.visible').type(email);
  }

  inputPassword(password){
    this.elements.password().should('be.visible').type(password);
  }

  verifyRegisterNowBtnIsEnabled(){
    this.elements.registerBtn().should('be.enabled');
  }

}

export const currencyConverterPage = new CurrencyConverterPage()