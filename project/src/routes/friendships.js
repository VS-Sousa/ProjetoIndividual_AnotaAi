var express = require("express");
var router = express.Router();

var friendshipController = require('../controllers/friendshipController');

router.post("/requests", function (request, response) {
    friendshipController.sendFriendshipRequest(request, response);
});

router.get('/requests/:idUser', function (request, response) {
    friendshipController.getAllReceivedRequests(request, response);
})

router.delete('/requests/refuse/:idReceiver&:idSender', function (request, response) {
    friendshipController.refuseFriendshipRequest(request, response);
})

router.put('/requests/accept/:idReceiver&:idSender', function (request, response) {
    friendshipController.acceptFriendshipRequest(request, response)
})

router.get('/friends/:idUser', function(request, response) {
    friendshipController.getAllFriends(request, response);
})

router.delete('/friends/:idReceiver&:idSender', function (request, response) {
    friendshipController.refuseFriendshipRequest(request, response);
});

module.exports = router;