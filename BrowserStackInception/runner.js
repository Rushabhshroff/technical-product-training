require('dotenv').config()
const BrowserStackInception = require('./index');
let args = process.argv.slice(2, process.argv.length);
let valueArgs = {}
for (let arg of args) {
    if (arg.includes("=")) {
        let x = arg.split("=");
        valueArgs[x[0]] = x[1];
    }
}
let caps = require('../capabilities')
const remoteUrl = `http://${process.env.SERVER_USER}:${process.env.SERVER_ACCESS_TOKEN}@hub-cloud.browserstack.com/wd/hub`
async function RunWithCapabilities(caps) {
    let module = new BrowserStackInception(caps);
    let remote = args.includes('--remote')
    if (remote) {
        module.builder = module.builder.usingServer(remoteUrl)
    }
    try {
        await module.Launch();
        await module.SignIn();
        await module.selectOS(valueArgs["--os"]);
        await module.selectDevice(valueArgs["--device"]);
        await module.GoogleSearch()
        if (remote) {
            await module.driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Test Executed Successfully"}}');
        }
    } catch (err) {
        if (remote) {
            await module.driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Test Failed"}}');
        }

    } finally {
        await module.endSession()
    }

}

async function Main() {
    for (let cap of caps['browserstack-inception']) {
        if (args.includes("--parallel")) {
            RunWithCapabilities(cap)
        } else {
            await RunWithCapabilities(cap)
        }
    }
}

Main();