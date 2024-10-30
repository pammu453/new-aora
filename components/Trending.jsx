import { View, Image, Text, FlatList, TouchableOpacity, ImageBackground } from "react-native";
import React, { useState } from "react";
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants/index'
import { Video, ResizeMode } from "expo-av";

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1
  }
}

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.9
  }
}

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}>
      {
        play ? (
          <View className="w-52 h-72 rounded-[33px] mt-3">
            <Video source={{ uri: item.video }} className="mt-3 bg-white/10" resizeMode={ResizeMode.COVER} useNativeControls shouldPlay
              onPlaybackStatusUpdate={(status) => {
                if (status.didJustFinish) {
                  setPlay(false)
                }
              }}
              style={{ width: '100%', height: '100%', borderRadius: 20 }}
            />
          </View>
        ) : (
          <TouchableOpacity className="relative flex justify-center items-center" activeOpacity={0.7} onPress={() => setPlay(true)}>
            <ImageBackground source={{ uri: item.thumbnail }} className="w-52 h-72 rounded-[33px]  my-5 overflow-hidden shadow-lg shadow-black/40 " resizeMode="cover" />
            <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
          </TouchableOpacity>
        )
      }
    </Animatable.View>
  )
}

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems?.length > 0) {
      setActiveItem(viewableItems[0].key)
    }
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      horizontal
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70
      }}
      contentOffset={{ x: 170 }}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
};

export default Trending;
