const Router = require('express').Router;
const router = new Router();

const { 
    agentRegister,
    agentLogin,
    agentUpdate,
    agentDelete,
    getAllAgents
} = require('../controller/agent/agent')


router.post('/register', agentRegister);

router.post('/login', agentLogin)

router.put('/update/:id', agentUpdate)

router.delete('/delete-agent/:id', agentDelete)


module.exports = router;