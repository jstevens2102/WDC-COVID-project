SELECT
    CheckInID,
    Venues.VenueName,
    Venues.Address,
    CheckInTime
FROM CheckIns
JOIN Venues ON CheckIns.VenueID =Venues.VenueID
WHERE CheckIns.UserID = 1
ORDER BY CheckInTime DESC
LIMIT 50;