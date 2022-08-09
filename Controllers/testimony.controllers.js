const express = require("express");

// Load Model
const Testimony = require("../Model/testimony");
// Load Input validation
const isEmpty = require("../Validation/is-empty");

// DESC => Fetch All Testimonies
// Request => GET /api/testimony
const getAllTestimony = async (req, res, next) => {
  try {
    await Testimony.find({}, (err, result) => {
      if (!err) {
        res.status(200).json(result);
      } else {
        res.status(400).json({ error: "Unable to fetch Data" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

// DESC => Add New Testimony
// Request => POST /api/testimony
const addNewTestimony = async (req, res, next) => {
  bodyDataKey = ["name", "post", "discription"];
  bodyDataKey.forEach((key) => {
    isEmpty(req.body[key])
      ? res.status(400).json({ [key]: `${key} field is required` })
      : null;
  });

  try {
    const newTestimony = new Testimony({
      name: req.body.name,
      post: req.body.post,
      discription: req.body.discription,
      photo: req.file.filename,
    });

    newTestimony.save({}, (err, doc) => {
      if (!err) {
        return res.status(200).json(doc);
      } else {
        console.log(err);
        return res.status(400).json({ error: "Unable to save data" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

// DESC => Update Existing testimony {id}
// Request => PUT /api/testimony
const updateOneTestimony = async (req, res, next) => {
  isEmpty(req.body.id)
    ? res.status(400).json({ id: "id field is required" })
    : null;

  try {
    const updatedTestimony = {};
    !isEmpty(req.body.name) ? (updatedTestimony.name = req.body.name) : null;
    !isEmpty(req.body.post) ? (updatedTestimony.post = req.body.post) : null;
    !isEmpty(req.body.discription)
      ? (updatedTestimony.discription = req.body.discription)
      : null;
    console.log(updatedTestimony);
    const result = await Testimony.findOneAndUpdate(
      { _id: req.body.id },
      updatedTestimony
    );

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json({ error: "Unable to save data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

// DESC => Delete Single Testimony {id}
// Request => DELETE /api/testimony
const deleteOneTestimony = async (req, res, next) => {
  isEmpty(req.body.id)
    ? res.status(400).json({ id: "id field is required" })
    : null;

  try {
    await Testimony.findByIdAndUpdate(
      req.body.id,
      { isActive: false },
      (err, result) => {
        if (!err) {
          res.status(200).json(result);
        } else {
          res.status(400).json({ error: "Unable to fetch Data" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

module.exports = {
  getAllTestimony,
  addNewTestimony,
  updateOneTestimony,
  deleteOneTestimony,
};
