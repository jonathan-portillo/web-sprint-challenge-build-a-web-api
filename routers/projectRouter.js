const express = require("express");
const router = express.Router();
const project = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  project
    .get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => console.log("Error getting projects", err));
});

router.get("/:id", (req, res) => {
  project
    .get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => console.log("Error getting project id"));
});

router.get("/:id/actions", (req, res) => {
  project
    .getProjectActions(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => console.log("Error getting project actions"));
});

router.post("/", (req, res) => {
  project
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log("Error posting project", err);
    });
});

router.delete("/:id", (req, res) => {
  project.remove(req.params.id).then((deleted) => {
    res.status(200).json({ message: `The project has been deleted` });
  });
});

router.put("/:id", (req, res) => {
  project
    .update(req.params.id, req.body)
    .then((updated) => {
      res.status(200).json(updated);
    })
    .catch((err) => console.log("Could not update project", err));
});

module.exports = router;
