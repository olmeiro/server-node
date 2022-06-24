// user's routes Auth
// host + /api/auth

const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");

// app.get('/', (req, resp) => {
//   console.log("se requiere el /")
//   resp.json({
//     ok: true
//   });
// }); cambia por:

// router.get('/', (req, resp) => {
//   // console.log("se requiere el /");
//   resp.json({
//     ok: true
//   });
// });ahora vamos a definir routes:

const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validationFields } = require("../middlewares/validationFields");

router.post(
  "/new",
  [
    //middlewares
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password debe ser de 5 caracteres").isLength({
      min: 5,
    }),
    validationFields
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "el email es obligatorio").isEmail(),
    check("password", "el password de ser de 5 caracteres").isLength({
      min: 5,
    }),
    validationFields
  ],
  loginUser
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
