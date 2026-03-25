import { ShieldAlert } from "lucide-react";
import CommandBlock from "./CommandBlock";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SystemBriefing({ dict }: { dict: Record<string, any> }) {
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
                        <CommandBlock
                            command={dict.command}
                            instruction={dict.copy_instruction}
                            copyText={dict.copy}
                            copiedText={dict.copied}
                        />
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
