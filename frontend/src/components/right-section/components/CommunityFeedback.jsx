import React, { useEffect, useState } from "react";

const CommunityFeedback = () => {
  const [feedback, setFeedback] = useState({ negative: 0, neutral: 0, positive: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/community-feedback");
        if (!response.ok) throw new Error("Failed to fetch feedback");
        const data = await response.json();
        setFeedback(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const total = feedback.negative + feedback.neutral + feedback.positive;
  const getPercentage = (value) => (total ? (value / total) * 100 : 0);

  const getSentiment = () => {
    if (feedback.positive >= feedback.neutral && feedback.positive >= feedback.negative) {
      return "Mostly positive";
    }
    if (feedback.neutral >= feedback.positive && feedback.neutral >= feedback.negative) {
      return "Mixed feedback";
    }
    return "Mostly negative";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full h-full mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-sm text-gray-500 mb-2">Community feedback</h2>
      <h3 className="text-xl font-semibold mb-4">{getSentiment()}</h3>
      <div className="flex w-full mb-4">
        <div
          className="h-2 rounded-l-full bg-red-300"
          style={{ width: `${getPercentage(feedback.negative)}%` }}
        ></div>
        <div
          className="h-2 bg-yellow-300"
          style={{ width: `${getPercentage(feedback.neutral)}%` }}
        ></div>
        <div
          className="h-2 rounded-r-full bg-green-300"
          style={{ width: `${getPercentage(feedback.positive)}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <span className="text-gray-500">Negative</span>
          <p className="font-semibold">{feedback.negative}</p>
        </div>
        <div>
          <span className="text-gray-500">Neutral</span>
          <p className="font-semibold">{feedback.neutral}</p>
        </div>
        <div>
          <span className="text-gray-500">Positive</span>
          <p className="font-semibold">{feedback.positive}</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityFeedback;
