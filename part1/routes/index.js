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
  try {
    req.pool.getConnection(function(err,connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      connection.execute('SELECT name AS dog_name, size, username AS owner_username FROM Dogs INNER JOIN Users ON Dogs.owner_id = Users.user_id', function (error, results, fields) {
        connection.release();
        if (error) throw error;
        res.send(results);

      });
    });
  } catch(err) {
    console.error("DB Error.");
  }
});


router.get('/api/walkrequests/open', function(req, res) {
  try {
    req.pool.getConnection(function(err,connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      connection.execute(`SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location,
      Users.username AS owner_username FROM ((WalkRequests INNER JOIN Dogs ON Dogs.dog_id= WalkRequests.dog_id)
      INNER JOIN Users ON Users.user_id  = Dogs.owner_id) WHERE WalkRequests.status = 1`, function (error, results, fields) {
      connection.release();
        if (error) throw error;
          res.send(results);
      });
    });
  } catch(err) {
    console.error("DB error.");

  }
});


router.get('/api/walkers/summary', function(req, res) {
  try {
    req.pool.getConnection(function(err,connection) {
      if (err) {
        res.sendStatus(500);
        return;
      }
      connection.execute(`SELECT Users.username AS walker_username, AVG(rating) AS average_rating, COUNT(rating_id) AS total_ratings FROM WalkRatings INNER JOIN Users ON WalkRatings.walker_ID = Users.user_id GROUP BY walker_id`, function (error, results, fields) {
      connection.release();
        if (error) throw error;
          res.send(results);
      });
    });
  } catch(err) {
    console.error("DB error.");

  }
});

module.exports = router;
