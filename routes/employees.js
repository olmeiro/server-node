// Employees Routes
// /api/employees

const { Router } = require("express");
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require("../controllers/employees");

const { check } = require('express-validator');
const { validationFields } = require("../middlewares/validationFields");
const { isDate } = require("../helpers/isDate");
//validar token
router.use( validateJWT );

//Obtener eventos
router.get("/", getEmployees);

//crear un empleado
// check('others_names', 'first name is require.').not().isEmpty(),
// check('second_last_name', 'first name is require.').not().isEmpty(),
router.post("/", 
[
  check('first_name', 'first name is require.').not().isEmpty(),
  check('first_surname', 'first surname is require.').not().isEmpty(),
  check('country_employment', 'first name is require.').not().isEmpty(),
  check('type_identification', 'type_identification is require.').not().isEmpty(),
  check('number_identification', 'number_identification is require.').not().isEmpty(),
  check('email', 'email is require.').not().isEmpty(),
  check('start', 'start is require.').custom(isDate),
  check('end', 'end is require.').custom(isDate),
  validationFields
], createEmployee);

//Actualizar un empleado
router.put("/:id", updateEmployee);

//borrar un empleado
router.delete("/:id", deleteEmployee);

module.exports = router;
