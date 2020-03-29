import CollectionServer from '../../services/collection'
import { CollectionSchema } from '../../model/collection';


const CollectionController = {
  getData: async (ctx) => {
    try {
      let result = await CollectionSchema.find({});
      ctx.app.emit('success', result, ctx);
    } catch (err) {
      ctx.app.emit('error', err, ctx);
    }
  },
  insert: async (ctx) => {
    try {
      let result = await CollectionSchema.create({
        ...ctx.request.body
      })
      ctx.app.emit('success', result, ctx);
    } catch (err) {
      ctx.app.emit('error', err, ctx);
    }
  },
  queryList: async (ctx) => {
    try {
      let data = await CollectionServer.queryBookMarkList(ctx.request.body);
      data && ctx.app.emit('success', data, ctx);
    } catch (err) {
      ctx.app.emit('error', err, ctx);
    }

  },
}

export default CollectionController
