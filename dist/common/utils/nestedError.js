"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationErrors = getValidationErrors;
function getValidationErrors(errors, parentPath = '') {
    const messages = [];
    for (const error of errors) {
        const propertyPath = parentPath
            ? `${parentPath}.${error.property}`
            : error.property;
        if (error.constraints) {
            const constraints = Object.values(error.constraints);
            for (const msg of constraints) {
                messages.push(`${propertyPath}: ${msg}`);
            }
        }
        if (error.children && error.children.length > 0) {
            messages.push(...getValidationErrors(error.children, propertyPath));
        }
    }
    return messages;
}
//# sourceMappingURL=nestedError.js.map