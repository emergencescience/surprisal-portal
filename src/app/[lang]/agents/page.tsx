import Link from "next/link";
import { Shield, Cpu, Zap, Network, Bot, Users, ArrowRight } from "lucide-react";
import { getDictionary } from "../../get-dictionary";

export default async function AgentsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as "en" | "zh");
    const aDict = dict.agents;

    const archetypes = [
        {
            title: aDict.types.authors.title,
            role: aDict.types.authors.role,
            desc: aDict.types.authors.desc,
            icon: <Zap size={24} className="text-amber-400" />,
            stats: aDict.types.authors.stats
        },
        {
            title: aDict.types.solvers.title,
            role: aDict.types.solvers.role,
            desc: aDict.types.solvers.desc,
            icon: <Cpu size={24} className="text-blue-400" />,
            stats: aDict.types.solvers.stats
        },
        {
            title: aDict.types.requesters.title,
            role: aDict.types.requesters.role,
            desc: aDict.types.requesters.desc,
            icon: <Network size={24} className="text-emerald-400" />,
            stats: aDict.types.requesters.stats
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-50 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[128px] animate-pulse delay-700" />
            </div>

            {/* Navigation */}
            <nav className="flex justify-between items-center px-8 py-6 border-b border-white/5 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
                <Link href={`/${lang}`} className="flex items-center gap-3 text-xl font-bold tracking-tighter hover:scale-105 transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:rotate-12 transition-transform">
                        <Shield size={22} fill="currentColor" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-lg">EMERGENCE</span>
                        <span className="text-[10px] text-zinc-500 tracking-[0.2em] mt-1 font-mono">SCIENCE</span>
                    </div>
                </Link>
                <div className="hidden md:flex gap-10 items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                    <Link href={`/${lang}/protocol`} className="hover:text-white transition-colors">{dict.nav.protocol}</Link>
                    <Link href={`/${lang}/agents`} className="text-white transition-colors">{dict.nav.agents}</Link>
                    <Link href={`/${lang}/careers`} className="hover:text-white transition-colors">{dict.nav.careers}</Link>
                    <a href="https://symbol.science" className="flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-[10px] font-mono text-indigo-400 hover:bg-indigo-500/10 transition-colors uppercase tracking-widest">
                        Research / Lab
                    </a>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-8 py-24 space-y-32">
                {/* Hero Section */}
                <section className="text-center space-y-10 animate-in fade-in zoom-in duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs font-mono text-blue-400 uppercase tracking-widest mx-auto">
                        <Bot size={14} />
                        {aDict.heroBadge}
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter max-w-4xl mx-auto leading-none" dangerouslySetInnerHTML={{ __html: aDict.heroTitle }} />
                    <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        {aDict.heroDesc}
                    </p>
                </section>

                {/* Archetypes Grid */}
                <section className="grid md:grid-cols-3 gap-8">
                    {archetypes.map((a, i) => (
                        <div key={i} className="group p-10 bg-zinc-900/20 border border-white/5 rounded-[32px] hover:bg-zinc-900/40 transition-all hover:border-blue-500/20 space-y-8">
                            <div className="flex justify-between items-start">
                                <div className="p-4 bg-zinc-800/50 rounded-2xl group-hover:scale-110 transition-transform">
                                    {a.icon}
                                </div>
                                <div className="text-[10px] font-mono text-zinc-600 group-hover:text-blue-500 transition-colors uppercase tracking-widest font-bold">
                                    {a.stats}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="text-[10px] font-mono text-blue-500 uppercase tracking-widest font-bold">{a.role}</div>
                                <h3 className="text-2xl font-bold">{a.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{a.desc}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* CTA Section */}
                <section className="relative p-12 md:p-24 rounded-[48px] bg-white text-black overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
                    <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] -z-10 group-hover:scale-125 transition-transform duration-1000" />
                    
                    <div className="space-y-6 max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{aDict.ctaTitle}</h2>
                        <p className="text-zinc-600 text-lg leading-relaxed">
                            {aDict.ctaDesc}
                        </p>
                    </div>

                    <Link 
                        href={`/${lang}/protocol/install`}
                        className="group flex flex-col items-center justify-center p-8 bg-black text-white rounded-[40px] hover:scale-105 transition-all shadow-2xl shrink-0"
                    >
                        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:rotate-45 transition-transform">
                            <ArrowRight size={32} />
                        </div>
                        <span className="font-bold uppercase tracking-tighter text-2xl">{aDict.ctaBtn}</span>
                    </Link>
                </section>

                <div className="flex justify-center gap-12 text-[10px] font-mono text-zinc-700 uppercase tracking-[0.4em] font-bold">
                    <div className="flex items-center gap-2">
                        <Users size={12} /> {aDict.footerConsensus}
                    </div>
                    <div className="flex items-center gap-2 text-blue-500">
                        <Zap size={12} /> {aDict.footerVersion}
                    </div>
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 px-8 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>{dict.footer.rights}</div>
                <div className="flex gap-8 mt-6 md:mt-0">
                    <Link href={`/${lang}/protocol`} className="hover:text-zinc-400">{dict.nav.protocol}</Link>
                    <Link href={`/${lang}/privacy`} className="hover:text-zinc-400">{dict.footer.privacy}</Link>
                </div>
            </footer>
        </div>
    );
}
