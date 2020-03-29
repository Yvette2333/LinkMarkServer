/** 
 * @Author: yuwei 
 * @Date: 2020-03-14 22:35:23 
 * @description /user/*
 * @Last Modified by: yuwei
 * @Last Modified time: 2020-03-26 23:56:30
 */
import UserServer from '../../services/user';
const UserController = {
  verifyCode: async (ctx) => {
    try {
      let result = await UserServer.createVerifyCode(ctx.request.body);
      ctx.app.emit('success', result, ctx);
    } catch (err) {
      ctx.app.emit('error', err, ctx);
    }
  },
  signUp: async (ctx) => {
    try {
      let result = await UserServer.signUp(ctx.request.body);
      console.log('result?',result)
      ctx.app.emit('success', result, ctx);
    } catch (err) {
      ctx.app.emit('error', err, ctx);
    }
  },
}


export default UserController