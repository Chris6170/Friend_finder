

var friends = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    var obj;

    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        var userScores = newFriend.scores;

        var leastDiff = 1000;
        var bestMatchIndex = -1;

        for (var f = 0; f < friends.length; f++) {
            var fscores = friends[f].scores

            var currentDiffFriendLevel = 0;
            for (var i = 0; i < userScores.length; i++) {
                var currentDiffQuestionLevel = Math.abs(userScores[i] - fscores[i])
                currentDiffFriendLevel = currentDiffFriendLevel + currentDiffQuestionLevel
            }

            if (currentDiffFriendLevel < leastDiff) {
                leastDiff = currentDiffFriendLevel;
                bestMatchIndex = f;
            }
        }

        res.json(friends[bestMatchIndex]);
    });
}
