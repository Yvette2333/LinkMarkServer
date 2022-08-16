import CollectionServer from '../../services/collection'
import { CollectionModel } from '../../model/collection';

const CollectionController = {
  getData: async (ctx) => {
    try {
      let result = await CollectionModel.find({});
      ctx.app.emit('success', result, ctx);
    } catch (err) {
      ctx.app.emit('error', err, ctx);
    }
  },
  insert: async (ctx) => {
    try {
      let result = await CollectionModel.create({
        ...ctx.request.body
      })
      ctx.app.emit('success', result, ctx);
    } catch (err) {
      ctx.app.emit('error', err, ctx);
    }
  },
  queryList: async (ctx) => {
    // try {
    //   let data = await CollectionServer.queryBookMarkList(ctx.request.body);
    //   console.log("********queryList result", data);
    //   data && ctx.app.emit('success', data, ctx);
    // } catch (err) {
    //   ctx.app.emit('error', err, ctx);
    // }

    try {
      let result = await CollectionModel.find({});
      ctx.app.emit('success', result, ctx);
    } catch (err) {
      ctx.app.emit('error', err, ctx);
    }
  },
}

export default CollectionController
