
import multer from 'multer';
import path from 'path'

// Set storage engine
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const productUpload = multer({
  storage: storage,
  limits: {fileSize: 2 * 1024 * 1024  }, // 2MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('ProductImage');

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}
export default productUpload;
// // Define storage for the images
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'Gallery'); // specify the upload directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// // Set file size limit to 2MB
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
//   fileFilter: function (req, file, cb) {
//     const filetypes = /jpeg|jpg|png/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only images are allowed!'));
//     }
//   }
// });

// export default upload;


// //Multer storage:
// const storage=multer.diskStorage({
//   destination:(req,file,cb)=>{
//   cd(null,'public/assets')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);  // specify the file name
//   }
//   });
//   const upload=multer({storage})

//   export default upload;