const express = require("express");
const router = express.Router();

let usuarios = [
  { id: 1, nombre: "Usuario1", correo: "usuario1@example.com" },
  { id: 2, nombre: "Usuario2", correo: "usuario2@example.com" },
];

// GET /usuarios
router.get("/", (req, res) => {
  res.json(usuarios);
});

// GET /usuarios/:id
router.get("/:id", (req, res) => {
  const usuarioId = parseInt(req.params.id);
  const usuario = usuarios.find((u) => u.id === usuarioId);

  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  res.json(usuario);
});

// POST /usuarios
router.post("/", (req, res) => {
  const { nombre, correo } = req.body;

  // Validar que se proporcionen nombre y correo
  if (!nombre || !correo) {
    return res.status(400).json({ mensaje: "Nombre y correo son obligatorios" });
  }

  // Crear un nuevo usuario
  const nuevoUsuario = { id: usuarios.length + 1, nombre, correo };
  usuarios.push(nuevoUsuario);

  res.status(201).json(nuevoUsuario);
});

// PUT /usuarios/:id
router.put("/:id", (req, res) => {
  const usuarioId = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex((u) => u.id === usuarioId);

  if (usuarioIndex === -1) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  const { nombre, correo } = req.body;

  // Validar que se proporcionen nombre y correo
  if (!nombre || !correo) {
    return res.status(400).json({ mensaje: "Nombre y correo son obligatorios" });
  }

  // Actualizar la información del usuario
  usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], nombre, correo };

  res.json(usuarios[usuarioIndex]);
});

// DELETE /usuarios/:id
router.delete("/:id", (req, res) => {
  const usuarioId = parseInt(req.params.id);
  usuarios = usuarios.filter((u) => u.id !== usuarioId);

  res.json({ mensaje: "Usuario eliminado exitosamente" });
});

module.exports = router;