var express = require("express");
var router = express.Router();

var listController = require('../controllers/listController');

router.post('/add-item/:idUser', function (request, response) {
    listController.addToList(request, response)
});

router.get('/:idUser', function (request, response) {
    listController.getAllItemsFromUserList(request, response)
});

router.put('/:idUser', function (request, response) {
    listController.updateStatus(request, response);
})

router.delete('/:idUser&:idItem', function (request, response) {
    listController.removeItemFromList(request, response);
})

router.get('/latest/:idUser', function (request, response) {
    listController.getLatestItemsFromList(request, response);
})

module.exports = router;