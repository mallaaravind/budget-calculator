const sql = require("./db.js");

// constructor
const Transaction = function(transaction) {
  this.user_id = transaction.user_id;
  this.type = transaction.type;
  this.recurring_type = transaction.recurring_type;
  this.date = transaction.date;
  this.end_date = transaction.end_date;
  this.amount = transaction.amount;
};

Transaction.create = (newTransaction, result) => {
  sql.query("INSERT INTO bdg_transaction SET ?", newTransaction, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created transaction: ", { id: res.insertId, ...newTransaction });
    result(null, { id: res.insertId, ...newTransaction });
  });
};

Transaction.findById = (id, result) => {
  sql.query(`SELECT * FROM bdg_transaction WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found transaction: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Transaction with the id
    result({ kind: "not_found" }, null);
  });
};

Transaction.getAll = (user_id, result) => {
  let query = "SELECT * FROM bdg_transaction";
  if (user_id) {
    query += ` WHERE user_id LIKE '%${user_id}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("transactions: ", res);
    result(null, res);
  });
};

Transaction.updateById = (id, transaction, result) => {
  sql.query(
    "UPDATE bdg_transaction SET user_id = ?, type = ?, recurring_type = ?, date = ?, end_date = ?, amount = ? WHERE id = ?",
    [transaction.user_id, transaction.type, transaction.recurring_type, transaction.date, transaction.end_date, transaction.amount, transaction.type, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Transaction with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated transaction: ", { id: id, ...res });
      result(null, { id: id, ...transaction });
    }
  );
};

Transaction.remove = (id, result) => {
  sql.query("DELETE FROM bdg_transaction WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Transaction with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted transaction with id: ", id);
    result(null, res);
  });
};

Transaction.removeAll = result => {
  sql.query("DELETE FROM bdg_transaction", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} transactions`);
    result(null, res);
  });
};

module.exports = Transaction;
