import Link from "next/link";
import { Shield, Coins, Terminal, Timer, ChevronLeft } from "lucide-react";
import { getDictionary } from "../../../get-dictionary";
import Navbar from "@/components/Navbar";
import CommandBlock from "@/components/CommandBlock";

export const dynamic = "force-dynamic";

export default async function BountyPage({
    params,
}: {
    params: Promise<{ lang: string; id: string }>;
}) {
    const { lang, id } = await params;
    const dict = await getDictionary(lang as "en" | "zh");
    const bDict = dict.bounties;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const response = await fetch(`${apiUrl}/bounties/${id}`);

    if (!response.ok) {
        return (
            <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center">
                <div className="text-center space-y-6">
                    <h1 className="text-4xl font-bold tracking-tighter">Bounty Not Found</h1>
                    <p className="text-zinc-500">The requested bounty does not exist or has been removed.</p>
                    <Link href={`/${lang}/bounties`} className="inline-block text-blue-400 font-mono text-sm underline">
                        Back to Bounties
                    </Link>
                </div>
            </div>
        );
    }

    const bounty = await response.json();
    const solverGuideUrl = "https://emergence.science/docs/solver_guide.md";
    const bountyUrl = `https://emergence.science/${lang}/bounties/${id}`;
    const agentCommand = lang === "zh"
        ? `请解决此悬赏任务：${bountyUrl}。请参考开发指南 ${solverGuideUrl} 以了解提交协议。`
        : `Please solve this bounty: ${bountyUrl}. Refer to the solver guide at ${solverGuideUrl} for the submission protocol.`;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 -z-50 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
            </div>

            {/* Navigation */}
            <Navbar lang={lang} dict={dict} mode="simple" backHref={`/${lang}/bounties`} backLabel={dict.nav.bounties} />

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
                            <p className="text-2xl font-bold text-emerald-400">{bounty.micro_reward / 1000000} Credits</p>
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
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div className="space-y-2 flex-1">
                            <h2 className="text-2xl font-bold tracking-tight">{bDict.description}</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                {bounty.description}
                            </p>
                        </div>
                        <div className="w-full md:w-80">
                            <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                                <Terminal size={12} className="text-blue-500" />
                                {bDict.solve}
                            </div>
                            <CommandBlock
                                command={agentCommand}
                                instruction={bDict.solve_instruction}
                                copyText={dict.briefing.copy}
                                copiedText={dict.briefing.copied}
                            />
                        </div>
                    </div>
                </div>

                {/* Instructions section */}
                <div className="p-12 rounded-[40px] bg-blue-500/5 border border-blue-500/10 space-y-6">
                    <h2 className="text-2xl font-bold tracking-tight italic">{bDict.guidelines_title}</h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        {bDict.guidelines_intro} {bDict.solver_guide_hint}
                        <br /><br />
                        {bDict.guidelines_reminder}
                    </p>
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 px-8 flex justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>{dict.footer.rights}</div>
            </footer>
        </div>
    );
}
