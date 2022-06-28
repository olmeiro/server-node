const { response } = require("express");
const Employee = require("../models/Employees");

const getEmployees = async (req, res = response) => {
  const employees = await Employee.find().populate("user", "name");

  res.json({
    ok: true,
    msg: employees,
  });
};

const createEmployee = async (req, res = response) => {
  //veryfying employee req
  // console.log(req.body);
  const employee = new Employee(req.body);

  try {
    employee.user = req.uid;
    const employeeSave = await employee.save();

    res.json({
      ok: true,
      employee: employeeSave,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Speak with administrator.",
    });
  }
};

const updateEmployee = async (req, res = response) => {
  // console.log(req.body)
  //tomar id de url
  const employeeId = req.params.id;
  const uid = req.uid;

  try {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        ok: false,
        msg: "Employee doesnt exists with that ID",
      });
    }

    //la persona que creo el evento es la misma que lo quiere actualizar:
    if (employee.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not allowed to edit",
      });
    }

    const employeeDataToUpdate = {
      ...req.body,
      user: uid
    };
    //update db:
    const employeeUpdated = await Employee.findByIdAndUpdate(
      employeeId,
      employeeDataToUpdate,
      { new: true }  //para que devuelva el ultimo elemento actualizado
    );

    res.json({
      ok: true,
      employee: employeeUpdated,
    });
  } catch (error) {
    //  console.log(error);
    res.status(500).json({
      ok: false,
      msg: "speak with the administrator",
    });
  }

  // res.json({
  //   ok: true,
  //   msg: 'update employee',
  //   id: employeeId
  // })
};

const deleteEmployee = async (req, res = response) => {

  const employeeId = req.params.id;
  const uid = req.uid;

  try {
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        ok: false,
        msg: "Employee doesnt exists with that ID",
      });
    }

    //la persona que creo el evento es la misma que lo quiere actualizar:
    if (employee.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Not allowed to delete",
      });
    }

    const employeeDeleted = await Employee.findByIdAndDelete(employeeId);

    res.json({
      ok: true,
      employee: employeeDeleted,
    });
  } catch (error) {
    //  console.log(error);
    res.status(500).json({
      ok: false,
      msg: "speak with the administrator",
    });
  }

  // res.json({
  //   ok: true,
  //   msg: "deleteEmployee",
  // });
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
