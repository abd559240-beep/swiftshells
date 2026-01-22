import * as z from "zod";

export function stringToArray(
  inputString: string,
  splitString: "," | ":" = ","
): string[] {
  return inputString
    .split(splitString)
    .map((s) => s.trim())
    .filter(Boolean);
}

export const emailField = ({ fieldName }: { fieldName: string }) =>
  z.string({ required_error: `${fieldName} is required` }).email();

export const passwordField = ({
  fieldName,
  restrict = true,
}: {
  fieldName: string;
  restrict: boolean;
}) =>
  restrict
    ? z
        .string({ required_error: `${fieldName} is required` })
        .min(6, `${fieldName} must be at least 6 characters long`)
        .max(20, `${fieldName} must not exceed 20 characters`)
        .regex(
          /[A-Z]/,
          `${fieldName} must contain at least one uppercase letter`
        )
        .regex(
          /[a-z]/,
          `${fieldName} must contain at least one lowercase letter`
        )
        .regex(/\d/, `${fieldName} must contain at least one number`)
    : z
        .string({ required_error: `${fieldName} is required` })
        .min(6, `${fieldName} must be at least 6 characters long`)
        .max(20, `${fieldName} must not exceed 20 characters`);
