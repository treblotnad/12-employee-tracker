const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "staff",
  },
  console.log(`Connected to the staff database.`)
);

class dbHelper {
  constructor() {}
  viewDepts() {
    const sql = `SELECT * from departments;`;
    db.query(sql, (err, results) => {
      if (err) {
        throw new Error("Database Error!");
      }
      return results;
    });
  }
}

module.exports = dbHelper;
