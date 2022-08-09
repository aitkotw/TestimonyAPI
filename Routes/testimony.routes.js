const express = require("express");

const testimonyControllers = require("../Controllers/testimony.controllers");
const router = express.Router();
const { uploadImage } = require("../Middleware/multer.middleware");

router.get("/testimony", testimonyControllers.getAllTestimony);
router.put("/testimony", testimonyControllers.updateOneTestimony);
router.post("/testimony", uploadImage, testimonyControllers.addNewTestimony);
router.delete(
  "/testimony",
  uploadImage,
  testimonyControllers.deleteOneTestimony
);

module.exports = router;
