"use client";

import Link from "next/link";
import { ChevronLeft, Menu, X, Shield, ExternalLink } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";
import { useState, useEffect } from "react";

interface NavbarProps {
    mode?: "full" | "simple";
    lang: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dict: Record<string, any>;
    backHref?: string;
    backLabel?: string;
}

export default function Navbar({ mode = "full", lang, dict, backHref, backLabel }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const loginUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/auth/github/login`;

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    const navLinks = [
        { href: `/${lang}/bounties`, label: dict.nav.bounties },
        { href: `/${lang}/skills`, label: dict.nav.skills },
        { href: `/${lang}/articles`, label: dict.nav.articles },
        { href: `/${lang}/protocol`, label: dict.nav.protocol },
        { href: `/${lang}/careers`, label: dict.nav.careers },
    ];

    return (
        <>
            <nav className="flex justify-between items-center px-6 md:px-8 py-4 border-b border-white/5 backdrop-blur-xl bg-black/40 sticky top-0 z-[60]">
                <Link 
                    href={`/${lang}`} 
                    className="flex items-center gap-3 text-xl font-bold tracking-tighter hover:opacity-80 transition-all cursor-pointer group"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <Logo size={32} className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                    <div className="flex flex-col leading-none">
                        <span className="text-base md:text-lg font-bold tracking-tighter">
                            {dict.nav.brand_main}
                        </span>
                    </div>
                </Link>

                {mode === "full" ? (
                    <>
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex gap-10 items-center text-xs font-bold uppercase tracking-widest text-zinc-500">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                                    {link.label}
                                </Link>
                            ))}
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

                        {/* Mobile Menu Toggle */}
                        <button 
                            className="flex md:hidden p-2 text-zinc-400 hover:text-white transition-colors z-[70]"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </>
                ) : (
                    <Link href={backHref || `/${lang}`} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                        <ChevronLeft size={14} /> {backLabel || dict.nav.protocol}
                    </Link>
                )}
            </nav>

            {/* Mobile Navigation Overlay */}
            <div 
                className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl transition-all duration-500 md:hidden ${
                    isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                }`}
            >
                <div className="flex flex-col h-full pt-24 px-8 pb-12 overflow-y-auto">
                    <div className="flex flex-col gap-8 flex-1">
                        {navLinks.map((link, i) => (
                            <Link 
                                key={link.href} 
                                href={link.href} 
                                className={`text-2xl font-bold tracking-tighter hover:text-blue-400 transition-all ${
                                    isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                                }`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        
                        <a 
                            href="https://symbol.science" 
                            className={`flex items-center justify-between p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 transition-all ${
                                isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                            }`}
                            style={{ transitionDelay: `${navLinks.length * 50}ms` }}
                        >
                            <span className="text-sm font-bold uppercase tracking-widest text-blue-400">
                                {dict.nav.research_lab}
                            </span>
                            <ExternalLink size={16} className="text-blue-500" />
                        </a>
                    </div>

                    <div className={`mt-auto space-y-8 pt-8 border-t border-white/5 transition-all duration-700 ${
                        isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Language</span>
                            <LanguageSwitcher />
                        </div>
                        
                        <Link
                            href={loginUrl}
                            className="flex items-center justify-center w-full bg-white text-black py-4 rounded-2xl font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {dict.nav.connect}
                        </Link>
                        
                        <div className="flex items-center gap-2 text-zinc-600 font-bold tracking-tighter text-sm justify-center">
                            <Shield size={16} className="text-blue-500/50" />
                            EMERGENCE SCIENCE
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
