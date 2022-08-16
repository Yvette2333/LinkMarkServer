import Koa from 'koa';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyparser from 'koa-bodyparser';
import cors from '@koa/cors'
import logger from 'koa-logger';
import routers from './routers';

dotenv.config();

// 连接数据库
const connect = mongoose.connect(process.env.DATABASE_URL, {
   keepAlive: 1200, 
   useNewUrlParser: true, 
   useUnifiedTopology: true 
});
connect.then(() => {
  console.log('mongoose has Connected');
}, (err) => { console.log(err); });

// 使用中间件
const app = new Koa();
app.use(cors());
app.use(bodyparser());
app.use(logger());
app.use(routers());

// 处理异常
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

// 处理正常请求返回
app.on('success', (result, ctx) => {
  console.log('********success', result);
  ctx.message = 'sucess';
  ctx.status = 200;
  const { code, msg, resultData } = result;

  const payload = {
    uri: ctx.url,
    code: code ? code : ctx.response.status,
    msg: msg ? msg : ctx.response.message,
    result: resultData
  }

  if(Array.isArray(result)) {
    payload.result = result || []
  }

  ctx.body = payload;
});

app.listen(8088, () => {
  console.log('run in borswer http://localhost:8088');
});