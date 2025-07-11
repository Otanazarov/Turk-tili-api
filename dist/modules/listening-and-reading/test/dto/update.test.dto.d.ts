import { TestType } from '@prisma/client';
export declare class UpdateTestDto {
    title?: string;
    description?: string;
    type?: TestType;
    ieltsId?: string;
}
