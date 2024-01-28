const inquirer = require("inquirer");
const {
  getDept,
  getRoles,
  getEmployees,
  addDept,
  getDeptId,
  addRoleDb,
} = require("./assets/mysqlHelper2");

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
function runApp() {
  inquirer
    .prompt({ type: "list", name: "function", choices: funcList, pageSize: 12 })
    .then((response) => {
      functionRedirect(response.function);
    });
}
function functionRedirect(pickedFunction) {
  const pickedFunc = funcObj[pickedFunction];
  eval(pickedFunc + "();");
}
async function viewAllDepartments() {
  await getDept();
  runApp();
}
async function viewAllRoles() {
  await getRoles();
  runApp();
}
async function viewAllEmployees() {
  await getEmployees();
  runApp();
}
async function addDepartment() {
  await inquirer
    .prompt({
      type: "input",
      name: "addedDept",
      message: "Please Enter the new Department Name",
    })
    .then((response) => {
      addDept(response.addedDept).then(
        setTimeout(() => {
          runApp();
        }, 50)
      );
    });
}
async function addRole() {
  const deptIdObj = await getDeptId();
  await inquirer
    .prompt([
      {
        type: "list",
        name: "deptForRole",
        message: "Which Dept will this roll be in?",
        choices: deptIdObj,
      },
      {
        type: "input",
        name: "newRole",
        message: "Please name the new role",
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Please enter role Salary",
      },
    ])
    .then((response) => {
      const pickedDept = deptIdObj.filter(
        (element) => element.name == response.deptForRole
      );
      addRoleDb(pickedDept[0].id, response.newRole, response.roleSalary).then(
        setTimeout(() => {
          runApp();
        }, 50)
      );
    });
}
async function addEmployee(){
    
}

function exit() {
  console.log("Thank you, goodbye!");
}
runApp();
