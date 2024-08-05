import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TwitterIcon from '../../assets/twitter.svg';
import ApiContext from '../../context/ApiContext';

function ContactUsCard() {

    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [contact1, setContact1] = useState('');
    const [contact2, setContact2] = useState('');
    const [contactno1, setContactno1] = useState('');
    const [contactno2, setContactno2] = useState('');
    const [twitterLink, setTwitterLink] = useState('');
    const [faceBookLink, setFaceBookLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const { contactUsPageDetails } = useContext(ApiContext);
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const twitterAnimation = new Animated.Value(0);
    const instaAnimation = new Animated.Value(0);
    const faceBookAnimation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const twitterScale = twitterAnimation.interpolate({ inputRange, outputRange });
    const instaScale = instaAnimation.interpolate({ inputRange, outputRange });
    const faceBookScale = faceBookAnimation.interpolate({ inputRange, outputRange });

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

    useEffect(() => {
        (async function () {
            const contentContactUs = await contactUsPageDetails();
            const desiredKeys = ['contact1', 'contactno1', 'contact2', 'contactno2', 'email', "instagram", "facebook", "twitter"];
            contentContactUs.forEach((item) => {
                if (desiredKeys.includes(item.key)) {
                    switch (item.key) {
                        case 'contact1':
                            setContact1(item.value);
                            break;
                        case 'contactno1':
                            setContactno1(item.value);
                            break;
                        case 'contact2':
                            setContact2(item.value);
                            break;
                        case 'contactno2':
                            setContactno2(item.value);
                            break;
                        case 'email':
                            setEmail(item.value);
                            break;
                        case 'instagram':
                            setInstagramLink(item.value);
                            break;
                        case 'facebook':
                            setFaceBookLink(item.value);
                            break;
                        case 'twitter':
                            setTwitterLink(item.value);
                            break;
                        default:
                            break;
                    }
                }
            });
            setLoading(false);
        })();
    }, []);

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

    if (loading) {
        return (
            <>
                <View className="mb-20" style={{ borderColor: "#f3f3f3" }}>
                    <SkeletonPlaceholder>
                        <SkeletonPlaceholder.Item flexDirection="column" alignItems="center" padding={20}>
                            <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={4} marginBottom={10} />
                            <SkeletonPlaceholder.Item width={'60%'} height={20} borderRadius={4} marginBottom={20} />
                            <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={4} marginBottom={10} />
                            <SkeletonPlaceholder.Item width={'60%'} height={20} borderRadius={4} marginBottom={20} />
                            <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={4} marginBottom={10} />
                            <SkeletonPlaceholder.Item width={'60%'} height={20} borderRadius={4} marginBottom={20} />
                            <SkeletonPlaceholder.Item width={'60%'} height={20} borderRadius={4} marginBottom={20} />
                            <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={4} marginBottom={10} />
                            <SkeletonPlaceholder.Item width={'60%'} height={20} borderRadius={4} marginBottom={20} />
                            <SkeletonPlaceholder.Item width={'60%'} height={20} borderRadius={4} marginBottom={20} />
                            <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={4} marginBottom={10} />
                            <SkeletonPlaceholder.Item width={'60%'} height={20} borderRadius={4} marginBottom={20} />
                            <SkeletonPlaceholder.Item width={'60%'} height={20} borderRadius={4} marginBottom={20} />
                            <SkeletonPlaceholder.Item width={'80%'} height={20} borderRadius={4} marginBottom={10} />
                            <SkeletonPlaceholder.Item width={'60%'} height={20} borderRadius={4} marginBottom={20} />
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                </View>
            </>
        );
    }

    return (
        <View className="mb-16">
            <View className="p-5">
                <View className="bg-white rounded-[15px] p-5" style={styles.shadowOfCard}>
                    <View className="flex flex-row items-center gap-3">
                        <AnimatedFontistoIcon
                            name="mobile"
                            size={25}
                            color="black"
                        />
                        <Text className="text-xl tracking-wider text-neutral-700 font-extrabold capitalize">{t('mobile')}</Text>
                    </View>
                    <View className="mt-4">
                        <Text className="tracking-wider text-neutral-700 text-base">{t('contactusphoneheading')}</Text>
                    </View>
                    <View className="my-3">
                        <View className="flex flex-row justify-between">
                            <View>
                                <Text className="font-bold text-md text-black my-1">
                                    {contact1}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => handleCallOpenLink("+91" + contactno1)}>
                                <View>
                                    <Text className="text-[#5176df] tracking-wider text-md font-semibold">
                                        +91 {contactno1}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="flex flex-row items-center justify-between my-1">
                        <View>
                            <Text className="font-bold text-black text-md">
                                {contact2}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => handleCallOpenLink("+91" + contactno2)}>
                            <View>
                                <Text className="text-[#5176df] tracking-wider text-md font-semibold">
                                    +91 {contactno2}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {email && (
                <View className="px-5">
                    <View className="bg-white rounded-[20px] p-5" style={styles.shadowOfCard}>
                        <View className="flex flex-row items-center gap-3">
                            <AnimatedFontistoIcon
                                name="email"
                                size={25}
                                color="black"
                            />
                            <Text className="text-xl tracking-wider text-neutral-700 font-extrabold capitalize">{t('email')}</Text>
                        </View>
                        <View className="mt-2">
                            <Text className="tracking-wider text-base text-neutral-700">{t('contactusemailheading')}</Text>
                            <TouchableOpacity onPress={() => handleClickOnMail(email)}>
                                <View className="mt-2">
                                    <Text className="text-[#5176df] tracking-wider text-md font-semibold">{email}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
            {(faceBookLink || instagramLink || twitterLink) && (
                <View className="p-5">
                    <View className="bg-white rounded-[20px] p-5" style={styles.shadowOfCard}>
                        <View className="flex flex-row items-center gap-3">
                            <AnimatedFeatherIcon
                                name="users"
                                size={25}
                                color="black"
                            />
                            <Text className="text-xl tracking-wider text-neutral-700 font-extrabold capitalize">{t('socials')}</Text>
                        </View>
                        <View className="mt-2">
                            <Text className="tracking-wider text-base text-neutral-700">{t('contactussocialheading')}</Text>
                            <View className="flex flex-row justify-around mt-3">
                                {twitterLink && (
                                    <Animated.View style={[{ transform: [{ scale: twitterScale }] }]}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPressIn={onPressInTwitter}
                                            onPressOut={onPressOutTwitter}
                                            onPress={() => openLink(twitterLink)}
                                        >

                                            <TwitterIcon width={40} height={40} color='red' />

                                        </TouchableOpacity>
                                    </Animated.View>
                                )}
                                {instagramLink && (
                                    <Animated.View style={[{ transform: [{ scale: instaScale }] }]}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPressIn={onPressInInsta}
                                            onPressOut={onPressOutInsta}
                                            onPress={() => openLink(instagramLink)}
                                        >
                                            <AnimatedFontistoIcon
                                                name="instagram"
                                                size={40}
                                                color="#f700b2"
                                            />
                                        </TouchableOpacity>
                                    </Animated.View>
                                )}
                                {faceBookLink && (
                                    <Animated.View style={[{ transform: [{ scale: faceBookScale }] }]}>
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            onPressIn={onPressInFaceBook}
                                            onPressOut={onPressOutFaceBook}
                                            onPress={() => openLink(faceBookLink)}
                                        >
                                            <AnimatedFontistoIcon
                                                name="facebook"
                                                size={40}
                                                color="#0866ff"
                                            />
                                        </TouchableOpacity>
                                    </Animated.View>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    shadowOfCard: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },
});

export default ContactUsCard;