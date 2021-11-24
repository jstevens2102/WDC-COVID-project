SELECT
	Venues.VenueName,
	Venues.VenueID
FROM Venues
WHERE Venues.VenueName LIKE '%burger%'
ORDER BY Venues.VenueID, Venues.VenueName ASC
LIMIT 50;