var express = require('express');
var router = express.Router();

// authenticate admin status here
router.use('/', function(req, res, next) {
  if (req.session.PermissionLevelID === null || typeof req.session.PermissionLevelID === 'undefined' || req.session.PermissionLevelID < 3) {
    res.sendStatus(401);
  } else {
    next();
  }
});

/* ========================== USER LIST =============================

/* admins/users
GET full user list */
router.get('/users', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var query =`SELECT
                	CONCAT(Users.FirstName, " ", Users.LastName) AS FullName,
                	Users.FirstName,
                	Users.LastName,
                	Users.UserID,
                	PermissionLevels.PermissionLevelID,
                	PermissionLevels.PermissionLevelName
                FROM (Users
                JOIN PermissionLevels
                ON Users.PermissionLevelID = PermissionLevels.PermissionLevelID)
                ORDER BY Users.UserID, Users.LastName, Users.FirstName ASC
                LIMIT 50;`;

    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      res.json(rows);
    });
  });
});

/* admins/users/search?searchToken=?
GET user list with passed search token */
router.get('/users/search', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var query =`SELECT
                	CONCAT(Users.FirstName, " ", Users.LastName) AS FullName,
                	Users.FirstName,
                	Users.LastName,
                	Users.UserID,
                	PermissionLevels.PermissionLevelID,
                	PermissionLevels.PermissionLevelName
                FROM (Users
                JOIN PermissionLevels
                ON Users.PermissionLevelID = PermissionLevels.PermissionLevelID)
                HAVING FullName LIKE ?
                ORDER BY Users.UserID, Users.LastName, Users.FirstName ASC
                LIMIT 50;`;

    var searchToken = '%' + req.query.searchToken + '%';
    connection.query(query, [searchToken], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      res.json(rows);
    });
  });
});

/* admins/users/user?userID=?
GET details for specific user */
router.get('/users/user', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var query =`SELECT
                	UserID,
                	CONCAT(FirstName, " ", LastName) AS FullName,
                	FirstName,
                	LastName,
                	UserAddress,
                	ContactNumber,
                	EmailAddress,
                	Users.PermissionLevelID,
                	PermissionLevelName
                FROM (Users
                JOIN PermissionLevels
                ON Users.PermissionLevelID = PermissionLevels.PermissionLevelID)
                WHERE UserID = ?;`;

    connection.query(query, [req.query.userID], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      res.json(rows);
    });
  });
});

/* admins/users/checkInHistory?userID=?
GET check in history for specific user */
router.get('/users/checkInHistory', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var query =`SELECT
                  CheckInID,
                  Venues.VenueName,
                  Venues.Address,
                  CheckInTime
                FROM CheckIns
                JOIN Venues ON CheckIns.VenueID =Venues.VenueID
                WHERE CheckIns.UserID = ?
                ORDER BY CheckInTime DESC
                LIMIT 50;`;

    connection.query(query, [req.query.userID], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      res.json(rows);
    });
  });
});

/* admins/users/ownedVenues?userID=?
GET list of owned venues of specific user */
router.get('/users/ownedVenues', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var query =`SELECT
                	Venues.VenueID,
                	Venues.VenueName,
                	Venues.CheckInCode,
                	Venues.Address,
                	Venues.OwnerID,
                	CONCAT(Users.FirstName, " ", Users.LastName) AS OwnerName
                FROM (Venues
                JOIN Users
                ON Venues.OwnerID = Users.UserID)
                WHERE OwnerID = ?
                ORDER BY VenueID, VenueName ASC
                LIMIT 50;`;

    connection.query(query, [req.query.userID], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      res.json(rows);
    });
  });
});

/* ========================== VENUE LIST =============================

/* admins/venues
GET full venue list */
router.get('/venues', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var query =`SELECT
                	Venues.VenueName,
                	Venues.VenueID,
                	Venues.Address
                FROM Venues
                ORDER BY Venues.VenueID, Venues.VenueName ASC
                LIMIT 50;`;

    connection.query(query, function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      res.json(rows);
    });
  });
});

/* admins/venues/search?searchToken=?
GET venue list with passed search token */
router.get('/venues/search', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var query =`SELECT
                	Venues.VenueName,
                	Venues.VenueID,
                	Vebyes.Address
                FROM Venues
                WHERE Venues.VenueName LIKE ? OR Venues.Address LIKE ?
                ORDER BY Venues.VenueID, Venues.VenueName ASC
                LIMIT 50;`;

    var searchToken = '%' + req.query.searchToken + '%';
    connection.query(query, [searchToken, searchToken], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      res.json(rows);
    });
  });
});

/* admins/venues/venue?venueID=?
GET details for specific venue */
router.get('/venues/venue', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var query =`SELECT
                	Venues.VenueID,
                	Venues.VenueName,
                	Venues.CheckInCode,
                	Venues.Address,
                	Venues.OwnerID,
                	CONCAT(Users.FirstName, " ", Users.LastName) AS OwnerName
                FROM (Venues
                JOIN Users
                ON Venues.OwnerID = Users.UserID)
                WHERE VenueID = ?;`;

    connection.query(query, [req.query.venueID], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      res.json(rows);
    });
  });
});

/* admins/venues/checkInHistory?venueID=?
GET check in history for specific venue */
router.get('/venues/checkInHistory', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var query =`SELECT
                	CONCAT(FirstName, " ", LastName) AS FullName,
                	CheckInTime
                FROM CheckIns
                INNER JOIN Users ON CheckIns.UserID = Users.UserID
                WHERE VenueID = ?
                ORDER BY CheckInTime DESC
                LIMIT 50;`;

    connection.query(query, [req.query.venueID], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      res.json(rows);
    });
  });
});

