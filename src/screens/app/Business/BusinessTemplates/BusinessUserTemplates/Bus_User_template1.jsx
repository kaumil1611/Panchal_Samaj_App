import { Image, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Animated, Linking, Pressable, Text, TouchableOpacity, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TwitterIcon from '../../../../../assets/twitter.svg';

const Bus_User_template1 = ({ route }) => {

    const templateOneDetails = route.params.item
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const [isVisible, setIsVisible] = useState(false);
    const [twitterLink, setTwitterLink] = useState('');
    const [faceBookLink, setFaceBookLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const twitterAnimation = new Animated.Value(0);
    const instaAnimation = new Animated.Value(0);
    const faceBookAnimation = new Animated.Value(0);
    const linkedinAnimation = new Animated.Value(0);
    const logoAnimation = new Animated.Value(0);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const twitterScale = twitterAnimation.interpolate({ inputRange, outputRange });
    const instaScale = instaAnimation.interpolate({ inputRange, outputRange });
    const faceBookScale = faceBookAnimation.interpolate({ inputRange, outputRange });
    const linkedinScale = linkedinAnimation.interpolate({ inputRange, outputRange });
    const logoScale = logoAnimation.interpolate({ inputRange, outputRange });
    const dateObject = new Date(templateOneDetails?.dateOfOpeningJob);
    const year = dateObject.getFullYear();
    const images = templateOneDetails && templateOneDetails.businessLogo ? [{ uri: `${process.env.IMAGE_URL}${templateOneDetails.businessLogo}` }] : [];

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
        Linking.openURL(templateOneDetails?.businessWebsite);
    };

    useEffect(() => {
        setTwitterLink(templateOneDetails?.twitter || '');
        setInstagramLink(templateOneDetails?.instagram || '');
        setLinkedinLink(templateOneDetails?.linkedIn || '');
        setFaceBookLink(templateOneDetails?.facebook || '');
    }, []);

    const onPressLogoIn = () => {
        Animated.spring(logoAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressLogoOut = () => {
        Animated.spring(logoAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const openProfileImage = (e) => {
        e.stopPropagation();
        setIsVisible(true);
    }

    return (

        <View className="h-full">
            <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                <View className="p-3 w-screen bg-blue-100">
                    <View className="bg-white h-full rounded-2xl p-5 w-full max-w-md shadow-lg relative overflow-hidden">
                        <View className="items-center mb-4">

                            <Animated.View style={[{ transform: [{ scale: logoScale }] }]}>
                                <Pressable
                                    activeOpacity={1}
                                    onPressIn={onPressLogoIn}
                                    onPressOut={onPressLogoOut}
                                    onPress={openProfileImage}
                                >
                                    <View className="border-2 rounded-full border-red-800 p-2">
                                        <Image
                                            className="inline-block h-36 w-36 rounded-full ring-2 ring-white"
                                            source={{ uri: process.env.IMAGE_URL + templateOneDetails?.businessLogo }}
                                            alt='profile-img'
                                        />
                                    </View>
                                </Pressable>
                            </Animated.View>

                            <Text className="text-2xl text-black font-bold mt-4">
                                {templateOneDetails?.name}
                            </Text>

                            <Text className="text-lg text-gray-800 font-semibold mt-2 capitalize">
                                {templateOneDetails?.role} of {templateOneDetails?.businessName}
                            </Text>

                            <Text className="text-lg text-gray-800 font-semibold mt-2 capitalize">
                                {templateOneDetails?.businessType} Company - Since {year}
                            </Text>

                        </View>

                        <View className="border-b-2 border-gray-300 mb-4"></View>

                        <View className="w-full">

                            <View className="flex flex-row items-center flex-wrap mb-2">

                                <Text className="text-black text-base font-bold tracking-wide">Mobile Number: </Text>

                                <TouchableOpacity onPress={() => handleCallOpenLink("+91" + templateOneDetails?.businessContactNumber)}>
                                    <View>
                                        <Text className="text-[#5176df] text-sm font-semibold">
                                            +91 {templateOneDetails?.businessContactNumber}
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                {templateOneDetails?.phoneNumber2 && (
                                    <>
                                        <Text>, </Text>
                                        <TouchableOpacity onPress={() => handleCallOpenLink("+91" + templateOneDetails?.phoneNumber2)}>
                                            <View>
                                                <Text className="text-[#5176df] tracking-wider text-sm font-semibold">
                                                    +91 {templateOneDetails?.phoneNumber2}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>
                                )}

                            </View>

                            <View className="flex flex-row items-center flex-wrap mb-2">
                                <Text className="text-black text-base font-bold tracking-wide">Address: </Text>
                                <TouchableOpacity
                                    className="ms-2"
                                    onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(templateOneDetails?.address))}
                                >
                                    <Text className="text-[#5176df] text-md font-medium">{templateOneDetails?.address}</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-row items-center flex-wrap mb-2">
                                <Text className="text-black text-base font-bold tracking-wide">Company Email: </Text>
                                <TouchableOpacity onPress={() => handleClickOnMail(templateOneDetails?.businessEmail)}>
                                    <Text className="text-[#5176df] text-md font-medium">{templateOneDetails?.businessEmail}</Text>
                                </TouchableOpacity>
                            </View>

                            {templateOneDetails?.businessWebsite && (
                                <View className="flex flex-row items-center flex-wrap mb-2">
                                    <Text className="text-black text-base font-bold tracking-wide">Website: </Text>
                                    <TouchableOpacity onPress={handlePress}>
                                        <Text className="text-[#5176df] text-sm font-semibold">{templateOneDetails?.businessWebsite}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            <View className="flex flex-row items-center flex-wrap mb-2">
                                <Text className="text-black text-base font-bold tracking-wide">Short Description: </Text>
                                <Text className="text-black text-sm text-justify">{templateOneDetails?.businessShortDetail}</Text>
                            </View>

                            {templateOneDetails?.businessLongDetail && (
                                <View className="flex flex-row items-center flex-wrap mb-2">
                                    <Text className="text-black text-base font-bold tracking-wide">Long description: </Text>
                                    <Text className="text-black text-sm text-justify">{templateOneDetails?.businessLongDetail}</Text>
                                </View>
                            )}
                        </View>
                        <View>
                            {(faceBookLink || linkedinLink || instagramLink || twitterLink) && (
                                <View>
                                    <Text className="text-center text-md text-red-600 font-semibold mt-2">
                                        Connect with me on
                                    </Text>
                                </View>
                            )}


                            <View className="flex flex-row justify-around items-center mt-5 mb-3">
                                {(faceBookLink || linkedinLink || instagramLink || twitterLink) && (
                                    <View className="flex flex-row gap-4">
                                        {faceBookLink && (
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                onPressIn={onPressInFaceBook}
                                                onPressOut={onPressOutFaceBook}
                                                onPress={() => openLink(faceBookLink)}
                                            >
                                                <Animated.View style={[{ transform: [{ scale: faceBookScale }] }]}>
                                                    <AnimatedFontistoIcon name="facebook" size={25} color="#0866ff" />
                                                </Animated.View>
                                            </TouchableOpacity>
                                        )}
                                        {linkedinLink && (
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                onPressIn={onPressInLinkedin}
                                                onPressOut={onPressOutLinkedin}
                                                onPress={() => openLink(linkedinLink)}
                                            >
                                                <Animated.View style={[{ transform: [{ scale: linkedinScale }] }]}>
                                                    <AnimatedFontistoIcon name="linkedin" size={25} color="#0866ff" />
                                                </Animated.View>
                                            </TouchableOpacity>
                                        )}
                                        {instagramLink && (
                                            <TouchableOpacity
                                                activeOpacity={1}
                                                onPressIn={onPressInInsta}
                                                onPressOut={onPressOutInsta}
                                                onPress={() => openLink(instagramLink)}
                                            >
                                                <Animated.View style={[{ transform: [{ scale: instaScale }] }]}>
                                                    <AnimatedFontistoIcon name="instagram" size={25} color="#f700b2" />
                                                </Animated.View>
                                            </TouchableOpacity>
                                        )}
                                        {twitterLink && (
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
                                        )}
                                    </View>
                                )}
                            </View>
                        </View>


                        <View className="flex flex-row justify-center gap-2">
                            <Text className="text-black font-semibold">
                                Business Opening Date:-
                            </Text>
                            <Text className="text-black font-semibold">
                                {formatDate(templateOneDetails?.dateOfOpeningJob)}
                            </Text>
                        </View>

                    </View>

                    <ImageViewing
                        images={images}
                        imageIndex={0}
                        visible={isVisible}
                        onRequestClose={() => setIsVisible(false)}
                    />

                </View>
            </ScrollView >
        </View >
    )
}

const styles = {
    scrollViewContent: {
        flexGrow: 1,
    },
};

export default Bus_User_template1