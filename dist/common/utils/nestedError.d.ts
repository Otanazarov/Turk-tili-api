import { ValidationError } from 'class-validator';
export declare function getValidationErrors(errors: ValidationError[], parentPath?: string): string[];
