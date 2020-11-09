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

router.post("/", validateAction, (req, res) => {
  action
    .insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      console.log("Error posting a new action", err);
      res.status(500).json({ Message: "error posting to db" });
    });
});

router.get("/:id", validateId, (req, res) => {
  action
    .get(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log("Error getting action id", err);
      res.status(500).json({ Message: "error getting action id" });
    });
});

router.delete("/:id", validateId, (req, res) => {
  action
    .remove(req.params.id)
    .then((action) => {
      res.status(201).json({ message: "Action Deleted!" });
    })
    .catch((err) => {
      console.log("Error deleting action", err);
      res.status(500).json({ Message: "Error deleting action" });
    });
});

router.put("/:id", validateId, validateAction, (req, res) => {
  action
    .update(req.params.id, req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      console.log("Error updating action", err);
      res.status(500).json({ Message: "Error updating action" });
    });
});

function validateId(req, res, next) {
  const { id } = req.params;
  action
    .get(id)
    .then((action) => {
      if (!action) {
        res.status(400).json({ message: "invalid id" });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log("Error getting id", err);
    });
}

function validateAction(req, res, next) {
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    res
      .status(400)
      .json({ message: "Please add valid project id, description, and notes" });
  } else {
    next();
  }
}

module.exports = router;

// //description and notes
