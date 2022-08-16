import CollectionModel from '../model/collection';

const CollectionServer = { 
   async insertBookMark(json){
    return await CollectionModel.insert(json);
  },
  async queryBookMarkList(){
    return await CollectionModel.find({});
  },
  async queryData(json){
    return await CollectionModel.find(json);
  }
}
export default CollectionServer