import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface MovieInfoProps {
    label: string;
    value: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
    return (
        <View className="flex-row items-center justify-start px-5 mt-5">
            <Text className="text-gray-300 text-lg font-bold">{label}: </Text>
            <Text className="text-gray-300 text-lg">{value}</Text>
        </View>
    );
};


const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const { data: movie, loading, error } = useFetch(() => fetchMovieDetails(id as string));

    return (
        <View className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{
                paddingBottom: 80
            }}>
                <View>
                    <Image source={{ uri: `http://image.tmdb.org/t/p/w500${movie?.poster_path}` }} className="w-full h-[500px]" resizeMode='stretch' />
                </View>

                <View className="flex-col items-start justify-center px-5 mt-5">
                    <Text className="text-white text-xl font-bold">{movie?.title}</Text>
                </View>

                <View className="flex-row items-center justify-start px-5 mt-5">
                    <Text className="text-white text-lg font-bold">Release Date: </Text>
                    <Text className="text-gray-300 text-lg">{movie?.release_date} </Text>
                    <Text className="text-gray-300 text-lg">{movie?.runtime} minutes</Text>
                </View>

                <View className="flex-row items-center justify-start px-5 mt-5">
                    <Image source={icons.star} className="w-5 h-5 mr-2" />
                    <Text className="text-gray-300 text-lg mt-2">{Math.round(movie?.vote_average ?? 0)} / 10 </Text>
                    <Text className="text-gray-300 text-lg mt-2">({movie?.vote_count?.toLocaleString()})</Text>
                </View>

                <View className="flex-row items-center justify-start px-5 mt-5">
                    <Text className="text-white text-lg font-bold">Overview: </Text>
                </View>
                
                <View className="flex-row items-center justify-start px-5 mt-5">

                    <Text className="text-gray-300 text-lg">{movie?.overview} </Text>
                </View>

                <MovieInfo label="Genres" value={movie?.genres?.map((genre: { name: any; }) => genre.name).join(', ')} />
                
                <View className="flex flex-row justify-between w-1/2">
                    <MovieInfo label="Budget" value={`${(movie?.budget / 1000000).toFixed(2)} million`} />
                    <MovieInfo label="Revenue" value={`${(movie?.revenue / 1000000).toFixed(2)} million`} />
                </View>

                <MovieInfo label="Production Companies" value={movie?.production_companies?.map((company: { name: any; }) => company.name).join(', ')} />
            </ScrollView>

            <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row item-center justify-center z-50"
                onPress={router.back}>
                <Image source={icons.arrow}  className="size 5 mr-1 mt-0.5 rotate-180" tintColor="#fff" />
                <Text className="text-white font-semibold text-base">Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}

export default MovieDetails;