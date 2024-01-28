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
    const sql = `SELECT r.title, r.salary, d.name as dept
    from roles r 
    join departments d  
    ON r.department_id = d.id;`;
    this.db.query(sql, (err, results) => {
      if (err) {
        throw new Error("Database Error!");
      }
      printTable(results);
      this.db.end();
    });
  }
  async viewEmployees() {
    const sql = `SELECT e.first_name, e.last_name, r.title, r.salary, d.name as dept
    from employees e 
    join roles r 
    ON e.role_id = r.id 
    join departments d 
    on r.department_id = d.id ;`;
    this.db.query(sql, (err, results) => {
      if (err) {
        throw new Error("Database Error!");
      }
      printTable(results);
      this.db.end();
    });
  }
  async addDept(addedDept) {
    const param = addedDept;
    const sqlCheck = `Select name from departments WHERE name = (?)`;
    this.db.query(sqlCheck, param, (err, result) => {
      if (err) {
        throw new Error("DB Error checking depts!");
      }
      if (result.length > 0) {
        console.log("Department Already Exists");
        this.db.end();
      } else {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        this.db.query(sql, param, (err, result) => {
          if (err) {
            throw new Error("DB Error adding dept!");
          }
          console.log(`${param} added to Departments!`);
          this.db.end();
        });
      }
    });
  }
  async addRole(addedRole, addedSalary, pickedDept) {
    const param1 = addedRole;
    const param2 = addedSalary;
    const pickedDeptartment = pickedDept;
    const sqlCheck = `Select name from departments WHERE name = (?)`;
    this.db.query(sqlCheck, param, (err, result) => {
      if (err) {
        throw new Error("DB Error checking depts!");
      }
      if (result.length > 0) {
        console.log("Department Already Exists");
        this.db.end();
      } else {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        this.db.query(sql, param, (err, result) => {
          if (err) {
            throw new Error("DB Error adding dept!");
          }
          console.log(`${param} added to Departments!`);
          this.db.end();
        });
      }
    });
  }
  async deptListReturn() {
    const sql = `SELECT * from departments;`;
    await this.db.query(sql, (err, result) => {
      if (err) {
        throw new Error("DB Error adding dept!");
      }
      this.db.end();
      return JSON.stringify(result);
    });
  }
  exit() {
    this.db.end();
  }
}

module.exports = dbHelper;
