const { RESPONSE_CODES } = require('../../../config/constants')
const {
    agentSignupValidator,
    agentLoginValidator,
    agentUpdateValidator
} = require('../../validators/agent')
const {
    agentSignup,
    agentLogin,
    agentUpdate,
    deleteAgent
} = require('../../services/agent/agent')


module.exports = {
    async agentRegister(req, res) {
        const { data } = req.body;
        try {
            const value = await agentSignupValidator.validate(data);
            if (value.error && value.error.details.length > 0) {
                return res.json({
                    status: 'failed',
                    message: value.error.details[0].message,
                    code: RESPONSE_CODES.BAD_REQUEST
                });
            } else {
                let agentDetails = await agentSignup(data)
                return res.json(agentDetails)
            }
        }
        catch (err) {
            throw err
        }
    },

    async agentLogin(req, res) {
        const { data } = req.body;
        try {
            const value = await agentLoginValidator.validate(data);
            if (value.error && value.error.details.length > 0) {
                return res.json({
                    status: 'failed',
                    message: value.error.details[0].message,
                    code: RESPONSE_CODES.BAD_REQUEST
                });
            } else {
                let agentDetails = await agentLogin(data)
                return res.json(agentDetails)
            }
        }
        catch (err) {
            throw err
        }
    },
    async agentUpdate(req, res) {
        const { data } = req.body;
        const { id } = req.params
        try {
            const value = await agentUpdateValidator.validate(data);
            if (value.error && value.error.details.length > 0) {
                return res.json({
                    status: 'failed',
                    message: value.error.details[0].message,
                    code: RESPONSE_CODES.BAD_REQUEST
                });
            } else {
                let agentDetails = await agentUpdate(data, id)
                return res.json(agentDetails)
            }
        }
        catch (err) {
            throw err
        }
    },
    async agentDelete(req, res) {
        const { id } = req.params
        try {
            let agentDetails = await deleteAgent(id)
            return res.json(agentDetails)
        }
        catch (err) {
            throw err
        }
    }
}