SELECT
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
ON HotSpots.VenueID = Venues.VenueID;

-- for searching
SELECT
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
WHERE Venues.VenueName LIKE ? OR Venues.Address LIKE ?;