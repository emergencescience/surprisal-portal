"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css"; // High-fidelity dark mode code style
import { ArrowLeft, ExternalLink, Terminal, Copy, Check } from "lucide-react";
import Link from "next/link";
import mermaid from "mermaid";

interface PublicationReaderProps {
    slug: string;
}

// Low-level component to render Mermaid diagrams
const Mermaid = ({ chart }: { chart: string }) => {
    const [svg, setSvg] = useState<string>("");

    useEffect(() => {
        mermaid.initialize({
            startOnLoad: true,
            theme: "dark",
            securityLevel: "loose",
            fontFamily: "Inter, sans-serif",
        });

        const renderChart = async () => {
            const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
            try {
                const { svg } = await mermaid.render(id, chart);
                setSvg(svg);
            } catch (err) {
                console.error("Mermaid parsing error:", err);
            }
        };

        renderChart();
    }, [chart]);

    return (
        <div
            className="flex justify-center my-12 p-8 bg-black/40 border border-white/5 rounded-lg shadow-2xl overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
};

export default function PublicationReader({ slug }: PublicationReaderProps) {
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function loadContent() {
            try {
                const res = await fetch(`/content/protocol/${slug}.md`);
                if (!res.ok) throw new Error("Document not found");
                let text = await res.text();

                // Rewrite relative image paths relative to the folder the slug is in
                // Protocol slug: "verified-node/..." -> Resources: "/content/protocol/verified-node/resources/"
                const slugParts = slug.split('/');
                const folder = slugParts.length > 1 ? slugParts.slice(0, -1).join('/') : '';
                const baseResourcePath = `/content/protocol/${folder ? folder + '/' : ''}resources/`;

                text = text.replace(/src="\.\/resources\//g, `src="${baseResourcePath}`);
                text = text.replace(/src='\.\/resources\//g, `src='${baseResourcePath}`);
                text = text.replace(/\(\.\/resources\//g, `(${baseResourcePath}`);

                // Keep backward compatibility for ../resources/
                text = text.replace(/src="\.\.\/resources\//g, 'src="/content/resources/');
                text = text.replace(/src='\.\.\/resources\//g, "src='/content/resources/");
                text = text.replace(/\(\.\.\/resources\//g, '(/content/resources/');

                setContent(text);
            } catch (err) {
                setContent("# 404\nProtocol documentation not found.");
            } finally {
                setLoading(false);
            }
        }
        loadContent();
    }, [slug]);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-32 px-6 flex flex-col items-center gap-6">
                <div className="flex gap-2">
                    <div className="w-2 h-8 bg-emerald-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-8 bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-8 bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <p className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest animate-pulse">Synchronizing Protocol Node...</p>
            </div>
        );
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
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono hover:bg-white/10 transition-colors uppercase tracking-widest"
                    >
                        {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        {copied ? "Copied" : "Copy Path"}
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[10px] font-mono text-emerald-500 hover:bg-emerald-500/20 transition-colors uppercase tracking-widest">
                        <ExternalLink size={12} /> Live Console
                    </button>
                </div>
            </div>

            {/* Markdown Content with Marketplace Styling */}
            <div className="prose prose-invert prose-emerald prose-sm md:prose-base max-w-none 
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                prose-h1:text-4xl prose-h1:mb-12 prose-h1:text-emerald-500 prose-h1:pb-6 prose-h1:border-b prose-h1:border-white/5
                prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-emerald-400/90
                prose-h3:text-[10px] prose-h3:uppercase prose-h3:tracking-[0.4em] prose-h3:text-emerald-500/50 prose-h3:mt-12
                prose-p:mb-10 prose-p:leading-[1.8] prose-p:text-zinc-400
                prose-code:bg-emerald-500/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-emerald-400 prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-emerald-500/10
                prose-pre:bg-black prose-pre:border prose-pre:border-white/10 prose-pre:p-0
                prose-strong:text-white prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeKatex]}
                    components={{
                        // Prevent Hydration Error: Unpack P if it contains Figure/Img
                        p: ({ children }) => {
                            const hasImage = React.Children.toArray(children).some(
                                (child) => React.isValidElement(child) && (child.type === 'img' || (child.props as any)?.node?.tagName === 'img')
                            );
                            if (hasImage) return <div className="my-10">{children}</div>;
                            return <p className="mb-8">{children}</p>;
                        },
                        // Custom code renderer for Mermaid
                        code: ({ node, className, children, ...props }: any) => {
                            const match = /language-mermaid/.exec(className || "");
                            if (match) {
                                return <Mermaid chart={String(children).replace(/\n$/, "")} />;
                            }
                            return <code className={className} {...props}>{children}</code>;
                        },
                        // High-Fidelity Image Rendering (Markdown + HTML)
                        img: ({ node, ...props }) => (
                            <figure className="my-16 flex flex-col items-center gap-4 p-8 bg-white/5 border border-white/10 rounded-lg shadow-2xl group transition-all hover:bg-white/10">
                                <div className="relative overflow-hidden rounded-md border border-white/20 shadow-emerald-500/10 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                                    <img
                                        {...props}
                                        className="mx-auto max-h-[700px] object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 pointer-events-none border border-emerald-500/10" />
                                </div>
                                {props.alt && (
                                    <figcaption className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em] text-center italic mt-4">
                                        <span className="text-emerald-500 font-bold mr-2">VERIFICATION_PROOF //</span>
                                        {props.alt}
                                    </figcaption>
                                )}
                            </figure>
                        ),
                        // Professional Code Highlighting Container
                        pre: ({ children }) => (
                            <pre className="overflow-hidden rounded-lg border border-white/10 my-10 shadow-xl bg-black">
                                <div className="px-4 py-2 border-b border-white/5 bg-white/5 flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/10" />
                                    </div>
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Protocol_Payload</span>
                                </div>
                                <div className="p-6 overflow-x-auto text-[0.9em]">
                                    {children}
                                </div>
                            </pre>
                        ),
                        // Matrix styled list indicators
                        ul: ({ children }) => (
                            <ul className="list-none pl-6 space-y-6 my-10">
                                {children}
                            </ul>
                        ),
                        li: ({ children }) => (
                            <li className="relative group text-zinc-400 hover:text-white transition-colors">
                                <div className="absolute -left-7 top-2 w-1.5 h-1.5 bg-zinc-800 group-hover:bg-emerald-500 shadow-emerald-500/50 shadow-sm transition-all" />
                                <div className="leading-relaxed">{children}</div>
                            </li>
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

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
