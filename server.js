const express = require("express");
const actionRouter = require("./routers/actionRouter");
const projectRouter = require("./routers/projectRouter");
const server = express();

server.use(express.json());
server.use("/action", actionRouter);
server.use("/project", projectRouter);

server.get("/", (req, res) => {
  res.json("Web Sprint Challenge Web Api - NODE");
});

module.exports = server;
