const Router = require('express');
const router = new Router();
const fileCtrl = require('../controller/fileController');
// const checkMidleware = require('../middleware/checkMidleware');

router.get('/getall', fileCtrl.getAll);
router.get('/getone', fileCtrl.getOne);
router.post('/add', fileCtrl.addFile);


module.exports = router;