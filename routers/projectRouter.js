const express = require("express");
const router = express.Router();
const project = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  project
    .get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log("Error getting projects", err);
      res.status(500).json({ error: "Error loading projects" });
    });
});

router.get("/:id", validateId, (req, res) => {
  project
    .get(req.params.id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.log("Error getting project id", err);
      res.status(500).json({ error: "Error getting project id" });
    });
});

router.get("/:id/actions", validateId, (req, res) => {
  project
    .getProjectActions(req.params.id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.log("Error getting project actions", err);
      res.status(500).json({ error: "Error getting project actions" });
    });
});

router.post("/", validateProject, (req, res) => {
  project
    .insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      console.log("Error posting project", err);
      res.status(500).json({ error: "Error posting project" });
    });
});

router.delete("/:id", validateId, (req, res) => {
  project
    .remove(req.params.id)
    .then((deleted) => {
      res.status(200).json({ message: `The project has been deleted` });
    })
    .catch((err) => {
      console.log("Error deleting project", err);
      res.status(500).json({ error: "Error deleting project" });
    });
});

router.put("/:id", validateId, validateProject, (req, res) => {
  project
    .update(req.params.id, req.body)
    .then((updated) => {
      res.status(201).json(updated);
    })
    .catch((err) => {
      console.log("Could not update project", err);
      res.status(500).json({ error: "Could not update project" });
    });
});

function validateId(req, res, next) {
  const { id } = req.params;
  project
    .get(id)
    .then((project) => {
      if (!project) {
        res.status(400).json({ message: "invalid id" });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log("Error getting id", err);
    });
}

function validateProject(req, res, next) {
  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .json({ message: "Please add a name and description for your project" });
  } else {
    next();
  }
}

module.exports = router;
