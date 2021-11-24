var express = require('express');
var router = express.Router();

// authenticate venue manager status here
router.use('/', function(req, res, next) {
  if (req.session.PermissionLevelID === null || typeof req.session.PermissionLevelID === 'undefined' || req.session.PermissionLevelID < 2) {
    res.sendStatus(401);
  } else {
    next();
  }
});

/* venueManagers/editVenue
Update an existing venue owned by the currently signed in user*/
router.post('/editVenue', function(req, res, next) {
  if ('venueID' in req.body && 'venueName' in req.body && 'address' in req.body && 'longitude' in req.body && 'latitude' in req.body) {

    // first check to see if the user is allowed to edit this venue
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query =`SELECT
                    OwnerID
                  FROM Venues
                  WHERE Venues.VenueID = ?;`;

      connection.query(query, [req.body.venueID], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        if (rows.length < 1) {
          res.status(400).send(`<span class="required-field">Venue ID provided does not exist in db</span>`);
          return;
        }

        if (rows[0].OwnerID != req.session.UserID) {
          res.status(401).send(`<span class="required-field">User does not own venue</span>`);
          return;
        }

        // get another connection to update venue in database
        req.pool.getConnection( function(err,connection) {
          if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
          }
          var query =`UPDATE Venues
                      SET VenueName = ?, Address = ?, Longitude = ?, Latitude = ?
                      WHERE VenueID = ?;`;

          connection.query(query, [req.body.venueName, req.body.address, req.body.longitude, req.body.latitude, req.body.venueID], function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            } else {
              res.status(200).send(`Successfully edited ${req.body.venueName}`);
            }

            });
          });

      });
    });
  } else {
    res.status(400).send(`<span class="required-field">Missing values in request body</span>`);
  }
});

/* venueManagers/addVenue
Add a new venue belonging to the currently signed in user*/
router.post('/addVenue', function(req, res, next) {
  if ('venueName' in req.body && 'address' in req.body && 'longitude' in req.body && 'latitude' in req.body && 'checkInCode' in req.body) {

    // get another connection to update venue in database
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query =`INSERT INTO Venues (
                    VenueName,
                    CheckInCode,
                    Address,
                    Longitude,
                    Latitude,
                    OwnerID
                  )
                  VALUES
                    (?, ?, ?, ?, ?, ?);`;

      connection.query(query, [req.body.venueName, req.body.checkInCode, req.body.address, req.body.longitude, req.body.latitude, req.session.UserID], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        } else {
          res.status(200).send(`<span class="success-text">Successfully created venue ${req.body.venueName}</span>`);
        }

      });
    });

  } else {
    res.status(400).send(`<span class="required-field">Missing values in request body</span>`);
  }
});

module.exports = router;
