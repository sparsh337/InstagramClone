const express = require("express");
const upload = require("./multer"); // Import multer setup
const router = express.Router();

router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("✅ Cloudinary Image URL:", req.file.path); // Debugging: See if Cloudinary URL is correct

  res.json({ imageUrl: req.file.path }); // Return the uploaded image URL
});

module.exports = router;
