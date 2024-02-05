// wdio.conf.js

const { AllureReporter } = require('@wdio/allure-reporter');

exports.config = {
    // ... другие настройки ...

    reporters: [
        [AllureReporter, {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],
};
