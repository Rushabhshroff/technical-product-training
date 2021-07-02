require('dotenv').config()
const { it } = require("mocha");
const BrowserStackInception = require("../BrowserStackInception");
const caps = require('../capabilities.js');
caps['browserstack-inception'].forEach(async (cap) => {
    describe(JSON.stringify(cap), async function () {
        this.timeout(200000);
        let module = new BrowserStackInception(cap);
        it("Open BrowserStack Website", async () => {
            await module.Launch()
        })
        it("Perform Sign In", async () => {
            await module.SignIn()
        })
        it("Select BStack Live", async () => {
            await module.selectLive()
        })
        it("Select OS", async () => {
            await module.selectOS()
        })
        it("Select Device", async () => {
            await module.selectDevice()
        })
        it("Perform Google Search", async () => {
            await module.GoogleSearch()
        })
        it("Quit Browser", async () => {
            await module.endSession()
        })
    })
})
