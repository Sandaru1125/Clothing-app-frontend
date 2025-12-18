const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL; 

export const signup = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    // Try to parse JSON, but return raw text if parsing fails
    let body;
    try {
      body = text ? JSON.parse(text) : {};
    } catch (e) {
      body = { raw: text };
    }

    return {
      ok: response.ok,
      status: response.status,
      body,
    };
  } catch (error) {
    return { ok: false, error: error.message || "Network error" };
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const text = await response.text();
    let body;
    try {
      body = text ? JSON.parse(text) : {};
    } catch (e) {
      body = { raw: text };
    }

    return {
      ok: response.ok,
      status: response.status,
      body,
    };
  } catch (error) {
    return { ok: false, error: error.message || "Network error" };
  }
};
