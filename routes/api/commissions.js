const express = require('express');
const router = express.Router();
const paginate = require('jw-paginate');
const authorize = require('../../middleware/authorize');
const upload = require('../../middleware/upload');

// Commission model
const Commission = require('../../models/Commission');

// @route   POST /commissions
// @descrip Create a new commission
// @access  Private
router.route('/').post(upload.single('imageData'), authorize, (req, res) => {
  const newCommission = new Commission({
    imageName: req.body.imageName,
    imageData: req.file.path,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price
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
    .then(commissions => {
      const page = parseInt(req.query.page) || 1;
      const pageSize = 8;
      const pager = paginate(commissions && commissions.length, page, pageSize);
      const pageOfCommissions = commissions && commissions.slice(pager.startIndex, pager.endIndex + 1);
      return res.json({ pager, pageOfCommissions });
    })
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
router.post('/:id', authorize, (req, res) => {
  const { title, description, price, image } = req.body;
  Commission.findById(req.params.id)
    .then(commission => {
      if(title) commission.title = title;
      if(description) commission.description = description;
      if(price) commission.price = price;
      return commission.save();
    })
    .then(savedCommission => res.json(savedCommission))
    .catch(err => res.status(400).json(`Edit/update commission failed: ${err}`));
});

// @route   DELETE /commissions/:id
// @descrip Delete a commission
// @access  Private
router.delete('/:id', authorize, (req, res) => {
  Commission.findById(req.params.id)
    .then(commission => commission.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json(`Delete commission failed: ${err}`));
});

module.exports = router;