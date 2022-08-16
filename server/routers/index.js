import combineRouters from 'koa-combine-routers';

import User from './user'
import Collection from './collection';

const Router = combineRouters(
  User,
  Collection
)

export default Router;