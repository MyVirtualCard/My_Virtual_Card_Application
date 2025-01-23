import multer from 'multer'

  // Set storage engine
const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/Product_Image/'); // Folder to store images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  }
});

// File size limit (in bytes)
const fileSizeLimit = 3 * 1024 * 1024; // 3 MB

// Filter file type
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
  }
};

// Set up multer with the defined storage, size limit, and file type filter
export const ProductUpload = multer({
  storage: Storage,
  limits: { fileSize:fileSizeLimit },
  fileFilter: fileFilter
});
