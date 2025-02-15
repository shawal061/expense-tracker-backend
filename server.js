const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Simulated database (array for now)
let expenses = [
    { id: 1, amount: 50, category: "Food", description: "Lunch", date: "2025-02-15" },
];

app.get("/", (req, res) => {
    res.send("Welcome to the Expense Tracker API!");
});

// Get all expenses
app.get("/expenses", (req, res) => {
    res.json(expenses);
});

// Add a new expense
app.post("/expenses", (req, res) => {
    const { amount, category, description, date } = req.body;
    const newExpense = { id: expenses.length + 1, amount, category, description, date };
    expenses.push(newExpense);
    res.json(newExpense);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
