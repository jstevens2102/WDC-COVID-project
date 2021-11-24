-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: covid_tracking_db
-- ------------------------------------------------------
-- Server version	8.0.19-0ubuntu5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `covid_tracking_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `covid_tracking_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `covid_tracking_db`;

--
-- Table structure for table `CheckIns`
--

DROP TABLE IF EXISTS `CheckIns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CheckIns` (
  `CheckInID` int NOT NULL AUTO_INCREMENT,
  `VenueID` int NOT NULL,
  `UserID` int NOT NULL,
  `CheckInTime` datetime NOT NULL,
  PRIMARY KEY (`CheckInID`),
  KEY `CheckIns_fk0` (`VenueID`),
  KEY `CheckIns_fk1` (`UserID`),
  CONSTRAINT `CheckIns_fk0` FOREIGN KEY (`VenueID`) REFERENCES `Venues` (`VenueID`),
  CONSTRAINT `CheckIns_fk1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CheckIns`
--

LOCK TABLES `CheckIns` WRITE;
/*!40000 ALTER TABLE `CheckIns` DISABLE KEYS */;
/*!40000 ALTER TABLE `CheckIns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `HotSpots`
--

DROP TABLE IF EXISTS `HotSpots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `HotSpots` (
  `HotSpotID` int NOT NULL AUTO_INCREMENT,
  `VenueID` int NOT NULL,
  `ConfirmedCases` int NOT NULL,
  `Created` datetime NOT NULL,
  `Expires` date NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`HotSpotID`),
  KEY `HotSpots_fk0` (`VenueID`),
  CONSTRAINT `HotSpots_fk0` FOREIGN KEY (`VenueID`) REFERENCES `Venues` (`VenueID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HotSpots`
--

LOCK TABLES `HotSpots` WRITE;
/*!40000 ALTER TABLE `HotSpots` DISABLE KEYS */;
/*!40000 ALTER TABLE `HotSpots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PermissionLevels`
--

DROP TABLE IF EXISTS `PermissionLevels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PermissionLevels` (
  `PermissionLevelID` int NOT NULL AUTO_INCREMENT,
  `PermissionLevelName` varchar(255) NOT NULL,
  PRIMARY KEY (`PermissionLevelID`),
  UNIQUE KEY `PermissionLevelName` (`PermissionLevelName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PermissionLevels`
--

LOCK TABLES `PermissionLevels` WRITE;
/*!40000 ALTER TABLE `PermissionLevels` DISABLE KEYS */;
/*!40000 ALTER TABLE `PermissionLevels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `FirstName` char(1) NOT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `UserAddress` varchar(255) NOT NULL,
  `ContactNumber` varchar(255) DEFAULT NULL,
  `EmailAddress` varchar(255) DEFAULT NULL,
  `PermissionLevelID` int NOT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserID` (`UserID`),
  KEY `Users_fk0` (`PermissionLevelID`),
  CONSTRAINT `Users_fk0` FOREIGN KEY (`PermissionLevelID`) REFERENCES `PermissionLevels` (`PermissionLevelID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Venues`
--

DROP TABLE IF EXISTS `Venues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Venues` (
  `VenueID` int NOT NULL AUTO_INCREMENT,
  `CheckInCode` varchar(255) DEFAULT NULL,
  `Address` varchar(255) NOT NULL,
  `Latitude` float DEFAULT NULL,
  `Longitude` float DEFAULT NULL,
  `OwnerID` int NOT NULL,
  PRIMARY KEY (`VenueID`),
  KEY `Venues_fk0` (`OwnerID`),
  CONSTRAINT `Venues_fk0` FOREIGN KEY (`OwnerID`) REFERENCES `Users` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Venues`
--

LOCK TABLES `Venues` WRITE;
/*!40000 ALTER TABLE `Venues` DISABLE KEYS */;
/*!40000 ALTER TABLE `Venues` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-05  4:42:43
