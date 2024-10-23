import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  isLoading,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-secondary-100 py-4 px-2 rounded-md ${containerStyle} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text
        className={`text-primary text-2xl text-center font-semibold ${textStyle}`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
