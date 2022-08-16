
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

/**
 * @description let DB = DB.getInstance(); 获取数据库实例
 */
class DBClient {
  //单例化 避免多次实例化引起的多次连接问题
  static getInstance() {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  }
  //实例化数据库
  constructor() {
    this.DB_CLIENT = null;
  }
  //连接数据库
  connect() {
    return new Promise((resolve, reject) => {
      //避免多次连接数据库
      if (!this.DB_CLIENT) {
        MongoClient.connect(process.env.DATABASE_URL, 
          { useNewUrlParser: true, useUnifiedTopology: true }, 
          (err, client) => {
            if (err) {
              reject(err);
            } else {
              this.DB_CLIENT = client.db(process.env.DATABASE_NAME);
              resolve(this.DB_CLIENT);
            }
        });
      } else {
        resolve(this.DB_CLIENT);
      }
    })
  }
  //增
  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect()
        .then((db) => {
          db.collection(collectionName).insertOne(json, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        })
    })
  }
  //删
  delete(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect()
        .then((db) => {
          db.collection(collectionName).deleteOne(json, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        })
    })
  }
  //改
  update(collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).updateOne(json1, { $set: json2 }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      })
    })
  }
  //查
  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect()
        .then((db) => {
          let result = db.collection(collectionName).find(json);

          result.toArray((err, docs) => {
            if (err) {
              reject(err)
            } else {
              resolve(docs)
            }
          })
        })
    })
  }
}
// const DB = DBClient.getInstance();
export default DBClient;