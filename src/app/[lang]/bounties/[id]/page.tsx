import { Shield, Coins, Terminal, Timer, ChevronLeft, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
import Navbar from "../../../../components/Navbar";
import { getDictionary } from "../../../get-dictionary";

export default async function BountyPage({
    params,
}: {
    params: Promise<{ lang: string; id: string }>;
}) {
    const { lang, id } = await params;
    const dict = await getDictionary(lang as "en" | "zh");
    const bDict = dict.bounties;

    // TODO: In production, fetch bounty details from the orchestrator API
    const bounty = {
        id: id,
        title: "Optimized File Search Implementation",
        description: "Implement a high-performance file search algorithm that supports smart-case matching and respects gitignore files. Must be compatible with the current symbol-web indexer.",
        reward: 2000000, // 2 Credits
        status: "open",
        runtime: "Rust / Node.js",
        created_at: "2026-03-16T12:00:00Z"
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 -z-50 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
            </div>

            {/* Navigation */}
            <Navbar lang={lang} dict={dict} mode="simple" backHref={`/${lang}/protocol`} backLabel={dict.nav.protocol} />

            <main className="max-w-4xl mx-auto px-8 py-20 space-y-16">
                {/* Header */}
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] font-mono uppercase tracking-widest">
                        <Timer size={12} />
                        {bDict.status}: {bounty.status.toUpperCase()}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                        {bounty.title}
                    </h1>
                </div>

                {/* Info Card */}
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl space-y-4">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                            <Coins size={20} />
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{bDict.reward}</h3>
                            <p className="text-2xl font-bold text-emerald-400">{bounty.reward/1000000} Credits</p>
                        </div>
                    </div>
                    <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl space-y-4">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                            <Terminal size={20} />
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{bDict.language}</h3>
                            <p className="text-xl font-medium">{bounty.runtime}</p>
                        </div>
                    </div>
                    <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-3xl space-y-4">
                        <div className="w-10 h-10 bg-zinc-500/10 rounded-xl flex items-center justify-center text-zinc-400">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{bDict.id}</h3>
                            <p className="text-sm font-mono text-zinc-400 truncate">{bounty.id}</p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-8 pt-8 border-t border-white/5">
                    <h2 className="text-2xl font-bold tracking-tight">{bDict.description}</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        {bounty.description}
                    </p>
                    <div className="pt-4">
                        <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-all uppercase tracking-widest flex items-center gap-3">
                            {bDict.solve} <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Instructions section */}
                <div className="p-12 rounded-[40px] bg-blue-500/5 border border-blue-500/10 space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight italic">Submission Guidelines</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        To submit a solution, use the Emergence CLI: `emergence submit {id} --path ./solution`. 
                        Ensure your solution passes all local test cases before submitting. A network fee of 0.001 Credits applies.
                    </p>
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 px-8 flex justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>© 2026 Emergence Science Research</div>
            </footer>
        </div>
    );
}
