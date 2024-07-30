const router = require('express').Router(); 
const multer = require('multer'); 
const path = require('path');
const pathMethod = require('../middleware/middleware'); 
const {getAll,singleMovie,create,remove,update} = require('../controllers/movies');

const posterStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'posters/')
    } ,
    filename : function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
}) 

const trailerStorage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'trailers/')
    } ,
    filename : function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
})

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'uploads/')
    } ,
    filename : function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
}) 

const posterUpload = multer({
    storage: posterStorage,
    //limits: { fileSize: 1000000 }, 
    // fileFilter: function(req, file, cb) {
    //   checkFileType(file, cb);
    // }
  }).single('poster');

const trailerUpload = multer({storage: trailerStorage}).single('trailer');
const upload = multer({storage: storage}).fields([{name : 'trailer' , maxCount:1},{name:'poster',maxCount:1}]);


router.get('/', pathMethod, getAll);
router.get('/:id', pathMethod, singleMovie);
router.post('/create', pathMethod,upload, create);
router.delete('/remove/:id', pathMethod, remove);
router.patch('/update/:id', pathMethod,upload, update);

module.exports = router;