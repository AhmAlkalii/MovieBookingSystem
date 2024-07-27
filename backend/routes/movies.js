const router = require('express').Router(); 
const pathMethod = require('../middleware/middleware'); 
const {getAll,singleMovie,create,remove,update} = require('../controllers/movies');

router.get('/', pathMethod, getAll);
router.get('/:id', pathMethod, singleMovie);
router.post('/create/', pathMethod, getAll);
router.delete('/remove/:id', pathMethod, getAll);
router.patch('/update/:id', pathMethod, getAll);

module.exports = router;