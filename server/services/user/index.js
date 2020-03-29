import Mailer from './verifyCode';
import SignUp from './signUp';

const UserServer = {
  createVerifyCode: (body) => (new Mailer(body).sendMail()),
  signUp:(body)=>(new SignUp(body).onRegister()),
}

export default UserServer 