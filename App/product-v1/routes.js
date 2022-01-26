const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productController = require('./controler');

// Testing

// router.get('/product', (req, res) => {
//     db.collection('products').find()
//         .toArray()
//         .then(result => res.send(result))
//         .catch(Error => res.send(Error));
// });

router.get('/product', productController.index);
router.get('/product/:id', productController.view);
router.post('/product/', upload.single('image'),productController.store);

module.exports = router;