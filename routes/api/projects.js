const express = require('express');
const router = express.Router();

// Project model
const Project = require('../../models/Project');

// @route   POST /projects
// @descrip Create a new project
// @access  Private
router.post('/', (req, res) => {
  const newProject = new Project({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image
  });
  newProject.save()
    .then(project => res.json(project))
    .catch(err => res.status(400).json(`Create new project failed: ${err}`));
});

// @route   GET /projects
// @descrip Show all projects
// @access  Public
router.get('/', (req, res) => {
  Project.find()
    .sort({ createdAt: -1 })        // -1 is descending order; 1 is ascending order
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json(`Show all projects failed: ${err}`));
});

// @route   GET /projects/:id
// @descrip Show one project
// @access  Public
router.get('/:id', (req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json(`Show one project failed: ${err}`));
});

// @route   POST /projects/:id
// @descrip Edit/update a project
// @access  Private
router.post('/:id', (req, res) => {
  const { title, description, image } = req.body;
  Project.findById(req.params.id)
    .then(project => {
      if(title) project.title = title;
      if(description) project.description = description;
      if(image) project.image = image;
      return project.save();
    })
    .then(savedProject => res.json(savedProject))
    .catch(err => res.status(400).json(`Edit/update project failed: ${err}`));
});

// @route   DELETE /projects/:id
// @descrip Delete a project
// @access  Private
router.delete('/:id', (req, res) => {
  Project.findById(req.params.id)
    .then(project => project.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json(`DELETE project failed: ${err}`));
});

module.exports = router;