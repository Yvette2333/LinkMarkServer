/**
 * @description 邮箱验证
 * @param {string} email 
 */
import nodemailer from 'nodemailer';
import MailerTmp from '../assets/tpl/mailer';
import { VerifyCodeSchema } from '../model/user';

export default class Mailer {

  constructor(props) {
    this.email = props.email;
    this.user = process.env.MAIL_USER;
    this.pass = process.env.MAIL_SMTP;
    // email是否存在于Container
    this.docs = null;
  }

  queryOne = () => {
    return new Promise((resolve, reject) => VerifyCodeSchema.findOne({ email: this.email }, (err, docs) => {
      if (err) { reject(err) }
      if (docs) {
        this.docs = docs;
        resolve(docs);
      }
    }))
  }

  // 创建随机数
  verifyCode = () => (Math.random().toString(16).slice(2, 6).toUpperCase())

  //  频繁操作时间 60s
  expireTime = () => (Date.now() + 60 * 1000)

  // 生成广播实例
  instanceTransporter = () => (nodemailer.createTransport({
    service: "QQ",
    auth: {
      user: this.user,
      pass: this.pass
    }
  }))

  // 过期验证
  validVerifyCodeUpdate = () => {
    if (this.docs) {
      let { updatedAt, verifyCode } = this.docs;
      let isOverUpdateAt = new Date(updatedAt).getTime() - (60 * 60 * 2 * 1000) > Date.now();
      if (isOverUpdateAt) {
        // 过期更换verifyCode
        return this.verifyCode()
      } else {
        // 沿用之前的Code
        return verifyCode
      }
    } else {
      // 创建新的
      return this.verifyCode()
    }
  }

  // 获取验证码
  getVerifyCode = () => {
    // 验证频繁次数
    if (this.docs) {
      let { expireTime } = this.docs;
      if (expireTime && (Date.now() - new Date(expireTime).getTime() < 0)) {
        throw Error('验证请求过于频繁，1分钟内1次')
      }
    }
    // 2小时验证码 verifyCode
    return this.validVerifyCodeUpdate();
  }

  // 发送邮件
  sendMail = () => {
    return this.queryOne().then((data) => {
      let transporter = this.instanceTransporter(); // 广播实例
      let verifyCode = this.getVerifyCode(); // 获取验证码

      // 发送邮件
      try {
        // 发邮件 
        // let info = await transporter.sendMail({
        //   from: `"Link Mark"<${this.user}>`,
        //   to: this.email,
        //   subject: `${verifyCode}是你的Link Mark 验证码`,
        //   html: MailerTmp(verifyCode)
        // })
        this.saveExpireToContainer(verifyCode)
        return {
          code: 200,
          msg: `验证码发送成功!${verifyCode}`
        }
      } catch (error) {
        if (error) {
          throw Error(error)
        } else {
          throw Error({
            code: 500,
            msg: '验证码发送失败，请重试'
          })
        }
      }

    }).catch((error) => { throw Error(error) });

    
  }

  //✅ 存储当前email的相关信息 
  saveExpireToContainer = (verifyCode) => {
    // 以email 来进行查找当前是否存在注册信息
    VerifyCodeSchema.findOneAndUpdate({ email: this.email }).exec((err, docs) => {
      if (err) throw Error(err);
      // 如果存在则更改当前 verifyCode
      if (docs) {
        console.log('change docs:', this.email, verifyCode)
        docs.verifyCode = verifyCode;
        docs.expireTime = Date.now() + (60 * 1000); // 重新计时频繁请求次数
        docs.save(function (err, suceessDoc) {
          console.log('save modify success', suceessDoc)
        })
      } else {
        // 不存在 新增email + verifyCode
        console.log('has insert email', email)
        return VerifyCodeSchema.create({
          expireTime: Date.now() + 60000, // 禁止重复获取时间
          email: this.email, // user
          verifyCode, // 验证码
        })
      }
    });
  }

}
