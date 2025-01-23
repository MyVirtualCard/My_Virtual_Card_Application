import multer from 'multer';

// Configure Multer

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/Videos'); // Directory for uploads
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
  });
  
// Filter to allow only video files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"), false);
  }
};

// Multer instance with size limit
export const VideoUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB in bytes
  },
});