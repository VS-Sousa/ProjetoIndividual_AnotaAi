var express = require("express");
var router = express.Router();

var recommendationController = require('../controllers/recommendationController');

router.get('/set-up/:idUser', function (request, response) {
    recommendationController.getItemsAndFriends(request, response)
});

router.post('/:idUser', function (request, response) {
    recommendationController.sendRecommendation(request, response);
})

module.exports = router;