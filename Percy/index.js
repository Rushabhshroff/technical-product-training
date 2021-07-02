const { Builder, By, Key, until } = require("selenium-webdriver");
const percySnapshot = require('@percy/selenium-webdriver');
const baseUrl = process.env.PERCY_BRANCH == "production" ? "https://www.browserstack.com" : " https://k8s.bsstag.com"
const endPoints = {
    "Home Page":"/",
    "Pricing":"/pricing",
    "Automate Integration":"/integrations/automate",
    "Documentation":"/docs"
}
async function Main(){
    let driver = new Builder().forBrowser('chrome').build()
    for(let ep in endPoints){
        await driver.get(baseUrl + endPoints[ep]);
        await percySnapshot(driver,ep)
    }
    await driver.quit()
}

Main()