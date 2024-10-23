import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

const FormField = ({
  title,
  value,
  handleChangeText,
  placeHolderText,
  otherStyles,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2  ${otherStyles}`}>
      <Text className='text-white text-lg'>{title}</Text>
      <TextInput
        value={value}
        placeholder={placeHolderText}
        placeholderTextColor='#7b7b8b'
        className='border-2 border-gray-500 p-3 bg-black-200 rounded-xl text-white text-lg focus:border-secondary-100'
        onChangeText={handleChangeText}
        secureTextEntry={!showPassword && title === "Password"}
      />
      {title === "Password" && (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          className='absolute right-2 top-8'
        >
          <Image
            source={showPassword ? icons.eye : icons.eyeHide}
            className='w-9 h-9'
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FormField;
