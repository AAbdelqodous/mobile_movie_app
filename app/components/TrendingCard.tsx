import { images } from '@/constants/images'
import MaskedView from '@react-native-masked-view/masked-view'
import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
  return (
    <Link href={`/movie/${movie.movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{
            uri: movie.poster_url || `http://placehold.co/600x400/1a1a1a/ffffff.png`
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-6xl font-bold text-white">{index + 1}</Text>
            }
          >
            <Image source={images.rankingGradient} className="size-14" resizeMode='cover'/>
          </MaskedView>
        </View>
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{movie.title}</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard
