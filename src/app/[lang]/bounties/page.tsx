import { getDictionary } from "../../get-dictionary";
import Navbar from "@/components/Navbar";
import { Shield } from "lucide-react";
import BountyDashboard from "@/components/BountyDashboard";

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
    let bounties = [];
    try {
        const response = await fetch(`${apiUrl}/bounties?status=open`, { cache: 'no-store' });
        if (response.ok) {
            bounties = await response.json();
        }
    } catch (error) {
        console.error("Failed to fetch bounties:", error);
    }

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

                <BountyDashboard bounties={bounties} dict={dict} lang={lang} />
            </main>

            <footer className="border-t border-white/5 py-12 px-8 flex justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>© 2026 Emergence Science Research</div>
            </footer>
        </div>
    );
}
