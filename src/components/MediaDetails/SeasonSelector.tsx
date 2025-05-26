import { Pressable, Text, View, StyleSheet } from "react-native";
import { Menu } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { Season } from "@/types/types"

type SeasonSelectorProps = {
    seasons: Season[];
    selectedSeason: string;
    setSelectedSeason: React.Dispatch<React.SetStateAction<string>>;
}

export default function SeasonSelector(props: SeasonSelectorProps) {
    const { selectedSeason, seasons, setSelectedSeason } = props;
    const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false)
    
    const onHandleSeasonsChange = (newSeason: string) => {
        setSelectedSeason(newSeason);
        setIsMenuVisible(false)
    }

    return (
        <View>
            <Menu
                visible={isMenuVisible}
                onDismiss={() => setIsMenuVisible(false)}
                contentStyle={styles.menuContent}
                anchor={
                    <Pressable
                        style={styles.anchorContainer}
                        onPress={() => setIsMenuVisible(true)}
                    >
                        <Text style={styles.selectedSeaonsText}>{selectedSeason}</Text>
                        <Entypo name="chevron-thin-down" size={15} color="#b7b7b7" />
                    </Pressable>
                }
            >
                {seasons?.map((season) => (
                    <Menu.Item 
                        key={season.seasonName}
                        title={season.seasonName}
                        titleStyle={styles.menuTitle}
                        style={{height:40}}
                        onPress={() => onHandleSeasonsChange(season.seasonName)}
                    />
                ))}
            </Menu>
        </View>
    )
}

const styles = StyleSheet.create({
    menuContent: {
        backgroundColor: '#282828',
        marginTop: 5,
        borderRadius: 10,
    },
    anchorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#282828',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
        gap: 5,
        marginTop: 10,
        alignSelf: 'flex-start'
    },
    selectedSeaonsText: {
        color: '#b7b7b7',
        fontWeight: '500'
    },
    menuTitle: {
        color: 'white',
        fontWeight: '500',
        fontSize:14
    }
});