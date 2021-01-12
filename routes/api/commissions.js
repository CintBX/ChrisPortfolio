const express = require('express');
const router = express.Router();
const paginate = require('jw-paginate');
const authorize = require('../../middleware/authorize');
const upload = require('../../middleware/upload');
const fs = require('fs');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

// Commission model
const Commission = require('../../models/Commission');

// AWS Configuration
const ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.S3_BUCKET;
const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
});

const uploadFile = (imagename, imagedata) => {
  const fileContent = fs.readFileSync(imagedata);
  const params = {
    Bucket: BUCKET_NAME,
    Key: imagename,
    Body: fileContent
  };

  s3.upload(params, function(err, data) {
    if(err) {
      throw err;
    }
    console.log(`File uploaded to S3 successfully: ${data.Location}`)
  });
};

// @route   POST /commissions
// @descrip Create a new commission
// @access  Private
router.route('/').post(upload.single('imageData'), authorize, (req, res) => {
  uploadFile(req.body.imageName, req.file.path);
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
      const pageSize = 12;
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