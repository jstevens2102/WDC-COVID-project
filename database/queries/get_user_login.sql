SELECT
  Users.UserID,
  Users.EmailAddress,
  Users.PasswordHash,
  Users.PermissionLevelID
FROM Users
WHERE Users.EmailAddress = ? AND Users.PasswordHash = SHA2(?, 224);