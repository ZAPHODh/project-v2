import { ROUTES } from "@/lib/routes-config";
import SubLink from "./sublink";

export default function TopicsMenu({ isSheet = false }) {
  return (
    <div className="flex flex-col gap-3.5 mt-5 pr-2 pb-6">
      {ROUTES.map((item, index) => {
        if (!item.dontShowNav) {
          const modifiedItems = {
            ...item,
            href: `${item.href}`,
            level: 0,
            isSheet,
          };

          return <SubLink key={item.title + index} {...modifiedItems} />;
        }
        return;
      })}
    </div>
  );
}
