import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";

import { createUser } from "@/lib/appwrite";
import { GlobelContext } from "../../context/GlobelProvider";

const SignUp = () => {
  const { setUser, setIsLoggedIn } = useContext(GlobelContext)
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmite = async () => {
    if (!form.username || !form.password || !form.email) {
      Alert.alert("Error", "Please fill in all the fields");
    }
    setLoading(true);
    try {
      await createUser(form.email, form.password, form.username);
      // set it to globel state
      const user = await getCurrentUser()
      setIsLoggedIn(true)
      setUser(user)

      router.replace("/home");

    } catch (error) {
      console.log(error)
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='w-full justify-center min-h-[84vh] px-4'>
          <Image
            source={images.logo}
            className='w-32 h-32'
            resizeMode='contain'
          />
          <Text className='text-white text-2xl font-pbold'>Sign Up</Text>

          <FormField
            title='Username'
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            otherStyles='mt-7'
            placeHolderText='jhondoe'
          />
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            otherStyles='mt-7'
            placeHolderText='jhondoe@gmail.com'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles='mt-7'
            placeHolderText='*********'
          />

          <CustomButton
            title='Sign up'
            handlePress={onSubmite}
            containerStyle='w-full mt-2'
            isLoading={loading}
          />

          <Text className='text-white mt-4 font-pbold text-center'>
            Already have account ?{"  "}
            <Link href='/sign-in' className='text-secondary-100 underline'>
              Sign in
            </Link>
          </Text>
        </View>
        <StatusBar style='light' />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
