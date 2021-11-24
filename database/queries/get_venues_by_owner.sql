USE covid_tracking_db;
SELECT
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
LIMIT 50;