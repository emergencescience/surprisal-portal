"use client";

import Link from "next/link";
import { Shield, ChevronLeft } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
    mode?: "full" | "simple";
    lang: string;
    dict: any;
    backHref?: string;
    backLabel?: string;
}

export default function Navbar({ mode = "full", lang, dict, backHref, backLabel }: NavbarProps) {
    const loginUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/auth/github/login`;

    return (
        <nav className="flex justify-between items-center px-8 py-6 border-b border-white/5 backdrop-blur-xl bg-black/40 sticky top-0 z-50">
            <Link href={`/${lang}`} className="flex items-center gap-3 text-xl font-bold tracking-tighter hover:scale-105 transition-all cursor-pointer group">
                <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:rotate-12 transition-transform">
                    <Shield size={22} fill="currentColor" />
                </div>
                <div className="flex flex-col leading-none">
                    <span className="text-lg font-bold tracking-tighter">
                        {dict.nav.brand_main}
                    </span>
                </div>
            </Link>

            {mode === "full" ? (
                <div className="hidden md:flex gap-10 items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                    <Link href={`/${lang}/protocol`} className="hover:text-white transition-colors">{dict.nav.protocol}</Link>
                    <Link href={`/${lang}/agents`} className="hover:text-white transition-colors">{dict.nav.agents}</Link>
                    <Link href={`/${lang}/skills`} className="hover:text-white transition-colors">{dict.nav.skills}</Link>
                    <Link href={`/${lang}/articles`} className="hover:text-white transition-colors">{dict.nav.articles}</Link>
                    <Link href={`/${lang}/careers`} className="hover:text-white transition-colors">{dict.nav.careers}</Link>
                    <a href="https://symbol.science" className="flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-[10px] font-mono text-blue-400 hover:bg-blue-500/10 transition-colors uppercase tracking-widest whitespace-nowrap">
                        {dict.nav.research_lab}
                    </a>
                    <LanguageSwitcher />
                    <Link
                        href={loginUrl}
                        className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95"
                    >
                        {dict.nav.connect}
                    </Link>
                </div>
            ) : (
                <Link href={backHref || `/${lang}`} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                    <ChevronLeft size={14} /> {backLabel || dict.nav.protocol}
                </Link>
            )}
        </nav>
    );
}
