import axios from '@/axios'

const getBucketList = () => new Promise((resolve, reject) => {
    axios.get('/all-buckets')
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})

const createBucket = (bucketName) => new Promise((resolve, reject) => {
    axios.post('/create', {bucketName: bucketName})
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})

const getImages = (bucketName) => new Promise((resolve, reject) => {
    console.log("Bucket: ", bucketName)
    axios.post('/all-images', {bucketName: bucketName})
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})

const uploadImages = (formData) => new Promise((resolve, reject) => {
    var a = formData.get('file')
    console.log("FORMDATA: ", a)
    axios.post('/upload', formData)
    .then(res => {
        resolve(res.data);
    })
    .catch(err => {
        reject(err);
    })
})

export default {
    getBucketList,
    createBucket,
    getImages,
    uploadImages
}