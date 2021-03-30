const BaseModel = require('../base');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autopopulate = require('mongoose-autopopulate');

const AGENT_COLLECTION = 'agent';
const AGENT_SCHEMA = new Schema ({
  name: String,
  email: String,
  phoneNumber: String,
  avatar: String,
  password: String,
  loginAttempt: { type:Number, default:0 },
  passwordSalt: String
});
AGENT_SCHEMA.plugin(autopopulate);


var MODEL =mongoose.model(AGENT_COLLECTION, AGENT_SCHEMA);

// Note: Do not extend this class, only BaseModel is allow to be extended from.
// because more than 2 levels inheritance could lead to tight-coupling design and make everything more complicated
class AgentModel extends BaseModel {
  constructor() {
    super(MODEL, AGENT_COLLECTION, AGENT_SCHEMA);
  }

findOneByEmail(email) {
    return this.model.findOne({email:email});
}
}

module.exports = AgentModel;
