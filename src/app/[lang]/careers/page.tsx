import Link from "next/link";
import { Shield, Users, Code, Zap, Briefcase, Mail, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getDictionary } from "../../get-dictionary";

export default async function CareersPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as "en" | "zh");
    const careersDict = dict.careers;
    const positions = careersDict.positions;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-50 opacity-20 pointer-events-none">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-1000" />
            </div>

            {/* Navigation */}
            <Navbar lang={lang} dict={dict} mode="full" />

            <main className="max-w-6xl mx-auto px-8 py-20 space-y-32">
                {/* Hero Section */}
                <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                        <Users size={12} />
                        {careersDict.hiringBadge}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-3xl leading-[1.1]" dangerouslySetInnerHTML={{ __html: careersDict.heroTitle }} />
                    <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                        {careersDict.heroDesc}
                    </p>
                </section>

                {/* Positions Grid */}
                <section id="open-roles" className="space-y-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">{careersDict.openPositionsTitle}</h2>
                            <p className="text-zinc-500 text-sm max-w-md">{careersDict.openPositionsDesc}</p>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-900/50 px-4 py-2 rounded-lg border border-white/5">
                            {careersDict.currentCount}: {positions.length < 10 ? `0${positions.length}` : positions.length}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {positions.map((pos: { id: string, type: string, title: string, location: string, description: string, qualifications: string[], perks: string[] }) => (
                            <div key={pos.id} className="group relative bg-zinc-900/30 border border-white/5 p-10 rounded-3xl hover:bg-zinc-900/50 transition-all hover:border-blue-500/30 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[64px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">{pos.type}</div>
                                        <h3 className="text-2xl font-bold">{pos.title}</h3>
                                        <div className="text-xs text-zinc-500 flex items-center gap-2">
                                            <Briefcase size={12} />
                                            {pos.location}
                                        </div>
                                    </div>

                                    <p className="text-sm text-zinc-400 leading-relaxed">{pos.description}</p>

                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">{careersDict.minQualifications}</h4>
                                        <ul className="space-y-3">
                                            {pos.qualifications.map((qual: string, i: number) => (
                                                <li key={i} className="text-xs text-zinc-500 flex gap-3 leading-relaxed">
                                                    <div className="mt-1 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                                                    {qual}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {pos.perks.slice(0, 2).map((perk: string, i: number) => (
                                                <span key={i} className="text-[9px] font-mono bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                                                    {perk}
                                                </span>
                                            ))}
                                        </div>
                                        <a href="#apply" className="p-3 bg-white text-black rounded-xl hover:scale-110 transition-transform shadow-lg shadow-white/5">
                                            <ArrowRight size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Culture / Process */}
                <section className="grid md:grid-cols-3 gap-12 border-y border-white/5 py-32">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mx-auto md:mx-0">
                            <Zap size={24} />
                        </div>
                        <h4 className="font-bold">{careersDict.culture[0].title}</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            {careersDict.culture[0].desc}
                        </p>
                    </div>
                    <div className="space-y-4 text-center md:text-left border-y md:border-y-0 md:border-x border-white/5 py-12 md:py-0 md:px-12">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mx-auto md:mx-0">
                            <Shield size={24} />
                        </div>
                        <h4 className="font-bold">{careersDict.culture[1].title}</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            {careersDict.culture[1].desc}
                        </p>
                    </div>
                    <div className="space-y-4 text-center md:text-left">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto md:mx-0">
                            <Code size={24} />
                        </div>
                        <h4 className="font-bold">{careersDict.culture[2].title}</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            {careersDict.culture[2].desc}
                        </p>
                    </div>
                </section>

                {/* Application Section */}
                <section id="apply" className="relative group p-12 md:p-20 rounded-[40px] bg-gradient-to-b from-zinc-900 to-black border border-white/5 overflow-hidden text-center space-y-12">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-500/10 blur-[120px] -z-10" />

                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{careersDict.readyToBuildTitle}</h2>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            {careersDict.readyToBuildDesc}
                        </p>
                    </div>

                    <a
                        href="mailto:hr@emergence.science"
                        className="inline-flex items-center gap-4 text-2xl md:text-4xl font-mono font-bold hover:text-blue-400 transition-colors"
                    >
                        <Mail size={32} />
                        hr@emergence.science
                    </a>

                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] font-bold">
                        {careersDict.roleFormat}
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/5 py-12 px-8 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>{dict.footer.rights}</div>
                <div className="flex gap-8 mt-6 md:mt-0">
                    <Link href={`/${lang}`} className="hover:text-zinc-400">{dict.nav.protocol}</Link>
                    <Link href={`/${lang}/privacy`} className="hover:text-zinc-400">{dict.footer.privacy}</Link>
                    <span className="text-zinc-800">HK-HQ-SYMBOL-001</span>
                </div>
            </footer>
        </div>
    );
}
