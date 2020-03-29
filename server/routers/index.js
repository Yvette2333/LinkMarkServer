import User from './user'
import Collection from './collection';
import Router from 'koa-router';
const routers = Router();

routers.use('/user', User.routes(), User.allowedMethods())
routers.use('/collection',Collection.routes(),Collection.allowedMethods())
export default routers;