/**
 * @Author: yuwei 
 * @Date: 2020-03-14 22:30:56 
 * @description /user/*
 * @Last Modified by: yuwei
 * @Last Modified time: 2020-03-26 22:09:33
 */
import Router from 'koa-router';
import UserController from '../controllers/user';

const router = Router();

router.post('/verifyCode',UserController.verifyCode)
router.post('/signUp',UserController.signUp)

export default router