export declare class CreateWritingSubPartDto {
    order: number;
    label: string;
    question: string;
}
export declare class CreateWritingSectionDto {
    order: number;
    title: string;
    description?: string;
    subParts: CreateWritingSubPartDto[];
}
export declare class CreateWritingTestDto {
    title: string;
    instruction?: string;
    ieltsId: string;
    sections: CreateWritingSectionDto[];
}
