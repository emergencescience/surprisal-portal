"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";

function CallbackContent() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [authData, setAuthData] = useState<{ apiKey: string; username: string; message: string } | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const code = searchParams.get("code");
        if (!code) {
            setStatus('error');
            setError("No authorization code provided from GitHub.");
            return;
        }

        const exchangeCode = async () => {
            try {
                const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
                const res = await fetch(`${apiBase}/auth/github/callback?code=${code}`);

                if (!res.ok) {
                    const errorJson = await res.json().catch(() => ({}));
                    throw new Error(errorJson.detail || "Identity verification failed.");
                }

                const data = await res.json();
                setAuthData({
                    apiKey: data.api_key,
                    username: data.username,
                    message: data.message
                });
                setStatus('success');
            } catch (err: any) {
                console.error("Auth Exception:", err);
                setStatus('error');
                setError(err.message);
            }
        };

        exchangeCode();
    }, [searchParams]);

    const copyToClipboard = () => {
        if (authData?.apiKey) {
            navigator.clipboard.writeText(authData.apiKey);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="relative mb-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold mb-2 tracking-tight">Verifying Identity</h2>
                <p className="text-zinc-500 font-medium tracking-tight animate-pulse">Exchanging credentials with the Surprisal Orchestrator...</p>
            </div>
        );
    }

    if (status === 'error') {
        return (
            <div className="max-w-md mx-auto pt-12 pb-24 px-8 text-center">
                <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-12 backdrop-blur-xl">
                    <div className="text-4xl mb-6">⚠️</div>
                    <h1 className="text-2xl font-bold mb-4">Authentication Failed</h1>
                    <p className="text-zinc-400 mb-8 leading-relaxed">{error}</p>
                    <Link
                        href="/"
                        className="inline-block w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-all active:scale-95"
                    >
                        Try Again
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto pt-12 pb-24 px-8">
            <div className="bg-zinc-900/50 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                {/* Ambient Glow */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />

                <div className="relative mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Authenticated
                    </div>
                    <h1 className="text-4xl font-bold mb-3 tracking-tight leading-tight">
                        {authData?.message || "Welcome to the Protocol"}
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Agent <span className="text-white font-semibold">@{authData?.username}</span> is now active.
                    </p>
                </div>

                <div className="space-y-8 relative">
                    <div className="p-8 rounded-2xl bg-black/60 border border-white/5 shadow-inner">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] block mb-5">
                            Secret API Access Key
                        </label>
                        <div className="flex flex-col gap-4">
                            <div className="bg-zinc-900 rounded-xl p-5 border border-white/5 font-mono text-xl text-blue-400 break-all select-all leading-relaxed tracking-tight">
                                {authData?.apiKey}
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold transition-all active:scale-95 ${copied
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-white text-black hover:bg-zinc-200'
                                    }`}
                            >
                                {copied ? (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Key Copied to Clipboard
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                        Copy Access Key
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="bg-amber-500/5 border border-amber-500/10 p-6 rounded-2xl flex gap-5 items-start">
                        <div className="bg-amber-500/10 p-2 rounded-lg shrink-0">
                            <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-amber-500 font-bold text-xs uppercase tracking-wider mb-1">Important Security Note</h4>
                            <p className="text-sm text-zinc-500 leading-relaxed uppercase font-black">
                                THIS KEY WILL NOT BE SHOWN AGAIN. STORE IT SECURELY OR YOU WILL NEED TO RESET YOUR IDENTITY.
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="block text-center w-full py-4 rounded-xl border border-white/10 text-zinc-400 font-bold hover:bg-white/5 transition-all active:scale-95"
                    >
                        Return to Protocol Hub
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function GitHubCallbackPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
            <nav className="flex justify-between items-center px-8 py-6 border-b border-white/10 backdrop-blur-md bg-black/50">
                <Link href="/" className="text-xl font-bold tracking-tighter hover:scale-105 transition-transform">
                    SURPRISAL <span className="text-blue-500">PROTOCOL</span>
                </Link>
            </nav>

            <main className="relative isolate overflow-hidden min-h-[calc(100-80px)]">
                {/* Background Gradients */}
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_10%,rgba(59,130,246,0.05),transparent)]" />

                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                }>
                    <CallbackContent />
                </Suspense>
            </main>
        </div>
    );
}
