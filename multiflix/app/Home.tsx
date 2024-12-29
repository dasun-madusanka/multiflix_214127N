import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { ButtonText, ButtonIcon, ButtonGroup } from "@/components/ui/button";
import { LinkText } from "@/components/ui/link";
import { Fab, FabLabel, FabIcon } from "@/components/ui/fab";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import MovieCard from "@/components/MovieCard";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { useAuth } from "@/context/AuthContext";
import {
  Avatar,
  AvatarBadge,
  AvatarImage,
  AvatarFallbackText,
} from "@/components/ui/avatar";
import { Movie, MovieResponse } from "@/types/Movie";
import {
  getAllMovies,
  getNewMovies,
  getPopularMovies,
  getUpcomingMovies,
} from "@/apis/Movies";
import { ChevronRightIcon, ChevronLeftIcon, Icon, StarIcon } from "@/components/ui/icon";
import ProfileModal from "@/components/ProfileModal";
import { P } from "@expo/html-elements";
// import { ChevronRightIcon } from "@/components/ui/icon/index.web";

export default function Home() {
    const { user, logout } = useAuth();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [MovieResponse, setMovieResponse] = useState<MovieResponse>();
  const [NewMovieResponse, setNewMovieResponse] = useState<MovieResponse>();
  const [PopularMovieResponse, setPopularMovieResponse] =
    useState<MovieResponse>();
  const [UpcomingMovieResponse, setUpcomingMovieResponse] =
    useState<MovieResponse>();
  const [page, setPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [newPage, setNewPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  useEffect(() => {
    getAllMovies(page).then((movies) => {
      setMovieResponse(movies);
      setMovies(movies.results);
    });
  }, [page]);

  useEffect(() => {
    getNewMovies(newPage, date).then((movies) => {
      setNewMovieResponse(movies);
      setNewMovies(movies.results);
    });
  }, [newPage, date]);

  useEffect(() => {
    getPopularMovies(popularPage).then((movies) => {
      setPopularMovieResponse(movies);
      setPopularMovies(movies.results);
    });
  }, [popularPage]);

  useEffect(() => {
    getUpcomingMovies(upcomingPage, date).then((movies) => {
      setUpcomingMovieResponse(movies);
      setUpcomingMovies(movies.results);
    });
  }, [upcomingPage, date]);

  return (
    <SafeAreaView className="w-full h-full">
      <ScrollView
        className="w-full h-full"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <VStack className="w-full h-full bg-background-0 flex-grow justify-center">
          <VStack
            className="relative hidden md:flex h-full w-full flex-1  items-center  justify-center"
            space="md"
          >
            <Image
              height="100%"
              width="100%"
              source={require("@/assets/icon.png")}
              className="object-cover h-full w-full"
              alt="Radial Gradient"
            />
          </VStack>
          <VStack className="md:items-center md:justify-center flex-1 w-full  p-9 md:gap-10 gap-16 md:m-auto md:w-1/2 h-full">
            <HStack className="w-full justify-between align-center">
              <Image
                source={require("@/assets/images/logo.png")}
              />
              <HStack
                className="space-md"
                space="md"
                style={{ alignItems: "center" }}
              >
                <VStack>
                  <Heading size="sm">{user?.name}</Heading>
                  <Text size="sm">{user?.username}</Text>
                </VStack>
                <Avatar className="bg-indigo-300 border-2 border-indigo-600">
                  <AvatarFallbackText onPress={()=>setModalOpen(true)}>{user?.name}</AvatarFallbackText>

                  <AvatarBadge />
                </Avatar>
              </HStack>
            </HStack>
            <VStack className="w-full">
              <HStack
                className="w-full justify-between align-center"
                style={{ alignItems: "center" }}
              >
                <Text size="xl">All Movies</Text>
                <Box>
                  <HStack className="align-center justify-center" space="lg">
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        borderBlockColor: "black",
                      }}
                      onPress={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      <Icon as={ChevronLeftIcon} size="xl" />
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "transparent",
                        borderBlockColor: "black",
                      }}
                      onPress={() => setPage(page + 1)}
                      disabled={page === MovieResponse?.total_pages}
                    >
                      <Icon as={ChevronRightIcon} size="xl" />
                    </Button>
                  </HStack>
                </Box>
              </HStack>
              <HStack className="w-full overflow-x-scroll">
                <ScrollView horizontal={true}>
                  {movies?.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie_id={movie.id}
                      movie_img={movie.poster_path}
                      movie_date={movie.release_date}
                      movie_name={movie.title}
                      movie_popularity={movie.popularity}
                      movie_lang={movie.original_language}
                      movie_rating={movie.vote_average}
                      movie_votes={movie.vote_count}
                    />
                  ))}
                </ScrollView>
              </HStack>
            </VStack>
            <VStack className="w-full">
              <HStack className="w-full justify-between">
                <Text size="xl">New Movies</Text>
                <Box>
                  <HStack className="align-center justify-center" space="lg">
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        borderBlockColor: "black",
                      }}
                      onPress={() => setNewPage(newPage - 1)}
                      disabled={newPage === 1}
                    >
                      <Icon as={ChevronLeftIcon} size="xl" />
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "transparent",
                        borderBlockColor: "black",
                      }}
                      onPress={() => setNewPage(newPage + 1)}
                      disabled={newPage === NewMovieResponse?.total_pages}
                    >
                      <Icon as={ChevronRightIcon} size="xl" />
                    </Button>
                  </HStack>
                </Box>
              </HStack>
              <HStack className="w-full overflow-x-scroll">
                <ScrollView horizontal={true}>
                  {newMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie_id={movie.id}
                      movie_img={movie.poster_path}
                      movie_date={movie.release_date}
                      movie_name={movie.title}
                      movie_popularity={movie.popularity}
                      movie_lang={movie.original_language}
                      movie_rating={movie.vote_average}
                      movie_votes={movie.vote_count}
                    />
                  ))}
                </ScrollView>
              </HStack>
            </VStack>

            <VStack className="w-full">
              <HStack className="w-full justify-between">
                <Text size="xl">Popular Movies</Text>
                <Box>
                  <HStack className="align-center justify-center" space="lg">
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        borderBlockColor: "black",
                      }}
                      onPress={() => setPopularPage(popularPage - 1)}
                      disabled={popularPage === 1}
                    >
                      <Icon as={ChevronLeftIcon} size="xl" />
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "transparent",
                        borderBlockColor: "black",
                      }}
                      onPress={() => setPopularPage(popularPage + 1)}
                      disabled={
                        popularPage === PopularMovieResponse?.total_pages
                      }
                    >
                      <Icon as={ChevronRightIcon} size="xl" />
                    </Button>
                  </HStack>
                </Box>
              </HStack>
              <HStack className="w-full overflow-x-scroll">
                <ScrollView horizontal={true}>
                  {popularMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie_id={movie.id}
                      movie_img={movie.poster_path}
                      movie_date={movie.release_date}
                      movie_name={movie.title}
                      movie_popularity={movie.popularity}
                      movie_lang={movie.original_language}
                      movie_rating={movie.vote_average}
                      movie_votes={movie.vote_count}
                    />
                  ))}
                </ScrollView>
              </HStack>
            </VStack>

            <VStack className="w-full">
              <HStack className="w-full justify-between">
                <Text size="xl">Upcoming Movies</Text>
                <Box>
                  <HStack className="align-center justify-center" space="lg">
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        borderBlockColor: "black",
                      }}
                      onPress={() => setUpcomingPage(upcomingPage - 1)}
                      disabled={upcomingPage === 1}
                    >
                      <Icon as={ChevronLeftIcon} size="xl" />
                    </Button>

                    <Button
                      style={{
                        backgroundColor: "transparent",
                        borderBlockColor: "black",
                      }}
                      onPress={() => setUpcomingPage(upcomingPage + 1)}
                      disabled={
                        upcomingPage === UpcomingMovieResponse?.total_pages
                      }
                    >
                      <Icon as={ChevronRightIcon} size="xl" />
                    </Button>
                  </HStack>
                </Box>
              </HStack>
              <HStack className="w-full overflow-x-scroll">
                <ScrollView horizontal={true}>
                  {upcomingMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie_id={movie.id}
                      movie_img={movie.poster_path}
                      movie_date={movie.release_date}
                      movie_name={movie.title}
                      movie_popularity={movie.popularity}
                      movie_lang={movie.original_language}
                      movie_rating={movie.vote_average}
                      movie_votes={movie.vote_count}
                    />
                  ))}
                </ScrollView>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
      <Fab
        size="md"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        className="bg-indigo-300"
      >
        <FabIcon as={StarIcon} />
        <FabLabel>{user?.favourites.length} Favourites</FabLabel>
      </Fab>

      <ProfileModal modelOpen={modalOpen} setModalOpen={setModalOpen} />
    </SafeAreaView>
  );
}
