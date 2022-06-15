const { Router } = require("express");
const {
  getAllUsers,
  createUser,
  revalidarToken,
  logearUsuario,
  getABI,
} = require("../controllers/users");
const { validarJWT } = require("../jwt/validar-jwt");
const router = Router();

router.get("/", getAllUsers);
router.post("/crear", createUser);
router.get("/renew", validarJWT, revalidarToken);
router.post("/logear", logearUsuario);
module.exports = router;
