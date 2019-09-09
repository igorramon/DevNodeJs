const express = require("express");

const server = express();
server.use(express.json());

let numberOfRequest = 0;
const projects = [];

server.use((req, res, next) => {
  numberOfRequest++;

  console.log("Requisição Número: ", numberOfRequest);
  return next();
});

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not exists" });
  }

  return next();
}

server.post("/projects", (req, res) => {
  const newProject = req.body;

  projects.push(newProject);

  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projetctIndex = projects.findIndex(p => p.id == id);

  projects.splice(projetctIndex, 1);

  return res.send();
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);
  project.tasks.push(title);

  return res.json(project);
});

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.listen(3000);
