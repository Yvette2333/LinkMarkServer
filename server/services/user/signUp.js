import { SignUpModel } from '../../model/user';
import Mailer from './verifyCode';


// 注册时还需要检查 验证码是否过期。。 
// 校验验证码 
// 存储 3个字段 

export default class SignUp extends Mailer {

  constructor(props) {
    super(props)
    this.registerVerifyCode = props.verifyCode;
    this.password = props.password;
  }

  // 验证码是否过期
  validOverUpdateAt = () => {
    return this.queryOne().then((data) => {
      console.log('data.....',data)
      if (data) {
        const { updatedAt, verifyCode } = data;
        let isValid = this.validVerifyCodeUpdate(updatedAt);
        if (!isValid) {
          throw Error({ msg: "验证码已失效，请重新获取验证码！" })
        }
        return verifyCode;
      }else {
        throw Error({ msg: "未知错误,请重新获取验证码！" })
      }

    })
  }

  // 注册
  onRegister = async () => {
    let verifyCode = await this.validOverUpdateAt();
    console.log(this.registerVerifyCode, verifyCode)
    if (verifyCode && this.registerVerifyCode !== verifyCode) {
      console.log('err')
      return {
        code: 500,
        msg: "验证码填写错误！"
      }
    }
    return SignUpModel.create({
        email: this.email, // user
        password: this.password, // 验证码
        verifyCode: this.registerVerifyCode,
      }).then(() => {
        return {
          code: 200,
          msg: `用户注册成功`
        }
      }).catch((err) =>{
        console.log('catch err', err.message)
        return {code:500,msg:err.message}
    })
  }

}