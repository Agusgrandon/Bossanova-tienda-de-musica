-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2026 a las 21:09:54
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda_musica`
--
CREATE DATABASE IF NOT EXISTS `tienda_musica` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `tienda_musica`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `artista` varchar(100) DEFAULT NULL,
  `tipo` varchar(50) NOT NULL,
  `categoria` enum('discos','hardware') NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `precio_oferta` decimal(10,2) DEFAULT NULL,
  `imagen` varchar(255) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `artista`, `tipo`, `categoria`, `precio`, `precio_oferta`, `imagen`, `activo`) VALUES
(1, 'Bossanova', 'Pixies', 'Vinilo', 'discos', 85000.00, NULL, 'bossanova.webp', 1),
(2, 'Doolittle', 'Pixies', 'CD', 'discos', 38000.00, NULL, 'doolittle.webp', 1),
(3, 'Daydream Nation', 'Sonic Youth', 'Vinilo', 'discos', 110000.00, 89000.00, 'daydream-nation.webp', 1),
(4, 'Unknown Pleasures', 'Joy Division', 'CD', 'discos', 36000.00, 29000.00, 'unknown-pleasures.webp', 1),
(5, 'A Star Named Sun', 'Kinó', 'Vinilo', 'discos', 90000.00, NULL, 'a-star-named-sun.webp', 1),
(6, 'Okurimono', 'Hyakkei', 'CD', 'discos', 55000.00, NULL, 'okurimono.webp', 1),
(7, 'Seventeen Seconds', 'The Cure', 'CD', 'discos', 36000.00, NULL, 'seventeen-seconds.webp', 1),
(8, 'Oktubre', 'Patricio Rey y sus Redonditos de Ricota', 'Vinilo', 'discos', 55000.00, NULL, 'oktubre.webp', 1),
(9, 'Brighten the Corners', 'Pavement', 'CD', 'discos', 38000.00, NULL, 'brighten-the-corners.webp', 1),
(10, 'Wowee Zowee', 'Pavement', 'CD', 'discos', 38000.00, 30000.00, 'wowee-zowee.webp', 1),
(11, 'The Natural Bridge', 'Silver Jews', 'CD', 'discos', 40000.00, NULL, 'the-natural-bridge.webp', 1),
(12, 'American Water', 'Silver Jews', 'CD', 'discos', 40000.00, NULL, 'american-water.webp', 1),
(13, 'Three Cheers for Sweet Revenge', 'My Chemical Romance', 'CD', 'discos', 35000.00, NULL, 'three-cheers.webp', 1),
(14, 'Black Sunday', 'Cypress Hill', 'Vinilo', 'discos', 85000.00, NULL, 'black-sunday.webp', 1),
(15, 'The Low End Theory', 'A Tribe Called Quest', 'Vinilo', 'discos', 85000.00, NULL, 'the-low-end-theory.webp', 1),
(16, 'The Infamous', 'Mobb Deep', 'CD', 'discos', 36000.00, NULL, 'the-infamous.webp', 1),
(17, 'Da Storm', 'O.G.C.', 'CD', 'discos', 40000.00, NULL, 'da-storm.webp', 1),
(18, 'Illmatic', 'Nas', 'Vinilo', 'discos', 85000.00, 69000.00, 'illmatic.webp', 1),
(19, 'Enter the Wu-Tang (36 Chambers)', 'Wu-Tang Clan', 'Vinilo', 'discos', 90000.00, NULL, 'enter-the-wu-tang.webp', 1),
(20, 'The Eminem Show', 'Eminem', 'CD', 'discos', 30000.00, NULL, 'the-eminem-show.webp', 0),
(21, 'Music to Driveby', 'Compton\'s Most Wanted', 'CD', 'discos', 40000.00, NULL, 'music-to-driveby.webp', 1),
(22, 'Seven Steps to Heaven', 'Miles Davis', 'CD', 'discos', 32000.00, NULL, 'seven-steps-to-heaven.webp', 0),
(23, 'Mass of the Fermenting Dregs', 'Mass of the Fermenting Dregs', 'CD', 'discos', 55000.00, NULL, 'mass-of-the-fermenting-dregs.webp', 1),
(24, 'the book about my idle plot on a vague anxiety', 'toe', 'CD', 'discos', 55000.00, NULL, 'the-book-about-my-idle-plot.webp', 1),
(25, 'Audio-Technica ATH-M20x', NULL, 'Auriculares', 'hardware', 150000.00, NULL, 'ath-m20x.webp', 1),
(26, 'KZ ZSN Pro', NULL, 'Auriculares', 'hardware', 45000.00, NULL, 'kz-zsn-pro.webp', 1),
(27, 'Shure SRH940', NULL, 'Auriculares', 'hardware', 450000.00, 379000.00, 'shure-srh940.webp', 1),
(28, 'Sennheiser HD 300', NULL, 'Auriculares', 'hardware', 120000.00, NULL, 'sennheiser-hd300.webp', 1),
(29, 'Behringer Powerplay P1', NULL, 'Amplificador', 'hardware', 90000.00, NULL, 'behringer-p1.webp', 1),
(30, 'Behringer MA400', NULL, 'Amplificador', 'hardware', 70000.00, NULL, 'behringer-ma400.webp', 1),
(31, 'Samson QH4', NULL, 'Amplificador', 'hardware', 150000.00, NULL, 'samson-qh4.webp', 1),
(32, 'Behringer PP400', NULL, 'Preamplificador', 'hardware', 60000.00, NULL, 'behringer-pp400.webp', 1),
(33, 'Record Pro RP113', NULL, 'Preamplificador', 'hardware', 80000.00, NULL, 'record-pro-rp113.webp', 1),
(34, 'Nux B-7 Pro', NULL, 'Monitoreo', 'hardware', 250000.00, NULL, 'nux-b7-pro.webp', 0),
(35, 'NUX NAI-24', NULL, 'Placa de audio', 'hardware', 150000.00, NULL, 'nux-nai24.webp', 1),
(36, 'Lexsen Pod8', NULL, 'Placa de audio', 'hardware', 200000.00, NULL, 'lexsen-pod8.webp', 1),
(37, 'M-Audio M-Track Solo II', NULL, 'Placa de audio', 'hardware', 140000.00, NULL, 'm-track-solo-ii.webp', 1),
(38, 'Wincofon W406', NULL, 'Tocadiscos', 'hardware', 250000.00, NULL, 'wincofon-w406.webp', 1),
(39, 'Audio-Technica AT-LP60X', NULL, 'Tocadiscos', 'hardware', 450000.00, 389000.00, 'at-lp60x.webp', 1),
(40, 'Gadnic Soundix6 Vintage', NULL, 'Tocadiscos', 'hardware', 180000.00, NULL, 'gadnic-soundix6.webp', 1),
(41, 'Crosley Voyager', NULL, 'Reproductor de CD', 'hardware', 200000.00, NULL, 'crosley-voyager.webp', 1),
(42, 'Crosley Cruiser', NULL, 'Reproductor de CD', 'hardware', 200000.00, NULL, 'crosley-cruiser.webp', 1),
(43, 'SMSL PL150', NULL, 'Reproductor de CD', 'hardware', 400000.00, NULL, 'smsl-pl150.webp', 1),
(44, 'JBL Flip 7', NULL, 'Parlante', 'hardware', 180000.00, 149000.00, 'jbl-flip7.webp', 1),
(45, 'AIWA AW-T310', NULL, 'Parlante', 'hardware', 60000.00, NULL, 'aiwa-awt310.webp', 1),
(46, 'QFX RETRO-39BT', NULL, 'Casetera', 'hardware', 70000.00, NULL, 'qfx-retro39bt.webp', 0),
(47, 'Behringer MDX2600', NULL, 'Compresor', 'hardware', 300000.00, 249000.00, 'behringer-mdx2600.webp', 1),
(48, 'Apogee DSP-46', NULL, 'Compresor', 'hardware', 500000.00, NULL, 'apogee-dsp46.webp', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

DROP TABLE IF EXISTS `ventas`;
CREATE TABLE `ventas` (
  `id` int(11) NOT NULL,
  `nombre_cliente` varchar(100) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas_productos`
--

DROP TABLE IF EXISTS `ventas_productos`;
CREATE TABLE `ventas_productos` (
  `venta_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ventas_productos`
--
ALTER TABLE `ventas_productos`
  ADD PRIMARY KEY (`venta_id`,`producto_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ventas_productos`
--
ALTER TABLE `ventas_productos`
  ADD CONSTRAINT `ventas_productos_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `ventas` (`id`),
  ADD CONSTRAINT `ventas_productos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
