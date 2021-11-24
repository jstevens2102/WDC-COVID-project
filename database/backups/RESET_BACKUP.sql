-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
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
  UNIQUE KEY `CheckInID` (`CheckInID`),
  KEY `CheckIns_fk0` (`VenueID`),
  KEY `CheckIns_fk1` (`UserID`),
  CONSTRAINT `CheckIns_fk0` FOREIGN KEY (`VenueID`) REFERENCES `Venues` (`VenueID`) ON DELETE CASCADE,
  CONSTRAINT `CheckIns_fk1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CheckIns`
--

LOCK TABLES `CheckIns` WRITE;
/*!40000 ALTER TABLE `CheckIns` DISABLE KEYS */;
INSERT INTO `CheckIns` VALUES (1,3,1,'2021-06-14 07:47:50'),(2,2,1,'2020-01-18 08:17:36'),(3,1,1,'2021-08-06 18:42:22'),(4,4,1,'2021-02-01 04:27:45'),(5,1,2,'2020-09-16 07:40:32'),(6,3,2,'2020-08-06 13:23:46'),(7,2,2,'2020-02-06 00:03:56'),(8,1,2,'2020-12-20 09:52:43'),(9,4,3,'2021-06-09 07:31:43'),(10,4,3,'2021-06-10 07:29:20'),(11,4,3,'2021-06-11 07:30:59'),(12,4,3,'2021-06-12 07:26:36'),(13,4,3,'2021-06-13 07:29:54'),(14,4,3,'2021-06-14 07:31:40'),(15,4,3,'2021-06-15 07:25:56'),(16,4,3,'2021-06-16 07:30:00'),(17,4,3,'2021-06-17 07:31:20'),(18,4,3,'2021-06-18 07:31:10'),(19,4,5,'2021-05-05 14:52:09'),(20,4,6,'2020-04-05 10:21:59');
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
  UNIQUE KEY `HotSpotID` (`HotSpotID`),
  KEY `HotSpots_fk0` (`VenueID`),
  CONSTRAINT `HotSpots_fk0` FOREIGN KEY (`VenueID`) REFERENCES `Venues` (`VenueID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `HotSpots`
--

LOCK TABLES `HotSpots` WRITE;
/*!40000 ALTER TABLE `HotSpots` DISABLE KEYS */;
INSERT INTO `HotSpots` VALUES (1,1,15,'2021-06-12 08:30:00','2021-06-26','An infected individual visited this business on 11/05/2021.'),(2,3,8,'2021-06-12 08:30:00','2021-06-26','An infected individual visited this business on 11/05/2021.');
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
  UNIQUE KEY `PermissionLevelID` (`PermissionLevelID`),
  UNIQUE KEY `PermissionLevelName` (`PermissionLevelName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PermissionLevels`
--

LOCK TABLES `PermissionLevels` WRITE;
/*!40000 ALTER TABLE `PermissionLevels` DISABLE KEYS */;
INSERT INTO `PermissionLevels` VALUES (3,'Administrator'),(1,'User'),(2,'Venue Manager');
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
  `PasswordHash` varchar(255) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `UserAddress` varchar(255) NOT NULL,
  `ContactNumber` varchar(255) DEFAULT NULL,
  `EmailAddress` varchar(255) DEFAULT NULL,
  `PermissionLevelID` int NOT NULL,
  `NotificationStatus` int DEFAULT '0',
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserID` (`UserID`),
  KEY `Users_fk0` (`PermissionLevelID`),
  CONSTRAINT `Users_fk0` FOREIGN KEY (`PermissionLevelID`) REFERENCES `PermissionLevels` (`PermissionLevelID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'03i1vnn37b99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319','Jack','Stevens','39 Some Street, Henley Beach, SA','0412345678','jackstevens@domain.com.au',1,0),(2,'03i1vnn37b99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319','John','Doe','13 Another Place, North Adelaide, SA','0427899241','johndoe@domain.com.au',2,0),(3,'03i1vnn37b99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319','Tom','Cruise','21 Random Terrace, West Beach, SA','0425278411','tomcruise@domain.com.au',3,0),(4,'03i1vnn37b99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319','Keanu','Reeves','4 Wick Street, Albert Park, SA','0413245432','keanureeves@domain.com.au',3,0),(5,'03i1vnn37b99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319','John','Wick','2 Private Street, Salisbury, SA','0424785385','johnwick@domain.com.au',1,0),(6,'03i1vnn37b99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319','Jack','Traven','5 East Terrace, Henley Beach, SA','0432457871','jacktraven@domain.com.au',1,0),(7,'03i1vnn37b99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319','Will','Smith','25 Boxwood Alley, Croydon, SA','0478922547','willsmith@domain.com.au',1,0),(8,'03i1vnn37b99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319','Bob','Marley','1 Kent Lane, Bowden, SA','0487123856','bobmarley@domain.com.au',1,0),(9,'03i1vnn37b99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319','Johnny','Utah','23 Asphalt Road, Grange, SA','0487923121','johnnyutah@domain.com.au',1,0),(10,'03i1vnn37b99fb2f48c6af4761f904fc85f95eb56190e5d40b1f44ec3a9c1fa319','Ted','Logan','19 Wonky Street, Findon, SA','0487923121','tedlogan@domain.com.au',1,0),(11,'03i1vnn37b90a3ed9e32b2aaf4c61c410eb925426119e1a9dc53d4286ade99a809','sam','downes','','downes','test@domain.com',1,0),(12,'03i1vnn37baff3c83c40e2f1ae099a0166e1f27580525a9de6acd995f21717e984','test','1','','','test1',1,0),(13,'03i1vnn37b90a3ed9e32b2aaf4c61c410eb925426119e1a9dc53d4286ade99a809','sa','m','','','test',1,0);
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
  `VenueName` varchar(255) NOT NULL,
  `CheckInCode` varchar(255) DEFAULT NULL,
  `Address` varchar(255) NOT NULL,
  `Latitude` float DEFAULT NULL,
  `Longitude` float DEFAULT NULL,
  `OwnerID` int DEFAULT NULL,
  PRIMARY KEY (`VenueID`),
  UNIQUE KEY `VenueID` (`VenueID`),
  KEY `Venues_fk0` (`OwnerID`),
  CONSTRAINT `Venues_fk0` FOREIGN KEY (`OwnerID`) REFERENCES `Users` (`UserID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Venues`
--

LOCK TABLES `Venues` WRITE;
/*!40000 ALTER TABLE `Venues` DISABLE KEYS */;
INSERT INTO `Venues` VALUES (1,'John\'s Burgers','154658351','18 Burger Street, West Lakes, SA',-34.8746,138.49,2),(2,'John\'s Pizza','643756745','28 Pizza Plaza, Glenelg',-34.9804,138.513,2),(3,'John\'s Fish & Chips','089679324','3 Seaside Road, Henley Beach, SA',-34.9137,138.497,2),(4,'McDonald\'s Fulham Gardens','785878432','465 Tapleys Hill Road, Fulham Gardens, SA',-34.9142,138.513,3);
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

-- Dump completed on 2021-06-14  7:52:25
