import multer from 'multer'
// // Set storage engine
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/Profile/'); // Folder to store images
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname); // Unique filename
//     }
//   });
  
//   // File size limit (in bytes)
//   const fileSizeLimit = 3 * 1024 * 1024; // 3 MB
  
//   // Filter file type
//   const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
//     }
//   };
  
//   // Set up multer with the defined storage, size limit, and file type filter
//  export const ProfileUpload = multer({
//     storage: storage,
//     limits: { fileSize: fileSizeLimit },
//     fileFilter: fileFilter
//   }).any()

// Set up Multer storage to store files in memory
const storage = multer.memoryStorage();

// Initialize Multer with the storage configuration
export const upload = multer({ storage: storage });