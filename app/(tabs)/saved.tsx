import { icons } from '@/constants/icons';
import { Image, Text, View } from 'react-native';

const saved = () => {
    return (
        <View className='bg-primary flex-1 px-10'>
            <View className='flex flex-1 items-center justify-center flex-col gap-5'>
                <Image source={icons.save} className='size-10' tintColor="#fff" />
                <Text className='text-gray-300 text-base'>Saved</Text>
            </View>
        </View>
    );
};

export default saved;