var express = require('express');
var router = express.Router();

/* users/signup
POST user details to database to validate login */
router.post('/signup', function(req, res, next) {
  if ('email' in req.body && 'pass' in req.body && 'firstName' in req.body && 'lastName' in req.body && 'contactNumber' in req.body && 'address' in req.body) {
    // connect to the database and check there is no user already existing with the same email
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query =`SELECT
                    Users.EmailAddress
                  FROM Users
                  WHERE Users.EmailAddress = ?`;

      connection.query(query, [req.body.email], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        // if there is an existing user using the email error, otherwise send the data to the database
        if (rows.length > 0) {
          res.status(400).send("<span class='required-field'>ERROR: Email already in use</span>");
        } else {
          req.pool.getConnection( function(err,connection) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
            }
            var query =`INSERT INTO Users (
                          FirstName,
                          LastName,
                          UserAddress,
                          ContactNumber,
                          EmailAddress,
                          PasswordHash,
                          PermissionLevelID
                        )
                        VALUES
                        	(?, ?, ?, ?, ?, CONCAT('03i1vnn37b', SHA2(?, 224)), 1);`;

            connection.query(query, [req.body.firstName, req.body.lastName, req.body.address, req.body.contactNumber, req.body.email, req.body.pass], function(err, rows, fields) {
              connection.release(); // release connection
              if (err) {
                  console.log(err);
                  res.sendStatus(500);
                  return;
              } else {
                res.status(200).send("<span class='success-text'>Successfully registered new user</span>");
              }

            });
          });
        } // end of else

      });
    });

  } else {
    res.status(400).send("<span class='required-field'>ERROR: Missing fields in request</span>");
  }

});

/* users/login
POST user details to database to validate login */
router.post('/login', function(req, res, next) {
  if ('email' in req.body && 'pass' in req.body) {
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query =`SELECT
                    Users.UserID,
                    Users.EmailAddress,
                    Users.PasswordHash,
                    Users.PermissionLevelID
                  FROM Users
                  WHERE Users.EmailAddress = ? AND Users.PasswordHash = CONCAT('03i1vnn37b', SHA2(?, 224));`;

      connection.query(query, [req.body.email, req.body.pass], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        if (rows.length < 1) {
          res.sendStatus(401);
        } else {
          req.session.UserID = rows[0].UserID;
          req.session.PermissionLevelID = rows[0].PermissionLevelID;
          res.sendStatus(200);
        }

      });
    });
  } else {
    res.sendStatus(401);
  }

});

/* users/logout
POST request to delete user session */
router.post('/logout', function(req, res, next) {
    delete req.session.UserID;
    delete req.session.PermissionLevelID;
    res.sendStatus(200);
});

// make sure the user has a valid login before passing here
router.use('/', function(req, res, next) {
  if (req.session.PermissionLevelID === null || typeof req.session.PermissionLevelID === 'undefined') {
    res.sendStatus(401);
  } else {
    next();
  }
});

/* users/checkIn
Check in current user using checkin code */
router.post('/checkIn', function(req, res, next) {
  if ('checkInCode' in req.body ) {

    // first check to see if there is a venue matching the check in code
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query =`SELECT
                    VenueID,
                    VenueName
                  FROM Venues
                  WHERE Venues.CheckInCode = ?;`;

      connection.query(query, [req.body.checkInCode], function(err, rows, fields) {
        connection.release(); // release connection
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }

        if (rows.length < 1) {
          res.status(400).send("Invalid check in code");
          return;
        }

        var venueID = rows[0].VenueID;
        var venueName = rows[0].VenueName;

        // get another connection to add checkin to database
        req.pool.getConnection( function(err,connection) {
          if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
          }
          var query =`INSERT INTO CheckIns (
                        VenueID,
                        UserID,
                        CheckInTime
                      ) VALUES (
                        ?, ?, CURRENT_TIMESTAMP()
                      );`;

          connection.query(query, [venueID, req.session.UserID, req.body.checkInCode], function(err, rows, fields) {
            connection.release(); // release connection
            if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
            } else {
              res.status(200).send(`Successfully checked in to ${venueName}`);
            }

            });
          });

      });
    });
  } else {
    res.status(400).send("Missing values in request body");
  }
});

