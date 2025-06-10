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
