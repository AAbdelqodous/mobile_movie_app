import { icons } from '@/constants/icons';
import React from 'react';
import { Image, Pressable, StyleSheet, TextInput } from 'react-native';

interface probs {
  onPress: () => void;
  placeholder: string;
}

const SearchBar = ({ onPress, placeholder }: probs) => {
  return (
    <Pressable onPress={onPress} className="flex-row items-center bg-dark-100 rounded-lg px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff"/>
      <TextInput 
        placeholder={placeholder} 
        placeholderTextColor="#a8b5db"
        value={''}
        onChangeText={() => console.log('Search text changed')}
        editable={false}
        className="flex-1 ml-2 text-white"/>
    </Pressable>
  )
}

export default SearchBar

const styles = StyleSheet.create({})