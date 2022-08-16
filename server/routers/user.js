import Router from 'koa-router';
import UserController from '../controllers/user';

const UserRouter = new Router();
UserRouter.prefix('/user');

UserRouter.post('/verifyCode',UserController.verifyCode);
UserRouter.post('/signUp',UserController.signUp);
UserRouter.post('/signIn',UserController.signIn);

export default UserRouter;