import { ValidationError } from 'class-validator';

export function getValidationErrors(
  errors: ValidationError[],
  parentPath = '',
): string[] {
  const messages: string[] = [];

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
