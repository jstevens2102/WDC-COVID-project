USE covid_tracking_db;
CREATE TABLE `Users` (
	`UserID` int AUTO_INCREMENT UNIQUE,
	`FirstName` varchar(255) NOT NULL,
	`LastName` varchar(255),
	`UserAddress` varchar(255) NOT NULL,
	`ContactNumber` varchar(255),
	`EmailAddress` varchar(255),
	`PermissionLevelID` int NOT NULL,
	PRIMARY KEY (`UserID`)
);

CREATE TABLE `PermissionLevels` (
	`PermissionLevelID` int AUTO_INCREMENT UNIQUE,
	`PermissionLevelName` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`PermissionLevelID`)
);

CREATE TABLE `Venues` (
	`VenueID` int AUTO_INCREMENT UNIQUE,
	`VenueName` varchar(255) NOT NULL,
	`CheckInCode` varchar(255),
	`Address` varchar(255) NOT NULL,
	`Latitude` FLOAT,
	`Longitude` FLOAT,
	`OwnerID` int,
	PRIMARY KEY (`VenueID`)
);

CREATE TABLE `CheckIns` (
	`CheckInID` int AUTO_INCREMENT UNIQUE,
	`VenueID` int NOT NULL,
	`UserID` int NOT NULL,
	`CheckInTime` DATETIME NOT NULL,
	PRIMARY KEY (`CheckInID`)
);

CREATE TABLE `HotSpots` (
	`HotSpotID` int AUTO_INCREMENT UNIQUE,
	`VenueID` int NOT NULL,
	`ConfirmedCases` int NOT NULL,
	`Created` DATETIME NOT NULL,
	`Expires` DATE NOT NULL,
	`Description` varchar(255),
	PRIMARY KEY (`HotSpotID`)
);

ALTER TABLE `Users` ADD CONSTRAINT `Users_fk0` FOREIGN KEY (`PermissionLevelID`) REFERENCES `PermissionLevels`(`PermissionLevelID`);

ALTER TABLE `Venues` ADD CONSTRAINT `Venues_fk0` FOREIGN KEY (`OwnerID`) REFERENCES `Users`(`UserID`);

ALTER TABLE `CheckIns` ADD CONSTRAINT `CheckIns_fk0` FOREIGN KEY (`VenueID`) REFERENCES `Venues`(`VenueID`);

ALTER TABLE `CheckIns` ADD CONSTRAINT `CheckIns_fk1` FOREIGN KEY (`UserID`) REFERENCES `Users`(`UserID`);

ALTER TABLE `HotSpots` ADD CONSTRAINT `HotSpots_fk0` FOREIGN KEY (`VenueID`) REFERENCES `Venues`(`VenueID`);