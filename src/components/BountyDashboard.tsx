"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Timer, Coins, Terminal, ArrowRight, Shield } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function BountyDashboard({ lang, dict }: { lang: string; dict: Record<string, any> }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [bounties, setBounties] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBounties = async () => {
            const apiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "");
            try {
                const response = await fetch(`${apiUrl}/bounties?status=open&limit=3`);
                if (response.ok) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data: any[] = await response.json();
                    setBounties(data);
                }
            } catch (error) {
                console.error("Failed to fetch bounties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBounties();
    }, []);

    if (loading && bounties.length === 0) {
        return null; // Or a skeleton
    }

    if (bounties.length === 0) {
        return null;
    }

    const bDict = dict.bounties;

    return (
        <section className="w-full max-w-6xl mx-auto px-8 py-20 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-[10px] font-mono uppercase tracking-widest">
                        <Shield size={12} />
                        {bDict.index.hero_badge}
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">
                        {bDict.index.hero_title}
                    </h2>
                </div>
                <Link
                    href={`/${lang}/bounties`}
                    className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group"
                >
                    View All Bounties <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-left">
                {bounties.map((bounty) => (
                    <Link
                        key={bounty.id}
                        href={`/${lang}/bounties/${bounty.id}`}
                        className="group flex flex-col p-8 rounded-[32px] bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 transition-all hover:scale-[1.02]"
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
                        <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
                            {bounty.title}
                        </h3>
                        <div className="mt-auto flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold">
                            <Coins size={14} />
                            {bounty.micro_reward / 1000000} Credits
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
