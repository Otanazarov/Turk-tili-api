import { TestType } from '@prisma/client';
export declare class CreateTestDto {
    title?: string;
    description?: string;
    type: TestType;
    ieltsId: string;
}
