/**
 *  @description 连接数据库并且对连接进行了优化 - ./module/db
 *  @description 此项目中使用了热重启nodemon 并修改了pageage.json 使用 npm start 启动项目即可
 *  @description ejs模版相关语法查看https://www.npmjs.com/package/ejs
 */
import Koa from 'koa';
import cors from 'koa-cors';
import bodyparser from 'koa-bodyparser';
import mongoose from 'mongoose';
import routers from './routers';
import dotenv from 'dotenv';
dotenv.config();

const connect = mongoose.connect(process.env.DATABASE_URL, { keepAlive: 120, useNewUrlParser: true, useUnifiedTopology: true });

connect.then(() => {
  console.log('mongoose has Connected')
}, (err) => { console.log(err); });

const app = new Koa()
app.use(cors());
app.use(bodyparser());

app.use(routers.routes())
  .use(routers.allowedMethods())

app.on('error', (err, ctx) => {
  if (process.env.NODE_ENV != 'test') {
    console.log('sent error %s to the cloud', err.message);
  }
  ctx.status = err.status || 500;
  ctx.body = {
    uri: ctx.url,
    code: ctx.status,
    msg: err.message,
  };
});

app.on('success', (result, ctx) => {
  ctx.message = 'sucess';
  ctx.status = 200;
  const { code, msg, resultData } = result;
  ctx.body = {
    uri: ctx.url,
    code: code ? code : ctx.response.status,
    msg: msg ? msg : ctx.response.message,
    result: resultData || null
  };
});

app.listen(8088, () => {
  console.log('run in borswer http://localhost:8088')
});