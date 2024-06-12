const Employees = require("../Schemas/EmployeeSchemaLMS");

async function getEmployeeCourses(data) {
  try {
    const employee = await Employees.findOne({
      EmployeeID: data.EmployeeID,
    });
    console.log(employee);
    return employee;
  } catch (error) {
    console.error("Error finding employee:", error);
    throw error;
  }
}

module.exports = getEmployeeCourses;
