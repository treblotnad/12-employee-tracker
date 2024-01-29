const inquirer = require("inquirer");
const {
  getDept,
  getRoles,
  getEmployees,
  addDept,
  getDeptId,
  addRoleDb,
  getRoleId,
  addEmployeeDb,
  getEmpId,
  updateEmpRole,
  updateEmpManager,
  getManagers,
  getByManager,
  getByDept,
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
  `View Budget`,
  `View Budget by Department`,
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
  "View Budget": "viewBudget",
  "View Budget by Department": "viewBudgetByDept",
  "Delete Something": "deleteSomething",
  Exit: "exit",
};
function runApp() {
  inquirer
    .prompt({ type: "list", name: "function", choices: funcList, pageSize: 14 })
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
async function addEmployee() {
  const roleIdObj = await getRoleId();
  const managerObj = await getEmpId();
  const noBoss = { name: "None" };
  managerObj.push(noBoss);
  await inquirer
    .prompt([
      {
        type: "list",
        name: "roleForEmp",
        message: "Which Role will this Employee have?",
        choices: roleIdObj,
      },
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "manager",
        message: "Who will the employee report to?",
        choices: managerObj,
      },
    ])
    .then((response) => {
      const pickedRole = roleIdObj.filter(
        (element) => element.name == response.roleForEmp
      );
      const pickedManager = managerObj.filter(
        (element) => element.name == response.manager
      );
      addEmployeeDb(
        pickedRole[0].id,
        response.firstName,
        response.lastName,
        pickedManager[0].id
      ).then(
        setTimeout(() => {
          runApp();
        }, 50)
      );
    });
}

async function updateRole() {
  const EmpIdObj = await getEmpId();
  const roleIdObj = await getRoleId();
  await inquirer
    .prompt([
      {
        type: "list",
        name: "name",
        message: "Which Employee Role is being updated?",
        choices: EmpIdObj,
      },
      {
        type: "list",
        name: "roleForEmp",
        message: "Which Role will this Employee have?",
        choices: roleIdObj,
      },
    ])
    .then((response) => {
      const pickedRole = roleIdObj.filter(
        (element) => element.name == response.roleForEmp
      );
      const pickedEmp = EmpIdObj.filter(
        (element) => element.name == response.name
      );
      updateEmpRole(pickedRole, pickedEmp).then(
        setTimeout(() => {
          runApp();
        }, 50)
      );
    });
}

async function updateManager() {
  const EmpIdObj = await getEmpId();
  await inquirer
    .prompt([
      {
        type: "list",
        name: "name",
        message: "Which Employee's manager is being updated?",
        choices: EmpIdObj,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the manager?",
        choices: EmpIdObj,
      },
    ])
    .then((response) => {
      const pickedManager = EmpIdObj.filter(
        (element) => element.name == response.manager
      );
      const pickedEmp = EmpIdObj.filter(
        (element) => element.name == response.name
      );
      updateEmpManager(pickedManager, pickedEmp).then(
        setTimeout(() => {
          runApp();
        }, 50)
      );
    });
}
async function viewEmployeesByManager() {
  const managerIdObj = await getManagers();
  await inquirer
    .prompt([
      {
        type: "list",
        name: "name",
        message: "Which Manager's Employees do you want to see?",
        choices: managerIdObj,
      },
    ])
    .then((response) => {
      const pickedManager = managerIdObj.filter(
        (element) => element.name == response.name
      );
      getByManager(pickedManager).then(
        setTimeout(() => {
          runApp();
        }, 50)
      );
    });
}
async function viewEmployeesByDept() {
  const deptIdObj = await getDeptId();
  await inquirer
    .prompt([
      {
        type: "list",
        name: "name",
        message: "Which Departments's Employees do you want to see?",
        choices: deptIdObj,
      },
    ])
    .then((response) => {
      const pickedDept = deptIdObj.filter(
        (element) => element.name == response.name
      );
      getByDept(pickedDept).then(
        setTimeout(() => {
          runApp();
        }, 50)
      );
    });
}

function exit() {
  console.log("Thank you, goodbye!");
}
runApp();
