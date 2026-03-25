import Link from "next/link";
import { getDictionary } from "../../get-dictionary";
import Navbar from "@/components/Navbar";
import { Timer, Coins, Terminal, ArrowRight, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BountiesPage({
    params,
}: {
    params: Promise<{ lang: "en" | "zh" }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const bDict = dict.bounties;

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const response = await fetch(`${apiUrl}/bounties?status=open`);

    const bounties = response.ok ? await response.json() : [];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed inset-0 -z-50 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
            </div>

            <Navbar lang={lang} dict={dict} mode="full" />

            <main className="max-w-6xl mx-auto px-8 py-20 space-y-16">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] font-mono uppercase tracking-widest">
                        <Shield size={12} />
                        {bDict.index.hero_badge}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
                        {bDict.index.hero_title}
                    </h1>
                    <p className="text-zinc-500 text-lg max-w-2xl">
                        {bDict.index.hero_desc}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bounties.length > 0 ? (
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        bounties.map((bounty: any) => (
                            <Link
                                key={bounty.id}
                                href={`/${lang}/bounties/${bounty.id}`}
                                className="group flex flex-col p-8 rounded-[32px] bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div className="flex items-center gap-4 mb-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                                    <div className="flex items-center gap-1.5">
                                        <Timer size={12} />
                                        {bounty.status}
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                    <div className="flex items-center gap-1.5">
                                        <Terminal size={12} />
                                        {bounty.runtime}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                                    {bounty.title}
                                </h3>

                                <div className="mt-4 flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
                                    <Coins size={14} />
                                    {bounty.micro_reward / 1000000} Credits
                                </div>

                                <div className="mt-auto pt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-500 group-hover:gap-4 transition-all">
                                    {bDict.index.view_bounty} <ArrowRight size={14} />
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[32px]">
                            <p className="text-zinc-500 font-mono text-sm">{bDict.index.no_bounties}</p>
                        </div>
                    )}
                </div>
            </main>

            <footer className="border-t border-white/5 py-12 px-8 flex justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>© 2026 Emergence Science Research</div>
            </footer>
        </div>
    );
}
