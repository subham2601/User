const jwt = require('jsonwebtoken');
var agentModule = require('../../../models').Agent;
const genRandomString = require('../../../utils/crypto').genRandomString;
const sha512 = require('../../../utils/crypto').sha512;
const { RESPONSE_CODES } = require('../../../config/constants')


module.exports = {
    async agentSignup(data) {
        try {
            let responce = {}
            let agentEmail = data.email.toLowerCase()
            let agent = await agentModule.findOneByEmail(agentEmail)
            if (agent) {
                responce.status = 'failed'
                responce.message = `agent with ${agentEmail} is already exist in the system`
                responce.code = RESPONSE_CODES.BAD_REQUEST
                return responce;
            }

            const salt = genRandomString(16);
            const hashPassword = sha512(data.password, salt);

            data.password = hashPassword.value;
            data.passwordSalt = hashPassword.salt;
            data.email = agentEmail

            let newAgent = await agentModule.create(data)
            let token = await agentPayload(newAgent)
            responce.code = RESPONSE_CODES.POST
            responce.status = 'sucess',
            responce.message = `agent created sucessfully`
            responce.data = token
            return responce
        } catch (error) {
            throw error
        }
    },

    async agentLogin(data) {
        try {
            let responce = {}
            let agentEmail = data.email.toLowerCase()
            let agent = await agentModule.findOneByEmail(agentEmail)
            if (!agent) {
                responce.status = 'failed'
                responce.message = `agent with ${agentEmail} is not exist in the system`
                responce.code = RESPONSE_CODES.BAD_REQUEST
                return responce;
            } else {
                const salt = agent.passwordSalt;
                const hashPassword = sha512(data.password, salt);

                if (hashPassword.value !== agent.password) {
                    responce.status = 'failed'
                    responce.message = `The entered password for agent ${agentEmail} is wrong`
                    responce.code = RESPONSE_CODES.BAD_REQUEST
                    return responce;
                } else {
                    let token = await agentPayload(agent)
                    responce.code = RESPONSE_CODES.POST
                    responce.status = 'sucess',
                    responce.message = `agent logged sucessfully`
                    responce.data = token
                    return responce
                }
            }
        } catch (error) {
            throw error
        }
    },
    async agentUpdate(data, id) {
        try {
            let responce = {}
            let agent = await agentModule.findById(id)
            if (!agent) {
                responce.status = 'failed'
                responce.message = `agent with ${agentEmail} is not exist in the system`
                responce.code = RESPONSE_CODES.BAD_REQUEST
                return responce;
            } else {
                await agentModule.updateById(data, id)
                    responce.code = RESPONSE_CODES.POST
                    responce.status = 'sucess',
                    responce.message = `agent update sucessfully`
                    return responce
                }
        } catch (error) {
            throw error
        }
    },

    async deleteAgent(id){
        try {
            let responce = {}
            let agent = await agentModule.findById(id)
            if (!agent) {
                responce.status = 'failed'
                responce.message = `agent with ${agentEmail} is not exist in the system`
                responce.code = RESPONSE_CODES.BAD_REQUEST
                return responce;
            } else {
                await agentModule.deleteById(id)
                    responce.code = RESPONSE_CODES.POST
                    responce.status = 'sucess',
                    responce.message = `agent deleted sucessfully`
                    return responce
                }
        } catch (error) {
            throw error
        }
    }
}


function agentPayload(agent) {
    const tokenPayload = {
        id: agent._id,
        email: agent.email,
        name: agent.name,
        role: 'Agent'
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });

    return token;
}