/* users/currentHotspots
GET current hotspot list */
router.get('/currentHotspots', function(req, res, next) {
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
                ON HotSpots.VenueID = Venues.VenueID;`;

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

/* users/currentUser
GET details for current user */
router.get('/currentUser', function(req, res, next) {
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
                	PermissionLevelName,
                	NotificationStatus
                FROM (Users
                JOIN PermissionLevels
                ON Users.PermissionLevelID = PermissionLevels.PermissionLevelID)
                WHERE UserID = ?;`;

    if (req.session.UserID === null || typeof req.session.UserID === 'undefined') {
      res.sendStatus(401);
    }

    connection.query(query, [req.session.UserID], function(err, rows, fields) {
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

/* users/currentUserHistory
GET check in history for current user */
router.get('/currentUserHistory', function(req, res, next) {
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
                  Venues.Longitude,
                  Venues.Latitude,
                  CheckInTime
                FROM CheckIns
                JOIN Venues ON CheckIns.VenueID = Venues.VenueID
                WHERE CheckIns.UserID = ?
                ORDER BY CheckInTime DESC
                LIMIT 50;`;

    if (req.session.UserID === null || typeof req.session.UserID === 'undefined') {
      res.sendStatus(401);
    }

    connection.query(query, [req.session.UserID], function(err, rows, fields) {
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

/* users/currentUserVenues
GET owned venues current user */
router.get('/currentUserVenues', function(req, res, next) {
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
                	Venues.Longitude,
                  Venues.Latitude,
                	Venues.OwnerID,
                	CONCAT(Users.FirstName, " ", Users.LastName) AS OwnerName
                FROM (Venues
                JOIN Users
                ON Venues.OwnerID = Users.UserID)
                WHERE OwnerID = ?
                ORDER BY VenueID, VenueName ASC
                LIMIT 50;`;

    if (req.session.UserID === null || typeof req.session.UserID === 'undefined') {
      res.sendStatus(401);
    }

    connection.query(query, [req.session.UserID], function(err, rows, fields) {
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

/* users/venues/venue?venueID=?
GET details for specific owned venue */
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

/* users/venues/checkInHistory?venueID=?
GET check in history for selected owned venue */
router.get('/venues/checkInHistory', function(req, res, next) {
  req.pool.getConnection( function(err,connection) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return;
    }
    var query =`SELECT
                	FirstName AS FullName,
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

/* users/editdetails
POST user details to database to update values */
router.post('/editDetails', function(req, res, next) {

    // connect to the database and check there is no user already existing with the same email
          req.pool.getConnection( function(err,connection) {
            if (err) {
              console.log(err);
              res.sendStatus(500);
              return;
            }
            var query =`UPDATE Users
                        SET FirstName = ?,
                        LastName = ?,
                        UserAddress = ?,
                        ContactNumber = ?
                        WHERE UserID = ?`;

            connection.query(query, [req.body.Firstname, req.body.Lastname, req.body.Address, req.body.Mobile, req.session.UserID], function(err, rows, fields) {
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

/* users/editemailpref
POST user details to edit email prefrences*/
router.post('/editemailpref', function(req, res, next) {

// connect to the database and check there is no user already existing with the same email
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query =`UPDATE Users
                  SET NotificationStatus = ?
                  WHERE UserID = ?;`;

      connection.query(query, [req.body.emailStatus, req.session.UserID], function(err, rows, fields) {
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

// ONLY EMAIL STUFF PAST THIS POINT

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

/* users/reportHotspot
POST report email */
router.post('/reportHotspot', (req, res) =>{
    var output = `
        <ul>
            <li> Name: ${req.body.Firstname} ${req.body.Lastname}</li>
            <li> Venue: ${req.body.VenueID}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.messagebody}</p>
        `;



    req.pool.getConnection( function(err,connection) {
        if (err) {
          console.log(err);
          res.sendStatus(500);
          return;
        }
        var query =`Select
                    EmailAddress
                    FROM
                    Users
                    WHERE
                    PermissionLevelID=3 AND NotificationStatus=0;`;

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
              subject: 'Hotspot Report', // Subject line
              html: output// plain text body
          };

          transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err);
          else
           console.log(info);
          });
          res.redirect('/');
        });
    });
});

/* users/deleteVenue
POST user details to delete venue*/
router.post('/deleteVenue', function(req, res, next) {

// connect to the database and check there is no user already existing with the same email
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query =`Delete
                  FROM Venues
                  WHERE  VenueID = ?;`;

      connection.query(query, [req.body.VenueID], function(err, rows, fields) {
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

/* users/deleteUser
POST to delete user from database*/
router.post('/deleteUser', function(req, res, next) {

// connect to the database and check there is no user already existing with the same email
    req.pool.getConnection( function(err,connection) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      var query =`Delete
                  FROM Users
                  WHERE  UserID = ?;`;

      connection.query(query, [req.body.UserID], function(err, rows, fields) {
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
