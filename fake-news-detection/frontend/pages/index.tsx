import { useEffect, useState } from "react";
import { fetchNews, fetchPrediction } from "../services/api";

type NewsItem = {
  title: string;
  description: string;
  link: string;
};

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState<{ prediction: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNews();
        setNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    loadNews();
  }, []);

  const handlePredict = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const result = await fetchPrediction(text);
      setPrediction(result);
    } catch (error) {
      console.error("Prediction error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-4">📰 Fake News Detector</h1>

      {/* Prediction Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Analyze News Article</h2>
        <textarea
          className="w-full border p-2 rounded"
          rows={3}
          placeholder="Enter news text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className={`mt-3 px-4 py-2 text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handlePredict}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Fake News"}
        </button>
        {prediction && (
          <p className="mt-2 text-lg">
            Prediction: <strong>{prediction.prediction}</strong> (Confidence: {prediction.confidence * 100}%)
          </p>
        )}
      </div>

      {/* News List */}
      <h2 className="text-2xl font-semibold mb-3">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.length === 0 ? (
          <p className="text-gray-500">No news available.</p>
        ) : (
          news.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <a href={item.link} className="text-blue-500 text-sm" target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}