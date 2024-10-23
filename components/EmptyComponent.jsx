import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyComponent = ({ title, subtitle }) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image
        source={images.empty}
        className='w-[200px] h-[200px]'
        resizeMode='contain'
      />
      <Text className='text-sm text-gray-100 font-pmedium'>{title}</Text>
      <Text className='text-2xl font-psemibold text-center text-white'>
        {subtitle}
      </Text>
      <CustomButton
        title='Create'
        handlePress={() => router.push("/create")}
        containerStyle='w-2/3 mt-2'
      />
    </View>
  );
};

export default EmptyComponent;
