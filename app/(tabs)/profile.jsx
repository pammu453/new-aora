import { View, Text, Image, FlatList, StatusBar, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useData from '../../hooks/useData'
import EmptyComponent from '../../components/EmptyComponent'
import VideoCard from '../../components/VideoCard'
import { currentUserPosts, signOut } from '../../lib/appwrite'
import { GlobelContext } from '../../context/GlobelProvider'
import { icons } from '../../constants'
import { router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useContext(GlobelContext)
  const { data: posts } = useData(() => currentUserPosts(user.$id))

  console.log("Profle", user)
  console.log("Porfile Posts", posts)

  const handelLogout = async () => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace("/sign-in")
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard posts={item} />
        )}
        ListHeaderComponent={() => (
          <View className="mb-9">
            <TouchableOpacity onPress={handelLogout} className="flex-row-reverse mt-3 mr-5">
              <Image source={icons.logout} className="w-7 h-7" resizeMode='contain' />
            </TouchableOpacity>
            <View className='flex-col items-center mt-8 '>
              <Image source={{ uri: user?.avatarURL }} className="w-14 h-14 border-r border-2 border-secondary-200 rounded-full" resizeMode='contain' />
              <Text className="text-white text-3xl mt-2 font-bold">{user?.username}</Text>
              <Text className="text-white font-bold text-xl">{user?.email}</Text>
              <View className="flex-row gap-2 mt-3 border-2 border-black p-2 rounded-xl bg-secondary-200">
                <Text className="text-white font-bold text-xl">{posts ? posts.length : 0} posts</Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyComponent
            title='No Videos found'
            subtitle='Be the first to upload videos'
          />
        )}
      />
      <StatusBar style='light' />
    </SafeAreaView>
  )
}

export default Profile