const Router = require('express').Router;
const router = new Router();
const authorize = require('../../_helpers/authorise')
const role = require('../../_helpers/role')
const { 
    adminRegister,
    adminLogin,
    getAllAgents
} = require('../controller/admin/admin')


router.post('/register', adminRegister);

router.post('/login', adminLogin)

router.get('/get-agents', authorize(role.Admin), getAllAgents)

module.exports = router;