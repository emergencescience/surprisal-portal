import PublicationReader from "@/components/PublicationReader";

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string[]; lang: string }>;
}) {
    const { slug, lang } = await params;
    const path = slug.join("/");

    return (
        <div className="min-h-screen bg-black">
            <PublicationReader slug={path} lang={lang} />
        </div>
    );
}
