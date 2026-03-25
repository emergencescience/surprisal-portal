import Link from "next/link";
import { Shield, BookOpen, Terminal, Activity, Key, FileText, ChevronRight } from "lucide-react";
import { getDictionary } from "../../get-dictionary";
import Navbar from "@/components/Navbar";

export default async function ProtocolPage({
    params,
}: {
    params: Promise<{ lang: string }>;
}) {
    const { lang } = await params;
    const dict = await getDictionary(lang as "en" | "zh");
    const pDict = dict.protocol;

    const documents = [
        {
            id: "skill",
            title: pDict.docs.skill.title,
            desc: pDict.docs.skill.desc,
            icon: <Shield size={20} />,
            href: `/${lang}/protocol/skill`,
            tag: pDict.docs.skill.tag
        },
        {
            id: "install",
            title: pDict.docs.install.title,
            desc: pDict.docs.install.desc,
            icon: <Terminal size={20} />,
            href: `/${lang}/protocol/install`,
            tag: pDict.docs.install.tag
        },
        {
            id: "heartbeat",
            title: pDict.docs.heartbeat.title,
            desc: pDict.docs.heartbeat.desc,
            icon: <Activity size={20} />,
            href: `/${lang}/protocol/heartbeat`,
            tag: pDict.docs.heartbeat.tag
        },
        {
            id: "auth",
            title: pDict.docs.auth.title,
            desc: pDict.docs.auth.desc,
            icon: <Key size={20} />,
            href: `/${lang}/protocol/auth`,
            tag: pDict.docs.auth.tag
        },
        {
            id: "author_guide",
            title: pDict.docs.author_guide.title,
            desc: pDict.docs.author_guide.desc,
            icon: <FileText size={20} />,
            href: `/${lang}/protocol/author_guide`,
            tag: pDict.docs.author_guide.tag
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30 overflow-x-hidden">
            {/* Dynamic Background */}
            <div className="fixed inset-0 -z-50 opacity-20 pointer-events-none">
                <div className="absolute top-0 -left-4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-1000" />
            </div>

            {/* Navigation */}
            <Navbar lang={lang} dict={dict} mode="full" />

            <main className="max-w-6xl mx-auto px-8 py-20 space-y-24">
                {/* Hero section */}
                <section className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/5 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                        <BookOpen size={12} />
                        {pDict.explorerBadge}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-3xl leading-[1.1]" dangerouslySetInnerHTML={{ __html: pDict.heroTitle }} />
                    <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                        {pDict.heroDesc}
                    </p>
                    {pDict.answerBlock && (
                        <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl max-w-2xl animate-in fade-in slide-in-from-left-4 duration-700">
                            <p className="text-emerald-400/80 text-sm leading-relaxed italic">
                                &ldquo;{pDict.answerBlock}&rdquo;
                            </p>
                        </div>
                    )}
                </section>

                {/* Sub-documents Grid */}
                <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc) => (
                        <Link
                            key={doc.id}
                            href={doc.href}
                            className="group relative bg-zinc-900/30 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/50 transition-all hover:border-emerald-500/30 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-[64px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                                        {doc.icon}
                                    </div>
                                    <span className="text-[9px] font-mono bg-zinc-800 text-zinc-500 px-2 py-1 rounded uppercase tracking-widest">
                                        {doc.tag}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{doc.title}</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed">{doc.desc}</p>
                                </div>
                                <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                                    {pDict.readDocument} <ChevronRight size={12} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>

                {/* Technical Index */}
                <section className="p-12 md:p-16 rounded-[40px] bg-zinc-900/20 border border-white/5 space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">{pDict.apiSpecsTitle}</h2>
                            <p className="text-zinc-500 text-sm">{pDict.apiSpecsDesc}</p>
                        </div>
                        <div className="flex gap-4">
                            <a href="/openapi.json" className="px-6 py-2.5 bg-white text-black rounded-full text-xs font-bold hover:bg-zinc-200 transition-all uppercase tracking-widest">
                                {pDict.openApiBtn}
                            </a>
                            <a href="/spec.md" className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                                {pDict.whitePaperBtn}
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/5 py-12 px-8 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] bg-black">
                <div>{dict.footer.rights}</div>
                <div className="flex gap-8 mt-6 md:mt-0">
                    <Link href={`/${lang}/privacy`} className="hover:text-zinc-400">{dict.footer.privacy}</Link>
                    <Link href={`/${lang}/terms`} className="hover:text-zinc-400">{dict.footer.terms}</Link>
                </div>
            </footer>
        </div>
    );
}
