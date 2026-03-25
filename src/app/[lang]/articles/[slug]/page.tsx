import { getDictionary } from "../../../get-dictionary";
import Navbar from "@/components/Navbar";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { markdownToHtml } from "@/lib/markdown";
import "highlight.js/styles/github-dark.css";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: "en" | "zh", slug: string }>;
}): Promise<Metadata> {
    const { lang, slug } = await params;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    
    try {
        const response = await fetch(`${apiUrl}/articles/${slug}`);
        if (!response.ok) return { title: "Article Not Found" };
        const article = await response.json();
        
        return {
            title: `${article.title} | Emergence Science`,
            description: article.content.substring(0, 160).replace(/[#*`]/g, ''),
            openGraph: {
                title: article.title,
                description: article.content.substring(0, 160).replace(/[#*`]/g, ''),
                type: "article",
                publishedTime: article.created_at,
                locale: lang === 'en' ? 'en_US' : 'zh_CN',
                url: `https://emergence.science/${lang}/articles/${slug}`,
            },
            alternates: {
                canonical: `https://emergence.science/${lang}/articles/${slug}`,
            }
        };
    } catch {
        return { title: "Emergence Science" };
    }
}

export default async function ArticleDetailPage({
    params,
}: {
    params: Promise<{ lang: "en" | "zh", slug: string }>;
}) {
    const { lang, slug } = await params;
    const dict = await getDictionary(lang);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const response = await fetch(`${apiUrl}/articles/${slug}`, {
        next: { revalidate: 3600 } // Cache for an hour
    });

    if (!response.ok) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
                <h1 className="text-4xl font-bold mb-4 italic">{dict.articles.detail.not_found_title}</h1>
                <p className="text-zinc-500 mb-8 font-mono">{dict.articles.detail.not_found_desc}</p>
                <Link href={`/${lang}/articles`} className="px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs">
                    {dict.articles.detail.back_to_articles}
                </Link>
            </div>
        );
    }

    const article = await response.json();
    const contentHtml = await markdownToHtml(article.content);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "datePublished": article.created_at,
        "author": {
            "@type": "Organization",
            "name": "Emergence Science Research",
            "url": "https://emergence.science"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Emergence Science",
            "logo": {
                "@type": "ImageObject",
                "url": "https://emergence.science/favicon.ico"
            }
        },
        "description": article.content.substring(0, 160).replace(/[#*`]/g, '')
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-blue-500/30 overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar lang={lang} dict={dict} mode="full" />

            <article className="max-w-4xl mx-auto py-20 px-8">
                {/* Meta Header */}
                <header className="mb-16 space-y-8">
                    <Link href={`/${lang}/articles`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                        <ArrowLeft size={14} /> {dict.articles.detail.back_to_articles}
                    </Link>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] font-bold">
                            <span className="flex items-center gap-2">
                                <Calendar size={12} />
                                {new Date(article.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN')}
                            </span>
                            <span className="text-zinc-800">/</span>
                            <span className="flex items-center gap-2">
                                <User size={12} />
                                {article.type}
                            </span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight text-white italic">
                            {article.title}
                        </h1>
                    </div>
                </header>

                {/* Markdown Content */}
                <div 
                    className="prose prose-invert prose-blue prose-sm md:prose-base max-w-none 
                        prose-headings:font-bold prose-headings:tracking-tighter prose-headings:text-white
                        prose-h1:text-4xl prose-h1:mb-12 prose-h1:text-blue-500 prose-h1:pb-6 prose-h1:border-b prose-h1:border-white/5
                        prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-blue-400
                        prose-h3:text-[10px] prose-h3:uppercase prose-h3:tracking-[0.4em] prose-h3:text-blue-500/50 prose-h3:mt-12
                        prose-p:mb-10 prose-p:leading-[1.8] prose-p:text-zinc-400
                        prose-code:bg-blue-500/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-blue-400 prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-blue-500/10
                        prose-pre:bg-zinc-950/50 prose-pre:backdrop-blur-xl prose-pre:border prose-pre:border-white/5 prose-pre:p-6 prose-pre:rounded-3xl
                        prose-strong:text-white prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />

                {/* Article Footer */}
                <div className="mt-24 pt-12 border-t border-white/5 flex flex-col items-center">
                    <div className="flex gap-4 mb-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-1 rounded-full bg-blue-500/30" />
                        ))}
                    </div>
                    <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest text-center leading-loose">
                        {dict.articles.detail.protocol_footer} <br />
                        {dict.articles.detail.verified_signal} | {article.slug}
                    </p>
                </div>
            </article>

            <footer className="border-t border-white/5 py-12 px-8 flex justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>© 2026 Emergence Science Research</div>
            </footer>
        </div>
    );
}
