const jwt = require('jsonwebtoken');
const model = require('../../../models');
const genRandomString = require('../../../utils/crypto').genRandomString;
const sha512 = require('../../../utils/crypto').sha512;
const { RESPONSE_CODES } = require('../../../config/constants')


module.exports = {
    async adminSignup(data) {
        try {
            let responce = {}
            let adminEmail = data.email.toLowerCase()
            let admin = await model.Admin.findOneByEmail(adminEmail)
            if (admin) {
                responce.status = 'failed'
                responce.message = `admin with ${adminEmail} is already exist in the system`
                responce.code = RESPONSE_CODES.BAD_REQUEST
                return responce;
            }

            const salt = genRandomString(16);
            const hashPassword = sha512(data.password, salt);

            data.password = hashPassword.value;
            data.passwordSalt = hashPassword.salt;
            data.email = adminEmail

            let newadmin = await model.Admin.create(data)
            let token = await adminPayload(newadmin)
            responce.code = RESPONSE_CODES.POST
            responce.status = 'sucess',
            responce.message = `admin created sucessfully`
            responce.data = token
            return responce
        } catch (error) {
            throw error
        }
    },

    async adminLogin(data) {
        try {
            let responce = {}
            let adminEmail = data.email.toLowerCase()
            let admin = await model.Admin.findOneByEmail(adminEmail)
            if (!admin) {
                responce.status = 'failed'
                responce.message = `admin with ${adminEmail} is not exist in the system`
                responce.code = RESPONSE_CODES.BAD_REQUEST
                return responce;
            } else {
                const salt = admin.passwordSalt;
                const hashPassword = sha512(data.password, salt);

                if (hashPassword.value !== admin.password) {
                    responce.status = 'failed'
                    responce.message = `The entered password for admin ${adminEmail} is wrong`
                    responce.code = RESPONSE_CODES.BAD_REQUEST
                    return responce;
                } else {
                    let token = await adminPayload(admin)
                    responce.code = RESPONSE_CODES.POST
                    responce.status = 'sucess',
                    responce.message = `admin logged sucessfully`
                    responce.data = token
                    return responce
                }
            }
        } catch (error) {
            throw error
        }
    },

    async getAgents() {
        try {
            let responce = {}
            let agents = await model.Agent.find()
            responce.code = RESPONSE_CODES.POST
            responce.status = 'sucess',
            responce.message = `All agents`
            responce.data = agents
            return responce
        } catch (error) {
            throw error
        }
    }
}


function adminPayload(admin) {
    const tokenPayload = {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: 'Admin'
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 30 });

    return token;
}