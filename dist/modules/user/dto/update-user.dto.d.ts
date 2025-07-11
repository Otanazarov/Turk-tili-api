import { IELTSLevel } from '@prisma/client';
export declare class UpdateUserDto {
    name?: string;
    username?: string;
    avatarUrl?: string;
    level?: IELTSLevel;
    targetScore?: number;
    newPassword?: string;
    oldPassword?: string;
}
