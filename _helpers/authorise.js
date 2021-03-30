/* eslint-disable eqeqeq */
/* eslint-disable no-unreachable */
// const { jwtToken, saltRounds } = require('../config/keys');
const secret = process.env.JWT_SECRET
const expressJwt = require('express-jwt')
const model = require('../models')
module.exports = authorize

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User')
    // or an array of roles (e.g. [ Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles == 'string') {
        roles = [roles]
    }
    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret }),

        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' })
            }
            switch (req.user.role) {
                case 'Admin':
                    model.Admin.findOneByEmail(req.user.email).then(
                        user => {
                            if (user) {
                                req.user = user
                                req.userType = 'Admin'
                                // authentication and authorization successful
                                next()
                            } else {
                                return res
                                    .status(404)
                                    .json({ message: 'User Not Found' })
                            }
                        }
                    )
                    break;
            }
        }

    ]
}
