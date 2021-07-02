# technical-product-training

## Getting Started

### Setup Environment Variables or .env file

```
SERVER_USER = // BStack userId
SERVER_ACCESS_TOKEN = //BStack Access Token
DEMO_USER = // BStack Email ID for automation login
DEMO_USER_PASS = // BStack Password for automation login
PERCY_TOKEN= //Your Percy Token
```
### Install node modules

```
npm install
```

## Unit Tests

```
npm run test
```

## Amazon Product Search

### Start Product Search
```
npm run amazonproductsearch -- --arguments
```

Following  Arguments are supported
```
--remote // To run on Browserstack
--parallel // To run tests in parallel
```

## BrowserStack Inception

### Start Automation

```
npm run browserstackinception -- --arguments
```
Following  Arguments are supported
```
--remote // To run on Browserstack
--parallel // To run tests in parallel
--os=<data-test-ositem> // from BStack Website
--device=<data-rbd-draggable-id> // from BStack Website
```
## Percy

### Start Percy

```
npm run percy
```