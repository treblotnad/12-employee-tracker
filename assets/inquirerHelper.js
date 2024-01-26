// const { helper1, helper2, helper3 }= require('./mysqlHelper.js');

const functionList = {
  "View All Departments": "viewAllDepartments",
  "View All Roles": "viewAllRoles",
  "View All Employees": "viewAllEmployees",
  "Add Department": "addDepartment",
  "Add a Role": "addRole",
  "Add an Employee": "addEmployee",
  "Update an Employee Role": "updateRole",
  "Update an Employee Manager": "updateManager",
  "View Employees by Manager": "viewEmployeesByManager",
  "View Employees by department": "viewEmployeesByDept",
  "Delete Something": "deleteSomething",
  Exit: "exit",
};

async function functionRedirect(pickedFunction) {
  //   console.log(pickedFunction);
  const pickedFunc = functionList[pickedFunction];
  eval(pickedFunc + "();");
}
function viewAllDepartments() {
  console.log("departments");
}
function viewAllRoles() {
  console.log("roles");
}
function viewAllEmployees() {
  console.log("employees");
}
function addDepartment() {
  console.log("add dept");
}
function addRole() {
  console.log("add role");
}
function addEmployee() {
  console.log("add employee");
}
function updateRole() {
  console.log("updateRole");
}
function updateManager() {
  console.log("update Manager");
}
function viewEmployeesByManager() {
  console.log("view employees by manager");
}
function viewEmployeesByDept() {
  console.log("view employees by dept");
}
function deleteSomething() {
  console.log("delete something");
}
function exit() {
  throw new Error("Have a Great Day, Goodbye!");
}

module.exports = { functionRedirect };
