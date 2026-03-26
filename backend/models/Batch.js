const { Batches } = require("openai/resources/batches.js");
const db = require("../config/db");

module.exports = {
  addBatch: (batchNumber, persalNumber) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO batch
        (batch_number, status, added_on, started_on, added_by)
        VALUES (?, "PENDING", 'CURRENT_TIMESTAMP', ?)
      `;
      const values = [batchNumber, persalNumber];

      db.query(sql, values, (err, result) => {
        if (err) return reject(err);
        resolve({ result });
      });
    });
  },

  //fetch all batch or filter by status
  getAllBatch: (status) => {
    return new Promise((resolve, reject) => {
      let params = [];
      let sql = null;

      if (status !== "ALL") {
        params = [status];
        sql = `SELECT batch_number, status, added_on, started_on, added_by
        FROM batch WHERE status = ?`;
      } else {
        `SELECT batch_number, status, added_on, started_on, added_by
        FROM batch`;
      }

      db.query(sql, params, (err, result) => {
        if (err) return reject(err);
        resolve({ result });
      });
    });
  },
};
