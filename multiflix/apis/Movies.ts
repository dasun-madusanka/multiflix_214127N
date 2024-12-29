import { ACCESS_TOKEN, MOVIE_BASE_URL } from "@/constants/keys";

export const getAllMovies = async (page: number) => {
    try {
        console.log("Access Token: "+ ACCESS_TOKEN);
      const response = await fetch(
        `${MOVIE_BASE_URL}?page=${page}`,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );


  
      if (response.ok) {
        const data = await response.json();
        console.log("Arrival Data"+ data);
        return data.results;
      }
  
      throw new Error("Failed to fetch movies");
    } catch (error) {
      console.error(error);
    }
  };