var { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: ["--window-size=1800,1200",
                "--headless"
            ]
        }
    },
    framework: 'jasmine',
    specs: ['find-studio/find-studio.specs.js'],
    onPrepare: () => {
        global.EC = protractor.ExpectedConditions;
        global.WAIT_DURATION = 20000;
        global.WEEK_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        global.BASE_URL = 'https://www.weightwatchers.com/us/';
        browser.waitForAngularEnabled(false);
        jasmine.getEnv().addReporter(new SpecReporter({
            suite: {
                displayNumber: true,
            }
        }));
    }
};