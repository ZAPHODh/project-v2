export const fetchAPI = async (
  url: string,
  method: string,
  body?: any,
  options?: { tags?: string[] }
) => {
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    next: options?.tags ? { tags: options.tags } : undefined,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
    fetchOptions
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error: ${error.message || response.statusText}`);
  }
  return response.json();
};
