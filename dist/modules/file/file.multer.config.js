"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
const multer_1 = require("multer");
const path = require("path");
exports.multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = path.extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            'audio/mpeg',
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Faqat MP3 yoki rasm fayllarga ruxsat berilgan'), false);
        }
    },
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
};
//# sourceMappingURL=file.multer.config.js.map