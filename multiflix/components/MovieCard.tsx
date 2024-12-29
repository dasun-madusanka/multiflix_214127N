import { Card } from "./ui/card";
import { Image } from "./ui/image";
import { Text } from "./ui/text";
import { Heading } from "./ui/heading";
import { Link } from "./ui/link";
import { HStack } from "./ui/hstack";
import { VStack } from "./ui/vstack";
import { LinkText } from "./ui/link";
import { Icon } from "./ui/icon";
import { ArrowRightIcon } from "./ui/icon";
import { ScrollView } from "react-native";
import { Divider } from "./ui/divider";

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
    const movie_img_set = movie_img ? `https://image.tmdb.org/t/p/w500${movie_img}` : "https://static.vecteezy.com/system/resources/previews/010/973/641/non_2x/movie-poster-cinema-banner-with-popcorn-soda-clapperboard-glowing-cinema-banner-illustration-vector.jpg";
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
      <Link href="https://gluestack.io/" isExternal>
        <HStack className="items-center">
          <LinkText
            size="sm"
            className="font-semibold text-info-600 no-underline"
          >
            Read Blog
          </LinkText>
          <Icon
            as={ArrowRightIcon}
            size="sm"
            className="text-info-600 mt-0.5 ml-0.5"
          />
        </HStack>
      </Link>
    </Card>
  );
}
