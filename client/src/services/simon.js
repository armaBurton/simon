// Simon.js
export const getCurrentUser = async () => {
  try {
    const res = await fetch(`http://localhost:7890/api/v1/users/me`, {
      headers: { "Content-Type": "application/json" },
      method: "GET",
      credentials: "include",
      mode: "cors",
    });

    const text = await res.text();
    console.log("Raw response text: ", text);

    if (!res.ok) throw new Error("Not Authenticated");
    const data = await JSON.parse(text);
    return data.user;
  } catch (error) {
    console.error("getCurrentUser failed:", error);
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const res = await fetch(`http://localhost:7890/api/v1/users${id}`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
    });

    return res.json();
  } catch (err) {
    console.error(err);
  }
};

export const signUp = async (email, password) => {
  const res = await fetch(`http://localhost:7890/api/v1/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Signup failed");

  return res.json();
};

export const signIn = async (email, password) => {
  const res = await fetch(`http://localhost:7890/api/v1/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid email or password");

  return res.json();
};

export const signOut = async () => {
  const res = await fetch(`http://localhost:7890/api/v1/users/sessions`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    mode: "cors",
  });

  return res.ok;
};
