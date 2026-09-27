CREATE DATABASE  IF NOT EXISTS `uni_info` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `uni_info`;
-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: uni_info
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `admission_document`
--

DROP TABLE IF EXISTS `admission_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admission_document` (
  `document_id` int NOT NULL AUTO_INCREMENT,
  `admission_id` int NOT NULL,
  `document_name` varchar(150) NOT NULL,
  `description` text,
  `required` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`document_id`),
  KEY `admission_id` (`admission_id`),
  CONSTRAINT `admission_document_ibfk_1` FOREIGN KEY (`admission_id`) REFERENCES `admission_info` (`admission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admission_document`
--

LOCK TABLES `admission_document` WRITE;
/*!40000 ALTER TABLE `admission_document` DISABLE KEYS */;
INSERT INTO `admission_document` VALUES (1,1,'National ID or Passport','Valid identification document.',1),(2,1,'Secondary School Certificate','Official secondary school completion certificate.',1),(3,1,'Recent Passport Photo','Recent applicant photograph.',1),(4,1,'Application Form','Completed university admission application form.',1),(5,2,'National ID or Passport','Valid identification document.',1),(6,2,'University Transcript','Official academic transcript from the previous university.',1),(7,2,'Transfer Application Form','Completed transfer admission application form.',1),(8,2,'Recent Passport Photo','Recent applicant photograph.',1);
/*!40000 ALTER TABLE `admission_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admission_info`
--

DROP TABLE IF EXISTS `admission_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admission_info` (
  `admission_id` int NOT NULL AUTO_INCREMENT,
  `admission_type` varchar(100) NOT NULL,
  `eligibility_requirements` text,
  `application_procedure` text,
  `application_start_date` date DEFAULT NULL,
  `application_deadline` date DEFAULT NULL,
  `application_fee` decimal(10,2) DEFAULT NULL,
  `application_location` varchar(255) DEFAULT NULL,
  `online_application_link` varchar(500) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `contact_email` varchar(150) DEFAULT NULL,
  `important_notes` text,
  PRIMARY KEY (`admission_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admission_info`
--

LOCK TABLES `admission_info` WRITE;
/*!40000 ALTER TABLE `admission_info` DISABLE KEYS */;
INSERT INTO `admission_info` VALUES (1,'Undergraduate Admission','Applicants must meet the university admission requirements and have the required secondary school qualifications.','Complete the application form, submit the required documents, pay the application fee, and follow the admission instructions.','2026-08-01','2026-09-15',500.00,'AAU Admissions Office','https://example.aau.edu.et/apply','011-123-4001','admissions@demo.aau.edu.et','Applicants should submit all required documents before the application deadline.'),(2,'Transfer Admission','Applicants must have completed eligible university-level coursework and meet the transfer admission requirements.','Submit the transfer application together with academic transcripts and other required documents.','2026-08-01','2026-09-15',500.00,'AAU Admissions Office','https://example.aau.edu.et/transfer','011-123-4001','admissions@demo.aau.edu.et','Transfer credit evaluation is subject to university requirements.');
/*!40000 ALTER TABLE `admission_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admission_program`
--

DROP TABLE IF EXISTS `admission_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admission_program` (
  `admission_program_id` int NOT NULL AUTO_INCREMENT,
  `admission_id` int NOT NULL,
  `program_id` int NOT NULL,
  PRIMARY KEY (`admission_program_id`),
  KEY `admission_id` (`admission_id`),
  KEY `program_id` (`program_id`),
  CONSTRAINT `admission_program_ibfk_1` FOREIGN KEY (`admission_id`) REFERENCES `admission_info` (`admission_id`),
  CONSTRAINT `admission_program_ibfk_2` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admission_program`
--

LOCK TABLES `admission_program` WRITE;
/*!40000 ALTER TABLE `admission_program` DISABLE KEYS */;
INSERT INTO `admission_program` VALUES (1,1,1),(2,1,2),(3,2,1),(4,2,2);
/*!40000 ALTER TABLE `admission_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcement` (
  `announcement_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `published_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `expiry_date` date DEFAULT NULL,
  `target_students` varchar(150) DEFAULT NULL,
  `important` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`announcement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
INSERT INTO `announcement` VALUES (1,'Semester Registration Reminder','Students are reminded to complete their semester registration before the registration deadline.','2026-09-18 09:00:00','2026-09-30','All Students',1),(2,'Library Schedule Update','The Engineering Library will operate from 08:00 to 20:00 during the current semester.','2026-09-20 10:00:00','2026-12-31','All Students',0),(3,'Software Engineering Workshop Registration','Registration is open for the upcoming Software Engineering Workshop.','2026-09-25 09:00:00','2026-10-03','Software Engineering Students',0);
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `library_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(200) DEFAULT NULL,
  `isbn` varchar(50) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `shelf_location` varchar(100) DEFAULT NULL,
  `availability_status` varchar(50) DEFAULT NULL,
  `number_of_copies` int DEFAULT '1',
  PRIMARY KEY (`book_id`),
  KEY `library_id` (`library_id`),
  CONSTRAINT `book_ibfk_1` FOREIGN KEY (`library_id`) REFERENCES `library` (`library_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,1,'Introduction to Software Engineering','Ian Sommerville','9780133943030','Software Engineering','SE-A01','AVAILABLE',5),(2,1,'Computer Networks','Andrew S. Tanenbaum','9780132126953','Computer Networking','NET-B02','AVAILABLE',4),(3,1,'Web Development Fundamentals','Demo Author','9780000000001','Web Development','WEB-C01','AVAILABLE',3),(4,2,'General Biology','Demo Biology Author','9780000000002','Biology','BIO-A01','AVAILABLE',5),(5,2,'General Chemistry','Demo Chemistry Author','9780000000003','Chemistry','CHEM-B01','AVAILABLE',4),(6,2,'Cell Biology','Demo Cell Biology Author','9780000000004','Cell Biology','BIO-C02','AVAILABLE',3);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `building`
--

DROP TABLE IF EXISTS `building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `building` (
  `building_id` int NOT NULL AUTO_INCREMENT,
  `campus_id` int NOT NULL,
  `building_name` varchar(100) NOT NULL,
  `building_number` varchar(50) DEFAULT NULL,
  `number_of_floors` int DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`building_id`),
  KEY `campus_id` (`campus_id`),
  CONSTRAINT `building_ibfk_1` FOREIGN KEY (`campus_id`) REFERENCES `campus` (`campus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `building`
--

LOCK TABLES `building` WRITE;
/*!40000 ALTER TABLE `building` DISABLE KEYS */;
INSERT INTO `building` VALUES (1,1,'main building','ENG-01',4,'Engineering teaching and laboratory building.'),(2,1,'samsung builing','ENG-02',3,'software and bio_medical Engineering teaching and laboratory building.'),(3,2,'Science Block','SCI-01',3,'Natural sciences teaching and laboratory building.');
/*!40000 ALTER TABLE `building` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campus`
--

DROP TABLE IF EXISTS `campus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campus` (
  `campus_id` int NOT NULL AUTO_INCREMENT,
  `university_id` int NOT NULL,
  `campus_name` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`campus_id`),
  KEY `university_id` (`university_id`),
  CONSTRAINT `campus_ibfk_1` FOREIGN KEY (`university_id`) REFERENCES `university` (`university_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campus`
--

LOCK TABLES `campus` WRITE;
/*!40000 ALTER TABLE `campus` DISABLE KEYS */;
INSERT INTO `campus` VALUES (1,1,'CTBE','Addis Ababa, Ethiopia','Demo campus for engineering-related programs.'),(2,1,'CNCS','Addis Ababa, Ethiopia','Campus for natural and computational sciences.');
/*!40000 ALTER TABLE `campus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `program_id` int DEFAULT NULL,
  `course_code` varchar(50) NOT NULL,
  `course_name` varchar(150) NOT NULL,
  `credit_hours` int DEFAULT NULL,
  `description` text,
  `prerequisites` text,
  PRIMARY KEY (`course_id`),
  KEY `department_id` (`department_id`),
  KEY `program_id` (`program_id`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `course_ibfk_2` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (1,1,1,'SE101','fundamental of Software Engineering',3,'Introduction to software engineering principles, software development processes, and software project management.',NULL),(2,1,1,'SE102','Computer Networking',3,'Introduction to computer networks, networking concepts, protocols, and network communication.',NULL),(3,1,1,'SE103','Web Development',3,'Introduction to web development using HTML, CSS, JavaScript, and basic web technologies.',NULL),(4,2,2,'BIO101','General Biology',3,'Introduction to fundamental concepts of biology, including cells, organisms, genetics, and biological processes.',NULL),(5,2,2,'BIO102','General Chemistry',3,'Introduction to fundamental concepts of chemistry relevant to biological and natural sciences.',NULL),(6,2,2,'BIO103','Cell Biology',3,'Study of cell structure, function, cellular processes, and biological organization.',NULL);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_offering`
--

DROP TABLE IF EXISTS `course_offering`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_offering` (
  `offering_id` int NOT NULL AUTO_INCREMENT,
  `course_id` int NOT NULL,
  `academic_year` varchar(20) NOT NULL,
  `semester` varchar(50) NOT NULL,
  `year_level` int DEFAULT NULL,
  PRIMARY KEY (`offering_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `course_offering_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_offering`
--

LOCK TABLES `course_offering` WRITE;
/*!40000 ALTER TABLE `course_offering` DISABLE KEYS */;
INSERT INTO `course_offering` VALUES (1,1,'2026/2027','Semester 2',2),(2,2,'2026/2027','Semester 2',2),(3,3,'2026/2027','Semester 1',3);
/*!40000 ALTER TABLE `course_offering` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_schedule`
--

DROP TABLE IF EXISTS `course_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_schedule` (
  `schedule_id` int NOT NULL AUTO_INCREMENT,
  `section_id` int NOT NULL,
  `day_of_week` varchar(20) NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `room_id` int DEFAULT NULL,
  PRIMARY KEY (`schedule_id`),
  KEY `section_id` (`section_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `course_schedule_ibfk_1` FOREIGN KEY (`section_id`) REFERENCES `course_section` (`section_id`),
  CONSTRAINT `course_schedule_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_schedule`
--

LOCK TABLES `course_schedule` WRITE;
/*!40000 ALTER TABLE `course_schedule` DISABLE KEYS */;
INSERT INTO `course_schedule` VALUES (1,1,'Monday','08:00:00','10:00:00',1),(2,1,'Wednesday','08:00:00','10:00:00',1),(3,2,'Tuesday','10:00:00','12:00:00',2),(4,2,'Thursday','10:00:00','12:00:00',2),(5,3,'Monday','14:00:00','16:00:00',3),(6,3,'Friday','14:00:00','16:00:00',3);
/*!40000 ALTER TABLE `course_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_section`
--

DROP TABLE IF EXISTS `course_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_section` (
  `section_id` int NOT NULL AUTO_INCREMENT,
  `offering_id` int NOT NULL,
  `section_name` varchar(50) DEFAULT NULL,
  `instructor_id` int NOT NULL,
  PRIMARY KEY (`section_id`),
  KEY `offering_id` (`offering_id`),
  KEY `instructor_id` (`instructor_id`),
  CONSTRAINT `course_section_ibfk_1` FOREIGN KEY (`offering_id`) REFERENCES `course_offering` (`offering_id`),
  CONSTRAINT `course_section_ibfk_2` FOREIGN KEY (`instructor_id`) REFERENCES `instructor` (`instructor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_section`
--

LOCK TABLES `course_section` WRITE;
/*!40000 ALTER TABLE `course_section` DISABLE KEYS */;
INSERT INTO `course_section` VALUES (1,1,'Section A',1),(2,2,'Section A',2),(3,3,'Section A',3);
/*!40000 ALTER TABLE `course_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(150) NOT NULL,
  `description` text,
  `university_id` int DEFAULT NULL,
  `campus_id` int DEFAULT NULL,
  `head_name` varchar(150) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `contact_email` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`department_id`),
  KEY `university_id` (`university_id`),
  KEY `campus_id` (`campus_id`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`university_id`) REFERENCES `university` (`university_id`),
  CONSTRAINT `department_ibfk_2` FOREIGN KEY (`campus_id`) REFERENCES `campus` (`campus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Engineering','Department responsible for engineering education, research, and related academic activities.',1,1,'Dr. Abebe Kebede','011-123-4501','engineering@aau.edu.et'),(2,'Natural Sciences','Department responsible for natural and computational science education and research.',1,2,'Dr. Hana Tesfaye','011-123-4502','sciences@aau.edu.et');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_location`
--

DROP TABLE IF EXISTS `department_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_location` (
  `department_location_id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `building_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `purpose` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`department_location_id`),
  KEY `department_id` (`department_id`),
  KEY `building_id` (`building_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `department_location_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `department_location_ibfk_2` FOREIGN KEY (`building_id`) REFERENCES `building` (`building_id`),
  CONSTRAINT `department_location_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_location`
--

LOCK TABLES `department_location` WRITE;
/*!40000 ALTER TABLE `department_location` DISABLE KEYS */;
INSERT INTO `department_location` VALUES (1,1,1,1,'Main Department Office'),(2,1,1,2,'Engineering Laboratory');
/*!40000 ALTER TABLE `department_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dormitory`
--

DROP TABLE IF EXISTS `dormitory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dormitory` (
  `dormitory_id` int NOT NULL AUTO_INCREMENT,
  `dormitory_name` varchar(150) NOT NULL,
  `campus_id` int DEFAULT NULL,
  `building_id` int DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `room_capacity` int DEFAULT NULL,
  `eligibility` text,
  `registration_procedure` text,
  `required_documents` text,
  `application_start_date` date DEFAULT NULL,
  `application_deadline` date DEFAULT NULL,
  `fee` decimal(10,2) DEFAULT NULL,
  `rules` text,
  `contact_phone` varchar(50) DEFAULT NULL,
  `contact_email` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`dormitory_id`),
  KEY `campus_id` (`campus_id`),
  KEY `building_id` (`building_id`),
  CONSTRAINT `dormitory_ibfk_1` FOREIGN KEY (`campus_id`) REFERENCES `campus` (`campus_id`),
  CONSTRAINT `dormitory_ibfk_2` FOREIGN KEY (`building_id`) REFERENCES `building` (`building_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dormitory`
--

LOCK TABLES `dormitory` WRITE;
/*!40000 ALTER TABLE `dormitory` DISABLE KEYS */;
INSERT INTO `dormitory` VALUES (1,'Engineering Student Dormitory',1,2,200,4,'Full-time students enrolled at the university who meet the dormitory eligibility requirements.','Complete the dormitory application, submit the required documents, and wait for room allocation.','Student ID, admission or registration confirmation, and valid identification.','2026-09-01','2026-09-15',1500.00,'Residents must maintain cleanliness, respect quiet hours, protect university property, and follow dormitory regulations.','011-123-4301','engineering.dorm@demo.aau.edu.et'),(2,'Natural Sciences Student Dormitory',2,3,180,4,'Full-time students enrolled in natural science programs who meet the dormitory eligibility requirements.','Complete the dormitory application, submit the required documents, and wait for room allocation.','Student ID, admission or registration confirmation, and valid identification.','2026-09-01','2026-09-15',1500.00,'Residents must maintain cleanliness, respect quiet hours, protect university property, and follow dormitory regulations.','011-123-4302','science.dorm@demo.aau.edu.et');
/*!40000 ALTER TABLE `dormitory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dormitory_facility`
--

DROP TABLE IF EXISTS `dormitory_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dormitory_facility` (
  `facility_id` int NOT NULL AUTO_INCREMENT,
  `dormitory_id` int NOT NULL,
  `facility_name` varchar(150) NOT NULL,
  `description` text,
  PRIMARY KEY (`facility_id`),
  KEY `dormitory_id` (`dormitory_id`),
  CONSTRAINT `dormitory_facility_ibfk_1` FOREIGN KEY (`dormitory_id`) REFERENCES `dormitory` (`dormitory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dormitory_facility`
--

LOCK TABLES `dormitory_facility` WRITE;
/*!40000 ALTER TABLE `dormitory_facility` DISABLE KEYS */;
INSERT INTO `dormitory_facility` VALUES (1,1,'Study Room','Dedicated quiet space for students to study.'),(2,1,'Common Room','Shared area for student activities and relaxation.'),(3,1,'Laundry Area','Shared laundry facilities for residents.'),(4,1,'Internet Access','Internet access available for residents.'),(5,1,'Dining Area','Shared dining area for students.'),(6,2,'Study Room','Dedicated quiet space for students to study.'),(7,2,'Common Room','Shared area for student activities and relaxation.'),(8,2,'Laundry Area','Shared laundry facilities for residents.'),(9,2,'Internet Access','Internet access available for residents.'),(10,2,'Dining Area','Shared dining area for students.');
/*!40000 ALTER TABLE `dormitory_facility` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` text,
  `event_date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `campus_id` int DEFAULT NULL,
  `building_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `organizer` varchar(150) DEFAULT NULL,
  `target_students` varchar(150) DEFAULT NULL,
  `registration_required` tinyint(1) DEFAULT '0',
  `registration_deadline` date DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `contact_email` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `campus_id` (`campus_id`),
  KEY `building_id` (`building_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`campus_id`) REFERENCES `campus` (`campus_id`),
  CONSTRAINT `event_ibfk_2` FOREIGN KEY (`building_id`) REFERENCES `building` (`building_id`),
  CONSTRAINT `event_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'Software Engineering Workshop','A practical workshop introducing software development practices and project organization.','2026-10-05','09:00:00','12:00:00',1,1,1,'Department of Software Engineering','Software Engineering Students',1,'2026-10-03','011-123-4501','engineering@demo.aau.edu.et'),(2,'Web Development Seminar','A seminar covering modern web development concepts and technologies.','2026-10-12','14:00:00','16:00:00',1,1,2,'Department of Software Engineering','Software Engineering Students',0,NULL,'011-123-4501','engineering@demo.aau.edu.et'),(3,'Biology Research Seminar','A seminar introducing students to biological research methods and academic research.','2026-10-08','10:00:00','12:00:00',2,3,3,'Department of Natural Sciences','Biology Students',1,'2026-10-06','011-123-4502','sciences@demo.aau.edu.et');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `faq_id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(500) NOT NULL,
  `answer` text NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `campus_id` int DEFAULT NULL,
  `important` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`faq_id`),
  KEY `department_id` (`department_id`),
  KEY `campus_id` (`campus_id`),
  CONSTRAINT `faq_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `faq_ibfk_2` FOREIGN KEY (`campus_id`) REFERENCES `campus` (`campus_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (1,'How can I register for courses?','Students should complete the registration process through the university registration system during the registration period.','Registration',NULL,NULL,1),(2,'Where is the Engineering Library?','The Engineering Library is located on the Engineering campus in the Main Building, Room E101.','Library',1,1,0),(3,'What documents are required for admission?','Applicants should submit the documents listed under the applicable admission type, including identification and required academic documents.','Admission',NULL,NULL,1),(4,'Where can I get academic advising?','Academic advising is available through the Academic Advising student service.','Student Services',1,1,0),(5,'When is the Software Engineering workshop?','The Software Engineering Workshop is scheduled for October 5, 2026, from 9:00 AM to 12:00 PM.','Events',1,1,0),(6,'What courses are offered in Software Engineering?','The current demo course offerings include Software Engineering and Computer Networking in Semester 2, and Web Development in Semester 1.','Courses',1,1,0);
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructor`
--

DROP TABLE IF EXISTS `instructor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructor` (
  `instructor_id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`instructor_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `instructor_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructor`
--

LOCK TABLES `instructor` WRITE;
/*!40000 ALTER TABLE `instructor` DISABLE KEYS */;
INSERT INTO `instructor` VALUES (1,1,'Daniel','Bekele','daniel.bekele@demo.aau.edu.et','0911000001'),(2,1,'Sara','Tesfaye','sara.tesfaye@demo.aau.edu.et','0911000002'),(3,1,'Michael','Kebede','michael.kebede@demo.aau.edu.et','0911000003'),(4,2,'Hana','Alemu','hana.alemu@demo.aau.edu.et','0911000004'),(5,2,'Samuel','Girma','samuel.girma@demo.aau.edu.et','0911000005'),(6,2,'Liya','Mekonnen','liya.mekonnen@demo.aau.edu.et','0911000006');
/*!40000 ALTER TABLE `instructor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `library`
--

DROP TABLE IF EXISTS `library`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library` (
  `library_id` int NOT NULL AUTO_INCREMENT,
  `library_name` varchar(150) NOT NULL,
  `campus_id` int DEFAULT NULL,
  `building_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `opening_time` time DEFAULT NULL,
  `closing_time` time DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `contact_email` varchar(150) DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`library_id`),
  KEY `campus_id` (`campus_id`),
  KEY `building_id` (`building_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `library_ibfk_1` FOREIGN KEY (`campus_id`) REFERENCES `campus` (`campus_id`),
  CONSTRAINT `library_ibfk_2` FOREIGN KEY (`building_id`) REFERENCES `building` (`building_id`),
  CONSTRAINT `library_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library`
--

LOCK TABLES `library` WRITE;
/*!40000 ALTER TABLE `library` DISABLE KEYS */;
INSERT INTO `library` VALUES (1,'Engineering Library',1,1,1,'08:00:00','20:00:00','011-123-4201','engineering.library@demo.aau.edu.et','Library serving Software Engineering and other engineering students.'),(2,'Natural Sciences Library',2,3,3,'08:00:00','18:00:00','011-123-4202','science.library@demo.aau.edu.et','Library serving Biology and other natural science students.');
/*!40000 ALTER TABLE `library` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `library_service`
--

DROP TABLE IF EXISTS `library_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `library_service` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `library_id` int NOT NULL,
  `service_name` varchar(150) NOT NULL,
  `description` text,
  `rules` text,
  PRIMARY KEY (`service_id`),
  KEY `library_id` (`library_id`),
  CONSTRAINT `library_service_ibfk_1` FOREIGN KEY (`library_id`) REFERENCES `library` (`library_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `library_service`
--

LOCK TABLES `library_service` WRITE;
/*!40000 ALTER TABLE `library_service` DISABLE KEYS */;
INSERT INTO `library_service` VALUES (1,1,'Book Borrowing','Students can borrow available books for academic study.','Students must present valid identification and return books by the due date.'),(2,1,'Digital Library Access','Students can access electronic learning and research resources.','Access is limited to registered university users.'),(3,1,'Study Space','Quiet study spaces are available for students.','Students must maintain a quiet environment.'),(4,2,'Book Borrowing','Students can borrow biology and natural science books.','Students must present valid identification and return books by the due date.'),(5,2,'Reference Service','Library staff help students locate books and academic resources.','Students should follow library staff instructions.'),(6,2,'Study Space','Quiet study spaces are available for students.','Students must maintain a quiet environment.');
/*!40000 ALTER TABLE `library_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `program`
--

DROP TABLE IF EXISTS `program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `program` (
  `program_id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `program_name` varchar(150) NOT NULL,
  `program_code` varchar(50) DEFAULT NULL,
  `degree_type` varchar(100) DEFAULT NULL,
  `duration_years` decimal(3,1) DEFAULT NULL,
  `required_credits` int DEFAULT NULL,
  `description` text,
  `graduation_requirements` text,
  `grading_system` text,
  `failure_policy` text,
  `retake_policy` text,
  `internship_required` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`program_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `program_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `program`
--

LOCK TABLES `program` WRITE;
/*!40000 ALTER TABLE `program` DISABLE KEYS */;
INSERT INTO `program` VALUES (1,1,'software Engineering','BSC-SE','Bachelor of Science',5.0,150,'Sample engineering degree program.',NULL,NULL,NULL,NULL,1),(2,2,'Biology','BSC-BIO','Bachelor of Science',4.0,120,'Sample natural sciences degree program.',NULL,NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration_info`
--

DROP TABLE IF EXISTS `registration_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration_info` (
  `registration_id` int NOT NULL AUTO_INCREMENT,
  `registration_type` varchar(100) NOT NULL,
  `registration_procedure` text,
  `requirements` text,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `online_registration_link` varchar(500) DEFAULT NULL,
  `responsible_office` varchar(150) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `contact_email` varchar(150) DEFAULT NULL,
  `fee` decimal(10,2) DEFAULT NULL,
  `important_notes` text,
  PRIMARY KEY (`registration_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration_info`
--

LOCK TABLES `registration_info` WRITE;
/*!40000 ALTER TABLE `registration_info` DISABLE KEYS */;
INSERT INTO `registration_info` VALUES (1,'New Student Registration','Students complete the registration form, submit the required documents, pay the registration fee, and complete course registration.','Admission confirmation, valid identification, required academic documents, and proof of payment.','2026-09-20','2026-09-30','AAU Registration Office','https://example.aau.edu.et/registration/new','Registrar Office','011-123-4101','registrar@demo.aau.edu.et',300.00,'Students should complete registration before the registration deadline.'),(2,'Continuing Student Registration','Students log in to the registration system, select their courses, confirm their registration, and complete any required payment.','Valid student status, completed previous semester requirements, and clearance where applicable.','2026-09-15','2026-09-25','AAU Registration Office','https://example.aau.edu.et/registration/continuing','Registrar Office','011-123-4101','registrar@demo.aau.edu.et',300.00,'Students should verify their course selections before submitting registration.');
/*!40000 ALTER TABLE `registration_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `building_id` int NOT NULL,
  `room_number` varchar(50) NOT NULL,
  `floor_number` int DEFAULT NULL,
  `room_type` varchar(50) DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `description` text,
  PRIMARY KEY (`room_id`),
  KEY `building_id` (`building_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`building_id`) REFERENCES `building` (`building_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,1,'E101',1,'LECTURE_HALL',60,'Engineering lecture room.'),(2,1,'E102',1,'LABORATORY',30,'Engineering laboratory.'),(3,3,'S101',1,'LECTURE_HALL',60,'Science lecture room.'),(4,3,'S102',1,'LABORATORY',30,'Science laboratory.');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_service`
--

DROP TABLE IF EXISTS `student_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_service` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(150) NOT NULL,
  `description` text,
  `campus_id` int DEFAULT NULL,
  `building_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `opening_time` time DEFAULT NULL,
  `closing_time` time DEFAULT NULL,
  `service_procedure` text,
  `required_documents` text,
  `fee` decimal(10,2) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `contact_email` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`service_id`),
  KEY `campus_id` (`campus_id`),
  KEY `building_id` (`building_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `student_service_ibfk_1` FOREIGN KEY (`campus_id`) REFERENCES `campus` (`campus_id`),
  CONSTRAINT `student_service_ibfk_2` FOREIGN KEY (`building_id`) REFERENCES `building` (`building_id`),
  CONSTRAINT `student_service_ibfk_3` FOREIGN KEY (`room_id`) REFERENCES `room` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_service`
--

LOCK TABLES `student_service` WRITE;
/*!40000 ALTER TABLE `student_service` DISABLE KEYS */;
INSERT INTO `student_service` VALUES (1,'Registrar Service','Provides student registration, academic records, enrollment verification, and related services.',1,1,1,'08:30:00','17:00:00','Submit a service request at the registrar office and provide the required documents.','Student ID and valid identification.',50.00,'011-123-4401','registrar@demo.aau.edu.et'),(2,'Student ID Service','Provides student identification card issuance and replacement services.',1,1,2,'08:30:00','16:30:00','Submit an ID request and provide the required identification documents.','Valid identification and student registration confirmation.',100.00,'011-123-4402','studentid@demo.aau.edu.et'),(3,'Academic Advising','Provides academic guidance and assistance with academic planning.',1,2,2,'09:00:00','16:00:00','Students can visit the advising office or request an appointment.','Student ID and current academic record.',0.00,'011-123-4403','advising@demo.aau.edu.et'),(4,'Student Health Service','Provides basic health consultation and student health support.',2,3,4,'08:00:00','17:00:00','Students register at the health service desk and receive assistance according to their needs.','Student ID.',0.00,'011-123-4404','health@demo.aau.edu.et'),(5,'Student Support Service','Provides general student support and guidance services.',2,3,3,'08:30:00','16:30:00','Visit the student support office and explain the service needed.','Student ID.',0.00,'011-123-4405','support@demo.aau.edu.et');
/*!40000 ALTER TABLE `student_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `university`
--

DROP TABLE IF EXISTS `university`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `university` (
  `university_id` int NOT NULL AUTO_INCREMENT,
  `university_name` varchar(200) NOT NULL,
  `university_code` varchar(50) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text,
  `website` varchar(500) DEFAULT NULL,
  `contact_phone` varchar(50) DEFAULT NULL,
  `contact_email` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`university_id`),
  UNIQUE KEY `university_code` (`university_code`),
  UNIQUE KEY `website` (`website`),
  UNIQUE KEY `contact_phone` (`contact_phone`),
  UNIQUE KEY `contact_email` (`contact_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `university`
--

LOCK TABLES `university` WRITE;
/*!40000 ALTER TABLE `university` DISABLE KEYS */;
INSERT INTO `university` VALUES (1,'Addis Ababa University','AAU','Addis Ababa, Ethiopia','A public university in Ethiopia.','https://www.aau.edu.et',NULL,NULL);
/*!40000 ALTER TABLE `university` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-27 17:28:32
