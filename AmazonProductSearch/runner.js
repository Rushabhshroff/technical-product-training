require('dotenv').config()
const AmazonProductSearch = require('./index');
let args = process.argv.slice(2, process.argv.length);
let valueArgs = {}
for(let arg of args){
    if(arg.includes("=")){
        let x = arg.split("=");
        valueArgs[x[0]] = x[1];
    }
}
let caps = require('../capabilities')
const remoteUrl = `http://${process.env.SERVER_USER}:${process.env.SERVER_ACCESS_TOKEN}@hub-cloud.browserstack.com/wd/hub`
async function RunWithCapabilities(caps) {
    let module = new AmazonProductSearch(caps);
    if(args.includes('--remote')){
        module.builder = module.builder.usingServer(remoteUrl)
    }
    try {
        await module.Launch();
        await module.search();
        await module.applyBrand();
        await module.sortHighToLow();
        await module.printProducts();
        await module.driver.executeScript('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Test Executed Successfully"}}');
    } catch(err) {
        await module.driver.executeScript(`browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${err.message}"}}`);
    } finally {
        await module.endSession()
    }

}

async function Main() {
    for (let cap of caps['amazon-product-search']) {
        if (args.includes("--parallel")) {
            RunWithCapabilities(cap)
        } else {
            await RunWithCapabilities(cap)
        }
    }
}

Main();
