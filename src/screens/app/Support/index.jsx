import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ApiContext from '../../../context/ApiContext';

function Support({ navigation }) {

    const { t } = useTranslation();
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const { contactUsPageDetails } = useContext(ApiContext);
    const [supportImage, setSupportImage] = useState("");
    const emailAnimation = new Animated.Value(0);
    const faqAnimation = new Animated.Value(0);
    const ternConditionAnimation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const emailScale = emailAnimation.interpolate({ inputRange, outputRange });
    const faqScale = faqAnimation.interpolate({ inputRange, outputRange });
    const conditionScale = ternConditionAnimation.interpolate({ inputRange, outputRange });
    const [windowHeight] = useState(Dimensions.get('window').height);

    const onPressInEmail = () => {
        Animated.spring(emailAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutEmail = () => {
        Animated.spring(emailAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressInFaqs = () => {
        Animated.spring(faqAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutFaqs = () => {
        Animated.spring(faqAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressInCondition = () => {
        Animated.spring(ternConditionAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOutCondition = () => {
        Animated.spring(ternConditionAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const redirect = (redirectPath) => {
        if (redirectPath) {
            navigation.navigate(redirectPath)
        }
    }

    useEffect(() => {
        (async function () {
            const contentContactUs = await contactUsPageDetails();
            const desiredKeys = ["supportedImage"];
            contentContactUs.forEach((item) => {
                if (desiredKeys.includes(item.key)) {
                    switch (item.key) {
                        case 'supportedImage':
                            setSupportImage(item.value);
                            break;
                        default:
                            break;
                    }
                }
            });
        })();
    }, []);

    return (
        <View className="flex-1 bg-white space-y-5 w-full p-3" edges={['top']}>
            <View className="w-full h-full bg-[#f7f7fa] rounded-[10px] overflow-hidden">
                <View className="w-full h-52 bg-[#E9EDF7] flex flex-row justify-center items-end object-cover">
                    <Image className="w-full h-full object-cover" source={{ uri: `${process.env.IMAGE_URL}${supportImage}` }} />
                </View>
                <View className="w-full mt-6 mb-3 flex flex-row justify-center">
                    <View className="w-[90%]">
                        <Text className={`font-extrabold tracking-wider mb-3  ${windowHeight < 668 ? 'text-lg' : 'text-xl'} text-rose-700 text-center`}>{t('tellmehowcan')}</Text>
                        <Text className={`tracking-wider  ${windowHeight < 668 ? 'text-sm' : 'text-lg'} text-neutral-700 text-center`}>{t('ourcrewofexpertsareon')}</Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View className="w-full p-3">
                        <Animated.View style={[{ transform: [{ scale: emailScale }] }]}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPressIn={onPressInEmail}
                                onPressOut={onPressOutEmail}
                                onPress={() => redirect('EmailSupport')}
                            >
                                <View className="bg-white p-3 mb-2 rounded-[20px] shadow-lg" style={styles.shadowOfCard}>
                                    <View className="flex flex-row justify-between items-center">
                                        <View className="w-[40px] h-[40px] overflow-hidden">
                                            <AnimatedFeatherIcon
                                                name="mail"
                                                size={28}
                                                className="text-blue-600"
                                            />
                                        </View>
                                        <View className="w-[200px]">
                                            <View>
                                                <Text className={`tracking-wider font-extrabold capitalize ${windowHeight < 668 ? 'text-lg' : 'text-xl'} text-neutral-700 mb-1`}>{t('email')}</Text>
                                                <Text className="tracking-wider text-sm text-neutral-700">{t('getthesolutionsend')}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <AnimatedFeatherIcon
                                                name="arrow-right"
                                                size={30}
                                                color="#40A5E5"
                                                className="m-2"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View style={[{ transform: [{ scale: faqScale }] }]}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPressIn={onPressInFaqs}
                                onPressOut={onPressOutFaqs}
                                onPress={() => redirect('Faqs')}
                            >
                                <View className="bg-white p-3 mb-2 rounded-[20px] shadow-2xl" style={styles.shadowOfCard}>
                                    <View className="flex flex-row justify-between items-center">
                                        <View className="w-[40px] h-[40px] overflow-hidden">
                                            <AnimatedFeatherIcon
                                                name="help-circle"
                                                size={28}
                                                className="text-blue-600"
                                            />
                                        </View>
                                        <View className="w-[200px]">
                                            <View>
                                                <Text className={`tracking-wider capitalize font-extrabold ${windowHeight < 668 ? 'text-lg' : 'text-xl'} text-neutral-700 mb-1`}>FAQs</Text>
                                                <Text className="tracking-wider text-sm text-neutral-700">{t('findintelligentanswersInstantly')}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <AnimatedFeatherIcon
                                                name="arrow-right"
                                                size={30}
                                                color="#40A5E5"
                                                className="m-2"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                        <Animated.View style={[{ transform: [{ scale: conditionScale }] }]}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPressIn={onPressInCondition}
                                onPressOut={onPressOutCondition}
                                onPress={() => redirect('TermAndCondition')}
                            >
                                <View className="bg-white p-3 mb-2 rounded-[20px] shadow-2xl" style={styles.shadowOfCard}>
                                    <View className="flex flex-row justify-between items-center">
                                        <View className="w-[40px] h-[40px] overflow-hidden">
                                            <AnimatedFeatherIcon
                                                name="file-text"
                                                size={28}
                                                className="text-blue-600"
                                            />
                                        </View>
                                        <View className="w-[200px]">
                                            <View>
                                                <Text className={`tracking-wider font-extrabold capitalize ${windowHeight < 668 ? 'text-lg' : 'text-xl'} text-neutral-700 mb-1`}>{t("termsAndCondition")}</Text>
                                                <Text className="tracking-wider text-sm text-neutral-700">{t("termsAndConditionCardContent")}</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <AnimatedFeatherIcon
                                                name="arrow-right"
                                                size={30}
                                                color="#40A5E5"
                                                className="m-2"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
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

export default Support;