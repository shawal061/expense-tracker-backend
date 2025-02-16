const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;
const FILE_PATH = "expenses.json"; // JSON file for storing data

app.use(cors());
app.use(express.json());

// Load expenses from file (or create an empty array if file doesn't exist)
const loadExpenses = () => {
    try {
        const data = fs.readFileSync(FILE_PATH, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return []; // Return empty array if file is missing or corrupted
    }
};

// Save expenses to file
const saveExpenses = (expenses) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(expenses, null, 2), "utf8");
};

let expenses = loadExpenses(); // Load initial data

// GET /expenses - Retrieve all expenses
app.get("/expenses", (req, res) => {
    res.json(expenses);
});

// POST /expenses - Add a new expense
app.post("/expenses", (req, res) => {
    const newExpense = {
        id: expenses.length + 1,
        amount: Number(req.body.amount), // Ensure amount is a number
        category: req.body.category,
        description: req.body.description,
        date: req.body.date,
    };

    expenses.push(newExpense); // Add to array
    saveExpenses(expenses); // Save to file
    res.json(newExpense);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
