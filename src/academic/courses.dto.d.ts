export declare enum CourseLevel {
    Undergraduate = "undergraduate",
    Postgraduate = "postgraduate",
    Diploma = "diploma",
    Certificate = "certificate"
}
export declare enum CourseStatus {
    Active = "active",
    Inactive = "inactive",
    Archived = "archived"
}
export declare class CreateCourseDto {
    name: string;
    code: string;
    description?: string;
    level: string;
    durationYears: number;
    totalCredits?: number;
    isActive?: boolean;
}
export declare class UpdateCourseDto {
    name?: string;
    description?: string;
    level?: string;
    durationYears?: number;
    totalCredits?: number;
    isActive?: boolean;
}
export declare class GetCoursesDto {
    level?: string;
    search?: string;
    isActive?: boolean;
    limit?: number;
    skip?: number;
}
