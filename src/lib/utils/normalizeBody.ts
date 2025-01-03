import { Expense, Sale, Service } from "@prisma/client";
type schemas = {
  service: Service;
  expense: Expense;
  sale: Sale;
};

export function normalizeBody<schemas extends Record<string, any>>(
  body: Record<string, any>,
  schema: schemas
) {
  const normalized: Record<string, any> = {};

  for (const key in body) {
    if (!Object.hasOwn(schema, key)) {
      normalized[key] = body[key];
      continue;
    }

    const type = schema[key];
    const value = body[key];

    if (type === "float") {
      normalized[key] = parseFloat(value);
    } else if (type === "int") {
      normalized[key] = parseInt(value, 10);
    } else if (type === "date") {
      normalized[key] = new Date(value);
    } else {
      normalized[key] = value;
    }
  }

  return normalized;
}
