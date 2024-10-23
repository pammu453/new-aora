import "react-native-url-polyfill/auto";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { Redirect, router } from "expo-router";
import { GlobelContext } from "@/context/GlobelProvider";

const Home = () => {
  const { isLoading, isLoggedIn } = useContext(GlobelContext);

    if (isLoading) {
      return (
        <SafeAreaView className='bg-primary h-full justify-center items-center'>
          <ActivityIndicator size='large' color='#ffffff' />
        </SafeAreaView>
      );
    }

  if (!isLoading && isLoggedIn) {
    return <Redirect href='/home' />;
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='w-full justify-center items-center h-full px-4'>
          <Image
            source={images.logo}
            className='w-[130px]  h-10'
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className='max-w-[380px] w-full h-[300px]'
            resizeMode='contain'
          />
          <View className='relative'>
            <Text className='text-white text-3xl text-center font-bold'>
              Discover Endless Possibilities with{" "}
              <Text className='text-secondary-100'>Aora</Text>
            </Text>
            <Image
              source={images.path}
              className='w-[50px] h-[15px] absolute top-[50px] right-[110px]'
              resizeMode='contain'
            />
          </View>
          <Text className='text-white text-sm text-center mt-4 font-semibold '>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text>
          <CustomButton
            title='Continue with email'
            handlePress={() => router.push("/sign-in")}
            containerStyle='w-full mt-7'
          />
        </View>
        <StatusBar style='light' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
