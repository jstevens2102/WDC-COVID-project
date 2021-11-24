SELECT
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
WHERE UserID = 1;