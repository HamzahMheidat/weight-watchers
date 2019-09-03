const findStudioLocators = require('./find-studio.locators.js');

filterByStudioDays = async studioDays => {
    const filterDays = element.all(by.css(findStudioLocators.daysFilterButtons));
    filterDays.each(async dayFilter => {
        let dayFilterText = await dayFilter.getAttribute('innerText');
        if (studioDays.includes(dayFilterText.toUpperCase())) {
            dayFilter.click();
        }
    });
};

filterByOtherDays = async OtherDays => {
    const filterDays = element.all(by.css(findStudioLocators.daysFilterButtons));
    filterDays.each(async dayFilter => {
        let dayFilterText = await dayFilter.getAttribute('innerText');
        if (OtherDays.includes(dayFilterText.toUpperCase())) {
            dayFilter.click();
        }
    });
};

getElementAttribute = async (locator, attribute) => {
    const firstElement = await element.all(by.css(locator)).get(0);
    browser.wait(EC.visibilityOf(firstElement), WAIT_DURATION);
    const elementAttribute = await firstElement.getAttribute(attribute);
    return elementAttribute;
};

getFirstStudioDays = async () => {
    let studioScheduleDays = [];
    const firstLocation = await element.all(by.css(findStudioLocators.meetingLocationDivs)).get(0);
    const viewWorkShopLink = await firstLocation.element(by.css(findStudioLocators.viewWorkShopsLink));
    await browser.wait(EC.elementToBeClickable(viewWorkShopLink), WAIT_DURATION);
    await viewWorkShopLink.click();
    await firstLocation.all(by.css(findStudioLocators.studioDays)).each(async studioDay => {
        const day = await studioDay.getAttribute('innerText');
        studioScheduleDays.push(day);
    });
    return studioScheduleDays;
};

navigateToFindStudio = async () => {
    browser.get(BASE_URL);
    const findStudioButton = await element(by.css(findStudioLocators.findStudioButton));
    browser.wait(EC.visibilityOf(findStudioButton), WAIT_DURATION);
    await findStudioButton.click();
};

searchStudio = async zipCode => {
    const meetingSearchInputField = await element(by.css(findStudioLocators.meetingSearchInputField));
    await meetingSearchInputField.clear();
    await meetingSearchInputField.sendKeys(zipCode);
    const meetingSearchButton = await element(by.css(findStudioLocators.meetingSearchButton));
    browser.wait(EC.visibilityOf(meetingSearchButton), WAIT_DURATION);
    await meetingSearchButton.click();
};

module.exports = { filterByStudioDays, filterByOtherDays, getFirstStudioDays, getElementAttribute, navigateToFindStudio, searchStudio };
