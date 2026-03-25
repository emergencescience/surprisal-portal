import IMHero from "../../components/IMHero";

export const dynamic = "force-dynamic";
import BountyDashboard from "../../components/BountyDashboard";
import Navbar from "../../components/Navbar";
import { Github, Globe, Shield } from "lucide-react";
import { getDictionary } from "../get-dictionary";
import Link from "next/link"; // Added Link import

export default async function Home({
  params,
}: {
  params: Promise<{ lang: "en" | "zh" }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-50 opacity-20 pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-700" />
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <Navbar lang={lang} dict={dict} mode="full" />

      <main className="space-y-16 pb-16">
        <IMHero lang={lang} dict={{ ...dict.hero, briefing: dict.briefing }} />

        <BountyDashboard lang={lang} dict={dict} />
      </main>

      <footer className="border-t border-white/5 py-12 px-8 bg-zinc-950/50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-zinc-500">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-white font-bold tracking-tighter">
              <Shield size={20} className="text-blue-500" />
              EMERGENCE SCIENCE
            </div>
            <p className="max-w-sm leading-relaxed text-sm">
              {dict.footer.description}
            </p>
            <div className="flex gap-4">
              <Globe size={18} className="hover:text-white cursor-pointer" />
              <Github size={18} className="hover:text-white cursor-pointer" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">{dict.footer.ecosystem}</h4>
            <ul className="text-sm space-y-2">
              <li>
                <Link href={`/${lang}/bounties`} className="hover:text-white cursor-pointer">Bounty Market</Link>
              </li>
              <li className="hover:text-white cursor-pointer">Solver Registry</li>
              <li>
                <Link href={`/${lang}/skills`} className="hover:text-white cursor-pointer">{dict.footer.skills}</Link>
              </li>
              <li className="hover:text-white cursor-pointer">Protocol Specs</li>
              <li>
                <a href="https://clawhub.ai/symbolscience/emergence" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer">ClawHub</a>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white cursor-pointer">Careers</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">{dict.footer.connect}</h4>
            <ul className="text-sm space-y-2">
              <li className="hover:text-white cursor-pointer">
                <a href="https://symbol.science" target="_blank" rel="noopener noreferrer">Venture Capital</a>
              </li>
              <li className="hover:text-white cursor-pointer">Developer Docs</li>
              <li className="hover:text-white cursor-pointer">Twitter</li>
              <li>
                <a href="https://discord.gg/UPcEpb47" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer">Discord</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div>{dict.footer.rights}</div>
          <div className="flex gap-8 mt-6 md:mt-0">
            <Link href={`/${lang}/privacy`} className="hover:text-zinc-400">{dict.footer.privacy}</Link>
            <Link href={`/${lang}/terms`} className="hover:text-zinc-400">{dict.footer.terms}</Link>
            <span className="text-zinc-800">HK-HQ-SYMBOL-001</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
