const JuejinHelper = require("juejin-helper");
const _ = require("./public");
const puppeteer = require('puppeteer');


class RunHelper {
  cookie = '';
  username = '';
  message = '掘金';

  constructor (cookie) {
    this.cookie = cookie;
  }

  async run () {
    const juejin = new JuejinHelper();
    try {
      await juejin.login(this.cookie);
    } catch (e) {
      console.error(e.message);
      throw new Error("登录失败, 请尝试更新Cookies!");
    }
    this.username = juejin.getUser().user_name;
    this.message += ` ${this.username}`
    // 模拟访问
    // const browser = juejin.browser();
    // await browser.open();
    // try {
    //   await browser.visitPage("/");
    //   console.log("掘金首页：页面访问成功");
    // } catch (e) {
    //   console.log("掘金首页：页面访问失败");
    // }
    // try {
    //   await browser.visitPage("/user/center/signin");
    //   console.log("掘金每日签到：页面访问成功");
    // } catch (e) {
    //   console.log("掘金每日签到：页面访问失败");
    // }
    // await browser.close();

    //签到 & 免费抽奖
    const growth = juejin.growth();
    const todayStatus = await growth.getTodayStatus();
    if (todayStatus) {
      this.message += " 今日已签到"
    } else {
      await growth.checkIn();
      this.message += " 签到完成"
    }
    const { free_count: freeCount } = await growth.getLotteryConfig();
    if(freeCount) {
      const result = await growth.drawLottery();
      if (result && result.id) {
        this.message += ` ${result.lottery_name}`
      }
    } else {
       this.message += ' 抽过了'
    }
    console.log('this.message',this.message)
    await juejin.logout();
    return this.message
  }
}

async function run () {
  const cookie = process.env.JUEJIN_COOKIE;
  const helper = new RunHelper(cookie);
  await _.delay()
  return  await helper.run()
}
module.exports = run()