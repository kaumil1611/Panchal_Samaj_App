import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Animated, Dimensions, Image, Platform, Text, View } from 'react-native';
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
                <View className={`bg-white rounded-[15px] w-[90%] shadow-input shadow-custom-elevation mb-3 ${Platform.OS == "ios" ? "shadow-sm" : "shadow-md shadow-black"}`}>
                    <View>
                        <Animated.View style={[{ transform: [{ scale }] }]}>
                            <TouchableOpacity
                                onPress={redirect}
                                activeOpacity={1}
                                onPressIn={onPressIn}
                                onPressOut={onPressOut}
                                className="flex items-center justify-center"
                            >
                                <Image
                                    className={`${windowWidth < 376 ? "w-10" : "w-10"}  ${windowWidth < 376 ? "h-10" : "h-10"}  font-semibold text-center mt-2`}
                                    source={image}
                                />

                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                    <View>
                        <View>
                            <Text className={` ${windowWidth < 376 ? "text-[14px]" : windowWidth < 376 ? "text-xl" : "text-[14px]"} text-black font-semibold text-center tracking-wider mb-3`}>
                                {content}
                            </Text>
                        </View>
                    </View>
                </View>
              )}
        </>
    );
};

export default HomePageCardContents;