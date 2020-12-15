-- MySQL dump 10.13  Distrib 8.0.21, for macos10.15 (x86_64)
--
-- Host: localhost    Database: database_deve_gp
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `username` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int NOT NULL,
  `PostId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (12,'Albon par contre doit vraiment partie de chez RedBull','Jean-pierre','2020-11-06 10:25:21','2020-11-06 10:25:21',7,3),(16,'Très content pour Sergio, en espérant qui puisse trouver un siège pour 2021 !','Samuel','2020-12-07 14:48:44','2020-12-07 14:48:44',3,16),(71,'fsfesf','Samuel','2020-12-15 13:20:03','2020-12-15 13:20:03',3,46);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (3,'Max est meilleur voici la preuve','Je préfère quand même Max mais Lewis reste le roi :)',NULL,3,'2020-11-04 15:51:08','2020-11-04 15:51:08'),(4,'BLABLABLABLABLABLABLABLABLABLABLABLABLABLABLABLABLABLA','BLABLABLABLABLABLABLABLABLABLABLABLABLABLABLABLABLABLA',NULL,8,'2020-11-12 10:45:59','2020-11-12 10:45:59'),(5,'Lance Stroll','Aenean placerat. In vulputate urna eu arcu. Aliquam erat volutpat. Suspendisse potenti. Morbi mattis felis at nunc. Duis viverra diam non justo. In nisl. Nullam sit amet magna in magna gravida vehicula. Mauris tincidunt sem sed arcu. Nunc posuere.',NULL,8,'2020-11-12 11:18:14','2020-11-12 11:18:14'),(6,'Lewis','Belle course de lewis, je n\'aurai jamais crus qu\'il finirait premier aujourd\'hui! Surtout avec ces conditions météorologie!',NULL,3,'2020-11-16 11:18:39','2020-11-16 11:18:39'),(12,'Bonjour','Russel vraiment pas de bol! Qui a vu la course ce dimanche ?????',NULL,3,'2020-12-07 11:04:23','2020-12-15 13:08:45'),(16,'Sergio','Trés content pour Sergio en espérant qu\'il trouve un siège pour 2021',NULL,5,'2020-12-07 11:38:06','2020-12-07 11:38:06'),(46,'Montagne du sud','La jolie montagne du sud ouest mon ami','http://localhost:3030/images/test21608032675658.jpg',3,'2020-12-15 11:44:35','2020-12-15 13:10:52'),(48,'bonsoir','bonsoir',NULL,3,'2020-12-15 13:21:28','2020-12-15 13:21:48');
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20201104094719-create-user.js'),('20201104094929-create-post.js'),('20201104100634-create-comment.js'),('20201104151226-create-comment.js'),('20201104154702-create-comment.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'admin','admin@gmail.com','$2b$10$xjXFFjZnvzLzsnWXUj33jOXu6yV3Fz9PM7N3zhY5MuWxrx46ndH52',NULL,NULL,1,'2020-11-03 11:00:00','2020-11-03 11:10:00'),(3,'Samuel','test10@gmail.com','$2b$10$61zroAmZyBdzlvDxBK6sxOBTbjGVhsJqQIU50FsINMftTJ59dN56u','http://localhost:3030/images/pngtree-business-user-profile-vector-png-image_48305191607352657949.jpg','Bonjour bonjour bonjour bonjour',0,'2020-11-04 10:29:55','2020-12-07 14:50:57'),(5,'Pierrot','test11@gmail.com','$2b$10$WeeQScwSQFt9CnREhUF21.gAKEtty5dpv6KIs3MccRJ8S36WbXQUG','http://localhost:3030/images/Marine1606816281774.jpg',NULL,0,'2020-11-04 13:02:23','2020-12-02 13:28:08'),(7,'Jean-pierre','test20@gmail.com','$2b$10$wC6MBYtZDt0wxzHMSd8kvuFdkvtO3kJD4IWfmH1eVD.tBwOmaIzty',NULL,'Bonjour moi c\'est Jean Pierre de l\'étage informatique niveau 4 bâtiment A ',0,'2020-11-06 09:35:11','2020-11-06 09:46:01'),(8,'Johnathan','test21@gmail.com','$2b$10$cCM9kUA6bap565RU9EONROECfnO/6GY6TM6cog3bpINB/Yjf8Abx6','http://localhost:3030/images/test.jps1606143812164.jpg','ggddrsrrsffsfs',0,'2020-11-10 10:39:52','2020-11-24 10:08:04'),(9,'Michel','test22@gmail.com','$2b$10$iP5b4nOYcPHPtQgOGxKUJuCtxX3EoqxBn9Tz55T5HBlRIZWEWPuZu',NULL,NULL,0,'2020-11-10 12:01:30','2020-11-10 12:01:30');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-15 15:11:31