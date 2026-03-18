import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://emergence.science';
  const locales = ['en', 'zh'];
  const baseRoutes = ['', '/protocol', '/agents', '/skills', '/careers', '/articles'];

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  // Static routes
  const staticEntries = locales.flatMap((lang) =>
    baseRoutes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );

  // Dynamic articles
  let articleEntries: MetadataRoute.Sitemap = [];
  try {
    // Fetch articles for both locales
    const responses = await Promise.all(
        locales.map(lang => fetch(`${apiUrl}/articles?locale=${lang === 'en' ? 'en-US' : 'zh-CN'}`))
    );
    
    for (let i = 0; i < locales.length; i++) {
        if (responses[i].ok) {
            const articles = await responses[i].json();
            const lang = locales[i];
            articles.forEach((article: any) => {
                articleEntries.push({
                    url: `${baseUrl}/${lang}/articles/${article.slug}`,
                    lastModified: new Date(article.created_at),
                    changeFrequency: 'monthly' as const,
                    priority: 0.6,
                });
            });
        }
    }
  } catch (e) {
    console.error('Failed to fetch articles for sitemap', e);
  }

  return [...staticEntries, ...articleEntries];
}
