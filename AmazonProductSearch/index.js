const { Builder, By, Key, until } = require("selenium-webdriver");

function AmazonProductSearch(caps) {
    this.caps = caps;
    this.builder = new Builder().withCapabilities(this.caps);
}

AmazonProductSearch.prototype.Launch = async function () {
    this.driver = await this.builder.build()
    this.driver.get("https://amazon.in");
}

AmazonProductSearch.prototype.search = async function () {
    await this.driver.wait(until.elementLocated(By.id("twotabsearchtextbox"), 10000));
    let searchbox = await this.driver.findElement(By.id("twotabsearchtextbox"));
    await searchbox.sendKeys("iPhone X", Key.ENTER);
}

AmazonProductSearch.prototype.applyBrand = async function () {
    await this.driver.wait(until.elementLocated(By.css('[aria-label="iOS"]'), 10000))
    await this.driver.findElement(By.css('[aria-label="iOS"]')).findElement(By.css(".a-checkbox")).click();
}
AmazonProductSearch.prototype.sortHighToLow = async function () {
    await this.driver.wait(until.elementLocated(By.id('a-autoid-0'), 10000))
    await this.driver.sleep(2000);
    await this.driver.findElement(By.id('a-autoid-0')).click()
    await this.driver.wait(until.elementLocated(By.id("s-result-sort-select_2"), 10000))
    await this.driver.findElement(By.id("s-result-sort-select_2")).click();
}
AmazonProductSearch.prototype.printProducts = async function () {
    await this.driver.sleep(2000);
    let productData = []
    let products = await this.driver.findElements(By.css('[data-component-type="s-search-result"]'));
    for (let product of products) {
        let x = {}
        try {
            x.productLink = await product.findElement(By.css("a")).getAttribute("href");
        } catch { }
        try {
            x.productName = await product.findElement(By.className("a-size-medium")).getText();
        } catch { }
        try {
            x.productPrice = await product.findElement(By.className("a-price-whole")).getText()
        } catch { }
        productData.push(x);
    }
    console.log(productData);
}
AmazonProductSearch.prototype.endSession = async function () {
    await this.driver.quit()
}
module.exports = AmazonProductSearch