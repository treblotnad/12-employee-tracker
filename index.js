const inquirer = require("inquirer");
const mysqlHelper = require("./assets/mysqlHelpers");

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
  const dbHelper = new mysqlHelper();
  dbHelper.viewDepts().then(
    setTimeout(() => {
      runApp();
    }, 50)
  );
}
function viewAllRoles() {
  const dbHelper = new mysqlHelper();
  dbHelper.viewRoles().then(
    setTimeout(() => {
      runApp();
    }, 50)
  );
}
function viewAllEmployees() {
  const dbHelper = new mysqlHelper();
  dbHelper.viewEmployees().then(
    setTimeout(() => {
      runApp();
    }, 50)
  );
}
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "addedDept",
      message: "Please Enter the new Department Name",
    })
    .then((response) => {
      const addedDept = response.addedDept;
      const dbHelper = new mysqlHelper();
      dbHelper.addDept(addedDept).then(
        setTimeout(() => {
          runApp();
        }, 50)
      );
    });
}
async function addRole() {
  const dbHelper = new mysqlHelper();
  await dbHelper.deptListReturn().then((stuff) => console.log(stuff));
  //   inquirer
  //     .prompt([
  //       {
  //         type: "input",
  //         name: "addedRole",
  //         message: "Please Enter the new Department Name",
  //       },
  //       {
  //         type: "input",
  //         name: "addedSalary",
  //         message: "Please Enter Salary for this Role",
  //       },
  //       // {
  //       //   type: "list",
  //       //   name: "pickedDept",
  //       //   message: "Which Department is this role in?",
  //       //   choices: deptChoiceList,
  //       // },
  //     ])
  //     .then((response) => {
  //       console.log(response);
  //       //   const addedRole = response.addedRole;
  //       //   const addedSalary = response.addedSalary;
  //       //   const pickedDept = response.pickedDept;
  //       //   const dbHelper = new mysqlHelper();
  //       // //   dbHelper.addRole(addedRole, addedSalary, pickedDept).then(
  //       // //     setTimeout(() => {
  //       // //       runApp();
  //       // //     }, 50)
  //       // //   );
  //     });
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
  const dbHelper = new mysqlHelper();
  console.log("Have a Great Day, Goodbye!");
  dbHelper.exit();
}

function runApp() {
  inquirer
    .prompt({ type: "list", name: "function", choices: funcList, pageSize: 12 })
    .then((response) => {
      functionRedirect(response.function);
    });
}

runApp();
