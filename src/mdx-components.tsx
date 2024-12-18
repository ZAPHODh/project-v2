import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="title font-bold text-4xl md:text-5xl tracking-tight leading-tight border-b-2 border-gray-200 pb-2">
        {children}
      </h1>
    ),
    p: ({ children }) => (
      <p className="text-base md:text-lg leading-relaxed">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-5 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 space-y-2">{children}</ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="pl-4 border-l-4 border-blue-500 italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-red-600">
        {children}
      </code>
    ),
    wrapper: ({ children }) => (
      <div className="flex flex-col gap-4 p-4">{children}</div>
    ),
    ...components,
  };
}
