-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Erstellungszeit: 29. Apr 2024 um 15:06
-- Server-Version: 10.11.4-MariaDB-1:10.11.4+maria~deb11-log
-- PHP-Version: 7.3.33-14+0~20230902.114+debian11~1.gbp764b27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `web177_db2`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Edges`
--

CREATE TABLE `Edges` (
  `source` varchar(255) DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `value` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Edges`
--

INSERT INTO `Edges` (`source`, `target`, `value`) VALUES
('Job', 'Mainau', 1),
('Job', 'ITerfurt', 1),
('Job', 'Mainau', 1),
('Job', 'ITerfurt', 1),
('Job', 'Mainau', 1),
('Job', 'ITerfurt', 1),
('Job', 'Mainau', 1),
('Job', 'ITerfurt', 1),
('Job', 'Mainau', 1),
('Job', 'ITerfurt', 1),
('Job', 'Mainau', 1),
('Job', 'ITerfurt', 1),
('Job', 'Mainau', 1),
('Job', 'ITerfurt', 1),
('Job', 'Mainau', 1),
('Job', 'ITerfurt', 1),
('Job', 'Mainau', 1),
('Job', 'ITkonstanz', 1),
('Job', 'ITerfurt', 1),
('Job', 'Mainau', 1),
('Job', 'ITkonstanz', 1),
('Job', 'ITerfurt', 1),
('Job', 'Mainau', 1),
('Job', 'ITkonstanz', 1),
('Job', 'ITerfurt', 1),
('Konstanz', 'Rank', 1),
('Konstanz', 'ITkonstanz', 1),
('Konstanz', 'Mainau', 1),
('Job', 'Mainau', 1),
('Job', 'ITkonstanz', 1),
('Job', 'ITerfurt', 1),
('Konstanz', 'Rank', 1),
('Konstanz', 'ITkonstanz', 1),
('Konstanz', 'Mainau', 1),
('Job', 'Mainau', 1),
('Job', 'ITkonstanz', 1),
('Job', 'ITerfurt', 1),
('Konstanz', 'Rank', 1),
('Konstanz', 'ITkonstanz', 1),
('Konstanz', 'Mainau', 1),
('Erfurt', 'WG', 1),
('Erfurt', 'ITerfurt', 1),
('Job', 'Mainau', 1),
('Job', 'ITkonstanz', 1),
('Job', 'ITerfurt', 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Entries`
--

CREATE TABLE `Entries` (
  `bracket` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `Entries`
--

INSERT INTO `Entries` (`bracket`, `content`) VALUES
('Mainau', 'SOMMERPRAKTIKUM\nLandschaftsgärtner\nErdung\nNebenbei programmieren'),
('ITerfurt', 'IT JOBS IN ERFURT\nBosch\nLebenslauf\nDemo Page '),
('Job', '[Mainau]\n[ITkonstanz]\n[ITerfurt]\n\nLuka: Job primär als Geld\nLaurenz: Musik Job mit Informatik Hobby weniger stressig als andersrum '),
('Rank', 'PSYCHATER RANK\nAn der Laube\nApp zeigen \nKrankschreibung\nPapa: Fragen'),
('ITkonstanz', 'IT PRAKTIKA IN KONSTANZ\nmindUp'),
('Konstanz', 'KONSTANZ\n\n[Rank]\n##\n[ITkonstanz]\n##\n[Mainau]'),
('Erfurt', 'ERFURT\n\n[WG]\n##\n[ITerfurt]');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
