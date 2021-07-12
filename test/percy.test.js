require('dotenv').config()
const { it } = require("mocha");
const { Builder } = require("selenium-webdriver");
const percySnapshot = require('@percy/selenium-webdriver');
const baseUrl = process.env.PERCY_BRANCH == "master" ? "https://www.browserstack.com" : " https://k8s.bsstag.com"
const endPoints = {
    "Home Page": "/",
    "Pricing": "/pricing",
    "Automate Integration": "/integrations/automate",
    "Documentation": "/docs"
}
let args = process.argv.slice(2, process.argv.length);
let valueArgs = {}
for (let arg of args) {
    if (arg.includes("=")) {
        let x = arg.split("=");
        valueArgs[x[0]] = x[1];
    }
}
describe("Percy", async function () {
    it("Percy " + baseUrl, async function () {
        this.timeout(100000);
        let driver = new Builder().forBrowser('chrome').build()
        for (let ep in endPoints) {
            await driver.get(baseUrl + endPoints[ep]);
            await driver.sleep(1000);
            await percySnapshot(driver, ep)
        }
        await driver.quit()
    })
})