const findStudioLocators = require('./find-studio.locators.js');
const findStudioPageObjects = require('./find-studio.pageObject.js');
const utilityFunctions = require('../utility-Functions /array-utility.js');

describe('Test find studio at weight watchers website', () => {
    const zipCode = '10003';

    it(`Should verify that url contains the zip code from search field`, async() => {
        await findStudioPageObjects.navigateToFindStudio();
        await findStudioPageObjects.searchStudio(zipCode);
        expect(await browser.getCurrentUrl()).toContain(zipCode);
    });

    it(`Should verify that first location displayed contains the zip code from search field`, async() => {
        await findStudioPageObjects.navigateToFindStudio();
        await findStudioPageObjects.searchStudio(zipCode);
        const meetingLocations = await findStudioPageObjects.getElementAttribute(findStudioLocators.locations, 'innerText');
        expect(meetingLocations).toContain(zipCode);
    });

    it(`Should verify that the location appears when filtering by days in the location schedule`, async() => {
        findStudioPageObjects.navigateToFindStudio();
        await findStudioPageObjects.searchStudio(zipCode);
        const firstLocationId = await findStudioPageObjects.getElementAttribute(findStudioLocators.meetingLocationDivs, 'id');
        const studioDays = await findStudioPageObjects.getFirstStudioDays();
        studioDays.push('SUN');
        await findStudioPageObjects.filterByStudioDays(studioDays);
        const firstLocationIdAfterClicking = await findStudioPageObjects.getElementAttribute(findStudioLocators.meetingLocationDivs, 'id');
        expect(firstLocationId == firstLocationIdAfterClicking).toBe(true);
    });

    it(`Should verify that the first location disappears when filtering by days out of the location schedule`, async() => {
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