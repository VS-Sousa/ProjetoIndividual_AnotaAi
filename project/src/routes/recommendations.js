var express = require("express");
var router = express.Router();

var recommendationController = require('../controllers/recommendationController');

router.get('/set-up/:idUser', function (request, response) {
    recommendationController.getItemsAndFriends(request, response)
});

router.post('/:idUser', function (request, response) {
    recommendationController.sendRecommendation(request, response);
});

router.get('/:idUser', function (request, response) {
    recommendationController.getAllReceivedRecommendations(request, response)
});

router.delete('/:idReceiver&:idItem&:idSender', function (request, response) {
    recommendationController.deleteRecommendation(request, response);
})

router.put('/:idReceiver', function (request, response) {
    recommendationController.addRecommendationToList(request, response)
});

module.exports = router;