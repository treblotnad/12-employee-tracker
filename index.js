const inquirer = require("inquirer");
const { functionRedirect } = require("./assets/inquirerHelper.js");

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

function runApp() {
  inquirer
    .prompt({ type: "list", name: "function", choices: funcList })
    .then((response) => {
      functionRedirect(response.function).then(runApp);
    });
}

runApp();
