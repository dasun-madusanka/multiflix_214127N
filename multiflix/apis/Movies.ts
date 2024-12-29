import { ACCESS_TOKEN, MOVIE_BASE_URL } from "@/constants/keys";

export const getAllMovies = async (page: number) => {
  try {
    console.log("Access Token: " + ACCESS_TOKEN);
    const response = await fetch(`${MOVIE_BASE_URL}?page=${page}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Arrival Data" + data);
      return data;
    }

    throw new Error("Failed to fetch movies");
  } catch (error) {
    console.error(error);
  }
};

export const getPopularMovies = async (page: number) => {
  try {
    const response = await fetch(
      `${MOVIE_BASE_URL}?sort_by=popularity.desc&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error("Failed to fetch movies");
  } catch (error) {
    console.error(error);
  }
};

export const getNewMovies = async (page: number, now_date: string) => {
  try {
    const response = await fetch(
      `${MOVIE_BASE_URL}?release_date.lte=${now_date}&sort_by=release_date.desc&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error("Failed to fetch movies");
  } catch (error) {
    console.error(error);
  }
};

export const getUpcomingMovies = async (page: number, now_date: string) => {
  try {
    const response = await fetch(
      `${MOVIE_BASE_URL}?release_date.gte=${now_date}&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }

    throw new Error("Failed to fetch movies");
  } catch (error) {
    console.error(error);
  }
};
