import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";

/**
 * Processes Markdown string to HTML on the server.
 * This ensures zero client-side JS for basic markdown rendering.
 */
export async function markdownToHtml(markdown: string) {
    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw) // Allows processing raw HTML inside Markdown
        .use(rehypeHighlight) // Server-side code highlighting
        .use(rehypeSlug) // Adds IDs to headings for linking
        .use(rehypeStringify)
        .process(markdown);
    
    return result.toString();
}
