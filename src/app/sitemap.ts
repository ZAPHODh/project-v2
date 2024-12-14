import { ROUTES } from "@/lib/routes-config";

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap() {
  const allRoutes = ROUTES.flatMap((route) => {
    const parentRoute = {
      url: `${baseUrl}${route.href}`,
      lastModified: new Date().toISOString().split("T")[0],
    };
    const childRoutes = (route.items || []).map((item) => ({
      url: `${baseUrl}${route.href}${item.href}`,
      lastModified: new Date().toISOString().split("T")[0],
    }));

    return [parentRoute, ...childRoutes];
  });

  const rootRoute = {
    url: `${baseUrl}/`,
    lastModified: new Date().toISOString().split("T")[0],
  };

  return [rootRoute, ...allRoutes];
}
