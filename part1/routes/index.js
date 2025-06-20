var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/dogs, function(req, res) {
    req.pool.getConnection(function(err,connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      connection.execute('SELECT name, size, username  FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id', function (error, results, fields) {
      connection.release();
        if (error) throw error;
          res.send(results);

      });
    });
});


module.exports = router;
