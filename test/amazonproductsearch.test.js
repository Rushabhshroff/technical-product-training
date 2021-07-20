require('dotenv').config()
global.fetch = require('node-fetch');
const { it } = require("mocha");
const parallel = require("mocha.parallel");
const AmazonProductSearch = require("../amazonproductsearch")
const caps = require('../capabilities.js');
let args = process.argv.slice(2, process.argv.length);
let valueArgs = {}
for (let arg of args) {
    if (arg.includes("=")) {
        let x = arg.split("=");
        valueArgs[x[0]] = x[1];
    }
}
const remoteUrl = `https://${process.env.SERVER_USER}:${process.env.SERVER_ACCESS_TOKEN}@hub-cloud.browserstack.com/wd/hub`
const runner = args.includes('parallel') ? parallel : describe;
console.log(args);
runner("Amazon Product Search", async function () {
    let remoteSession = args.includes('remote');
    let capabilities = caps['amazon-product-search'];
    capabilities.forEach(function (cap) {
        let driver = new AmazonProductSearch(cap);
        if (remoteSession) {
            try {
                driver.builder.usingServer(remoteUrl)
            } catch (err) {
                console.log(err)
                return;
            }
        }
        it(cap.name, async function () {
            this.timeout(1000000)
            try {
                await driver.Launch();
                await driver.search();
                await driver.applyBrand();
                await driver.sortHighToLow();
                await driver.printProducts();
                if (remoteSession) {
                    await driver.driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Test Executed Successfully"}}');
                    await PrintSessionDetails(driver);
                }
            } catch (err) {
                console.log(err)
                if (remoteSession) {
                    await driver.driver.executeScript(`browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Test Failed"}}`);
                    await PrintSessionDetails(driver);
                }
                throw err;
            } finally {
                await driver.endSession();
            }
        })
    })
})

/**
 * @param {AmazonProductSearch} driver
 */
async function PrintSessionDetails(driver){
    let session = await driver.driver.getSession();
    let sessionId = session.getId()
    let Auth = "Basic " + Buffer.from(`${process.env.SERVER_USER}:${process.env.SERVER_ACCESS_TOKEN}`).toString('base64');
    let sessionInfo = await fetch(`https://api.browserstack.com/automate/sessions/${sessionId}.json`,{
        method:'GET',
        headers:{
            'authorization':Auth
        }
    })
    await sessionInfo.json().then(console.log)
    let textLog = await fetch(`https://api.browserstack.com/automate/sessions/${sessionId}/logs`,{
        method:'GET',
        headers:{
            'authorization':Auth
        }
    })
    await textLog.text().then(console.log)
}