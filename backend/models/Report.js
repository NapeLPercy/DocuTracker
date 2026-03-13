const db = require("../config/db");

module.exports = {
  getReports: (role, persal) => {
    return new Promise((resolve, reject) => {
      let sql;
      let params = [];

      if (role === "MANAGER" || role === "RUNNER") {
        sql = `
        SELECT r.id, r.type, r.role, r.details AS message, a.email, u.fullName AS workerName,
               DATE_FORMAT(r.date, '%Y-%m-%d %H:%i') AS date
        FROM report r
        JOIN task t ON r.task_id = t.id
        JOIN account a ON t.persal_number = a.persal_number
        JOIN user u ON a.persal_number = u.persal_number
        ORDER BY r.date DESC
        LIMIT 20
      `;
      } else {
        sql = `
          SELECT r.id, r.type, r.role, r.details AS message,
                 DATE_FORMAT(r.date, '%Y-%m-%d %H:%i') AS date
          FROM report r
          JOIN task t ON r.task_id = t.id
          WHERE t.persal_number = ?
          ORDER BY r.date DESC
          LIMIT 20
        `;
        params = [persal];
      }

      db.query(sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  addReports: (role, persal) => {
    return new Promise((resolve, reject) => {
      let sql;
      let params = [];

      if (role === "MANAGER" || role === "RUNNER") {
        sql = `
          SELECT id, type, role, details, 
                 DATE_FORMAT(date, '%Y-%m-%d %H:%i') AS createdAt
          FROM report
          ORDER BY date DESC
          LIMIT 20
        `;
      } else {
        sql = `
          SELECT r.id, r.type, r.role, r.details,
                 DATE_FORMAT(r.date, '%Y-%m-%d %H:%i') AS createdAt
          FROM report r
          JOIN task t ON r.task_id = t.id
          WHERE t.persal_number = ?
          ORDER BY r.date DESC
          LIMIT 20
        `;
        params = [persal];
      }

      db.query(sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};
