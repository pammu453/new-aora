import { View, Text, FlatList, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import useData from '../../hooks/useData'
import { getSearchVideos } from '../../lib/appwrite'
import SearchInput from '../../components/SearchInput'
import EmptyComponent from '../../components/EmptyComponent'
import VideoCard from '../../components/VideoCard'

const Search = () => {
    const { query } = useLocalSearchParams()
    const { data: searchedVideos,refetch } = useData(() => getSearchVideos(query))

    useEffect(()=>{
        refetch()
    },[query])

    return (
        <SafeAreaView className='bg-primary h-full'>
            <FlatList
                data={searchedVideos}
                keyExtractor={(item) => item.$id}
                renderItem={({ item }) => (
                    <VideoCard posts={item} />
                )}
                ListHeaderComponent={() => (
                    <View className='my-6 px-4 space-y-4'>
                        <View className='justify-between items-start flex-row mb-6'>
                            <View>
                                <Text className='text-sm text-gray-100 font-pmedium'>
                                    Search results for
                                </Text>
                                <Text className='text-3xl font-psemibold text-white'>
                                    {query}
                                </Text>
                            </View>
                        </View>
                        <SearchInput intitialQuery={query} />
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

export default Search