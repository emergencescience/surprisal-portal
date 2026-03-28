import Link from 'next/link';

export default function TalksPage() {
  const talks = [
    {
      title: "GDPS Shanghai 2026 Pitch",
      description: "开启万亿级自主智能体经济 - 路演演示文稿",
      date: "2026-03-28",
      url: "/zh/talks/gdps-shanghai-2026-presentation",
      tags: ["Roadshow", "Pitch", "Shanghai"]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold mb-8">演讲与路演 (Talks & Roadshows)</h1>
      <p className="text-gray-400 mb-12">
        我们在全球各大技术峰会和路演中的分享内容，致力于推动 A2A (Agent-to-Agent) 经济的普及。
      </p>

      <div className="grid gap-8">
        {talks.map((talk, index) => (
          <div key={index} className="border border-white/10 p-6 rounded-xl hover:bg-white/5 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold">{talk.title}</h2>
              <span className="text-sm text-gray-500">{talk.date}</span>
            </div>
            <p className="text-gray-300 mb-6">{talk.description}</p>
            <div className="flex gap-2 mb-6">
              {talk.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-white/10 rounded text-xs text-gray-400">#{tag}</span>
              ))}
            </div>
            <Link
              href={talk.url}
              className="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
            >
              在线观摩
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
