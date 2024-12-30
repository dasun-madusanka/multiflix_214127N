import { Card } from "./ui/card";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { Heading } from "./ui/heading";
import { Link } from "./ui/link";
import { Button, ButtonText } from "./ui/button";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { LinkText } from "./ui/link";
import { Icon } from "./ui/icon";
import { ArrowRightIcon } from "./ui/icon";
import { ScrollView } from "react-native";
import { Divider } from "./ui/divider";
import { useAuth } from "@/context/AuthContext";

type MovieCardProps = {
  movie_id: number;
  movie_img: string;
  movie_date: string;
  movie_name: string;
  movie_popularity: number;
  movie_lang: string;
  movie_rating: number;
  movie_votes: number;
};

export default function MovieCard({
  movie_id,
  movie_img,
  movie_date,
  movie_name,
  movie_popularity,
  movie_lang,
  movie_rating,
  movie_votes,
}: MovieCardProps) {
  const { user, addFavourite, removeFavourite } = useAuth();

  const isFavourite = user?.favourites.includes(movie_id);

  const handleFavourite = () => {
    if (isFavourite) {
      removeFavourite(movie_id);
    } else {
      addFavourite(movie_id);
    }
  };

  const movie_img_set = movie_img
    ? `https://image.tmdb.org/t/p/w500${movie_img}`
    : "https://static.vecteezy.com/system/resources/previews/010/973/641/non_2x/movie-poster-cinema-banner-with-popcorn-soda-clapperboard-glowing-cinema-banner-illustration-vector.jpg";
  return (
    <Card className="p-5 rounded-lg max-w-[360px] m-3">
      <Image
        source={{
          uri: `${movie_img_set}`,
        }}
        className="mb-6 h-[240px] w-full rounded-md aspect-[263/240]"
        alt="image"
      />
      <Text className="text-sm font-normal mb-2 text-typography-700">
        {movie_date}
      </Text>
      <Heading size="md" className="mb-4">
        {movie_name}
      </Heading>
      <HStack className="justify-between mt-3 mb-4">
        <VStack className="text-center" space="md">
          <Text className="text-xs font-medium">Popularity</Text>
          <Text className="text-sm font-semibold">{movie_popularity}</Text>
        </VStack>
        <VStack className="text-center" space="md">
          <Text className="text-xs font-medium">Lang</Text>
          <Text className="text-sm font-semibold">{movie_lang}</Text>
        </VStack>
        <VStack className="text-center" space="md">
          <Text className="text-xs font-medium">Rating</Text>
          <Text className="text-sm font-semibold">{movie_rating}</Text>
        </VStack>
        <VStack className="text-center" space="md">
          <Text className="text-xs font-medium">Votes</Text>
          <Text className="text-sm font-semibold">{movie_votes}</Text>
        </VStack>
      </HStack>


      <Button
        onPress={handleFavourite}
        className={`mt-4 ${isFavourite ? "bg-red-500" : "bg-indigo-500"}`}
      >
        <ButtonText>
          {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
        </ButtonText>
      </Button>
    </Card>
  );
}
