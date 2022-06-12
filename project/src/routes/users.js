var express = require("express");
var router = express.Router();

var userController = require('../controllers/userController');

router.post("/sign-up", function (request, response) {
    userController.signUp(request, response);
});

router.post("/sign-in", function (request, response) {
    userController.signIn(request, response);
});

router.put("/:idUser", function (request, response) {
    userController.updateUser(request, response);
});

router.patch('/password/:idUser', function (request, response) {
    userController.changePassword(request, response);
});

router.get('/notifications/:idUser', function (request, response) {
    userController.getNotifications(request, response);
})

router.get('/preferences/:idUser', function (request, response) {
    userController.getUserPreferences(request, response);
})

module.exports = router;