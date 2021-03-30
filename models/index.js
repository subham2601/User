const AgentModel = require('./agent/agent');
const AdminModel = require('./admin/admin')

module.exports = {
  Agent: new AgentModel(),
  Admin: new AdminModel()
};
