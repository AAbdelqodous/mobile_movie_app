import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    
    const {
        data : movies,
        loading : moviesLoading,
        error : moviesError,
        refetch: loadMovies,
        reset
    } = useFetch( () => fetchMovies({ query: searchQuery }), false);
    
    useEffect( () => {
        const timeoutId = setTimeout( async () => {
            if ( searchQuery.trim() ) {
                await loadMovies();
            } else {
                reset();
            }
        }, 500 );

        return () => clearTimeout(timeoutId);
    }, [ searchQuery ] )

    
    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode='cover'/>
            <FlatList 
                data={movies} 
                renderItem={({item}) => <MovieCard {... item} />} 
                keyExtractor={(item) => item.id.toString()}
                className='px-5'
                numColumns={3}
                columnWrapperStyle={{ 
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20 item-center">
                            <Image source={icons.logo} className="w-12 h-10"/>
                        </View>  
                        <View className="my-5">  
                            <SearchBar
                                placeholder='Search for movies, TV shows, actors...'
                                value={searchQuery}
                                onChangeText={(text: string) => setSearchQuery(text)}
                                onPress={loadMovies}
                                editable={true}
                            />
                        </View>
                        {moviesLoading && (
                            <View className="w-full mt-10 flex-row justify-center">
                                <ActivityIndicator size="large" color="#0000ff" className='my-3'/>
                            </View>
                        )}
                        {moviesError && (
                            <View className="w-full mt-10 flex-row justify-center">
                                <Text className="text-red-500 px-5 my-3">Error: {moviesError.message}</Text>
                            </View>
                        )}
                        {!moviesLoading && !moviesError && searchQuery.trim() && (movies?.length ?? 0) > 0 && (
                            <Text className="text-lg text-white font-bold mt-5 mb-3">Search Results for: '{searchQuery.trim()}'</Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError?(
                        <View className='mt-10 px-5'>
                            <Text className='text-center text-gray-500'>{searchQuery.trim() ? `No results found for '${searchQuery.trim()}'` : 'Search for a movie'}</Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

export default search;