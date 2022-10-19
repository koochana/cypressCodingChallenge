/// <reference types="cypress" />

import { currencyConverterPage } from '../pages/currencyConverter.page';
import { utils } from "../../support/utility"

//Call getBaseUrl() to get environment specific url value
const url = utils.getBaseUrl();

let currencyConverterName;
let currencyConverter;
describe('Currency-converter and send-money related test-scripts:', () => {

    beforeEach(() => {
        
    })

    afterEach(() => {

    })

    it('Example of currency conversion from GBP to EUR', { tags: ['currencyConverter', 'smoke'] }, () => {
        cy.visit(url+"/currencyconverter/");
        currencyConverterPage.inputAmount("10");
        currencyConverterPage.clickOnFromCurrencyItem("GBP");
        currencyConverterPage.clickOnToCurrencyItem("EUR");
        currencyConverterPage.clickOnConvertButton();
        currencyConverterPage.verifyConvertedAmount("11.4");
    });

    it('Currency Converter errors and assertions', { tags: ['currencyConverter', 'smoke'] }, () => {
        cy.visit(url+"/currencyconverter/");
        currencyConverterPage.inputAmount("ABC");
        currencyConverterPage.verifyEnterAmountError("Please enter a valid amount")
        currencyConverterPage.clickOnFromCurrencyItem("INR");
        currencyConverterPage.verifyFromCurrency("INR – Indian Rupee");
        currencyConverterPage.verifyConvertButton("Convert");
    });

    it('Verify Register Now button is enabled', { tags: ['currencyConverter', 'smoke'] }, () => {
        cy.visit(url+"/send-money/");
        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            return false
          })
        currencyConverterPage.acceptCookies();
        currencyConverterPage.clickOnSignIn();
        currencyConverterPage.inputUsername("shireesha@gmail.com");
        currencyConverterPage.inputPassword("bla123Blaa");
        currencyConverterPage.verifyRegisterNowBtnIsEnabled();
    });
})