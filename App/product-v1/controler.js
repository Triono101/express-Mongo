const { ObjectId } = require('mongodb');
const db = require('../../config/mongodb');
const fs = require('fs');
const path = require('path');

// Select All Data or Delete some Data
const index = (req, res) => {
    db.collection('products').find()
        .toArray()
        .then(result => res.send(result))
        .catch(Error => res.send(Error));
};

// Select Data by ID
const view = (req, res) => {
    const {id} = req.params;
    db.collection('products').findOne({_id: ObjectId(id)})
        .then(result => res.send(result))
        .catch(Error => res.send(Error));
};

// Insert Data
const store = (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if(image) {
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        db.collection('products').insertOne({name, price, stock, status, image_url: `http://localhost:3001/public/${image.originalname}`})
            .then(result => res.send(result))
            .catch(Error => res.send(Error));
    }
};

// // Delete Data
// const destroy = (req, res) => {
//     connection.query({
//         sql: 'DELETE FROM products WHERE id = ?',
//         values: [req.params.id]
//     }, _response(res));
// };

// // Update Data
// const update = (req, res) => {
//     const {users_id, name, price, stock, status} = req.body;
//     const image = req.file;
//     let sql = '';
//     let values = [];
//     if(image) {
//         const target = path.join(__dirname, '../../uploads', image.originalname);
//         fs.renameSync(image.path, target);
//         sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?';
//         values = [parseInt(users_id), name, price, stock, status, `http://localhost:3001/public/${image.originalname}`, req.params.id]
//     }else {
//         sql = 'UPDATE products SET users_id = ?, name = ?, price = ?, stock = ?, status = ?, WHERE id = ?';
//         values = [parseInt(users_id), name, price, stock, status, req.params.id]
//     }
// connection.query({sql, values}, _response(res));
// }

// const _response = (res) => {
//     return (error, result) => {
//         if(error) {
//             res.send({
//                 status: 'failed',
//                 response: error
//             });
//         }else {
//             res.send({
//                 status: 'success',
//                 response: result
//             });
//         };
//     };
// };

module.exports = {
    index,
    view,
    store
};