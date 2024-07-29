import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Animated, Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

const HomePageCardContents = ({ content, image, redirectTo, functionality, navigation, handleSetSelectedVillage, villageListing }) => {

    const route = useRoute();
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const animation = new Animated.Value(0);
    const [windowWidth] = useState(Dimensions.get('window').width);
    const scale = animation.interpolate({ inputRange, outputRange });

    const onPressIn = () => {
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(animation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const redirect = () => {
        if (villageListing) {
            handleSetSelectedVillage(content);
        }
        if (redirectTo) {
            navigation.navigate(redirectTo);
        } else {
            if (route.name === "Home") {
                functionality();
            }
        }
    };

    return (
        <>
            {content && (
                <View
                    className={`rounded-[15px] bg-white shadow-input shadow-custom-elevation  ${Platform.OS == "ios" ? "shadow-sm" : "shadow-md shadow-black"}`}
                    style={[
                        styles.container,
                        windowWidth < 376 && styles.smallContainer,
                    ]}
                >
                    <Animated.View style={[{ transform: [{ scale }] }]}>
                        <TouchableOpacity
                            onPress={redirect}
                            activeOpacity={1}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            className="flex items-center gap-3 justify-center relative"
                        >

                            <Image
                                className={`${windowWidth < 376 ? "w-14" : "w-24"}  ${windowWidth < 376 ? "h-14" : "h-24"}  font-semibold text-center`}
                                source={image}
                            />

                            <View className="" >
                                <Text className={` ${windowWidth < 376 ? "text-base" : windowWidth < 376 ? "text-xl" : "text-lg"} text-black font-semibold text-center tracking-wider`}>
                                    {content}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginBottom: 10
    },
    smallContainer: {
        width: 110,
        height: 120
    },
});

export default HomePageCardContents;