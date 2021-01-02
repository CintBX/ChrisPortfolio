const express = require('express');
const router = express.Router();
const multer = require('multer');

const Image = require('../../models/Image');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  };
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// @route   POST /images/uploadmulter
// @descrip Upload image to DB
// @access  Private
router.route('/uploadmulter')
  .post(upload.single('imageData'), (req, res, next) => {
    console.log(req.file.path);
    const newImage = new Image({
      imageName: req.body.imageName,
      imageData: req.file.path,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price
    });

    newImage.save()
      .then(image => {
        res.json(image);
        console.log(image);
      })
      .catch(err => next(err));
  });

  module.exports = router;