// Simon.js
export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${process.env.LOCAL_HOST}/api/v1/users/me`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
    });
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (id) => {
  try {
    const res = await fetch(`${process.env.LOCAL_HOST}/api/v1/users${id}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
    });

    return res.json();
  } catch (err) {
    console.error(err);
  }
};

export const signUp = async (username, password) => {
  const res = await fetch(`${process.env.LOCAL_HOST}/api/v1/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) throw new Error("something something something");

  return res.json();
};

export const signIn = async (username, password) => {
  const res = await fetch(`http://localhost:7890/api/v1/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid username or password");

  return res.json();
};

export const signOut = async () => {
  const res = await fetch(`http://localhost:7890/api/v1/users`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
  });

  return res.ok();
};

export const getTopScores = async () => {
  const res = await fetch(`${process.env.LOCAL_HOST}/api/v1/top-scores`);

  return res.json();
};
