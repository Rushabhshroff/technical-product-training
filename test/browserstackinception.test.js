require('dotenv').config()
const { it } = require("mocha");
const parallel = require("mocha.parallel");
const BrowserStackInception = require("../BrowserStackInception");
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
runner("Browserstack Inception", async function () {
    let remoteSession = args.includes('remote');
    let capabilities = caps['browserstack-inception'];
    capabilities.forEach(function(cap){
        let driver = new BrowserStackInception(cap);
        if (remoteSession) {
            driver.builder.usingServer(remoteUrl)
        }
        it(cap.name, async function () {
            this.timeout(1000000)
            try {
                await driver.Launch();
                await driver.SignIn();
                await driver.selectOS();
                await driver.selectDevice();
                await driver.GoogleSearch();
                if (remoteSession) {
                    await driver.driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Test Executed Successfully"}}');
                }
            } catch (err) {
                if (remoteSession) {
                    await driver.driver.executeScript(`browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Test Failed"}}`);
                }
                throw err;
            } finally {
                await driver.endSession();
            }
        })
    })
})