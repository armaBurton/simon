// leaders.js
export const getTopScores = async () => {
  try {
    const res = await fetch(`http://localhost:7890/api/v1/top_scores`, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
      credentials: "include",
      mode: "cors",
    });
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const addTopScore = async (username, score) => {
  console.log("addTopScore", username, score);
  try {
    const res = await fetch(`http://localhost:7890/api/v1/top_scores`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify({ username, score }),
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.error || "Add to Top Scores Failed");
    }

    return res.json();
  } catch (err) {
    console.error(err);
  }
};
