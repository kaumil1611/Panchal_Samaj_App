import { useRoute } from '@react-navigation/native';
import {
    BackdropBlur,
    Canvas,
    Fill,
    Image,
    useImage
} from "@shopify/react-native-skia";
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const CardDetails = ({ content, size, image, redirectTo, functionality, navigation, handleSetSelectedVillage, villageListing, listingStyle }) => {

    const route = useRoute();
    const small = (size === 'sm');
    const large = (size === 'lg');
    const full = (size === 'full');
    const [loading, setLoading] = useState(true);
    const imageURL = useImage(image);
    const canvasWidth = small ? (listingStyle === 'list' ? 200 : 100) : large ? 300 : full ? 330 : 156;
    const canvasHeight = small ? 100 : large ? 230 : full ? 500 : 180;
    const imageWidth = small ? (listingStyle === 'list' ? 200 : 100) : large ? 160 : full ? 330 : 130;
    const imageHeight = small ? 100 : large ? 250 : full ? 500 : 190;
    const blurClipY = small ? 90 : large ? 180 : full ? 380 : 120;
    const blurClipWidth = full ? 350 : 256;
    const gridCardAnimation = new Animated.Value(0);
    const listCardAnimation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const gridCardScale = gridCardAnimation.interpolate({ inputRange, outputRange });
    const listCardScale = listCardAnimation.interpolate({ inputRange, outputRange });

    useEffect(() => {
        if (imageURL) {
            setLoading(false);
        }
    }, [imageURL]);

    const redirect = () => {
        if (villageListing) {
            handleSetSelectedVillage(content);
        }
        if (redirectTo) {
            navigation.navigate(redirectTo);
        } else {
            if (route.name == "Home") {
                functionality();
            }
        }
    };

    const onPressGridCardIn = () => {
        Animated.spring(gridCardAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressGridCardOut = () => {
        Animated.spring(gridCardAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressListCardIn = () => {
        Animated.spring(listCardAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressListCardOut = () => {
        Animated.spring(listCardAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    return (
        <>
            <View className={`${listingStyle === "grid" ? "" : "flex flex-row justify-center items-center"}`}>
                {listingStyle === "grid" ?
                    <View>
                        <Animated.View style={[{ transform: [{ scale: gridCardScale }] }]}>
                            <TouchableOpacity
                                onPress={redirect}
                                activeOpacity={1}
                                onPressIn={onPressGridCardIn}
                                onPressOut={onPressGridCardOut}
                                className={`${small ? "w-44" : large ? "w-40" : full ? "w-full" : "w-32"} overflow-hidden rounded-2xl shadow-lg shadow-black m-2 mb-5`}
                            >
                                <View className="relative">
                                    {loading ? (
                                        <SkeletonPlaceholder>
                                            <SkeletonPlaceholder.Item
                                                width={canvasWidth}
                                                height={canvasHeight}
                                                borderRadius={10}
                                            />
                                        </SkeletonPlaceholder>
                                    ) : (
                                        <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
                                            <Image
                                                image={imageURL}
                                                x={0}
                                                y={0}
                                                width={imageWidth}
                                                height={imageHeight}
                                                fit="cover"
                                            />
                                            <BackdropBlur
                                                blur={4}
                                                clip={{ x: 0, y: blurClipY, width: blurClipWidth, height: 120 }}
                                            >
                                                <Fill color="rgba(200, 200, 200, 0.37)" />
                                            </BackdropBlur>
                                        </Canvas>
                                    )}
                                    {listingStyle === "grid" ?
                                        <View className="bottom-0 p-2 absolute w-full">
                                            <Text style={styles.strokeme} className={`${small ? 'h-12 text-xl text-center' : large ? 'h-10 text-2xl' : full ? 'h-24 text-4xl' : 'h-12 text-2xl'} font-bold stroke-[#243c5a]`}>
                                                {content}
                                            </Text>
                                        </View>
                                        : ""
                                    }
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                    :
                    <View className="w-full px-3">
                        <Animated.View style={[{ transform: [{ scale: listCardScale }] }]}>
                            <TouchableOpacity
                                onPress={redirect}
                                activeOpacity={1}
                                onPressIn={onPressListCardIn}
                                onPressOut={onPressListCardOut}
                                className="w-100% flex flex-row items-center h-20 mb-2 bg-white rounded-lg shadow-md pl-2"
                            >
                                <View className="rounded-lg overflow-hidden">
                                    <Canvas style={{ width: 65, height: 65 }}>
                                        <Image
                                            image={imageURL}
                                            x={0}
                                            y={0}
                                            width={65}
                                            height={65}
                                            fit="cover"
                                        />
                                    </Canvas>
                                </View>
                                {listingStyle === "grid" ? "" :
                                    <View>
                                        <Text className="text-black font-semibold text-2xl pl-2">
                                            {content}
                                        </Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    strokeme: {
        color: "white",

        textShadowColor: "#000",
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 1,
    },
});


export default CardDetails;

/* 


*/