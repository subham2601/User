const Joi = require('joi');

module.exports = {
    agentSignupValidator: Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(3)
            .max(30)
            .required().messages({
                "any.required": `email is a required field`
            }),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
                "any.required": `password is a required field`
            }),

        name: Joi.string()
            .min(3)
            .max(30)
            .required().messages({
                "any.required": `name is a required field`
            }),
    }),

    agentLoginValidator: Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(3)
            .max(30)
            .required().messages({
                "any.required": `email is a required field`
            }),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
                "any.required": `password is a required field`
            })
    }),

    agentUpdateValidator: Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(3)
            .max(30)
            .messages({
                "any.required": `email is a required field`
            }),

        name: Joi.string()
            .min(3)
            .max(30)
            .messages({
                "any.required": `name is a required field`
            }),
        phoneNumber: Joi.string()
            .min(3)
            .max(30)
            .messages({
                "any.required": `name is a required field`
            }),
        avatar: Joi.string()
            .min(3)
            .max(30)
            .messages({
                "any.required": `name is a required field`
            }),
    }),
}