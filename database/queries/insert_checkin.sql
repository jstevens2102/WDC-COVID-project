INSERT INTO CheckIns (
    VenueID,
    UserID,
    CheckInTime
) VALUES (
    ?, ?, CURRENT_TIMESTAMP()
);