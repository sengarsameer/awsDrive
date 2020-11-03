const express = require('express');
const router = new express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: 'AKIAJCUXDBSYGLGF52LQ',
    secretAccessKey: '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'
})
var storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '');
    }
});
var multipleUpload = multer({ storage: storage }).array('file');
// var upload = multer({ storage: storage }).single('file');


router.get('/', (req, res) => {
    res.status(200).send("Hello");
})


// Uploading the images
router.post('/upload', multipleUpload, (req, res) => {
    const bucketName = req.body.bucketName;
    console.log("REq: ", req.files);
    console.log("Name: ", bucketName)
    // req.files.map((item) => {
    //     let myFile = item.originalname.split('.');
    //     const fileType = myFile[myFile.length - 1];
    //     // console.log("File: ", req.file);
    //     // console.log("BucketName: ", req.body.bucketName);
    //     const params = {
    //         Bucket: bucketName,
    //         Key: `${uuidv4()}.${fileType}`,
    //         Body: item.buffer
    //     }

    //     s3.upload(params, (error, data) => {
    //         if(error) {
    //             res.status(500).send(error);
    //         }
    //         else {
    //             res.status(200).send(data);
    //         }
    //     })

    // })

    
    
})

// Creating the bucket
router.post('/create', (req, res) => {
    let params = {
        Bucket: req.body.bucketName
    }
    s3.createBucket(params, (err, data) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    })
})

// Showing all the buckets
router.get('/all-buckets', (req, res) => {
    s3.listBuckets((err, data) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data.Buckets);
        }
    })
})

// Showing elemnets from the bucket
router.post('/all-images', (req, res) => {
    let params = {
        Bucket: req.body.bucketName
    }
    s3.listObjects(params, (err, data) => {
        if(err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data)
        }
    })
})


module.exports = router;