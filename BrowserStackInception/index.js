const { Builder, By, Key, until } = require("selenium-webdriver");

function BrowserStackInception(caps) {
    this.caps = caps;
    this.builder = new Builder().withCapabilities(this.caps);
}

BrowserStackInception.prototype.Launch = async function () {
    this.driver = await this.builder.build();
    await this.driver.get("https://live.browserstack.com");
    await this.driver.manage().window().maximize()
}

BrowserStackInception.prototype.SignIn = async function () {
    try {
        let cookieNotif = By.id("accept-cookie-notification");
        await this.driver.wait(until.elementLocated(cookieNotif), 2000);
        await this.driver.findElement(cookieNotif).click()
    } catch { 
        // No Cookie Popup Nevermind
    }
    let emailInput = By.id("user_email_login");
    let passwordInput = By.id("user_password")
    let signInButton = By.id("user_submit");
    await this.driver.wait(until.elementLocated(emailInput));
    await this.driver.findElement(emailInput).sendKeys(process.env.DEMO_USER);
    await this.driver.findElement(passwordInput).sendKeys(process.env.DEMO_USER_PASS);
    await this.driver.findElement(signInButton).click();
    try {
        await this.sleep()
        let localInstallationCancel = By.id("skip-local-installation");
        await this.driver.wait(until.elementLocated(localInstallationCancel), 2000);
        await this.driver.findElement(localInstallationCancel).click()
    } catch {
        // Dialog was not there nevermind
    }
}
BrowserStackInception.prototype.selectOS = async function (os = "win10") {
    await this.sleep(5000)
    if (os.includes('mac')) {
        let macButton = By.className("os-section__list--mac-icon");
        await this.driver.wait(until.elementLocated(macButton));
        await this.driver.findElement(macButton).click();
        await this.sleep()
    }
    if (os.includes("win")) {
        let winButton = By.className("os-section__list--windows-icon");
        await this.driver.wait(until.elementLocated(winButton));
        await this.driver.findElement(winButton).click();
        this.sleep()
    }
    let OsItem = By.css(`[data-test-ositem="${os}"]`)
    await this.driver.wait(until.elementLocated(OsItem));
    let osItem = await this.driver.findElement(OsItem);
    await this.driver.actions().click(osItem).perform()
}
BrowserStackInception.prototype.selectDevice = async function (device = "win10__chrome__91.0") {
    let Device = By.css(`[data-rbd-draggable-id="${device}"]`);
    await this.driver.wait(until.elementLocated(Device));
    let deviceItem = await this.driver.findElement(Device);
    await this.driver.actions().click(deviceItem).perform()
    await this.driver.wait(until.elementLocated(By.css("object")));
}
BrowserStackInception.prototype.GoogleSearch = async function () {
    await this.sleep(10000)
    // Chrome Suports Both of them
    if (this.caps.browserName === 'safari') {
        // This works on Safari
        await this.driver.actions().sendKeys(Key.COMMAND + "l").perform();
    } else {
        // This works on Firefox
        await this.driver.actions().keyDown(Key.COMMAND).sendKeys("l").keyUp(Key.COMMAND).perform();
    }
    await this.sleep(5000)
    // Chrome Suports Both of them
    if (this.caps.browserName === 'safari') {
        // This works on Safari
        await this.driver.actions().sendKeys(Key.COMMAND + "a").perform();
    } else {
        // This works on Firefox
        await this.driver.actions().keyDown(Key.COMMAND).sendKeys("a").keyUp(Key.COMMAND).perform();
    }
    await this.sleep(5000)
    await this.driver.actions().sendKeys(Key.DELETE).perform();
    await this.sleep(5000)
    await this.driver.actions().sendKeys("https://google.com/search?q=BrowserStack").perform();
    await this.sleep(5000)
    await this.driver.actions().sendKeys(Key.RETURN).perform();
    await this.sleep(5000)
    // This is the manaul way to perform the search
    // await this.driver.actions().sendKeys("BrowserStack", Key.RETURN).perform();
    // await this.sleep(5000)
    await this.driver.actions().sendKeys(Key.RETURN).perform()
    await this.sleep(5000)
    let endSessionButton = By.id("stop-session");
    await this.driver.wait(until.elementLocated(endSessionButton));
    await this.driver.findElement(endSessionButton).click();
    await this.sleep()
}
BrowserStackInception.prototype.sleep = function (ms = 2000) {
    return this.driver.sleep(ms)
}
BrowserStackInception.prototype.endSession = async function () {
    await this.driver.quit()
}


module.exports = BrowserStackInception