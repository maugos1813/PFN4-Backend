-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-09-2024 a las 10:34:02
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
-- Base de datos: `incidencias`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Comentario`
--

CREATE TABLE `Comentario` (
  `idComentario` int(11) NOT NULL,
  `contenido` text NOT NULL,
  `fecha_comentario` datetime DEFAULT current_timestamp(),
  `id_usuario` int(11) DEFAULT NULL,
  `idIncidencia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Comentario`
--

INSERT INTO `Comentario` (`idComentario`, `contenido`, `fecha_comentario`, `id_usuario`, `idIncidencia`) VALUES
(1, 'Por favor, arreglen esto lo antes posible.', '2024-09-03 13:17:04', 1, 1),
(2, 'El electricista ya está trabajando en ello.', '2024-09-03 13:17:04', 3, 2),
(3, 'La puerta fue reparada ayer.', '2024-09-03 13:17:04', 3, 3),
(5, 'prueba de comentario', '2024-09-04 13:30:09', 3, 4),
(6, 'prueba de comentario', '2024-09-04 13:30:13', 3, 4),
(7, 'prueba de comentario', '2024-09-04 13:30:14', 3, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Imagen`
--

CREATE TABLE `Imagen` (
  `id_imagen` int(11) NOT NULL,
  `ruta_imagen` varchar(255) NOT NULL,
  `id_incidencia` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Imagen`
--

INSERT INTO `Imagen` (`id_imagen`, `ruta_imagen`, `id_incidencia`) VALUES
(1, '/images/fuga_agua_baño.jpg', 1),
(2, '/images/luz_parpadeante_pasillo.jpg', 2),
(3, '/images/puerta_rota_garaje.jpg', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Incidencia`
--

CREATE TABLE `Incidencia` (
  `idIncidencia` int(11) NOT NULL,
  `asunto` varchar(255) NOT NULL,
  `tipo_incidencia` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `fecha_reporte` datetime DEFAULT current_timestamp(),
  `estado` enum('Pendiente','En Proceso','Resuelta') NOT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Incidencia`
--

INSERT INTO `Incidencia` (`idIncidencia`, `asunto`, `tipo_incidencia`, `descripcion`, `ubicacion`, `fecha_reporte`, `estado`, `id_usuario`) VALUES
(1, 'Fuga de agua', 'Fontanería', 'Hay una fuga de agua en el baño del tercer piso', 'Baño - Tercer piso', '2024-09-03 13:16:37', 'Resuelta', 1),
(2, 'Luz parpadeante', 'Electricidad', 'La luz del pasillo parpadea constantemente', 'Pasillo - Segundo piso', '2024-09-03 13:16:37', 'En Proceso', 2),
(3, 'Puerta rota', 'Carpintería', 'La puerta del garaje está rota y no cierra bien', 'Garaje', '2024-09-03 13:16:37', 'Resuelta', 1),
(4, 'Fuga de agua', 'fontanería', 'Hay una fuga constante en la tubería de la cocina', 'Cocina, piso 1', '2024-09-04 12:26:22', 'Pendiente', 1),
(8, 'segunda pruebaaaaa!!!!!! ', 'Sanitaria', 'Hay mucho covid en el mundo ', 'tierra 161616', '2024-09-09 03:09:40', 'Pendiente', NULL),
(9, 'Ratones en Cocina', 'Plaga', 'Pasé por la tarde después del almuerzo a mi residencia cuando veo 2 ratones pasando rápidamente a mi costado', 'residencia 5 - calle', '2024-09-09 03:15:52', 'Pendiente', NULL),
(12, 'Mauro Prueba de Incidencia', 'Prueba técnica', 'Estamos probando la funcionalidad para crear una incidencia y así saber las cosas que el programador debe mejorar', '2do piso Baño', '2024-09-10 13:48:20', 'Resuelta', NULL),
(14, 'prueba de actualizar', 'actualizar', 'aslidajsldiajsldaisd probando la actualizacion!!!!', '1er piso - playa', '2024-09-12 01:44:05', 'Resuelta', NULL),
(15, 'Gato me arañó', 'Médica', 'Estuve pasando por el pasadizo de mi piso y de pronto salió un gato enorme el cual estuvo asustado y por defenderse \"supongo\", me arañó todo el brazo, me duele muchooooo, ayudaaaaaa!!!!!', 'pasadizo - 12vo piso', '2024-09-12 02:13:33', 'Pendiente', NULL),
(16, 'Vidrio roto', 'Mantenimiento', 'Acabo de llegar a mi residencia y he notado que hay una ventana rota, por favor, quiero una solución', '5to piso - residencia 5', '2024-09-12 02:58:09', 'Pendiente', NULL),
(17, 'Prueba de Incidencia', 'Pruebas con ganas', 'Pasa que ya son las 3:09am de la mañana y yo ya quiero dormir, pero mis profes muestran fe en mí y quieren que logre hacer este proyecto, espero les guste', '1er piso - luna', '2024-09-12 03:10:03', 'Pendiente', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `tipoUsuario` enum('residente','administrador') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`id_usuario`, `nombre`, `apellido`, `email`, `contraseña`, `tipoUsuario`) VALUES
(1, 'Juan', 'Pérez', 'juan.perez@example.com', 'hashed_password1', 'residente'),
(2, 'Ana', 'García', 'ana.garcia@example.com', 'hashed_password2', 'residente'),
(3, 'Carlos', 'López', 'carlos.lopez@example.com', 'hashed_password3', 'administrador'),
(5, 'Jairo', 'Agostinelli', 'matías@example.com', 'matías123', 'administrador'),
(7, 'Mauro', 'Agostinelli', 'mau@example.com', '$2b$10$gfgREn2ou9nf1.2q4gXK4epplyA0DHp3SAr/PiS21SBPDXGzkUUBi', 'administrador'),
(8, 'Joan', 'Begazo', 'joan@example.com', '$2b$10$xGaW9F6yMUcqXDYhJLQMzO2RqUovLfKjYQKa1EO0e1ny4dEJxRL96', 'residente'),
(9, 'Priscyla', 'Begazo', 'pri@example.com', '$2b$10$JSjROSm0CraJQBKcI4cDzeiH2NcSMYABD5RKOXiSoJDSmfeVtXKsa', 'residente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Comentario`
--
ALTER TABLE `Comentario`
  ADD PRIMARY KEY (`idComentario`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_incidencia` (`idIncidencia`);

--
-- Indices de la tabla `Imagen`
--
ALTER TABLE `Imagen`
  ADD PRIMARY KEY (`id_imagen`),
  ADD KEY `id_incidencia` (`id_incidencia`);

--
-- Indices de la tabla `Incidencia`
--
ALTER TABLE `Incidencia`
  ADD PRIMARY KEY (`idIncidencia`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Comentario`
--
ALTER TABLE `Comentario`
  MODIFY `idComentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `Imagen`
--
ALTER TABLE `Imagen`
  MODIFY `id_imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Incidencia`
--
ALTER TABLE `Incidencia`
  MODIFY `idIncidencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Comentario`
--
ALTER TABLE `Comentario`
  ADD CONSTRAINT `Comentario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE CASCADE,
  ADD CONSTRAINT `Comentario_ibfk_2` FOREIGN KEY (`idIncidencia`) REFERENCES `Incidencia` (`idIncidencia`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Imagen`
--
ALTER TABLE `Imagen`
  ADD CONSTRAINT `Imagen_ibfk_1` FOREIGN KEY (`id_incidencia`) REFERENCES `Incidencia` (`idIncidencia`) ON DELETE CASCADE;

--
-- Filtros para la tabla `Incidencia`
--
ALTER TABLE `Incidencia`
  ADD CONSTRAINT `Incidencia_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario` (`id_usuario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
