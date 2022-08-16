// 登陆
import { SignUpModel } from '../../model/user';
import Mailer from './verifyCode';
import jwt from 'jsonwebtoken';

// 登陆
export default class SignIn extends Mailer {

  constructor(props) {
    super(props)
    console.log(props)
    this.email = props.username;
    this.password = props.password;
  }

  onSignIn = async () => {

    const userInfo = {
      email: this.email,password: this.password
    }

    const token = jwt.sign(userInfo,process.env.TOKENSECRET,{
      expiresIn:"7d",
    })

    return SignUpModel.find({ email: this.email,password: this.password }).then((docs) => {
      if(docs.length) {
        return {
          code: 200,
          resultData:token,
          msg: `登陆成功`
        }
      }else {
        return {
          code: 401,
          msg: `账号/密码错误！`
        }
      }
      }).catch((err) =>{
        console.log('catch err', err.message)
    })
  }

}