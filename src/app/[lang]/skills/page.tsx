import Link from "next/link";
import { Shield, Search, Filter, ArrowRight, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getDictionary } from "../../get-dictionary";

export default async function SkillsIndexPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as "en" | "zh");
    const sDict = dict.skills;

    // Fetch verified skills from the orchestrator API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/skills?verified_only=true`, {
        next: { revalidate: 3600 } // Cache for 1 hour
    });

    interface Skill {
        id: string;
        author: string;
        title: string;
        description: string;
        version: string;
        verified: boolean;
    }

    const verifiedSkills: Skill[] = await response.json();

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-50 opacity-20 pointer-events-none">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-1000" />
            </div>

            {/* Navigation */}
            <Navbar lang={lang} dict={dict} mode="full" />

            <main className="max-w-6xl mx-auto px-8 py-20 space-y-20">
                {/* Hero section */}
                <section className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                        <Shield size={12} />
                        {sDict.index.hero_badge}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-3xl leading-[1.1]">
                        {sDict.index.hero_title}
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                        {sDict.index.hero_desc}
                    </p>
                </section>

                {/* Search and Filter */}
                <section className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-xl">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            type="text"
                            placeholder={sDict.index.search_placeholder}
                            className="w-full bg-black border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
                            <Filter size={14} /> {sDict.index.filter_category}
                        </button>
                        <button className="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                            {sDict.index.filter_latest}
                        </button>
                    </div>
                </section>

                {/* Skills Grid */}
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {verifiedSkills.map((skill) => (
                        <Link
                            key={skill.id}
                            href={`/${lang}/skills/${skill.author}/${skill.id}`}
                            className="group relative bg-zinc-900/20 border border-white/5 p-8 rounded-[40px] hover:bg-zinc-900/40 transition-all hover:border-emerald-500/30 flex flex-col justify-between h-full"
                        >
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                                        <Shield size={24} />
                                    </div>
                                    <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[9px] font-mono font-bold uppercase tracking-widest">
                                        {sDict.verified}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold group-hover:text-emerald-400 transition-colors tracking-tight">{skill.title}</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{skill.description}</p>
                                </div>
                            </div>
                            <div className="pt-8 flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">{sDict.author}</span>
                                    <span className="text-sm font-medium text-zinc-400">{skill.author}</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>
            </main>

            <footer className="border-t border-white/5 py-12 px-8 flex justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>{sDict.footer_rights}</div>
                <div className="flex gap-4">
                    <a href="https://github.com/emergencescience" className="hover:text-white transition-colors">
                        <ExternalLink size={14} />
                    </a>
                </div>
            </footer>
        </div>
    );
}
