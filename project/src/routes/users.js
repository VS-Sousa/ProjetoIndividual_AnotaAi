var express = require("express");
var router = express.Router();

var userController = require('../controllers/userController');

router.post("/sign-up", function (request, response) {
    userController.signUp(request, response);
});

module.exports = router;