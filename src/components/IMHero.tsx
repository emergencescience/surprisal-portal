"use client";

import SystemBriefing from "./SystemBriefing";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function IMHero({ dict }: { lang: string; dict: Record<string, any> }) {
    return (
        <section className="w-full max-w-6xl mx-auto pt-20 pb-10 px-8 relative text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent -z-10 blur-3xl rounded-full" />

            <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40" dangerouslySetInnerHTML={{ __html: dict.title }} />
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    {dict.subtitle}
                </p>
                {dict.answerBlock && (
                    <div className="sr-only prose prose-invert">
                        <p>{dict.answerBlock}</p>
                    </div>
                )}
                <SystemBriefing dict={dict.briefing} />
            </div>
        </section>
    );
}
