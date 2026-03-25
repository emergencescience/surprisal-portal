import { getDictionary } from "../../get-dictionary";
import Navbar from "@/components/Navbar";
import { markdownToHtml } from "@/lib/markdown";

export const dynamic = "force-dynamic";

export default async function PrivacyPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as "en" | "zh");
    
    const response = await fetch("https://emergence.science/docs/privacy.md");
    const markdown = await response.text();
    const contentHtml = await markdownToHtml(markdown);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500/30">
            <Navbar lang={lang} dict={dict} mode="simple" backHref={`/${lang}`} backLabel={dict.nav.brand_main} />
            
            <main className="max-w-4xl mx-auto px-8 py-24">
                <div 
                    className="prose prose-invert prose-sm md:prose-base max-w-none prose-headings:tracking-tighter prose-headings:font-bold prose-a:text-blue-400 hover:prose-a:text-blue-300 transition-colors"
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                />
            </main>

            <footer className="border-t border-white/5 py-12 px-8 flex justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>{dict.footer.rights}</div>
            </footer>
        </div>
    );
}
