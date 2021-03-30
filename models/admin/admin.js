const BaseModel = require('../base');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

const ADMIN_COLLECTION = 'admin';
const ADMIN_SCHEMA = new Schema ({
  name: String,
  email: String,
  password: String,
  passwordSalt: String
});
ADMIN_SCHEMA.plugin(autopopulate);


var MODEL =mongoose.model(ADMIN_COLLECTION, ADMIN_SCHEMA);

// Note: Do not extend this class, only BaseModel is allow to be extended from.
// because more than 2 levels inheritance could lead to tight-coupling design and make everything more complicated
class AdminModel extends BaseModel {
  constructor() {
    super(MODEL, ADMIN_COLLECTION, ADMIN_SCHEMA);
  }

findOneByEmail(email) {
    return this.model.findOne({email:email});
}
}

module.exports = AdminModel;
