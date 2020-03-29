/**
 * @description 
 * @example /linkmark/insertBookMark
 */
import Router from 'koa-router';
import CollectionController from '../controllers/collection'
const router = Router();

router.post('/insertBookMark', CollectionController.insert)
router.post('/queryBookMark', CollectionController.queryList)
router.get('/getData', CollectionController.getData)

export default router