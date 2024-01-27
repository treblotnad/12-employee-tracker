const mysql = require("mysql2");
const { printTable } = require("console-table-printer");

class dbHelper {
  constructor() {
    this.db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "staff",
    });
  }
  async viewDepts() {
    const sql = `SELECT name from departments;`;
    this.db.query(sql, (err, results) => {
      if (err) {
        throw new Error("Database Error!");
      }

      printTable(results);

      this.db.end();
    });
  }
  async viewRoles() {
    const sql = `SELECT title, salary from roles;`;
    this.db.query(sql, (err, results) => {
      if (err) {
        throw new Error("Database Error!");
      }
      printTable(results);
      this.db.end();
    });
  }
  async viewEmployees() {
    const sql = `SELECT first_name, last_name from employees;`;
    this.db.query(sql, (err, results) => {
      if (err) {
        throw new Error("Database Error!");
      }
      printTable(results);
      this.db.end();
    });
  }
  exit() {
    this.db.end();
  }
}

module.exports = dbHelper;
