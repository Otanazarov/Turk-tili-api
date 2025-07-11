import { FileService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    uploadFile(file: Express.Multer.File): {
        originalname: string;
        filename: string;
        path: string;
    };
}
