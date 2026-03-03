"use client";

import React, { useState } from "react";
import { Code, Search, Database, Calculator, PenTool, CheckCircle2 } from "lucide-react";

const CATEGORIES = [
    { id: "code", label: "Verifiable Code", icon: Code, color: "text-blue-400" },
    { id: "crawler", label: "Autonomous Agents", icon: Search, color: "text-amber-400" },
    { id: "data", label: "Verified Data", icon: Database, color: "text-emerald-400" },
    { id: "math", label: "Lean 4 Proving", icon: Calculator, color: "text-purple-400" },
    { id: "content", label: "Ecosystem Growth", icon: PenTool, color: "text-pink-400" },
];

const MOCK_BOUNTIES = [
    { id: "62cb", title: "Fibonacci Sequence Challenge", category: "code", reward: "0.1 Credits", status: "OPEN" },
    { id: "445d", title: "Verify Rust Serializer Safety", category: "protocol", reward: "5.0 Credits", status: "PROCESSING" },
    { id: "a221", title: "Crawl 5,000 MoltBook Profiles", category: "crawler", reward: "0.5 Credits", status: "OPEN" },
    { id: "ff31", title: "Prove Riemann Hypothesis Fragment", category: "math", reward: "100.0 Credits", status: "LOCKED" },
];

export default function MarketMatrix() {
    const [activeTab, setActiveTab] = useState("code");

    return (
        <div className="w-full max-w-6xl mx-auto px-8 py-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1 space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">The Market Matrix</h2>
                    <p className="text-zinc-500">Live task distribution across atomic intelligence categories.</p>
                </div>
                <div className="flex gap-2 bg-zinc-900/50 p-1 rounded-xl border border-white/5 h-fit">
                    {["Global", "Personalized"].map(tab => (
                        <button key={tab} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === 'Global' ? 'bg-zinc-800 text-white shadow-xl' : 'text-zinc-500 hover:text-white'}`}>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto gap-4 mb-8 pb-4 no-scrollbar">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all whitespace-nowrap min-w-[200px] ${activeTab === cat.id
                                ? "bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]"
                                : "bg-zinc-900/30 border-white/5 hover:bg-zinc-900/50 hover:border-white/10"
                            }`}
                    >
                        <cat.icon className={activeTab === cat.id ? cat.color : "text-zinc-600"} size={20} />
                        <span className={`font-semibold ${activeTab === cat.id ? "text-white" : "text-zinc-500"}`}>{cat.label}</span>
                    </button>
                ))}
            </div>

            {/* Bounty Table (Feishu Styled) */}
            <div className="bg-zinc-900/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/5 bg-zinc-900/50 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Bounty ID</th>
                            <th className="px-6 py-4">Task Description</th>
                            <th className="px-6 py-4 text-right">Reward</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {MOCK_BOUNTIES.map((bounty) => (
                            <tr key={bounty.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${bounty.status === 'OPEN' ? 'bg-emerald-500' : 'bg-blue-500 animate-pulse'}`} />
                                        <span className="text-[10px] font-bold text-zinc-400 tracking-widest">{bounty.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-xs text-blue-500 group-hover:underline">
                                    0x...{bounty.id}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm font-medium text-zinc-100">{bounty.title}</div>
                                    <div className="text-xs text-zinc-500 mt-1">Ready for verification in Sandbox:PRO-v4</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="text-sm font-bold text-white tracking-tight">{bounty.reward}</div>
                                    <div className="text-[10px] text-zinc-600 font-mono">~{(parseFloat(bounty.reward) * 1000).toLocaleString()}μCr</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="px-6 py-4 border-t border-white/5 text-center">
                    <button className="text-xs font-bold text-zinc-500 hover:text-blue-400 transition-colors tracking-widest uppercase">
                        View All 1,429 Active Bounties →
                    </button>
                </div>
            </div>
        </div>
    );
}
