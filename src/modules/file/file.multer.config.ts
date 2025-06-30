import { diskStorage } from 'multer';
import * as path from 'path';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads', // papkani rootdan tashqariga yozish xatolik bermaydi
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  }),
};
