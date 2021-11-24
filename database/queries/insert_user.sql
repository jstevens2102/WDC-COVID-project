INSERT INTO Users (
    FirstName,
    LastName,
    UserAddress,
    ContactNumber,
    EmailAddress,
    PasswordHash,
    PermissionLevelID
)
VALUES
	("Bob", "Marley", "54 Wallaby Way, Clarence Gardens, SA", "0458747741", "bobmarley@domain.com.au", CONCAT('03i1vnn37b', SHA2('1234', 224)), 1);