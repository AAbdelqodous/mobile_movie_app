const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_USERS_COLLECTION_ID!;

import { Client, Databases, ID, Query } from 'react-native-appwrite';
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const API_ENDPOINT = 'https://cloud.appwrite.io/v1';

const client = new Client()
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)
    ]);
    console.log(result);
    
    if( result.documents.length > 0 ) {
        const existingMovie = result.documents[0];
        await database.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            existingMovie.$id, {
                count: existingMovie.count + 1,
            }
        );
    }else{
        await database.createDocument(
            DATABASE_ID, 
            COLLECTION_ID, 
            ID.unique(), {
                searchTerm: query,
                count: 1,
                movie_id: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }
        ); 
    }
    } catch (error) {
        console.error('Error updating search count:', error);
    }
}

export const getTrendingMovies  = async () : Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.orderDesc('count'),
            Query.limit(10)
        ]);
        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return undefined;
    }
}