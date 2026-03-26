const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  addNotification: (text, persalNumber) => {
    return new Promise((resolve, reject) => {
      const id = uuidv4();

      const sql = `
        INSERT INTO notification 
        (id, text, time, is_read, persal_number)
        VALUES (?, ?,CURRENT_TIMESTAMP, ?, ?)
      `;

      const values = [id, text, 0, persalNumber];

      db.query(sql, values, (err, result) => {
        if (err) return reject(err);
        resolve({ result });
      });
    });
  },

  getNotifications: (persalNumber) => {
    return new Promise((resolve, reject) => {
      let query = `SELECT id, text, time, is_read,persal_number 
      FROM notification WHERE is_read = ? AND persal_number = ?`;

      db.query(query, [0, persalNumber], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  viewNotification: (notificationId, persalNumber) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE notification SET is_read = ? 
      WHERE id = ? AND persal_number = ?`;

      db.query(sql, [1, notificationId, persalNumber], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  viewNotifications: (persalNumber) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE notification SET is_read = ? 
      WHERE persal_number = ? AND is_read = ?`;

      db.query(sql, [1, persalNumber, 0], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
};
