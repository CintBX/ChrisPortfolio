const express = require('express');
const router = express.Router();

// Commission model
const Commission = require('../../models/Commission');

// @route   POST /commissions
// @descrip Create a new commission
// @access  Private
router.post('/', (req, res) => {
  const newCommission = new Commission({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image
  });
  newCommission.save()
    .then(commission => res.json(commission))
    .catch(err => res.status(400).json(`Create new commission failed: ${err}`));
});

// @route   GET /commissions
// @descrip Show all commissions
// @access  Public
router.get('/', (req, res) => {
  Commission.find()
    .sort({ createdAt: -1 })        // -1 is descending order; 1 is ascending order
    .then(commissions => res.json(commissions))
    .catch(err => res.status(400).json(`Show all commissions failed: ${err}`));
});

// @route   GET /commissions/:id
// @descrip Show one commission
// @access  Public
router.get('/:id', (req, res) => {
  Commission.findById(req.params.id)
    .then(commission => res.json(commission))
    .catch(err => res.status(400).json(`Show one commission failed: ${err}`));
});

// @route   POST /commissions/:id
// @descrip Edit/update a commission
// @access  Private
router.post('/:id', (req, res) => {
  const { title, description, price, image } = req.body;
  Commission.findById(req.params.id)
    .then(commission => {
      if(title) commission.title = title;
      if(description) commission.description = description;
      if(price) commission.price = price;
      if(image) commission.image = image;
      return commission.save();
    })
    .then(savedCommission => res.json(savedCommission))
    .catch(err => res.status(400).json(`Edit/update commission failed: ${err}`));
});

// @route   DELETE /commissions/:id
// @descrip Delete a commission
// @access  Private
router.delete('/:id', (req, res) => {
  Commission.findById(req.params.id)
    .then(commission => commission.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json(`Delete commission failed: ${err}`));
});

module.exports = router;