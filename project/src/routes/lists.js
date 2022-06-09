var express = require("express");
var router = express.Router();

var listController = require('../controllers/listController');

router.post('/add-item/:idUser', function (request, response) {
    listController.addToList(request, response)
})

module.exports = router;