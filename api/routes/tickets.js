const router =  require('express').Router(); 
const {create,remove,update,getAll,single} = require('../controllers/tickets'); 
const pathMethod = require('../middleware/middleware');

router.get('/',pathMethod,getAll); 
router.get('/:id',pathMethod,single);
router.post('/create',pathMethod,create);
router.delete('/remove/:id',pathMethod,remove);
router.patch('/update/:id',pathMethod,update); 

module.exports = router;