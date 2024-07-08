
import multer from 'multer';
import path from 'path';
// Import necessary functions from the url and path modules
import { fileURLToPath } from 'url';
// Convert the URL of the current module to a filename
const __filename = fileURLToPath(import.meta.url); 
// Extract the directory name from the filename
const __dirname = path.dirname(__filename);
// Set storage engine
const storage = multer.diskStorage({
  destination:'public/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({
  storage: storage,
  limits: {fileSize: 5 * 1024 * 1024  }, // 5MB limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('GalleryImage');

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
export default upload;
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