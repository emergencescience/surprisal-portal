"use client";

import { useState } from "react";
import Link from "next/link";
import { Timer, Coins, Terminal, ArrowRight } from "lucide-react";

interface Bounty {
    id: string;
    title: string;
    status: string;
    runtime: string;
    programming_language?: string;
    micro_reward: number;
    bounty_metadata?: {
        category?: string;
    };
}

interface Props {
    bounties: Bounty[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dict: any;
    lang: string;
}

export default function BountyDashboard({ bounties, dict, lang }: Props) {
    const [search] = useState("");
    const [language] = useState("All");

    const filteredBounties = bounties.filter(b => {
        const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase());
        const runtime = b.runtime || b.programming_language || "text";
        const matchesLanguage = language === "All" || runtime === language;
        return matchesSearch && matchesLanguage;
    });

    // Grouping by category (activity)
    const groupedBounties = filteredBounties.reduce((acc: { [key: string]: Bounty[] }, b) => {
        const cat = b.bounty_metadata?.category || "General";
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(b);
        return acc;
    }, {});

    return (
        <div className="space-y-12">
            {/* Grouped sections */}
            {Object.keys(groupedBounties).length > 0 ? (
                Object.entries(groupedBounties).map(([cat, items]) => (
                    <div key={cat} className="space-y-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap">
                                {cat}
                            </h2>
                            <div className="w-full h-px bg-white/5" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map((bounty) => (
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
                                            {bounty.runtime || bounty.programming_language || "text"}
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
                                        {dict.bounties.index.view_bounty} <ArrowRight size={14} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <div className="py-20 text-center border border-dashed border-white/10 rounded-[32px]">
                    <p className="text-zinc-500 font-mono text-sm">{dict.bounties.index.no_bounties}</p>
                </div>
            )}
        </div>
    );
}
