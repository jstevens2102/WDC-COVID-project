USE covid_tracking_db;
SELECT
	CONCAT(FirstName, " ", LastName) AS FullName,
	CheckInTime
FROM CheckIns
INNER JOIN Users ON CheckIns.UserID = Users.UserID
WHERE VenueID = ?
ORDER BY CheckInTime DESC
LIMIT 50;
