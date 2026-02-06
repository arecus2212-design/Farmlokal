import axios from "axios";
import { getAccessToken } from "./auth.service";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function fetchExternalData(retries: number = 3): Promise<any> {
  const token = await getAccessToken();

  try {
    console.log("Calling external API...");

    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        timeout: 3000,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    if (retries > 0) {
      console.log("Retrying...");
      await sleep((4 - retries) * 500);
      return fetchExternalData(retries - 1);
    }

    throw new Error("External API failed");
  }
}
