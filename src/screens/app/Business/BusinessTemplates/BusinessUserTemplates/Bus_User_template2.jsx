import { Pressable } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Animated, Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TwitterIcon from '../../../../../assets/twitter.svg';

const Bus_User_template2 = ({ route }) => {

    const item = route.params.item
    const instaAnimation = new Animated.Value(0);
    const twitterAnimation = new Animated.Value(0);
    const linkedinAnimation = new Animated.Value(0);
    const faceBookAnimation = new Animated.Value(0);
    const logoAnimation = new Animated.Value(0);
    const [twitterLink, setTwitterLink] = useState('');
    const [faceBookLink, setFaceBookLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [linkedinLink, setLinkedinLink] = useState('');
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const instaScale = instaAnimation.interpolate({ inputRange, outputRange });
    const twitterScale = twitterAnimation.interpolate({ inputRange, outputRange });
    const faceBookScale = faceBookAnimation.interpolate({ inputRange, outputRange });
    const logoScale = logoAnimation.interpolate({ inputRange, outputRange });
    const linkedinScale = linkedinAnimation.interpolate({ inputRange, outputRange });
    const dateObject = new Date(item.dateOfOpeningJob);
    const [isVisible, setIsVisible] = useState(false);
    const year = dateObject.getFullYear();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

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
    console.log(item.facebook, ":::item.facebook")
    const renderSocialIcons = () => (
        <View className="flex flex-row justify-around mt-6">
            {item.facebook && <Animated.View style={[{ transform: [{ scale: faceBookScale }] }]}>
                <TouchableOpacity activeOpacity={1} onPress={() => openLink(faceBookLink)}>
                    <Pressable
                        activeOpacity={1}
                        onPressIn={onPressFacebookIn}
                        onPressOut={onPressFacebookOut}
                        onPress={() => openLink(faceBookLink)}
                    >
                        <AnimatedFontistoIcon name="facebook" size={30} color="#0866ff" />
                    </Pressable>
                </TouchableOpacity>
            </Animated.View>}

            {item.linkedIn &&
                <Animated.View style={[{ transform: [{ scale: linkedinScale }] }]}>
                    <TouchableOpacity activeOpacity={1} onPress={() => openLink(linkedinLink)}>
                        <Pressable
                            activeOpacity={1}
                            onPressIn={onPressLinkedinIn}
                            onPressOut={onPressLinkedinOut}
                            onPress={() => openLink(linkedinLink)}
                        >
                            <AnimatedFontistoIcon name="linkedin" size={30} color="#0866ff" />
                        </Pressable>
                    </TouchableOpacity>
                </Animated.View>
            }

            {item.instagram &&
                <Animated.View style={[{ transform: [{ scale: instaScale }] }]}>
                    <TouchableOpacity activeOpacity={1} onPress={() => openLink(instagramLink)}>
                        <Pressable
                            activeOpacity={1}
                            onPressIn={onPressInstagramIn}
                            onPressOut={onPressInstagramOut}
                            onPress={() => openLink(instagramLink)}
                        >
                            <AnimatedFontistoIcon name="instagram" size={30} color="#f700b2" />
                        </Pressable>
                    </TouchableOpacity>
                </Animated.View>
            }

            {item.twitter &&
                <Animated.View style={[{ transform: [{ scale: twitterScale }] }]}>
                    <TouchableOpacity activeOpacity={1} onPress={() => openLink(twitterLink)}>
                        <Pressable
                            activeOpacity={1}
                            onPressIn={onPressTwitterIn}
                            onPressOut={onPressTwitterOut}
                        >
                            <TwitterIcon width={30} height={30} color='red' />
                        </Pressable>
                    </TouchableOpacity>
                </Animated.View>
            }
        </View>
    );

    useEffect(() => {
        setTwitterLink(item.twitter || '');
        setInstagramLink(item.instagram || '');
        setLinkedinLink(item.linkedIn || '');
        setFaceBookLink(item.facebook || '');
    }, []);

    const openProfileImage = (e) => {
        e.stopPropagation();
        setIsVisible(true);
    }

    const profileLogo = `${process.env.IMAGE_URL}${item.businessLogo}`

    const images = item && item.businessLogo ? [{ uri: `${process.env.IMAGE_URL}${item.businessLogo}` }] : [];

    const renderCard = () => (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={['#5c86f7', '#9ab1e1', "#fff"]}
                className="h-36 flex flex-row justify-between items-center gap-5"
            >
                <View className="left-4 w-24 h-24 shadow-md m-2 shadow-gray-500">
                    <Animated.View style={[{ transform: [{ scale: logoScale }] }]}>
                        <Pressable
                            activeOpacity={1}
                            onPressIn={onPressLogoIn}
                            onPressOut={onPressLogoOut}
                            onPress={openProfileImage}
                        >
                            <Image
                                className="w-full h-full rounded-full"
                                source={{ uri: profileLogo }}
                                alt='profile-img'
                            />
                        </Pressable>
                    </Animated.View>
                </View>
                <View className="flex-1 flex-col">
                    <Text className="text-gray-700 text-xl w-64 font-bold">{item.businessName}</Text>
                </View>
            </LinearGradient>

            <View className="bg-white px-5 pb-5">
                <Text className="text-xl text-black font-bold mt-5">
                    {item.name}
                </Text>
                <Text className="text-base text-gray-800 font-semibold mt-1">
                    {item.role} of {item.businessName}
                </Text>
                <View className="flex flex-row items-center flex-wrap ">
                    <Text className="text-black text-base font-bold tracking-wide">Business Type: </Text>

                    <Text className="text-base text-gray-800 font-semibold mt-1">
                        {item.businessType} - Since {year}
                    </Text>
                </View>
                <View className="flex flex-row items-center flex-wrap mb-2 mt-2">

                    <Text className="text-black text-base font-bold tracking-wide">Mobile Number: </Text>
                    <TouchableOpacity onPress={() => handleCallOpenLink(item.businessContactNumber)}>
                        <View>
                            <Text style={{ color: '#5176df', fontSize: 14, fontWeight: 'bold' }}>
                                {item.businessContactNumber}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {item?.phoneNumber2 &&
                        <>
                            <Text> , </Text>
                            <TouchableOpacity onPress={() => handleCallOpenLink(item.phoneNumber2)}>
                                <View>
                                    <Text className="text-[#5176df] tracking-wider text-sm font-semibold">
                                        {item.phoneNumber2}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    }
                </View>

                {item?.businessWebsite &&
                    <View className="flex flex-row items-center flex-wrap mb-2">
                        <Text className="text-black text-base font-bold tracking-wide">Website: </Text>
                        <TouchableOpacity onPress={() => openLink(item.businessWebsite)}>
                            <Text className="text-[#5176df] text-sm font-semibold">{item.businessWebsite}</Text>
                        </TouchableOpacity>
                    </View>
                }

                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Company Email: </Text>
                    <TouchableOpacity onPress={() => handleClickOnMail(item.businessEmail)}>
                        <Text className="text-[#5176df] text-md font-medium">{item.businessEmail}</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Address: </Text>
                    <TouchableOpacity
                        className="ms-2"
                        onPress={() => Linking.openURL('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.address))}
                    >
                        <Text className="text-[#5176df] text-md font-medium">{item.address}</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Short Description: </Text>
                    <Text className="text-black text-sm text-justify">{item.businessShortDetail}</Text>
                </View>

                {item?.businessLongDetail &&
                    <View className="flex flex-row items-center flex-wrap mb-2">
                        <Text className="text-black text-base font-bold tracking-wide">Long Description: </Text>
                        <Text className="text-black text-sm text-justify">{item.businessLongDetail}</Text>
                    </View>
                }

                <View className="flex flex-row items-center flex-wrap mb-2">
                    <Text className="text-black text-base font-bold tracking-wide">Created at: </Text>
                    <Text className="text-black text-sm text-justify">{formatDate(item?.dateOfOpeningJob)}</Text>
                </View>

                {(item.twitter || item.instagram || item.linkedIn || item.facebook) && renderSocialIcons()}
            </View>
            <ImageViewing
                images={images}
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            />
        </ScrollView>
    );

    return (
        <View className="bg-white flex-1 rounded-xl shadow-lg">
            {renderCard()}
        </View>
    );
};

export default Bus_User_template2;