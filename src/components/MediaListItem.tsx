import { MediaListData } from "@/types/types";
import { View, Text, Image } from "react-native";

type MediaListItemProps = {
    mediaItem: MediaListData;
}

export default function MediaListItem({ mediaItem }: MediaListItemProps) {
    return (
        <View>
            <Image source={{ uri: mediaItem.image }} style={{ width: 110, aspectRatio: 3 / 4, marginHorizontal: 5, borderRadius: 5 }} />
            <Text style={{ color: 'white' }}>{mediaItem.id}</Text>
        </View>
    )
}