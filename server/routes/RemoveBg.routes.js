const express = require("express");
const router = express.Router();
const { removeBg } = require("../controllers/RemoveBg.controller");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/TEMP/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.floor(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: function (req, file, cb) {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}).array('image', 5);

router.post("/remove-bg", (req, res, next) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: 'Something went wrong while uploading' });
        } else if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'Please upload valid image files' });
        }
        next();
    });
}, removeBg);

module.exports = router;