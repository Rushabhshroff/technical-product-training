module.exports = {
    "amazon-product-search": [
        {
            "browser": "chrome",
            "browserName": "chrome",
            "browser_version": "latest",
            "os": "Windows",
            "os_version": "10",
            "project": "Technical Product Training",
            "build": "Amazon Product Search",
            "name": "Amazon Product Search Chrome",
            "browserstack.debug": true,
            "browserstack.console": 'errors',
            "browserstack.networkLogs": true
        },
        {
            "browser": "firefox",
            "browserName": "firefox",
            "browser_version": "latest",
            "os": "Windows",
            "os_version": "10",
            "project": "Technical Product Training",
            "build": "Amazon Product Search",
            "name": "Amazon Product Search Firefox",
            "browserstack.debug": true,
            "browserstack.console": 'errors',
            "browserstack.networkLogs": true
        },
        {
            "browser": "safari",
            "browserName": "safari",
            "browser_version": "latest",
            "os": "OS X",
            "os_version": "Big Sur",
            "project": "Technical Product Training",
            "build": "Amazon Product Search",
            "name": "Amazon Product Search Safari",
            "browserstack.debug": true,
            "browserstack.console": 'errors',
            "browserstack.networkLogs": true
        }
    ],
    "browserstack-inception": [
        {
            "browser": "chrome",
            "browserName": "chrome",
            "browser_version": "latest",
            "os": "Windows",
            "os_version": "10",
            "project": "Technical Product Training",
            "build": "BrowserStack Inception",
            "name": "BrowserStack Inception Chrome",
            "resolution": "1920x1080",
            "browserstack.maskCommands": "setValues, getValues, setCookies, getCookies",
            "browserstack.debug": true,
            "browserstack.console": 'errors',
            "browserstack.networkLogs": true
        },
        {
            "browser": "firefox",
            "browserName": "firefox",
            "browser_version": "latest",
            "os": "Windows",
            "os_version": "10",
            "project": "Technical Product Training",
            "build": "BrowserStack Inception",
            "name": "BrowserStack Inception Firefox",
            "resolution": "1920x1080",
            "maskCommands": "setValues, getValues, setCookies, getCookies",
            "browserstack.debug": true,
            "browserstack.console": 'errors',
            "browserstack.networkLogs": true
        },
        {
            "browser": "Edge",
            "browserName": "Edge",
            "browser_version": "latest",
            "os": "Windows",
            "os_version": "10",
            "project": "Technical Product Training",
            "build": "BrowserStack Inception",
            "name": "BrowserStack Inception Internet Explorer",
            "resolution": "1920x1080",
            "browserstack.maskCommands": "setValues, getValues, setCookies, getCookies",
            "browserstack.debug": true,
            "browserstack.console": 'errors',
            "browserstack.networkLogs": true
        }
    ]
}