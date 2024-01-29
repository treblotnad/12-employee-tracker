const mysql = require("mysql2/promise");
const { printTable } = require("console-table-printer");

async function getDept() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] = await conn.execute(`SELECT * FROM departments`);
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
    await conn.execute(`SELECT r.id, r.title, r.salary, d.name as dept
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
    await conn.execute(`SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name as dept, CONCAT(m.first_name,' ',m.last_name) as Manager
  from employees e 
  join roles r 
  ON e.role_id = r.id 
  join departments d 
  on r.department_id = d.id 
  left join employees m
  ON e.manager_id = m.id;`);
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
async function getRoleId() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] = await conn.execute(
    `Select id, title as name FROM roles`
  );
  await conn.end();
  return rows;
}
async function addEmployeeDb(pickedRole, firstName, lastName, pickedManager) {
  const connUpdate = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });

  if (pickedManager) {
    await connUpdate.execute(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
      [firstName, lastName, pickedRole, pickedManager]
    );
  } else {
    await connUpdate.execute(
      `INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)`,
      [firstName, lastName, pickedRole]
    );
  }
  await connUpdate.end();
  console.log(`${firstName} ${lastName} added to employees!`);
}

async function getEmpId() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] = await conn.execute(
    `Select id, concat(first_name,' ',last_name) as name FROM employees`
  );
  await conn.end();
  return rows;
}

async function updateEmpRole(pickedRole, pickedEmp) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  await conn.execute(`UPDATE employees SET role_id = ? WHERE id = ?`, [
    pickedRole[0].id,
    pickedEmp[0].id,
  ]);
  await conn.end();
  console.log(`Updated ${pickedEmp[0].name}'s role to ${pickedRole[0].name}`);
}

async function updateEmpManager(pickedManager, pickedEmp) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  await conn.execute(`UPDATE employees SET manager_id = ? WHERE id = ?`, [
    pickedManager[0].id,
    pickedEmp[0].id,
  ]);
  await conn.end();
  console.log(
    `Updated ${pickedEmp[0].name}'s manager to ${pickedManager[0].name}`
  );
}

async function getManagers() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] = await conn.execute(
    `Select m.id, concat(m.first_name,' ',m.last_name) as name FROM employees e JOIN employees m ON e.manager_id= m.id`
  );
  await conn.end();
  return rows;
}

async function getByManager(pickedManager) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] = await conn.execute(
    `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name as dept
    from employees e 
    join roles r 
    ON e.role_id = r.id 
    join departments d 
    on r.department_id = d.id 
    WHERE manager_id = ?
    ;`,
    [pickedManager[0].id]
  );
  await conn.end();
  printTable(rows);
}

async function getByDept(pickedDept) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  });
  const [rows, fields] = await conn.execute(
    `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name as dept
  from employees e 
  join roles r 
  ON e.role_id = r.id 
  join departments d 
  on r.department_id = d.id 
  WHERE r.department_id = ?
  ;`,
    [pickedDept[0].id]
  );
  await conn.end();
  printTable(rows);
}

module.exports = {
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
};
