// src/mdx-components.tsx (of in de root /mdx-components.tsx)
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Hier kun je HTML elementen overriden, bijv:
        // h1: ({ children }) => <h1 style={{ color: "red" }}>{children}</h1>,
        ...components,
    }
}