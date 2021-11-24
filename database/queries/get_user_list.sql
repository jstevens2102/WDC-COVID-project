SELECT
	CONCAT(Users.FirstName, " ", Users.LastName) AS FullName,
	Users.FirstName,
	Users.LastName,
	Users.UserID,
	PermissionLevels.PermissionLevelID,
	PermissionLevels.PermissionLevelName
FROM (Users
JOIN PermissionLevels
ON Users.PermissionLevelID = PermissionLevels.PermissionLevelID)
HAVING FullName LIKE '%jack%'
ORDER BY Users.UserID, Users.LastName, Users.FirstName ASC
LIMIT 50;