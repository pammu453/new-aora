import { View, TextInput, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ intitialQuery }) => {
  const [query, setQuery] = useState(intitialQuery || '');
  const pathName = usePathname()

  return (
    <View className={`space-y-2`}>
      <TextInput
        placeholderTextColor='#7b7b8b'
        className='border-2 border-gray-500 p-3 bg-black-200 rounded-xl text-white text-lg focus:border-secondary-100'
        placeholder="Search for video topic"
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity className='absolute right-4 top-3' onPress={() => {
        if (!query) {
          return Alert.alert("Oops!", "You have to provide the search query from database")
        } else if (pathName.startsWith("/search")) {
          router.setParams({ query });
        } else {
          router.push(`/search/${query}`);
        }
      }}>
        <Image source={icons.search} className='w-5 h-5' resizeMode='contain' />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;