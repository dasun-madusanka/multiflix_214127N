import { User_BASE_URL } from "@/constants/keys";

export const registerUser = async (user: any): Promise<any> => {
  try {
    const response = await fetch(`${User_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log("Response");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Failed to register user");
  } catch (error: any) {
    console.error(error.message);
  }
};

export const loginUser = async (user: any): Promise<any> => {
  try {
    console.log("User: " + user.username);
    const response = await fetch(
      `${User_BASE_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    console.log("Response");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Failed to register user");
  } catch (error: any) {
    console.error(error.message);
  }
};