/* ========================== HOTSPOT LIST =============================

/* admins/hotspots/search?searchToken=?
GET current hotspot list filtered by searchToken*/
router.get('/hotspots/search', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var query =`SELECT
                  HotSpotID,
                  HotSpots.VenueID,
                  Venues.VenueName,
                  Venues.Address,
                  Venues.Latitude,
                  Venues.Longitude,
                  HotSpots.ConfirmedCases,
                  HotSpots.Created,
                  HotSpots.Expires,
                  HotSpots.Description
                FROM HotSpots
                JOIN Venues
                ON HotSpots.VenueID = Venues.VenueID
                WHERE Venues.VenueName LIKE ? OR Venues.Address LIKE ?;`;

    var searchToken = '%' + req.query.searchToken + '%';
    connection.query(query, [searchToken, searchToken], function(err, rows, fields) {
      connection.release(); // release connection
      if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
      }
      res.json(rows);
    });
  });
});

/* admins/hotspots/deleteHotspot
POST hotspotID to delete from database*/
router.post('/hotspots/deleteHotspot', function(req, res, next) {
  if (!('hotspotID' in req.body)) {
    res.sendStatus(400);
  } else {
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query =`DELETE FROM HotSpots
                  WHERE HotSpots.HotSpotID = ?;`;

      connection.query(query, [req.body.hotspotID], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.json(rows);
      });
    });
  }

});

/* admins/hotspots/createHotspot
POST hotspot to create in database*/
router.post('/hotspots/createHotspot', function(req, res, next) {
  if ('venueID' in req.body && 'confirmedCases' in req.body && 'expires' in req.body && 'description' in req.body) {
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query =`INSERT INTO HotSpots (
                    VenueID,
                    ConfirmedCases,
                    Created,
                    Expires,
                    Description
                  )
                  VALUES (?, ?, CURRENT_TIMESTAMP(), ?, ?);`;

      connection.query(query, [req.body.venueID, req.body.confirmedCases, req.body.expires, req.body.description], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.status(200).send(`<span class="success-text">Successfully created hotspot</span>`);
      });
    });
  } else {
    res.status(400).send(`<span class="required-field">Missing elements in request body</span>`);
  }

});

// email notifcations

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

router.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
router.use(bodyParser.json());

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'projecttestacc123@gmail.com',
    pass: 'uniproject'
  }
});

/* admins/sendHotspotNotification
POST hotspot creation email */
router.post('/sendHotspotNotification', (req, res) =>{
  if ('venueID' in req.body && 'confirmedCases' in req.body && 'created' in req.body && 'expires' in req.body) {

    // get venue name from ID
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }

      var query =`SELECT
                    VenueName,
                    Address
                  FROM Venues
                  WHERE VenueID = ?`;

      connection.query(query, [req.body.venueID], function(err, rows, fields) {

        connection.release(); // release connection
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        var venueName = rows[0].VenueName;
        var address = rows[0].Address;

        var creationDate = new Date(Date.parse(req.body.created)).toDateString();
        var expiryDate = new Date(Date.parse(req.body.expires)).toDateString();

        var output = `
          <p>A new virus hotspot has been reported, see below for details:</p>
          <h4>Location: </h4><span>${venueName}</span>
          <h4>Address: </h4><span>${address}</span>
          <h4>Description: </h4><span>${req.body.description}</span>
          <h4>Confirmed cases: </h4><span>${req.body.confirmedCases}</span>
          <h4>Reported on: </h4><span>${creationDate}</span>
          <h4>Expires on: </h4><span>${expiryDate}</span>
          <br>
          <p>If you believe you have been exposed to this hotspot, please self quarantine immediately and report to your nearest Coronavirus testing site as soon as possible.</p>
          <br>
          <p>You are receiving these emails because you are subscribed to the ViroTrack service. If you wish to stop receiving notifications, you can unsubscribe on your profile page after logging into ViroTrack.</p>
          `;

        req.pool.getConnection( function(err,connection) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
            }
            var query =`SELECT Users.EmailAddress
                        FROM Users
                        WHERE Users.NotificationStatus = 0;`;

            connection.query(query, function(err, rows, fields) {
              connection.release(); // release connection
              if (err) {
                  console.log(err);
                  res.sendStatus(500);
                  return;
              }

              var emails = [];
              for (i = 0; i < rows.length; i++) {
                emails.push(rows[i].EmailAddress);
              }

              var mailOptions = {
                  from: '"ViroTrack" <projecttestacc123@gmail.com>', // sender address
                  to:'projecttestacc123@gmail.com',
                  bcc: emails, // list of receivers
                  subject: 'New Hotspot Notification', // Subject line
                  html: output// plain text body
              };

              transporter.sendMail(mailOptions, function (err, info) {
              if(err)
                console.log(err);
              else
               console.log(info);
              });
              res.sendStatus(200);
            });
        });

      });
    });

  } else {
    res.status(400).send("Missing fields in request body");
  }
});

/* users/permissionToggle
POST change permission levels of users*/
router.post('/permissionToggle', function(req, res, next) {

// connect to the database and check there is no user already existing with the same email
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query =`UPDATE Users
                  SET PermissionLevelID = ?
                  WHERE UserID = ?;`;

      connection.query(query, [req.body.permissionStatus, req.body.selectedid], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        } else {
          res.sendStatus(200);
        }

      });
    });
  // end of else
});

module.exports = router;
