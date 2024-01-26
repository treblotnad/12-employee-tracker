const inquirer = require("inquirer");
const mysqlHelper = require("./assets/mysqlHelpers");

const dbHelper = new mysqlHelper();

const funcList = [
  "View All Departments",
  "View All Roles",
  "View All Employees",
  "Add Department",
  "Add a Role",
  "Add an Employee",
  `Update an Employee Role`,
  `Update an Employee Manager`,
  `View Employees by Manager`,
  `View Employees by department`,
  `Delete Something`,
  "Exit",
];

const funcObj = {
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

function functionRedirect(pickedFunction) {
  //   console.log(pickedFunction);
  const pickedFunc = funcObj[pickedFunction];
  eval(pickedFunc + "();");
}
function viewAllDepartments() {
  console.log("departments");
  console.log(dbHelper.viewDepts());
  
}
function viewAllRoles() {
  console.log("roles");
  runApp();
}
function viewAllEmployees() {
  console.log("employees");
  runApp();
}
function addDepartment() {
  console.log("add dept");
  runApp();
}
function addRole() {
  console.log("add role");
  runApp();
}
function addEmployee() {
  console.log("add employee");
  runApp();
}
function updateRole() {
  console.log("updateRole");
  runApp();
}
function updateManager() {
  console.log("update Manager");
  runApp();
}
function viewEmployeesByManager() {
  console.log("view employees by manager");
  runApp();
}
function viewEmployeesByDept() {
  console.log("view employees by dept");
  runApp();
}
function deleteSomething() {
  console.log("delete something");
  runApp();
}
function exit() {
  console.log("Have a Great Day, Goodbye!");
}

function runApp() {
  inquirer
    .prompt({ type: "list", name: "function", choices: funcList })
    .then((response) => {
      functionRedirect(response.function);
    });
}

runApp();
