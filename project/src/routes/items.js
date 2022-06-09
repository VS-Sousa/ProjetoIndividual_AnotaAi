var express = require("express");
var router = express.Router();

var itemController = require('../controllers/itemController');

router.get("/", function (request, response) {
    itemController.getAllItems(request, response);
});

module.exports = router;