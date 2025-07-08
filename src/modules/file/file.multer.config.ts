import { diskStorage } from 'multer';
import * as path from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'audio/mpeg', // MP3
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Ruxsat berilgan fayl turi
    } else {
      cb(new Error('Faqat MP3 yoki rasm fayllarga ruxsat berilgan'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
};

