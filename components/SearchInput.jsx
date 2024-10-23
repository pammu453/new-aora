import { View, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";

const SearchInput = () => {
  return (
    <View className={`space-y-2`}>
      <TextInput
        placeholderTextColor='#7b7b8b'
        className='border-2 border-gray-500 p-3 bg-black-200 rounded-xl text-white text-lg focus:border-secondary-100'
        placeholder="Search for video topic"
      />
      <TouchableOpacity className='absolute right-4 top-3'>
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
