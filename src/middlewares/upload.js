const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = 'uploads/';
    console.log("Upload folder is :", uploadFolder);
    if(!uploadFolder){
      return callback(new Error('Destination path is missing!'));
    }
    cb(null, 'uploads/'); // this means no error and the file will be stored in the 'uploads' directory and if error occurs then it will be passed to the callback function as the first argument.
  },
  filename: (req, file, cb) => { // cb means callback function 

    const randomString = Math.random()
      .toString(36)
      .substring(2, 9);

    cb(null, randomString +"-" + path.extname(file.originalname));
  },
});

const upload = multer({  // this is used to How and where to store uploaded files.
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB 1KB = 1024 bytes, 1024 * 1024 = 1MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) { // this is used to check the file type which should be image/png image /jpg 
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

module.exports = upload;