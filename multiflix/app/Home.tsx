import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { ButtonText } from "@/components/ui/button";
import { LinkText } from "@/components/ui/link";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import MovieCard from "@/components/MovieCard";
import { Avatar, AvatarBadge, AvatarImage, AvatarFallbackText } from "@/components/ui/avatar";
import { Movie } from "@/types/Movie";
import { getAllMovies } from "@/apis/Movies";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    getAllMovies(1).then((movies) => {
      setMovies(movies);
    });
  }, []);

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
            <HStack className="w-full justify-between">
              <Text size="2xl">Multiflix</Text>
              <HStack className="space-md" space="md" style={{ alignItems: "center" }}>
                {/* <Button>
                  <ButtonText>Sign in</ButtonText>
                </Button> */}
                <Text size="xl" className="text-typography-700">
                    Dasun
                </Text>
                <Avatar>
                    <AvatarFallbackText>D</AvatarFallbackText>
                    {/* <AvatarImage
                        source={{
                        uri: "https://icon-library.com/images/google-user-icon/google-user-icon-21.jpg",
                        }}
                    /> */}
                    <AvatarBadge />
                </Avatar>
              </HStack>
            </HStack>
            <VStack className="w-full">
              <HStack className="w-full justify-between">
                <Text size="xl">Popular Movies</Text>
                <LinkText>View all</LinkText>
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
                  {/* <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard /> */}
                </ScrollView>
              </HStack>
            </VStack>
            <VStack className="w-full">
              <HStack className="w-full justify-between">
                <Text size="xl">Popular Series</Text>
                <LinkText>View all</LinkText>
              </HStack>
              <HStack className="w-full overflow-x-scroll">
                <ScrollView horizontal={true}>
                  {/* <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard />
                  <MovieCard /> */}
                  {movies.map((movie) => (
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
    </SafeAreaView>
  );
}
