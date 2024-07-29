import { Text } from "native-base";
import React, { useState, useMemo } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Carousel from "react-native-reanimated-carousel";

const PAGE_WIDTH = Dimensions.get('window').width;

function Parallax({ sliderImages }) {

    const [autoPlay] = useState(true);
    const [snapEnabled] = useState(true);

    const modifiedImages = useMemo(() => {
        return sliderImages?.map(item => {
            const imageName = item?.image?.split('.')[0];
            return {
                ...item,
                image: `${process.env.IMAGE_URL}${item?.image}`,
                title: imageName,
            };
        });
    }, [sliderImages]);

    return (
        <>
            <View>
                <Carousel
                    style={{ alignSelf: 'stretch', display: "flex", gap: 8, marginTop: 15, marginBottom: 15 }}
                    width={PAGE_WIDTH}
                    height={PAGE_WIDTH * 0.8}
                    vertical={false}
                    loop
                    snapEnabled={snapEnabled}
                    autoPlay={autoPlay}
                    autoPlayInterval={1500}
                    modeConfig={{
                        parallaxScrollingScale: 0.9,
                        parallaxScrollingOffset: 50,
                    }}
                    data={modifiedImages}
                    scrollAnimationDuration={1000}
                    renderItem={({ item }) => (
                        <View style={styles.slide}>
                            <LinearGradient colors={['rgba(0, 0.3, 0, 0.3)', 'rgba(0.2, 0.4, 0.4, 0.8)']} style={styles.gradient}>
                                <Animated.Image style={styles.img} source={{ uri: item.image }} />
                            </LinearGradient>
                        </View>
                    )}
                />
            </View>
            <View className="px-3">
                <Text className="text-xl font-bold text-rose-700 tracking-wider">Browse By</Text>
                <View className="border-b-2 border-rose-700 w-[15%]"></View>
            </View>
        </>
    );
}

export default Parallax;

const styles = StyleSheet.create({
    slide: {
        flexDirection: "row",
        alignSelf: "center",
        overflow: "hidden",
        borderRadius: 20,
        marginHorizontal: 5,
        marginRight: 12
    },
    gradient: {
        flex: 1,
        borderRadius: 15
    },
    img: {
        height: '100%',
        width: '100%',
        position: 'relative',
        backgroundColor: "transparent",
    },
    container: {
        position: "absolute",
        bottom: 20,
    },
});
