import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/SearchInput";
import Trending from "@/components/Trending";
import EmptyComponent from "@/components/EmptyComponent";
import { getVideos } from "@/lib/appwrite";
import useData from "@/hooks/useData";


const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {data,error,loading} = useData(getVideos);

  const onRefresh = async () => {
    setRefreshing(true);
    //seee any new videoes
    setRefreshing(false);
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={data}
        // keyExtractor={(item) => console.log(item)}
        renderItem={({ item }) => (
          <Text className='text-white text-3xl'>Title</Text>
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-4'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='text-sm text-gray-100 font-pmedium'>
                  Welcome Back
                </Text>
                <Text className='text-3xl font-psemibold text-white'>
                  Pramod
                </Text>
              </View>

              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-9'
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInput />
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Latest videos
              </Text>
              <Trending posts={data} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyComponent
            title='No Videos found'
            subtitle='Be the first to upload videos'
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <StatusBar style='light' />
    </SafeAreaView>
  );
};

export default Home;
