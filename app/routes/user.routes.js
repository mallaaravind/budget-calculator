module.exports = app => {
  const users = require("../controllers/user.controller.js");
  const transactions = require("../controllers/transaction.controller.js");

  var userRouter = require("express").Router();

  // Create a new User
  userRouter.post("/", users.create);

  // Retrieve all Users
  userRouter.get("/", users.findAll);

  // Retrieve a single User with id
  userRouter.get("/:id", users.findOne);

  // Update a User with id
  userRouter.put("/:id", users.update);

  // Delete a User with id
  userRouter.delete("/:id", users.delete);

  // Delete all users
  userRouter.delete("/", users.deleteAll);

  app.use('/api/users', userRouter);

  var userTransaction = require("express").Router();

  // Create a new Transaction
  userTransaction.post("/", transactions.create);

  // Retrieve all Transactions
  userTransaction.get("/", transactions.findAll);

  // Retrieve a single Transaction with id
  userTransaction.get("/:id", transactions.findOne);

  // Update a Transaction with id
  userTransaction.put("/:id", transactions.update);

  // Delete a Transaction with id
  userTransaction.delete("/:id", transactions.delete);

  // Delete all users
  userTransaction.delete("/", transactions.deleteAll);

  app.use('/api/transactions', userTransaction);

};
