import { Image, ScrollView } from 'native-base';
import React, { useState } from 'react';
import { Animated, Linking, Text, TouchableOpacity, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TwitterIcon from '../../../../assets/twitter.svg';

const Template1 = () => {

    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const [twitterLink, setTwitterLink] = useState('');
    const [faceBookLink, setFaceBookLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const twitterAnimation = new Animated.Value(0);
    const instaAnimation = new Animated.Value(0);
    const faceBookAnimation = new Animated.Value(0);
    const linkedinAnimation = new Animated.Value(0);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const twitterScale = twitterAnimation.interpolate({ inputRange, outputRange });
    const instaScale = instaAnimation.interpolate({ inputRange, outputRange });
    const faceBookScale = faceBookAnimation.interpolate({ inputRange, outputRange });
    const linkedinScale = linkedinAnimation.interpolate({ inputRange, outputRange });

    const onPressInTwitter = () => {
        Animated.spring(twitterAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutTwitter = () => {
        Animated.spring(twitterAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressInInsta = () => {
        Animated.spring(instaAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutInsta = () => {
        Animated.spring(instaAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressInFaceBook = () => {
        Animated.spring(faceBookAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutFaceBook = () => {
        Animated.spring(faceBookAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressInLinkedin = () => {
        Animated.spring(linkedinAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutLinkedin = () => {
        Animated.spring(linkedinAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const openLink = (url) => {
        if (url) {
            Linking.openURL(url);
        }
    };

    const handleCallOpenLink = (phoneNumber) => {
        if (phoneNumber) {
            Linking.openURL(`tel:${phoneNumber}`);
        }
    };

    const handleClickOnMail = (mail) => {
        if (mail) {
            Linking.openURL(`mailto:${mail}`);
        }
    };

    const handlePress = () => {
        Linking.openURL('https://international.ajaymodi.com/');
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View className="p-3 w-screen bg-blue-100">
                    <View className="bg-white h-full rounded-2xl p-5 w-full max-w-md shadow-lg relative overflow-hidden">
                        <View className="items-center mb-4">
                            <View className="border-2 rounded-full border-red-800 p-2">
                                <Image
                                    className="inline-block h-36 w-36 rounded-full ring-2 ring-white"
                                    source={{ uri: 'https://eclatsuperior.com/wp-content/uploads/2021/04/man4.jpg' }}
                                    alt='profile-img'
                                />
                            </View>
                            <Text className="text-2xl text-black font-bold mt-4">
                                Vishw Prajapati
                            </Text>

                            <Text className="text-lg text-gray-800 font-semibold mt-2">
                                Owner of Asgard Tours and Travels
                            </Text>

                            <Text className="text-lg text-gray-800 font-semibold mt-2">
                                Travel Company - Since 2002
                            </Text>

                        </View>

                        <View className="border-b-2 border-gray-300 mb-4"></View>

                        <View className="w-full">
                            <View className="flex flex-row items-center flex-wrap mb-2">
                                <Text className="text-black text-base font-bold tracking-wide">Mobile Number :- </Text>
                                <TouchableOpacity onPress={() => handleCallOpenLink("+91" + "9173211901")}>
                                    <View>
                                        <Text className="text-[#5176df] text-sm font-semibold">
                                            +91 9173211901
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <Text> , </Text>
                                <TouchableOpacity onPress={() => handleCallOpenLink("+91" + "8490820875")}>
                                    <View>
                                        <Text className="text-[#5176df] tracking-wider text-sm font-semibold">
                                            +91 8490820875
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-row items-center flex-wrap mb-2">
                                <Text className="text-black text-base font-bold tracking-wide">Address :- </Text>
                                <TouchableOpacity
                                    className="ms-2"
                                    onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent("B-382 Nishitpark aadinathnagar odhav ahmedabad"))}
                                >
                                    <Text className="text-[#5176df] text-md font-medium">B-382 Nishitpark aadinathnagar odhav ahmedabad</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-row items-center flex-wrap mb-2">
                                <Text className="text-black text-base font-bold tracking-wide">Company Email :- </Text>
                                <TouchableOpacity onPress={() => handleClickOnMail("vishwprajapati66@gmail.com")}>
                                    <Text className="text-[#5176df] text-md font-medium">vishwprajapati66@gmail.com</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-row items-center flex-wrap mb-2">
                                <Text className="text-black text-base font-bold tracking-wide">Website :- </Text>
                                <TouchableOpacity onPress={handlePress}>
                                    <Text className="text-[#5176df] text-sm font-semibold">https://international.ajaymodi.com/</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-row items-center flex-wrap mb-2">
                                <Text className="text-black text-base font-bold tracking-wide">Short Description :- </Text>
                                <Text className="text-black text-sm text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</Text>
                            </View>

                            <View className="flex flex-row items-center flex-wrap mb-2">
                                <Text className="text-black text-base font-bold tracking-wide">Long description :- </Text>
                                <Text className="text-black text-sm text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</Text>
                            </View>

                        </View>

                        <View>
                            <Text className="text-center text-md text-black font-semibold mt-2">Connect with me on</Text>
                        </View>

                        <View className="flex flex-row justify-around items-center mt-3">

                            <TouchableOpacity
                                activeOpacity={1}
                                onPressIn={onPressInFaceBook}
                                onPressOut={onPressOutFaceBook}
                                onPress={() => openLink(faceBookLink)}
                            >
                                <Animated.View style={[{ transform: [{ scale: faceBookScale }] }]}>
                                    <AnimatedFontistoIcon
                                        name="facebook"
                                        size={25}
                                        color="#0866ff"
                                    />
                                </Animated.View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={1}
                                onPressIn={onPressInLinkedin}
                                onPressOut={onPressOutLinkedin}
                                onPress={() => openLink(linkedinLink)}
                            >
                                <Animated.View style={[{ transform: [{ scale: linkedinScale }] }]}>
                                    <AnimatedFontistoIcon
                                        name="linkedin"
                                        size={25}
                                        color="#0866ff"
                                    />
                                </Animated.View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={1}
                                onPressIn={onPressInInsta}
                                onPressOut={onPressOutInsta}
                                onPress={() => openLink(instagramLink)}
                            >
                                <Animated.View style={[{ transform: [{ scale: instaScale }] }]}>
                                    <AnimatedFontistoIcon
                                        name="instagram"
                                        size={25}
                                        color="#f700b2"
                                    />
                                </Animated.View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={1}
                                onPressIn={onPressInTwitter}
                                onPressOut={onPressOutTwitter}
                                onPress={() => openLink(twitterLink)}
                            >
                                <Animated.View style={[{ transform: [{ scale: twitterScale }] }]}>
                                    <TwitterIcon width={25} height={25} color='red' />
                                </Animated.View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = {
    card: {
        width: '100%',
        backfaceVisibility: 'hidden',
    },
    hidden: {
        position: 'absolute',
    },
    visible: {
        position: 'relative',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
};

export default Template1