"use client";

import { useState } from "react";
import { Copy, Check, ShieldAlert } from "lucide-react";

export default function SystemBriefing({ dict }: { dict: any }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(dict.command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="w-full max-w-4xl mx-auto pt-12 px-8">
            <div className="relative group">
                {/* Background glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000" />

                <div className="relative bg-zinc-950/40 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-8 overflow-hidden shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        {/* Title & Description */}
                        <div className="flex-1 space-y-3 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 text-blue-500 font-mono text-xs font-bold uppercase tracking-[0.2em] mb-1">
                                <ShieldAlert size={14} className="animate-pulse" />
                                <span>Installation Briefing</span>
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-white">{dict.title}</h2>
                            <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                                {dict.subtitle}
                            </p>
                        </div>

                        {/* Interactive Command Block */}
                        <div className="relative w-full md:w-auto flex-1 group/cmd">
                            <div className="absolute inset-0 bg-blue-500/5 rounded-xl blur-md opacity-0 group-hover/cmd:opacity-100 transition-opacity" />
                            <div className="relative bg-black/60 border border-white/10 rounded-xl overflow-hidden font-mono text-xs">
                                <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                                    <span className="text-zinc-500 flex items-center gap-2">
                                        {dict.copy_instruction}
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors bg-blue-400/10 px-2 py-1 rounded-md active:scale-95"
                                    >
                                        {copied ? <Check size={12} /> : <Copy size={12} />}
                                        <span className="font-bold uppercase tracking-widest text-[10px]">
                                            {copied ? dict.copied : dict.copy}
                                        </span>
                                    </button>
                                </div>
                                <div className="p-4 text-zinc-300 leading-relaxed cursor-text select-all break-words">
                                    {dict.command}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Scanning line animation */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-scan" />
                </div>
            </div>
        </section>
    );
}

// Add these to globals.css or component-specific styles if possible
// @keyframes scan {
//   0% { transform: translateY(0); }
//   100% { transform: translateY(300px); }
// }
// .animate-scan {
//   animation: scan 4s linear infinite;
// }
