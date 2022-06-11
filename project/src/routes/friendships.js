var express = require("express");
var router = express.Router();

var friendshipController = require('../controllers/friendshipController');

router.post("/requests", function (request, response) {
    friendshipController.sendFriendshipRequest(request, response);
});

router.get('/requests/:idUser', function (request, response) {
    friendshipController.getAllReceivedRequests(request, response);
})

module.exports = router;