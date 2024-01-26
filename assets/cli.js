const inquirer = require("inquirer");
// const { helper1, helper2, helper3 }= require('./mysqlHelper.js');

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

class CLI {
  constructor() {}
  run() {
    inquirer
      .prompt({ type: "list", name: "function", choices: funcList })
      .then((response) => {
        console.log(response.function);
      });
  }
}

module.exports = CLI;
