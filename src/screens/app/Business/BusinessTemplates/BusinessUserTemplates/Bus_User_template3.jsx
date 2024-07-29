import React, { useEffect, useState } from 'react';
import {
    Animated,
    Image,
    Linking,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TwitterIcon from '../../../../../assets/twitter.svg';

const renderSocialIcons = ({ item }) => {

    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const instaAnimation = new Animated.Value(0);
    const twitterAnimation = new Animated.Value(0);
    const linkedinAnimation = new Animated.Value(0);
    const faceBookAnimation = new Animated.Value(0);
    const [twitterLink, setTwitterLink] = useState('');
    const [faceBookLink, setFaceBookLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const instaScale = instaAnimation.interpolate({ inputRange, outputRange });
    const twitterScale = twitterAnimation.interpolate({ inputRange, outputRange });
    const faceBookScale = faceBookAnimation.interpolate({ inputRange, outputRange });
    const linkedinScale = linkedinAnimation.interpolate({ inputRange, outputRange });

    useEffect(() => {
        setTwitterLink(item.twitter || '');
        setInstagramLink(item.instagram || '');
        setLinkedinLink(item.linkedIn || '');
        setFaceBookLink(item.facebook || '');
    }, [item]);

    const onPressFacebookIn = () => {
        Animated.spring(faceBookAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressFacebookOut = () => {
        Animated.spring(faceBookAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressLinkedinIn = () => {
        Animated.spring(linkedinAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressLinkedinOut = () => {
        Animated.spring(linkedinAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressInstagramIn = () => {
        Animated.spring(instaAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressInstagramOut = () => {
        Animated.spring(instaAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressTwitterIn = () => {
        Animated.spring(twitterAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressTwitterOut = () => {
        Animated.spring(twitterAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const openLink = (url) => {
        if (url) {
            Linking.openURL(url);
        }
    };

    return (

        <View className="flex flex-row justify-around w-[100%]">
            {item.facebook && (
                <Animated.View style={{ transform: [{ scale: faceBookScale }] }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => openLink(faceBookLink)}>
                        <Pressable
                            onPressIn={onPressFacebookIn}
                            onPressOut={onPressFacebookOut}
                        >
                            <AnimatedFontistoIcon name="facebook" size={30} color="#0866ff" />
                        </Pressable>
                    </TouchableOpacity>
                </Animated.View>
            )}
            {item.linkedIn && (
                <Animated.View style={{ transform: [{ scale: linkedinScale }] }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => openLink(linkedinLink)}>
                        <Pressable
                            onPressIn={onPressLinkedinIn}
                            onPressOut={onPressLinkedinOut}
                        >
                            <AnimatedFontistoIcon name="linkedin" size={30} color="#0866ff" />
                        </Pressable>
                    </TouchableOpacity>
                </Animated.View>
            )}
            {item.instagram && (
                <Animated.View style={{ transform: [{ scale: instaScale }] }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => openLink(instagramLink)}>
                        <Pressable
                            onPressIn={onPressInstagramIn}
                            onPressOut={onPressInstagramOut}
                        >
                            <AnimatedFontistoIcon name="instagram" size={30} color="#f700b2" />
                        </Pressable>
                    </TouchableOpacity>
                </Animated.View>
            )}
            {item.twitter && (
                <Animated.View style={{ transform: [{ scale: twitterScale }] }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => openLink(twitterLink)}>
                        <Pressable
                            onPressIn={onPressTwitterIn}
                            onPressOut={onPressTwitterOut}
                        >
                            <TwitterIcon width={30} height={30} color='red' />
                        </Pressable>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );

};

const Bus_User_template3 = ({ route }) => {

    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const item = route.params.item
    const logoAnimation = new Animated.Value(0);
    const logoScale = logoAnimation.interpolate({ inputRange, outputRange });
    const [isVisible, setIsVisible] = useState(false);
    const images = item && item.businessLogo ? [{ uri: `${process.env.IMAGE_URL}${item.businessLogo}` }] : [];

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getYear = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };

    const handleCallOpenLink = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleClickOnMail = (emailAddress) => {
        Linking.openURL(`mailto:${emailAddress}`);
    };

    const openLink = (url) => {
        if (url) {
            Linking.openURL(url);
        }
    };

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

    const openProfileImage = (e) => {
        e.stopPropagation();
        setIsVisible(true);
    }

    return (

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.userImageContainer}>

                <View style={styles.userImage}>
                    <Animated.View style={[{ transform: [{ scale: logoScale }] }]}>
                        <Pressable
                            activeOpacity={1}
                            onPressIn={onPressLogoIn}
                            onPressOut={onPressLogoOut}
                            onPress={openProfileImage}
                        >
                            <View className="border-2 rounded-full border-[#1b83bd] p-1">
                                <Image source={{ uri: process.env.IMAGE_URL + item?.businessLogo }} style={styles.image} />
                            </View>
                        </Pressable>
                    </Animated.View>
                </View>

                <View>
                    <Text className="text-sm text-black font-semibold">{item?.name}</Text>
                    <Text className="text-black text-sm font-semibold">{item?.role} of {item?.businessName}</Text>
                    <Text className="text-lg text-black font-semibold">{item?.businessType}</Text>
                    <Text className="text-sm font-semibold text-black">{item?.businessType} - Since {getYear(item?.dateOfOpeningJob)}</Text>
                </View>

            </View>

            <View className="m-3">

                <View className="flex flex-1 w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">
                    <Text className="font-bold text-black text-base">Company Name:</Text>
                    <Text className="font-semibold text-sm text-left w-[100%] text-black">{item?.businessName}</Text>
                </View>

                <View className="flex flex-1  w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">

                    <Text className="font-bold text-black text-base">Mobile Number: </Text>

                    <View className="flex-row">

                        <TouchableOpacity onPress={() => handleCallOpenLink("+91" + item.businessContactNumber)}>
                            <Text className="font-semibold text-sm text-left w-[100%] text-blue-500">
                                +91 {item.businessContactNumber}
                            </Text>
                        </TouchableOpacity>

                        {item?.phoneNumber2 &&
                            <>
                                <Text> , </Text>
                                <TouchableOpacity onPress={() => handleCallOpenLink("+91" + item.phoneNumber2)}>
                                    <Text className="font-semibold text-sm text-left w-[100%] text-blue-500">
                                        +91 {item.phoneNumber2}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        }

                    </View>

                </View>

                <View className="flex flex-1 flex-wrap w-[100%] flex-col gap-3 py-1 border-b-[1px] border-gray-300">
                    <Text className="font-bold text-black text-base">Company Address: </Text>
                    <TouchableOpacity
                        className="ms-2"
                        onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.address))}
                    >
                        <Text className="font-semibold text-sm text-left w-[80%] text-blue-500">{item.address}</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex flex-1 w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">
                    <Text className="font-bold text-black text-base">Company Email: </Text>
                    <TouchableOpacity onPress={() => handleClickOnMail(item.businessEmail)}>
                        <Text className="font-semibold text-sm text-left w-[100%] text-blue-500">{item.businessEmail}</Text>
                    </TouchableOpacity>
                </View>

                {item?.businessWebsite &&
                    <View className="flex flex-1 w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">
                        <Text className="font-bold text-black text-base">Website: </Text>
                        <TouchableOpacity onPress={() => openLink(item.businessWebsite)}>
                            <Text className="font-semibold text-sm text-left w-[100%] text-blue-500">{item.businessWebsite}</Text>
                        </TouchableOpacity>
                    </View>
                }

                {item?.businessShortDetail &&
                    <View className="flex flex-1 w-[100%] flex-col flex-wrap py-1 border-b-[1px] border-gray-300">
                        <Text className="font-bold text-black text-base">Short Description:</Text>
                        <Text className="font-medium text-sm tracking-wider text-left w-[100%] text-black my-2">{item.businessShortDetail}</Text>
                    </View>
                }

                {item?.businessLongDetail &&
                    <View className="flex flex-1 w-[100%] flex-col gap-3 flex-wrap py-1 border-b-[1px] border-gray-300">
                        <Text className="font-bold text-black text-base">Long Description: </Text>
                        <Text className="ffont-semibold text-sm text-left w-[100%] text-black">{item.businessLongDetail}</Text>
                    </View>
                }

            </View>

            <View className="flex flex-row items-center justify-around">
                {(item.twitter || item.instagram || item.linkedIn || item.facebook) && renderSocialIcons({ item })}
            </View>

            <View>
                <Text className="text-center text-sm font-bold text-gray-400 mt-3">Created by {formatDate(item?.dateOfOpeningJob)}</Text>
            </View>

            <ImageViewing
                images={images}
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%',
        padding: 10,
        textAlign: 'center',
        backgroundColor: '#ffffff',
        maxWidth: '100%'
    },
    userImageContainer: {
        flexDirection: 'row',
        backgroundColor: '#dfdfdf',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: '#1b83bd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    userImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 60,
    },
});

export default Bus_User_template3;