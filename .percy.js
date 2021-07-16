
module.exports = {
  "version":2,
  "snapshot": {
    "widths":[375,480,720,1280,1440,1920],
    "min-height":1024,
    "percy-css":`
    .cookie-notification {
      display: none !important;
    }
    .wrapper {
      overflow: visible !important;
    }
    .docs--content { 
      overflow-x: visible !important;
      overflow-y: visible !important;
    }`
  },
  "agent":{
    "asset-discovery":{
      "allowed-hostnames":[
        "*.netdna-ssl.com",
        "1q5n8517v76m59e8m43p09gr-wpengine.netdna-ssl.com"
      ]
    }
  }
}