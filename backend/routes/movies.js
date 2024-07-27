const router = require('express').Router(); 
const pathMethod = require('../middleware/middleware'); 
const {getAll,singleMovie,create,remove,update} = require('../controllers/movies');

router.get('/', pathMethod, getAll);
router.get('/:', pathMethod, singleMovie);
router.post('/create/', pathMethod, getAll);
router.delete('/remove/:', pathMethod, getAll);
router.patch('/update/:', pathMethod, getAll);

module.exports = router;