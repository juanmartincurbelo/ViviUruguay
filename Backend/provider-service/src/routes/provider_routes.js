const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = new express.Router();

const providerController = require("../controllers/provider_controller");
const authentication = require("../middleware/authentication");
const imageUpload = require("../middleware/uploads");
const updateUploads = require("../middleware/update_uploads");

router.post("/events", authentication,
    (req, res, next) => {
        imageUpload.fields([
            { name: 'previewImage', maxCount: 1 },
            { name: 'mainImage', maxCount: 1 },
            { name: 'video', maxCount: 1 }
        ])(req, res, function (err) {
            if (err) {
                if (err.message === 'File name already exists. Please change the file name.') {
                    res.status(400).json(err.message);
                } else if (err instanceof multer.MulterError) {
                    res.status(400).json("The fields are not valid. If all fields are correct, please check the size.");
                } else {
                    res.status(500).json('Unknow error ocurred. Please try again later.');
                }
            } else {
                next();
            }
        });
    },
    providerController.createEvent);

router.get("/events", authentication, providerController.getProviderEvents);

router.get("/event", authentication, providerController.getProviderEvent);

router.put("/events/update-info", authentication, providerController.updateEventInfo);

router.put("/events/update-files", authentication,
    (req, res, next) => {
        updateUploads.fields([
            { name: 'previewImage', maxCount: 1 },
            { name: 'mainImage', maxCount: 1 },
            { name: 'video', maxCount: 1 }
        ])(req, res, function (err) {
            if (err) {
                if (err.message === 'File name already exists. Please change the file name.') {
                    res.status(400).json(err.message);
                } else if (err instanceof multer.MulterError) {
                    res.status(400).json("The fields are not valid. If all fields are correct, please check the size.");
                } else {
                    res.status(500).json('Unknow error ocurred. Please try again later.');
                }
            } else {
                next();
            }
        });
    }, providerController.updateEventFiles);

router.post("/send", authentication, providerController.sendMessage);

router.post("/login", providerController.login);
router.post("/logout", providerController.logout);

module.exports = router;
