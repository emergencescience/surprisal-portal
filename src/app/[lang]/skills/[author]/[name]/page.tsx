import Link from "next/link";
import { Shield, ExternalLink, Github, Server, Globe, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getDictionary } from "../../../../get-dictionary";

export default async function SkillPage({
    params,
}: {
    params: Promise<{ lang: string; author: string; name: string }>;
}) {
    const { lang, author, name } = await params;
    const dict = await getDictionary(lang as "en" | "zh");
    const sDict = dict.skills;

    // Fetch skill metadata from the orchestrator API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/skills/${author}/${name}`, {
        next: { revalidate: 3600 }
    });

    if (!response.ok) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-zinc-500">Skill not found.</p>
            </div>
        );
    }

    const skill = await response.json();

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 -z-50 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
            </div>

            {/* Navigation */}
            <Navbar lang={lang} dict={dict} mode="simple" backHref={`/${lang}/skills`} backLabel={sDict.back_to_skills} />

            <main className="max-w-4xl mx-auto px-8 py-20 space-y-16">
                {/* Header */}
                <div className="space-y-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${skill.verified ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' : 'border-amber-500/30 bg-amber-500/5 text-amber-400'} text-[10px] font-mono uppercase tracking-widest`}>
                        <Shield size={12} />
                        {skill.verified ? sDict.verified : sDict.unverified}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                        {skill.title}
                    </h1>
                    <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl">
                        {skill.description}
                    </p>
                </div>

                {/* Metadata Grid */}
                <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">{sDict.author}</h3>
                            <p className="text-xl font-medium">{skill.author}</p>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">{sDict.version}</h3>
                            <p className="text-xl font-mono text-emerald-500">{skill.version}</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-3">{sDict.details}</h3>
                        <div className="space-y-4">
                            {skill.site && (
                                <a href={skill.site} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <Globe size={18} className="text-zinc-500 group-hover:text-emerald-400" />
                                        <span className="text-sm font-medium">{sDict.site}</span>
                                    </div>
                                    <ExternalLink size={14} className="text-zinc-600" />
                                </a>
                            )}
                            {skill.repository && (
                                <a href={skill.repository} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <Github size={18} className="text-zinc-500 group-hover:text-emerald-400" />
                                        <span className="text-sm font-medium">{sDict.repo}</span>
                                    </div>
                                    <ExternalLink size={14} className="text-zinc-600" />
                                </a>
                            )}
                            {skill.mcp_server && (
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <Server size={18} className="text-zinc-500" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{sDict.mcp}</span>
                                            <span className="text-sm font-mono truncate max-w-[200px]">{skill.mcp_server}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Verification section */}
                <div className="p-12 rounded-[40px] bg-emerald-500/5 border border-emerald-500/10 space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight">{sDict.verification_title}</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        {sDict.verification_desc}
                    </p>
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 px-8 flex justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>{sDict.footer_rights}</div>
            </footer>
        </div>
    );
}
