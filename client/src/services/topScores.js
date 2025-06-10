// leaders.js
export const getTopScores = async () => {
  const getTopScores = async () => {
    const res = await fetch(`http://localhost:7890/api/v1/top_scores`, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({}),
    });
    if (!res.ok) throw new Error("");

    return res.json();
  };
};
