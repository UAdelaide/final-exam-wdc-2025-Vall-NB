var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test.txt', function(req, res) {
  res.send("Acknowledge");
});

router.get('/api/dogs', function(req, res) {
    console.log("connect");
    req.pool.getConnection(function(err,connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      connection.execute('SELECT name, size, username  FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id', function (error, results, fields) {
        connection.release();
        console.log(results);
        if (error) throw error;
        res.send(results);

      });
    });
});


router.get('/api/walkrequests/open', function(req, res) {
    req.pool.getConnection(function(err,connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      connection.execute(`SELECT WalkRequests.request_id, Dogs.name , WalkRequests.requested_time, WalkRequests.durationminutes, WalkRequests.location
      Users.username FROM ((Requests INNER JOIN Dogs ON Dogs.dog_id= WalkRequests.dog_id)
      INNER JOIN Users ON Users.user_id  = Dogs.owner_id) WHERE WalkRequests.stats = 1`, function (error, results, fields) {
      connection.release();
        if (error) throw error;
          res.send(results);
      });
    });
});

module.exports = router;
