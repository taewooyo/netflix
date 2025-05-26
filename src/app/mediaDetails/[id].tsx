import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import mediaDetailedList from '@assets/data/mediaDetailedList.json';
import MedaiInfo from "@/components/MediaDetails/MediaInfo";
import MediaInfo from "@/components/MediaDetails/MediaInfo";
import { useVideoPlayer, VideoView } from "expo-video";
import MediaHeader from "@/components/MediaDetails/MedaiHeader";
import { useRef } from "react";

export default function MediaDetails() {
    const { id } = useLocalSearchParams();
    const videoViewRef = useRef<VideoView | null>(null)
    const mediaItem = mediaDetailedList.find((media) => media.id == id)

    if (!mediaItem) {
        return <Text style={{ color: 'white' }}>Media Item Was Not Found!</Text>
    };

    const { title, releaseYear, ageRestriction, duration, description, type, seasons, trailer, videoUrl, thumbnail } = mediaItem
    const videoSource = type === "MOVIE" ? videoUrl : seasons?.[0].episodes?.[0].videoUrl

    if (!videoSource) {
        return <Text style={{ color: 'white' }}>Video Source Was Not Found!</Text>
    };

    const trailierPlayer = useVideoPlayer(trailer, player => {
        player.currentTime = 10;
        player.play();
    });
    const mediaPlayer = useVideoPlayer(videoSource, player => {
        player.showNowPlayingNotification = true;
    })

    const onPlayMediaPressed = () => {
        trailierPlayer.pause();
        videoViewRef.current?.enterFullscreen()
        mediaPlayer.play();
    };

    return (
        <SafeAreaView>
            <MediaHeader
                thumbnail={thumbnail}
                trailierPlayer={trailierPlayer}
                mediaPlayer={mediaPlayer}
                videoViewRef={videoViewRef}
            />
            <MediaInfo
                title={title}
                releaseYear={releaseYear}
                ageRestriction={ageRestriction}
                duration={duration}
                description={description}
                type={type}
                nrOfSeasons={seasons?.length}
                onPlayMediaPressed={onPlayMediaPressed}
            />
        </SafeAreaView>
    )
};