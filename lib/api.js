import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Base helper function to make HTTP requests to the backend API using Axios.
 */
async function request(path) {

  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is missing.");
  }

  // Axios automatically throws on non-2xx status codes and parses JSON into response.data
  const response = await axios.get(`${API_URL}${path}`, {
    headers: {
      "Cache-Control": "no-store", // Prevents stale cached responses when updates occur in Admin
    },
  });


  return response.data;
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
  if (id == null || id === "") {
    console.error("getSweet() called without an ID");
    return null;
  }

  try {
    return await request(`/sweets/${id}`);
  } catch (err) {
    console.error(
      `Error fetching sweet ID ${id} from API:`,
      err.message
    );

    return null;
  }
}