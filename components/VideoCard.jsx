import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from "../constants/index"
import { ResizeMode, Video } from 'expo-av';

const VideoCard = ({ posts: { title, video, thumbnail, creator: { username, avatarURL } } }) => {
    const [playing, setPlaying] = useState(false);

    return (
        <View className="flex-col items-center px-4 mb-6">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Image source={{ uri: avatarURL }} className="w-full h-full rounded-lg" resizeMode='contain' />
                    </View>
                    <View className="justify-center flex-1 ml-3 gap-y-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                        <Text className="text-xs text-gray-100 font-pregular">{username}</Text>
                    </View>
                </View>
            </View>
            {playing ? (
                <View className='w-full h-60 rounded-xl mt-3'>
                    <Video
                        source={{ uri: video }}
                        style={{ width: '100%', height: '100%', borderRadius: 20 }}
                        resizeMode={ResizeMode.COVER}
                        useNativeControls
                        shouldPlay
                        isLooping
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                setPlaying(false);
                            }
                        }}
                        onError={(e) => console.log("Video error:", e)}
                    />
                </View>
            ) : (
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setPlaying(true)}
                    className="w-full h-60 rounded-xl mt-3 relative justify-center items-center" >
                    <Image source={{ uri: thumbnail }} className="w-full h-full rounded-xl mt-3" resizeMode='cover' />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode='contain' />
                </TouchableOpacity>
            )
            }
        </View>
    )
}

export default VideoCard