import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Video } from 'expo-av'
import { icons } from '../../constants/index'
import * as DocumentPicker from 'expo-document-picker';
import { router } from 'expo-router'

const Create = () => {
  const [uploading, setUpLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    thumbnail: null,
    video: null,
    prompt: ''
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? ['image/*'] : ['video/mp4', 'video/gif']
    })

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2))
      }, 100)
    }
  }

  console.log(form)

  const onSubmit = () => {
    if (!form.title || !form.thumbnail || !form.video || !form.prompt) {
      return Alert.alert("Error", "All fields e required!")
    }
    setUpLoading(true)

    try {
      //appwrite video upload

      Alert.alert("Success", "Post uploaded succefully")
      router.push("/home")
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setUpLoading(false)
      setForm({
        title: '',
        thumbnail: null,
        video: null,
        prompt: ''
      })
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 mt-2 pb-8">
        <Text className="text-white text-2xl font-psemibold">
          Upload video
        </Text>
        <FormField
          title="Video title"
          placeHolderText="Enter a video title in short way..."
          value={form.title}
          handleChangeText={(text) => setForm({ ...form, title: text })}
          otherStyles="mt-8"
        />
        <View className="mt-4 space-y-3">
          <Text className="text-white text-lg font-pregular mb-2">Upload video</Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {
              form.video ? (
                <View className="w-full h-64 rounded-2xl">
                  <Video
                    source={{ uri: form.video.uri }}
                    style={{ width: '100%', height: '100%', borderRadius: 20 }}
                    useNativeControls
                    isLooping
                    onError={(e) => console.log("Video error:", e)}
                  />
                </View>
              ) : (
                <View className="w-full h-64 rounded-xl justify-center items-center bg-black-100">
                  <View className="w-14 h-14 border rounded-lg border-dashed border-secondary-200 justify-center items-center">
                    <Image source={icons.upload} className="w-1/2 h-1/2" resizeMode='contain' />
                  </View>
                </View>
              )
            }
          </TouchableOpacity>
        </View>
        <View className="mt-4 space-y-3">
          <Text className="text-white text-lg font-pregular mb-2">Thumnail image</Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {
              form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  className="w-full h-64 rounded-2xl"
                />
              ) : (
                <View className="w-full h-20 rounded-xl flex-row gap-2 justify-center items-center bg-black-100">
                  <View className="w-10 h-10 border rounded-lg border-dashed border-secondary-200 justify-center items-center">
                    <Image source={icons.upload} className="w-1/2 h-1/2" resizeMode='contain' />
                  </View>
                  <Text className="text-white font-pthin">Choose a file</Text>
                </View>
              )
            }
          </TouchableOpacity>
        </View>
        <FormField
          title="Prompt"
          placeHolderText="Enter a prompt for video..."
          value={form.prompt}
          handleChangeText={(text) => setForm({ ...form, prompt: text })}
          otherStyles="mt-8"
        />
        <CustomButton title="Save & Publish" containerStyle="mt-8" isLoading={uploading} handlePress={onSubmit} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create