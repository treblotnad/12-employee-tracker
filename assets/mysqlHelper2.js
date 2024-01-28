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
  const connUpdate = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  await connUpdate.execute(`INSERT INTO departments (name) VALUES (?)`, [
    deptToBeAdded,
  ]);
  await connUpdate.end();
  console.log(`${deptToBeAdded} added to departments!`);
}
async function getDeptId() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] = await conn.execute(`Select * FROM departments`);
  await conn.end();
  return rows;
}
async function addRoleDb(pickedDept, newRole, roleSalary) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] = await conn.execute(
    `SELECT title FROM roles WHERE title = ?`,
    [newRole]
  );
  await conn.end();
  if (rows.length > 0) return console.log("This is already a Role!");
  const connUpdate = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  await connUpdate.execute(
    `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,
    [newRole, roleSalary, pickedDept]
  );
  await connUpdate.end();
  console.log(`${newRole} added to roles!`);
}

module.exports = {
  getDept,
  getRoles,
  getEmployees,
  addDept,
  getDeptId,
  addRoleDb,
};
