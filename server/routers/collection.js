/**
 * @description 
 * @example /linkmark/insertBookMark
 */
import Router from 'koa-router';
import CollectionController from '../controllers/collection';

const CollectionRouter = new Router();

CollectionRouter.prefix('/collection');

CollectionRouter.post('/insertBookMark', CollectionController.insert);
CollectionRouter.post('/queryBookMark', CollectionController.queryList);
CollectionRouter.get('/getData', CollectionController.getData);

export default CollectionRouter;