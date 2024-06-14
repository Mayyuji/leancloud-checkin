const AV = require('leanengine')
const fs = require('fs')
const path = require('path')
const _ = require('./utils/public');

/**
 * Loads all cloud functions under the `functions` directory.
 */
fs.readdirSync(path.join(__dirname, 'functions')).forEach(file => {
  require(path.join(__dirname, 'functions', file))
})

/**
 * A simple cloud function.
 */
AV.Cloud.define('hello', async function (request) {
  let content = ''
  let juejinStatus = await require('./utils/juejin')
  content =`${juejinStatus}\n`
  _.pushplus({
    title: '签到信息',
    content
  })
  return {
    juejinStatus
  }
})
