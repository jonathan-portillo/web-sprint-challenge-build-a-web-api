const express = require("express");
const router = express.Router();
const action = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  action
    .get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log("Error getting actions", err);
    });
});

router.get("/:id", (req, res) => {
  action
    .get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log("Error getting actions id", err);
    });
});

router.post("/", (req, res) => {
  action
    .insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      console.log("Error posting a new action", err);
    });
});

module.exports = router;

//description and notes
