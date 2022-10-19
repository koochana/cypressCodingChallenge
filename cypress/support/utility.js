function getSetting(settingName) {
    let environment = Cypress.env('ENV');
    if (environment === '' || environment === undefined) {
        throw new Error(`There is no environment variable 'ENV' to get base url`);
    }

    settingName = `${environment.toLowerCase()}_${settingName}`;
    let value = Cypress.env(settingName);

    if (value === '' || value === undefined) {
        throw new Error(`There is no environment variable '${settingName}'`);
    }

    return value;
}

export class Utility {
    getBaseUrl() {
        return getSetting("baseUrl");
    };
}

export const utils = new Utility()