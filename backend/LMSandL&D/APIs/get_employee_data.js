const Employees = require("../Schemas/EmployeeSchemaLMS");

async function findEmployeeByIdOrName(data) {
  try {
    const query = {
      $or: [
        { EmployeeID: data.EmployeeID },
        { Name: data.Name }
      ]
    };
    const employee = await Employees.findOne(query);
    return employee;
  } catch (error) {
    console.error("Error finding employee:", error);
    throw error;
  }
}

module.exports = findEmployeeByIdOrName;
