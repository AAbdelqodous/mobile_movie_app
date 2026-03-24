import { icons } from '@/constants/icons';
import { Image, Pressable, StyleSheet, TextInput } from 'react-native';

interface probs {
  onPress: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
}

const SearchBar = ({ onPress, placeholder, value, onChangeText, editable = false }: probs) => {
  return (
    <Pressable onPress={onPress} className="flex-row items-center bg-dark-100 rounded-lg px-5 py-4">
      <Image source={icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff"/>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        className="flex-1 ml-2 text-white"/>
    </Pressable>
  )
}

export default SearchBar

const styles = StyleSheet.create({})