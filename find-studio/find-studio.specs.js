const findStudioLocators = require('./find-studio.locators.js');
const findStudioPageObjects = require('./find-studio.pageObject.js');
const utilityFunctions = require('../utility-Functions /array-utility.js');

describe('Test Fileting Functionality For Weight Watchers Website', () => {
    const zipCode = '10003';

    it(`should verify that url contains the zip code from search field`, async() => {
        await findStudioPageObjects.navigateToFindStudio();
        await findStudioPageObjects.searchStudio(zipCode);
        expect(await browser.getCurrentUrl()).toContain(zipCode);
    });

    it(`should verify that first location displayed contains the zip code from search field`, async() => {
        await findStudioPageObjects.navigateToFindStudio();
        await findStudioPageObjects.searchStudio(zipCode);
        const meetingLocations = await findStudioPageObjects.getElementAttribute(findStudioLocators.locations, 'innerText');
        expect(meetingLocations).toContain(zipCode);
    });

    it(`should verify that the location appears when filtering by days in the location schedule`, async() => {
        findStudioPageObjects.navigateToFindStudio();
        await findStudioPageObjects.searchStudio(zipCode);
        const firstLocationId = await findStudioPageObjects.getElementAttribute(findStudioLocators.meetingLocationDivs, 'id');
        const studioDays = await findStudioPageObjects.getFirstStudioDays();
        await findStudioPageObjects.filterByStudioDays(studioDays);
        const firstLocationIdAfterClicking = await findStudioPageObjects.getElementAttribute(findStudioLocators.meetingLocationDivs, 'id');
        expect(firstLocationId == firstLocationIdAfterClicking).toBe(true);
    });

    it(`should verify that the first location disappears when filtering by days out of the location schedule`, async() => {
        findStudioPageObjects.navigateToFindStudio();
        await findStudioPageObjects.searchStudio(zipCode);
        const firstLocationId = await findStudioPageObjects.getElementAttribute(findStudioLocators.meetingLocationDivs, 'id');
        let studioDays = await findStudioPageObjects.getFirstStudioDays();
        const otherDays = await utilityFunctions.getArraysDifference(WEEK_DAYS, studioDays);
        await findStudioPageObjects.filterByOtherDays(otherDays);
        const firstLocationIdAfterClicking = await findStudioPageObjects.getElementAttribute(findStudioLocators.meetingLocationDivs, 'id');
        expect(firstLocationIdAfterClicking != firstLocationId).toBe(true);
    });
});