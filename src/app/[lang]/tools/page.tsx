import Link from "next/link";
import { Wrench, Box, Zap, Layers, ArrowRight, Terminal, Cpu, Database } from "lucide-react";
import { getDictionary } from "../../get-dictionary";
import Navbar from "@/components/Navbar";

export default async function ToolsPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as "en" | "zh");
    const tDict = dict.tools;

    const tools = [
        {
            title: tDict.list.graphviz.title,
            desc: tDict.list.graphviz.desc,
            cost: tDict.list.graphviz.cost,
            icon: <Terminal size={24} className="text-blue-400" />,
            engine: "graphviz"
        },
        {
            title: tDict.list.mermaid.title,
            desc: tDict.list.mermaid.desc,
            cost: tDict.list.mermaid.cost,
            icon: <Cpu size={24} className="text-emerald-400" />,
            engine: "mermaid"
        },
        {
            title: tDict.list.d2.title,
            desc: tDict.list.d2.desc,
            cost: tDict.list.d2.cost,
            icon: <Layers size={24} className="text-amber-400" />,
            engine: "d2"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-50 opacity-20 pointer-events-none">
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[128px] animate-pulse delay-700" />
            </div>

            <Navbar lang={lang} dict={dict} mode="full" />

            <main className="max-w-6xl mx-auto px-8 py-24 space-y-32">
                {/* Hero Section */}
                <section className="text-center space-y-10 animate-in fade-in zoom-in duration-1000">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-xs font-mono text-blue-400 uppercase tracking-widest mx-auto">
                        <Wrench size={14} />
                        {tDict.heroBadge}
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter max-w-4xl mx-auto leading-none" dangerouslySetInnerHTML={{ __html: tDict.heroTitle }} />
                    <p className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                        {tDict.heroDesc}
                    </p>
                </section>

                {/* Tools Grid */}
                <section className="grid md:grid-cols-3 gap-8">
                    {tools.map((tool, i) => (
                        <div key={i} className="group p-10 bg-zinc-900/20 border border-white/5 rounded-[32px] hover:bg-zinc-900/40 transition-all hover:border-blue-500/20 space-y-8">
                            <div className="flex justify-between items-start">
                                <div className="p-4 bg-zinc-800/50 rounded-2xl group-hover:scale-110 transition-transform">
                                    {tool.icon}
                                </div>
                                <div className="text-[10px] font-mono text-zinc-600 group-hover:text-blue-500 transition-colors uppercase tracking-widest font-bold">
                                    {tool.cost}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-2xl font-bold">{tool.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{tool.desc}</p>
                            </div>
                            <div className="pt-4">
                                <Link 
                                    href={`/${lang}/protocol/auth`}
                                    className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 hover:text-blue-400 transition-colors uppercase tracking-widest font-bold"
                                >
                                    API Spec <ArrowRight size={12} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Integration Section */}
                <section className="relative p-12 md:p-24 rounded-[48px] bg-zinc-900/40 border border-white/5 overflow-hidden group">
                    <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10 group-hover:scale-125 transition-transform duration-1000" />
                    
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Plug-and-Play Infrastructure</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Our tools are designed for autonomous agents. No API bloat, no complex session management. Just high-performance primitives for your agent fleet.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-mono font-bold uppercase tracking-widest">
                                    <Box size={14} /> REST API
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-mono font-bold uppercase tracking-widest">
                                    <Database size={14} /> Stateless
                                </div>
                            </div>
                        </div>

                        <div className="bg-black/50 border border-white/5 p-8 rounded-3xl font-mono text-xs text-zinc-400 space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                <span className="text-zinc-500">POST /tools/render/graphviz</span>
                                <span className="text-blue-500">0.01 Credits</span>
                            </div>
                            <pre className="text-zinc-300">
{`{
  "code": "digraph G { A -> B }",
  "format": "png"
}`}
                            </pre>
                            <div className="pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 text-emerald-400/80">
                                    <Zap size={12} /> 200 OK (Success)
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
