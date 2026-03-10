"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCoursesDto = exports.UpdateCourseDto = exports.CreateCourseDto = exports.CourseStatus = exports.CourseLevel = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var CourseLevel;
(function (CourseLevel) {
    CourseLevel["Undergraduate"] = "undergraduate";
    CourseLevel["Postgraduate"] = "postgraduate";
    CourseLevel["Diploma"] = "diploma";
    CourseLevel["Certificate"] = "certificate";
})(CourseLevel || (exports.CourseLevel = CourseLevel = {}));
var CourseStatus;
(function (CourseStatus) {
    CourseStatus["Active"] = "active";
    CourseStatus["Inactive"] = "inactive";
    CourseStatus["Archived"] = "archived";
})(CourseStatus || (exports.CourseStatus = CourseStatus = {}));
class CreateCourseDto {
}
exports.CreateCourseDto = CreateCourseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true, description: 'name' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true, description: 'code' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false, description: 'description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: true, description: 'level', enum: CourseLevel }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(Object.values(CourseLevel)),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: true, description: 'durationYears', minimum: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "durationYears", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false, description: 'totalCredits', minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "totalCredits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, required: false, description: 'isActive' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCourseDto.prototype, "isActive", void 0);
class UpdateCourseDto {
}
exports.UpdateCourseDto = UpdateCourseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false, description: 'name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false, description: 'description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false, description: 'level', enum: CourseLevel }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(Object.values(CourseLevel)),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false, description: 'durationYears', minimum: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateCourseDto.prototype, "durationYears", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false, description: 'totalCredits', minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateCourseDto.prototype, "totalCredits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, required: false, description: 'isActive' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCourseDto.prototype, "isActive", void 0);
class GetCoursesDto {
}
exports.GetCoursesDto = GetCoursesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false, description: 'level' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCoursesDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false, description: 'search' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetCoursesDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, required: false, description: 'isActive' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], GetCoursesDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false, description: 'limit' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetCoursesDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false, description: 'skip' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], GetCoursesDto.prototype, "skip", void 0);
//# sourceMappingURL=courses.dto.js.map