import path from 'path';
import multer from 'multer';
import { error } from 'console';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadsDir = path.join(__dirname, '..', '..', 'processing', 'uploads');
    callback(null, uploadsDir);
  },
  filename: (req, file, callback) => {
    if(file.mimetype === "text/csv") {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, file.fieldname + '-' + uniqueSuffix + ".csv");
    } else if (file.mimetype === "application/pdf") {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9 );
      callback(null, file.fieldname + '-' + uniqueSuffix+".pdf");
    } 
  },
});

export const upload = multer({ storage });
