import React from "react";
import "highlight.js/styles/github-dark.css"; 
import { Terminal, Copy, Check } from "lucide-react";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import { markdownToHtml } from "@/lib/markdown";

interface PublicationReaderProps {
    slug: string;
}

/**
 * Server Component to render Publications
 * Zero Client-Side JS for Content Rendering
 */
export default async function PublicationReader({ slug }: PublicationReaderProps) {
    let contentHtml = "";
    
    try {
        const filePath = path.join(process.cwd(), "public", "content", "protocol", `${slug}.md`);
        let markdown = await fs.readFile(filePath, "utf-8");

        // Rewrite relative image paths relative to the folder the slug is in
        const slugParts = slug.split('/');
        const folder = slugParts.length > 1 ? slugParts.slice(0, -1).join('/') : '';
        const baseResourcePath = `/content/protocol/${folder ? folder + '/' : ''}resources/`;

        markdown = markdown.replace(/src="\.\/resources\//g, `src="${baseResourcePath}`);
        markdown = markdown.replace(/src='\.\/resources\//g, `src='${baseResourcePath}`);
        markdown = markdown.replace(/\(\.\/resources\//g, `(${baseResourcePath}`);

        // Keep backward compatibility for ../resources/
        markdown = markdown.replace(/src="\.\.\/resources\//g, 'src="/content/resources/');
        markdown = markdown.replace(/src='\.\.\/resources\//g, "src='/content/resources/");
        markdown = markdown.replace(/\(\.\.\/resources\//g, '(/content/resources/');

        contentHtml = await markdownToHtml(markdown);
    } catch (err) {
        contentHtml = "<h1>404</h1><p>Protocol documentation not found.</p>";
    }

    return (
        <article className="max-w-5xl mx-auto py-8 px-6 min-h-screen text-zinc-300">
            {/* High-Density Header / Breadcrumb */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-white/5 pb-6 gap-4">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">
                        <Link href="/" className="hover:text-emerald-400">Marketplace</Link>
                        <span className="text-zinc-700">/</span>
                        <span className="text-zinc-400">Documentation</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Terminal size={18} className="text-emerald-500" />
                        Node_{slug.split('/').pop()?.toUpperCase()}
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    {/* Note: In a Server Component, interactivity like Copy requires a separate client component wrapper. 
                        Simplifying for now to maintain performance. */}
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[10px] font-mono text-emerald-500 hover:bg-emerald-500/20 transition-colors uppercase tracking-widest">
                        Protocol v1.0.1
                    </button>
                </div>
            </div>

            {/* Markdown Content with Marketplace Styling */}
            <div 
                className="prose prose-invert prose-emerald prose-sm md:prose-base max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                    prose-h1:text-4xl prose-h1:mb-12 prose-h1:text-emerald-500 prose-h1:pb-6 prose-h1:border-b prose-h1:border-white/5
                    prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-emerald-400/90
                    prose-h3:text-[10px] prose-h3:uppercase prose-h3:tracking-[0.4em] prose-h3:text-emerald-500/50 prose-h3:mt-12
                    prose-p:mb-10 prose-p:leading-[1.8] prose-p:text-zinc-400
                    prose-code:bg-emerald-500/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-emerald-400 prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-emerald-500/10
                    prose-pre:bg-black prose-pre:border prose-pre:border-white/10 prose-pre:p-0
                    prose-strong:text-white prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Marketplace Footer */}
            <div className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center">
                <div className="flex gap-4 mb-8">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-1 h-1 rounded-full bg-emerald-500/30" />
                    ))}
                </div>
                <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest text-center">
                    Emergence Science Marketplace Interface <br />
                    Verified Node Strategy | Protocol v1.0.1
                </p>
            </div>
        </article>
    );
}
