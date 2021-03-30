const { RESPONSE_CODES } = require('../../../config/constants')
const {
    adminSignupValidator,
    adminLoginValidator
} = require('../../validators/admin')
const {
    adminSignup,
    adminLogin,
    getAgents
} = require('../../services/admin/admin')


module.exports = {
    async adminRegister(req, res) {
        const { data } = req.body;
        try {
            const value = await adminSignupValidator.validate(data);
            if (value.error && value.error.details.length > 0) {
                return res.json({
                    status: 'failed',
                    message: value.error.details[0].message,
                    code: RESPONSE_CODES.BAD_REQUEST
                });
            } else {
                let adminDetails = await adminSignup(data)
                return res.json(adminDetails)
            }
        }
        catch (err) {
            throw err
        }
    },

    async adminLogin(req, res) {
        const { data } = req.body;
        try {
            const value = await adminLoginValidator.validate(data);
            if (value.error && value.error.details.length > 0) {
                return res.json({
                    status: 'failed',
                    message: value.error.details[0].message,
                    code: RESPONSE_CODES.BAD_REQUEST
                });
            } else {
                let adminDetails = await adminLogin(data)
                return res.json(adminDetails)
            }
        }
        catch (err) {
            throw err
        }
    },
    async getAllAgents(req,res) {
        try {
                let agents = await getAgents()
                return res.json(agents)
        }
        catch (err) {
            throw err
        }
    }
}