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
  getBudget,
  deleteDept,
  deleteRole,
  deleteEmp,
  changeDept,
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
  "Update Department for Role",
  `View Employees by Manager`,
  `View Employees by department`,
  `View Budget`,
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
  "Update Department for Role": "updateRoleDept",
  "View Employees by Manager": "viewEmployeesByManager",
  "View Employees by department": "viewEmployeesByDept",
  "View Budget": "viewBudget",
  "Delete Something": "deleteSomething",
  Exit: "exit",
};

const textValidate = async (input) => {
  if (input.length < 1) {
    return "Inputs must be at least 1 character long";
  }
  return true;
};

const numValidate = async (input) => {
  if (!(input % 1 == 0)) {
    return "Salary must be a number!";
  }
  return true;
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
      validate: textValidate,
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
        validate: textValidate,
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Please enter role Salary",
        validate: numValidate,
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
        validate: textValidate,
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the employee's last name?",
        validate: textValidate,
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

async function updateRoleDept() {
  const deptIdObj = await getDeptId();
  const roleIdObj = await getRoleId();
  await inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Which Roll needs to change Departments?",
        choices: roleIdObj,
      },
      {
        type: "list",
        name: "dept",
        message: "Which Department will role be added to?",
        choices: deptIdObj,
      },
    ])
    .then((response) => {
      const pickedRole = roleIdObj.filter(
        (element) => element.name == response.role
      );
      const pickedDept = deptIdObj.filter(
        (element) => element.name == response.dept
      );
      changeDept(pickedRole, pickedDept).then(
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

async function viewBudget() {
  getBudget().then(
    setTimeout(() => {
      runApp();
    }, 50)
  );
}

async function deleteSomething() {
  const deleteChoice = ["Department", "Role", "Employee"];
  await inquirer
    .prompt([
      {
        type: "list",
        name: "choiceDelete",
        message: "What do you want to delete?",
        choices: deleteChoice,
      },
    ])
    .then(async (response) => {
      if (response.choiceDelete == "Department") {
        console.log(response.choiceDelete);
        const deptIdObj = await getDeptId();
        await inquirer
          .prompt([
            {
              type: "list",
              name: "name",
              message: "Which Department do you want to delete?",
              choices: deptIdObj,
            },
          ])
          .then((response) => {
            const pickedDept = deptIdObj.filter(
              (element) => element.name == response.name
            );
            deleteDept(pickedDept).then(
              setTimeout(() => {
                runApp();
              }, 50)
            );
          });
      }
      if (response.choiceDelete == "Role") {
        console.log(response.choiceDelete);
        const roleIdObj = await getRoleId();
        await inquirer
          .prompt([
            {
              type: "list",
              name: "name",
              message: "Which role do you want to delete?",
              choices: roleIdObj,
            },
          ])
          .then((response) => {
            const pickedRole = roleIdObj.filter(
              (element) => element.name == response.name
            );
            deleteRole(pickedRole).then(
              setTimeout(() => {
                runApp();
              }, 50)
            );
          });
      }
      if (response.choiceDelete == "Employee") {
        console.log(response.choiceDelete);
        const empIdObj = await getEmpId();
        await inquirer
          .prompt([
            {
              type: "list",
              name: "name",
              message: "Which employee do you want to delete?",
              choices: empIdObj,
            },
          ])
          .then((response) => {
            const pickedEmp = empIdObj.filter(
              (element) => element.name == response.name
            );
            deleteEmp(pickedEmp).then(
              setTimeout(() => {
                runApp();
              }, 50)
            );
          });
      }
    });
}

function exit() {
  console.log("Thank you, goodbye!");
}
runApp();
