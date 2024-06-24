import { baseUrl } from "./api-config";
import { ColourResponse } from "./api-responses.interfaces";

export const getAllColours = async (): Promise<ColourResponse[]> => {
  const response = await fetch(baseUrl + "/colours");
  if (!response.ok) {
    throw new Error("Failed to fetch all colours. Please try again later");
  }

  return await response.json();
};

export const createColour = async (
  data: ColourFormData
): Promise<ColourResponse> => {
  const response = await fetch(baseUrl + "/colours", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.warn(response.status);
    throw new Error(
      "Oops, something went wrong while trying to create a new Todo. Please try again."
    );
  }
  return await response.json();
};
