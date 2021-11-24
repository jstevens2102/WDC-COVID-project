USE covid_tracking_db;
DELETE FROM CheckIns;
DELETE FROM Venues;
DELETE FROM Users;
DELETE FROM PermissionLevels;
ALTER TABLE CheckIns AUTO_INCREMENT = 1;
ALTER TABLE Venues AUTO_INCREMENT = 1;
ALTER TABLE Users AUTO_INCREMENT = 1;
ALTER TABLE PermissionLevels AUTO_INCREMENT = 1;

INSERT INTO PermissionLevels (PermissionLevelName)
VALUES
    ("User"),
    ("Venue Manager"),
    ("Administrator")
;

INSERT INTO Users (
    FirstName,
    LastName,
    UserAddress,
    ContactNumber,
    EmailAddress,
    PasswordHash,
    PermissionLevelID,
    NotificationStatus
)
VALUES
	("Jack", "Stevens", "39 Some Street, Henley Beach, SA", "0412345678", "jackstevens@domain.com.au", CONCAT('03i1vnn37b', SHA2('1234', 224)), 1,0),
    ("John", "Doe", "13 Another Place, North Adelaide, SA", "0427899241", "johndoe@domain.com.au", CONCAT('03i1vnn37b', SHA2('1234', 224)), 2,0),
    ("Tom", "Cruise", "21 Random Terrace, West Beach, SA", "0425278411", "tomcruise@domain.com.au", CONCAT('03i1vnn37b', SHA2('1234', 224)), 3,0),
    ("Keanu", "Reeves", "4 Wick Street, Albert Park, SA", "0413245432", "keanureeves@domain.com.au", CONCAT('03i1vnn37b', SHA2('1234', 224)), 3,0),
    ("John", "Wick", "2 Private Street, Salisbury, SA", "0424785385", "johnwick@domain.com.au", CONCAT('03i1vnn37b', SHA2('1234', 224)), 1,0),
    ("Jack", "Traven", "5 East Terrace, Henley Beach, SA", "0432457871", "jacktraven@domain.com.au", CONCAT('03i1vnn37b', SHA2('1234', 224)), 1,0),
    ("Will", "Smith", "25 Boxwood Alley, Croydon, SA", "0478922547", "willsmith@domain.com.au", CONCAT('03i1vnn37b', SHA2('1234', 224)), 1,0),
    ("Bob", "Marley", "1 Kent Lane, Bowden, SA", "0487123856", "bobmarley@domain.com.au", CONCAT('03i1vnn37b', SHA2('1234', 224)), 1,0),
    ("Johnny", "Utah", "23 Asphalt Road, Grange, SA", "0487923121", "johnnyutah@domain.com.au", CONCAT('03i1vnn37b', SHA2('1234', 224)), 1,0),
    ("Ted", "Logan", "19 Wonky Street, Findon, SA", "0487923121", "tedlogan@domain.com.au", CONCAT('03i1vnn37b', SHA2('1234', 224)), 1,0)
;

INSERT INTO Venues (
    VenueName,
    CheckInCode,
    Address,
    Latitude,
    Longitude,
    OwnerID
)
VALUES
    ("John's Burgers", "154658351", "18 Burger Street, West Lakes, SA", -34.8746, 138.4904, 2),
    ("John's Pizza", "643756745", "28 Pizza Plaza, Glenelg", -34.9804, 138.5131, 2),
    ("John's Fish & Chips", "089679324", "3 Seaside Road, Henley Beach, SA", -34.9137, 138.4968, 2),
    ("McDonald's Fulham Gardens", "785878432", "465 Tapleys Hill Road, Fulham Gardens, SA", -34.9141595, 138.5133267, 3)
;

INSERT INTO CheckIns (
    VenueID,
    UserID,
    CheckInTime
)
VALUES
    (3, 1, CURRENT_TIMESTAMP()),
    (2, 1, '2020-01-18 08:17:36'),
    (1, 1, '2021-08-06 18:42:22'),
    (4, 1, '2021-02-01 04:27:45'),
    (1, 2, '2020-09-16 07:40:32'),
    (3, 2, '2020-08-06 13:23:46'),
    (2, 2, '2020-02-06 00:03:56'),
    (1, 2, '2020-12-20 09:52:43'),
    (4, 3, '2021-06-09 07:31:43'),
    (4, 3, '2021-06-10 07:29:20'),
    (4, 3, '2021-06-11 07:30:59'),
    (4, 3, '2021-06-12 07:26:36'),
    (4, 3, '2021-06-13 07:29:54'),
    (4, 3, '2021-06-14 07:31:40'),
    (4, 3, '2021-06-15 07:25:56'),
    (4, 3, '2021-06-16 07:30:00'),
    (4, 3, '2021-06-17 07:31:20'),
    (4, 3, '2021-06-18 07:31:10'),
    (4, 5, '2021-05-05 14:52:09'),
    (4, 6, '2020-04-05 10:21:59')
;

INSERT INTO HotSpots (
    VenueID,
    ConfirmedCases,
    Created,
    Expires,
    Description
)
VALUES
    (1, 15, '2021-06-12 08:30:00', '2021-06-26', 'An infected individual visited this business on 11/05/2021.'),
    (3, 8, '2021-06-12 08:30:00', '2021-06-26', 'An infected individual visited this business on 11/05/2021.')
;