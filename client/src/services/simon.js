// Simon.js
export const getCurrentUser = async () => {
  const res = await fetch(`http://localhost:7890/api/v1/users/me`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
    credentials: "include",
    mode: "cors",
  });

  if (res.status === 401) return null;

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Error fetching user");
  }

  const data = await res.json();
  return data;
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
  const res = await fetch(`http://localhost:7890/api/v1/users/login`, {
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
