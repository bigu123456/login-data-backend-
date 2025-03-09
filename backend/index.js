const express = require("express");
const cors = require("cors");
const pool = require("./db/Connection"); // Ensure this file is correctly configured

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8081;

// ✅ Route to fetch all users from the database
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM person");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
});

// ✅ Route to insert user into the database
app.post("/api/users", async (req, res) => {
  try {
    const { name, age, phone_number } = req.body;

    if (!name || !age || !phone_number) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO person (name, age, phone_number) VALUES ($1, $2, $3) RETURNING *";
    const result = await pool.query(sql, [name, age, phone_number]);

    res.status(201).json(result.rows[0]); // Return inserted user
  } catch (err) {
    console.error("Error inserting user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
