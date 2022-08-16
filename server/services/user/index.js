import Mailer from './verifyCode';
import SignUp from './signUp';
import SignIn from './signIn';

const UserServer = {
  createVerifyCode: (body) => (new Mailer(body).sendMail()),
  signUp:(body)=>(new SignUp(body).onRegister()),
  signIn:(body)=>(new SignIn(body).onSignIn()),
}

export default UserServer 