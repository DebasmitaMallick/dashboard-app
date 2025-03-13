import React, { useEffect, useState } from "react";
import ProgressBar from "./SemiCircularProgress";

const PerformanceScore = () => {
  const [scoreData, setScoreData] = useState({ score: 0, rank: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceScore = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/performance-score");
        if (!response.ok) throw new Error("Failed to fetch score");
        const data = await response.json();
        setScoreData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceScore();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-xl text-center">
      <div className="w-full mx-auto mb-6">
        <ProgressBar progress={scoreData.score} />
      </div>
      <hr className="my-7 text-stone-300" />
      <div className="text-left">
        <h2 className="text-xl font-semibold my-2">You're good!</h2>
        <p className="text-gray-500 mb-6">
          Your sales performance score is better than {scoreData.rank}% of other users
        </p>
        <button className="px-6 py-2 bg-gray-100 text-black rounded-full hover:bg-gray-200">
          Improve your score
        </button>
      </div>
    </div>
  );
};

export default PerformanceScore;
