/**
 * Created by llsmp on 2018/4/7.
 */
const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const express = require("express");
const session = require('koa-session')
const app = express();

app.use(express.static(__dirname+"/dist"));

app.use((ctx) => {
  const start = new Date()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use((ctx) => {
  if (ctx.response.body && ctx.response.body.url) {
    ctx.response.body = JSON.stringify(ctx.response.body, null, 4)
  }
})



app.listen(80, () => {

  console.log("服务启动成功。");

})
