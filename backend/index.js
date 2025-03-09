const express = require("express");
const cors = require("cors");
const pool = require("./db/Connection"); // Ensure this file is correctly configured

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8081;



// Route to insert user into the database
app.post("/api/users", async (req, res) => {
  const { name, age, phone_number } = req.body;
  if (!name || !age || !phone_number) return res.status(400).json({ error: "All fields are required" });

  try {
    const { rows } = await pool.query("INSERT INTO person (name, age, phone_number) VALUES ($1, $2, $3) RETURNING *", [name, age, phone_number]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
