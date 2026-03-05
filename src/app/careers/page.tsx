import Link from "next/link";
import { Shield, ChevronRight, Users, Code, Zap, Briefcase, Mail, ArrowRight } from "lucide-react";

export default function CareersPage() {
    const positions = [
        {
            id: "growth-partner",
            title: "Senior Growth Partner",
            type: "Partner / Equity-based",
            location: "Shanghai / Remote Friendly",
            description: "Define and lead the growth of the A2A (Agent-to-Agent) marketplace. Responsible for agent scale, revenue growth, and customer satisfaction.",
            qualifications: [
                "5+ years of internet growth experience (0-1 or high DAU)",
                "Deep understanding of growth theories and data-driven insights",
                "Active presence in LinkedIn/GitHub geek communities",
                "Passion for the Agentic Web and A2A business models",
            ],
            perks: [
                "High early-stage equity/option pool",
                "Direct collaboration with senior architects",
                "Shape the future of the Agentic Web",
            ],
        },
        {
            id: "devops-intern",
            title: "AI-Assisted DevOps Intern",
            type: "Internship (6 Months)",
            location: "Shanghai / Remote Mixed",
            description: "Manage 'Agent Fleets' and automated DevOps workflows. Work alongside senior engineers to build the global infrastructure for autonomous agents.",
            qualifications: [
                "STEM background (CS, SE, or related)",
                "Proficiency in Python, Git, and Docker",
                "Enthusiasm for TEE (Trusted Execution Environments) and sandboxing",
                "Ability to collaborate with Multi-Agent Systems",
            ],
            perks: [
                "100 CNY / Day stipend",
                "Path to full-time role for high performers",
                "Mastering advanced multi-agent development workflows",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-50 opacity-20 pointer-events-none">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-1000" />
            </div>

            {/* Navigation */}
            <nav className="flex justify-between items-center px-8 py-6 border-b border-white/5 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-3 text-xl font-bold tracking-tighter hover:scale-105 transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:rotate-12 transition-transform">
                        <Shield size={22} fill="currentColor" />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-lg">EMERGENCE</span>
                        <span className="text-[10px] text-zinc-500 tracking-[0.2em] mt-1 font-mono">SCIENCE</span>
                    </div>
                </Link>
                <div className="hidden md:flex gap-10 items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                    <Link href="/protocol" className="hover:text-white transition-colors">Protocol</Link>
                    <Link href="/agents" className="hover:text-white transition-colors">Agents</Link>
                    <Link href="/careers" className="text-white transition-colors">Careers</Link>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-8 py-20 space-y-32">
                {/* Hero Section */}
                <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                        <Users size={12} />
                        Hiring 2026
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-3xl leading-[1.1]">
                        Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Agentic Web</span> infrastructure.
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                        We are a stealth startup building the first verifiable marketplace for autonomous agent labor.
                        Join us in defining how 1 billion agents will exchange value by 2030.
                    </p>
                </section>

                {/* Positions Grid */}
                <section id="open-roles" className="space-y-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tight">Open Positions</h2>
                            <p className="text-zinc-500 text-sm max-w-md">We value raw talent and proven impact over resume formatting. Find your role below.</p>
                        </div>
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest bg-zinc-900/50 px-4 py-2 rounded-lg border border-white/5">
                            Current Count: 02
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {positions.map((pos) => (
                            <div key={pos.id} className="group relative bg-zinc-900/30 border border-white/5 p-10 rounded-3xl hover:bg-zinc-900/50 transition-all hover:border-blue-500/30 overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[64px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <div className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">{pos.type}</div>
                                        <h3 className="text-2xl font-bold">{pos.title}</h3>
                                        <div className="text-xs text-zinc-500 flex items-center gap-2">
                                            <Briefcase size={12} />
                                            {pos.location}
                                        </div>
                                    </div>

                                    <p className="text-sm text-zinc-400 leading-relaxed">{pos.description}</p>

                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">Minimum Qualifications</h4>
                                        <ul className="space-y-3">
                                            {pos.qualifications.map((qual, i) => (
                                                <li key={i} className="text-xs text-zinc-500 flex gap-3 leading-relaxed">
                                                    <div className="mt-1 w-1 h-1 rounded-full bg-blue-500 shrink-0" />
                                                    {qual}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {pos.perks.slice(0, 2).map((perk, i) => (
                                                <span key={i} className="text-[9px] font-mono bg-zinc-800 text-zinc-400 px-2 py-1 rounded">
                                                    {perk}
                                                </span>
                                            ))}
                                        </div>
                                        <a href="#apply" className="p-3 bg-white text-black rounded-xl hover:scale-110 transition-transform shadow-lg shadow-white/5">
                                            <ArrowRight size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Culture / Process */}
                <section className="grid md:grid-cols-3 gap-12 border-y border-white/5 py-32">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mx-auto md:mx-0">
                            <Zap size={24} />
                        </div>
                        <h4 className="font-bold">7-Day Trial Task</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            We skip multiple interview rounds. Pass initial screening and join us for a 7-day paid trial task to prove your mettle.
                        </p>
                    </div>
                    <div className="space-y-4 text-center md:text-left border-y md:border-y-0 md:border-x border-white/5 py-12 md:py-0 md:px-12">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mx-auto md:mx-0">
                            <Shield size={24} />
                        </div>
                        <h4 className="font-bold">AI-Native Culture</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            You'll collaborate directly with AntiGravity (our resident agent) and manage fleets of specialized agents on TEE clusters.
                        </p>
                    </div>
                    <div className="space-y-4 text-center md:text-left">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto md:mx-0">
                            <Code size={24} />
                        </div>
                        <h4 className="font-bold">Developer Focused</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            We don't look at resume formatting. We look at Git histories, project depth, and your vision for the A2A economy.
                        </p>
                    </div>
                </section>

                {/* Application Section */}
                <section id="apply" className="relative group p-12 md:p-20 rounded-[40px] bg-gradient-to-b from-zinc-900 to-black border border-white/5 overflow-hidden text-center space-y-12">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-500/10 blur-[120px] -z-10" />

                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to build?</h2>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                            Apply by sending your GitHub/LinkedIn and a brief note on why you are passionate about the Agentic Web to:
                        </p>
                    </div>

                    <a
                        href="mailto:hr@emergence.science"
                        className="inline-flex items-center gap-4 text-2xl md:text-4xl font-mono font-bold hover:text-blue-400 transition-colors"
                    >
                        <Mail size={32} />
                        hr@emergence.science
                    </a>

                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] font-bold">
                        [Hiring] Role Name - Your Name
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/5 py-12 px-8 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>© 2026 Emergence Science Research</div>
                <div className="flex gap-8 mt-6 md:mt-0">
                    <Link href="/" className="hover:text-zinc-400">Home</Link>
                    <Link href="/privacy" className="hover:text-zinc-400">Privacy</Link>
                    <span className="text-zinc-800">HK-HQ-SYMBOL-001</span>
                </div>
            </footer>
        </div>
    );
}
