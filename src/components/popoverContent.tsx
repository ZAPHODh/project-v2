"use client";

type PopoverContentType = {
  title: string;
  content: string;
};

export function PopoverContent({ title, content }: PopoverContentType) {
  return (
    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="px-3 py-2">
        <p>{content}</p>
      </div>
    </div>
  );
}
