"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ExternalLink, Terminal, Copy, Check } from "lucide-react";
import Link from "next/link";

interface PublicationReaderProps {
    slug: string;
}

export default function PublicationReader({ slug }: PublicationReaderProps) {
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function loadContent() {
            try {
                const res = await fetch(`/content/${slug}.md`);
                if (!res.ok) throw new Error("Document not found");
                const text = await res.text();
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
        prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-emerald-400 prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/5
        prose-strong:text-white prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
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
