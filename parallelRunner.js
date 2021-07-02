require('dotenv').config()
const caps = require('./capabilities.json');
const AmazonProductSearch = require('./amazonproductsearch')


async function RunWithCapabilities(caps){
    let module = new AmazonProductSearch(caps);
    module.builder.usingServer(`http://${process.env.SERVER_USER}:${process.env.SERVER_ACCESS_TOKEN}@hub-cloud.browserstack.com/wd/hub`)
    await module.Launch();
    await module.search();
    await module.applyBrand();
    await module.sortHighToLow();
    await module.printProducts();
    await module.endSession();
}

caps.forEach((cap)=>{
    RunWithCapabilities(cap)
})