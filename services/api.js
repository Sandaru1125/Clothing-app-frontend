const BASE_URL = "http://192.168.8.101:4500"; // ← replace with your IPv4 address

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
