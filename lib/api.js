const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Base helper function to make HTTP requests to the backend API.
 */
async function request(path) {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is missing.");
  }

  const res = await fetch(`${API_URL}${path}`, {
    cache: "no-store", // Prevents stale cached responses when updates occur in Admin
  });

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}: ${path}`);
  }

  return res.json();
}

/**
 * Fetch all sweets from the backend API.
 */
export async function getSweets() {
  try {
    return await request("/sweets");
  } catch (err) {
    console.error("Error fetching sweets from API:", err.message);
    return []; // Returns empty array on error instead of local mock data
  }
}

/**
 * Fetch a single sweet by ID from the backend API.
 */
export async function getSweet(id) {
  try {
    return await request(`/sweets/${id}`);
  } catch (err) {
    console.error(`Error fetching sweet ID ${id} from API:`, err.message);
    return null; // Returns null on error instead of local mock data
  }
}