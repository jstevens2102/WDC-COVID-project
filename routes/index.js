var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.UserID === null || typeof req.session.UserID === 'undefined') {
        res.redirect(401, '/login.html');
    } else {
        next();
    }
});

/* DATABASE REQUEST TEMPLATE
router.get('/path', function(req, res, next) {
    req.pool.getConnection( function(err,connection) {
        if (err) {
            res.sendStatus(500);
            return;
        }
        var query = `QUERY WITH PARAMS ? HERE`;
        connection.query(query, [PARAMS HERE], function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.json(rows);
        });
    });
});

*/

module.exports = router;
