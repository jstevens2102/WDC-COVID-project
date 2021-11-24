# Create / Delete Database Tables

## Create Database Tables

Make sure to create a database first, at the moment it's called:

**covid_tracking_db**

```
mysql --host=127.0.0.1 < create_tables.sql
```

### Delete Database Tables

```
mysql --host=127.0.0.1 < drop_tables.sql
```

---

# Database structure:

## Basic summary:

### User object:

- UserID int
	- This is a primary key ^^
- FirstName String
- LastName String
- UserAddress String
- Email String
- ContactNumber String
- PermissionLevelID int
- Access permission level like so:
	```sql
		SELECT
			Users.FirstName,
			Users.LastName,
			... ,
			PermissionLevels.Name AS PermissionLevel
		FROM User
		JOIN PermissionLevels ON User.PermissionLevelID = PermissionLevels.PermissionLevelID
		WHERE Venues.OwnerID = desired user
	```

### Venue object:

- VenueID int
	- This is a primary key ^^
- CheckInCode String
- Name String
- Address String
- Latitude Float
- Longitude Float
- OwnerID int
	- This references the Users Table ^^
	- Access Owner details like so:
	```sql
		SELECT
			Venues.Name AS VenueName,
			Venues.Address,
			...
			Users.FirstName,
			Users.LastName,
			PermissionLevels.Name AS PermissionLevel
		FROM Venues
		JOIN Users ON Venues.OwnerID = Users.UserID
		JOIN PermissionLevels ON User.PermissionLevelID = PermissionLevels.PermissionLevelID
		WHERE Venues.OwnerID = desired user
	```

### Check-in object:

- CheckInID int
	- This is a primary key ^^
- UserID int
	- This references the Users Table ^^
- VenueID int
	- This references the Venues Table ^^
- CheckedIn datetime

### PermissionLevels

- PermissionLevelID int
- Name String
	- Can be any one of:
		- Users
		- Venue Manager
		- Health Official

### HotSpots

- HotSpotID int
	- This is a primary key ^^
- VenueID int
	- This references the Users Table ^^
- ConfirmedCases int
- Created Date
- Expires Date
- Description String
