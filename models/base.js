const Promise = require('bluebird');

class BaseModel {
  constructor(model = null, collection = null, schema = {}) {
    this.schema = schema;
    this.collection = collection;
    this.subscriberList = [];
    this.parentCollectionId = null;
    this.model = model;

    if (!collection) throw new Error(`No 'collection' parameter provided in constructor.`);
  }

  generateData(id) {
    return {
      id: id,
      ...this.schema,
      createdAt: getTime(new Date()),
      updatedAt: getTime(new Date()),
      deletedAt: null,
    };
  }

  create(data) {
  return new this.model(data).save();
  }

  batchCreate(dataArray) {
 
  }

  fetch() {
 
  }

  findById(id) {
    return this.model.findOne({_id:id});
  }

  // for get all records from collection
  find() {
    return this.model.find({}, {__v : 0, password : 0, passwordSalt : 0});
  }

  findOrCreateById(id, data) {

  }

  findOneByName(name) {
   return this.model.findOne({name:name});
  }

  updateById(data, id) {
   return this.model.updateOne({_id: id}, {$set:data})
  }

  findOneByEmail(email) {
    return this.model.findOne({email:email});
}

  updateByEmail(email, data) {
   
  }

  deleteById(id) {
    return this.model.deleteOne({_id : id})
  }

  hardDeleteById(id) {
    
  }

  subscribe(onNext, onError) {
   
  }

  unsubscribe() {
   
  }
}

module.exports = BaseModel;
