const mysql = require("mysql2/promise");
const { printTable } = require("console-table-printer");
async function getDept() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] = await conn.execute(`SELECT name FROM departments`);
  await conn.end();
  printTable(rows);
}
async function getRoles() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] =
    await conn.execute(`SELECT r.title, r.salary, d.name as dept
  from roles r 
  join departments d  
  ON r.department_id = d.id;`);
  await conn.end();
  printTable(rows);
}
async function getEmployees() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] =
    await conn.execute(`SELECT e.first_name, e.last_name, r.title, r.salary, d.name as dept
  from employees e 
  join roles r 
  ON e.role_id = r.id 
  join departments d 
  on r.department_id = d.id ;`);
  await conn.end();
  printTable(rows);
}
async function addDept(deptToBeAdded) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] = await conn.execute(
    `SELECT name FROM departments WHERE name = ?`,
    [deptToBeAdded]
  );
  await conn.end();
  if (rows.length > 0) return console.log("This is already a Department!");
  console.log("add new dept");
}

module.exports = { getDept, getRoles, getEmployees, addDept };
