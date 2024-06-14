const axios = require("axios");
module.exports = {
  async delay () {
    return new Promise(resolve => setTimeout(resolve, parseInt(Math.random() * 1000)));
  },
  async pushplus(options) {
    const token = process.env.PUSHPLUS_TOKEN;
    const config = {
      token,
      title: options.title,
      content: options.content,
      topic: "",
      template: "html",
      channel: "wechat",
      webhook: "",
      callbackUrl: "",
      timestamp: ""
    };
    return axios.post("http://www.pushplus.plus/send", config, {
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};