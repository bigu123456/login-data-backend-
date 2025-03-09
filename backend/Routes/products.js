const express = require('express');
const router = express.Router();
const productRoutes = require("./Routes/products");


// Sample route for testing
router.get("/", (req, res) => {
    res.send("Products route working!");
});

module.exports = router;
