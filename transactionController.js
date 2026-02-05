const Transaction = require("../models/Transaction");

exports.addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      userId: req.user.id
    });
    await transaction.save();
    res.json(transaction);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    const diffHours =
      (Date.now() - new Date(transaction.createdAt)) / (1000 * 60 * 60);

    if (diffHours > 12) {
      return res.status(400).json({ msg: "Edit time expired (12 hours)" });
    }

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
