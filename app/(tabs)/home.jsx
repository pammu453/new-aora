import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
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
import { getVideos, getLatestVideos } from "@/lib/appwrite";
import useData from "@/hooks/useData";
import VideoCard from "@/components/VideoCard";
import { GlobelContext } from "../../context/GlobelProvider";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useData(getVideos);
  const { data: latestPosts } = useData(getLatestVideos);
  const { user } = useContext(GlobelContext)

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch()
    setRefreshing(false);
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard posts={item} />
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-4'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='text-sm text-gray-100 font-pmedium'>
                  Welcome Back
                </Text>
                <Text className='text-3xl font-psemibold text-white'>
                  {user?.username}
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
              <Trending posts={latestPosts || []} />
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
