const { pool } = require("../db/config");
const { generarJWT } = require("../jwt/jwt");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const getAllUsers = async (req, res) => {
  try {
    const resp = await pool.query(`SELECT * FROM usuario`);
    res.json({
      ok: true,
      data: resp.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      msg: `Contacte al administrador`,
    });
  }
};
const createUser = async (req, res) => {
  const { name, email, password, walletAddress, perfilId } = req.body;
  try {
    const verifyAdmin = await pool.query(
      'SELECT * FROM usuario WHERE "perfilId" = $1',
      [1]
    );
    if (verifyAdmin.rows.length > 0 && Number(perfilId) === 1) {
      return res.json({ ok: false, msg: "ya existe un administrador" });
    }
    const verifyEmail = await pool.query(
      "SELECT * FROM usuario WHERE email = $1",
      [email]
    );
    if (verifyEmail.rows.length > 0) {
      res.json({
        ok: false,
        msg: "El email ya existe",
      });
    } else {
      const hashedPW = await bcrypt.hash(password, saltRounds);
      await pool.query(
        `INSERT INTO usuario(name,email,password,"walletAddress","perfilId") VALUES($1,$2,$3,$4,$5)`,
        [name, email, hashedPW, walletAddress, perfilId]
      );
      const user = await pool.query("SELECT * FROM usuario WHERE email = $1", [
        email,
      ]);
      const token = await generarJWT(user.rows[0].id, user.rows[0].name);
      res.json({
        ok: true,
        msg: "Usuario creado exitosamente",
        user: user.rows[0],
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Contacte al administrador",
      error,
    });
  }
};
const revalidarToken = async (req, res) => {
  const { id, name } = req;
  const resp = await pool.query(`SELECT * FROM usuario WHERE id = $1`, [id]);

  const token = await generarJWT(id, name);
  return res.json({
    ok: true,
    user: resp.rows[0],
    token,
  });
};
const logearUsuario = async (req, res) => {
  const { email, password, walletAddress } = req.body;
  try {
    const user = await pool.query(
      `SELECT * FROM usuario WHERE email = $1 AND "walletAddress" = $2`,
      [email, walletAddress]
    );
    if (user.rows.length > 0) {
      const match = await bcrypt.compare(password, user.rows[0].password);
      if (match) {
        token = await generarJWT(user.rows[0].id, user.rows[0].name);
        res.json({
          ok: true,
          msg: "Usuario logeado exitosamente",
          user: user.rows[0],
          token,
        });
      } else {
        res.json({
          ok: false,
          msg: "Password invalida",
        });
      }
    } else {
      res.json({
        ok: false,
        msg: "El usuario no existe",
      });
    }
  } catch (error) {
    res.json({
      ok: false,
      msg: "Contacte al administrador",
      error,
    });
  }
};
module.exports = {
  getAllUsers,
  createUser,
  revalidarToken,
  logearUsuario,
};
