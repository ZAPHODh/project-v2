export const getFormDataValue = (key: string, formData: FormData) =>
  (formData.get(key) as string)?.toString() || "";
