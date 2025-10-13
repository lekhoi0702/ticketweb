-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: metro.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.4.0

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
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('8gp803md9cgtunui0bi5t8nt5f8jxdd6','.eJxVjDsOwjAQBe_iGlnxZ9cbSnrOYDneDQ6gWIqTCnF3iJQC2jcz76Vi2tYStyZLnFidlVGn321I-SHzDvie5lvVuc7rMg16V_RBm75WluflcP8OSmrlW1v0EIyYJGSC7aUjzCCGMHjvpRfOBhjQIQJ2GWlkIC9uBOfJUrbq_QG1Ljal:1v6kOt:ZISx-Fx3HOwzzLVGJ8IzOFPrYF8PNeaf2ZzlxWsJOoQ','2025-10-23 06:45:19.631140'),('qvvwarl6m98ty8yrr3o3xzn70bv5vekf','.eJxVjDsOwjAQBe_iGlnxZ9cbSnrOYDneDQ6gWIqTCnF3iJQC2jcz76Vi2tYStyZLnFidlVGn321I-SHzDvie5lvVuc7rMg16V_RBm75WluflcP8OSmrlW1v0EIyYJGSC7aUjzCCGMHjvpRfOBhjQIQJ2GWlkIC9uBOfJUrbq_QG1Ljal:1v6fvw:Wuh_MHFI9qw3j8Higi7nrgJLmNeF1LZFdnpjPru7nzM','2025-10-23 01:59:08.569038'),('s120csgtm2dichxjbxhq5zsst3pwd4gp','.eJxVjDsOwjAQBe_iGlnxZ9cbSnrOYDneDQ6gWIqTCnF3iJQC2jcz76Vi2tYStyZLnFidlVGn321I-SHzDvie5lvVuc7rMg16V_RBm75WluflcP8OSmrlW1v0EIyYJGSC7aUjzCCGMHjvpRfOBhjQIQJ2GWlkIC9uBOfJUrbq_QG1Ljal:1v6XdQ:_hXP3PsS3ZYINcU9wOQ63R6PxZ_oGjzEqmS2bwwRhXM','2025-10-22 17:07:28.033370'),('uey8v7da7wrjrw85xw8s60spgr9miwhc','.eJxVjDsOwjAQBe_iGlnxZ9cbSnrOYDneDQ6gWIqTCnF3iJQC2jcz76Vi2tYStyZLnFidlVGn321I-SHzDvie5lvVuc7rMg16V_RBm75WluflcP8OSmrlW1v0EIyYJGSC7aUjzCCGMHjvpRfOBhjQIQJ2GWlkIC9uBOfJUrbq_QG1Ljal:1v6TM0:oOLhFa5hko0KvRKVsSlsIeIGxTnK4HcREFlKeJeT1kY','2025-10-22 12:33:12.692316'),('x5fm4v06mcaiokf8nynmjo2u79qjcura','.eJxVjDsOwjAQBe_iGlnxZ9cbSnrOYDneDQ6gWIqTCnF3iJQC2jcz76Vi2tYStyZLnFidlVGn321I-SHzDvie5lvVuc7rMg16V_RBm75WluflcP8OSmrlW1v0EIyYJGSC7aUjzCCGMHjvpRfOBhjQIQJ2GWlkIC9uBOfJUrbq_QG1Ljal:1v6TM1:tR4H0QJ9cnhhkZ3R0vdOGNXdJJigrVIuBauu_aq6vPU','2025-10-22 12:33:13.717996');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-13 20:33:59
