const { it } = require("mocha");
const AmazonProductSearch = require("../amazonproductsearch")
const caps = require('../capabilities.js');

caps["amazon-product-search"].forEach((cap) => {
    describe(JSON.stringify(cap), function () {
        this.timeout(10000);
        let module = new AmazonProductSearch(cap)
        it("Open Amazon Website", async () => {
            await module.Launch()
        })
        it("Search Iphone 12", async () => {
            await module.search()
        })
        it("Apply Brand Filter", async () => {
            await module.applyBrand();
        })
        it("Sort High to Low", async () => {
            await module.sortHighToLow();
        })
        it("Search Result Print", async () => {
            await module.printProducts();
        })
        it("Quit Browser", async () => {
            await module.endSession()
        })
    })
})

