import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ApiContext from '../../context/ApiContext';
import { GlobalContext } from '../../context/globalState';

const useTruncateText = (text, wordLimit) => {
    return text && text?.split(' ').slice(0, wordLimit).join(' ') + (text?.split(' ').length > wordLimit ? '...' : '');
};

const stripHtmlTags = (html) => {
    html = html?.replace(/<\/?(b|strong)>/gi, '**');
    return html?.replace(/<\/?[^>]+(>|$)/g, '');
};

const parseAndRenderText = (text) => {
    const parts = text?.split('**').map((part, index) =>
        index % 2 === 1 ? (
            <Text key={index} style={{ fontWeight: 'bold' }}>{part}</Text>
        ) : (
            part
        )
    );
    return parts;
};

const NewsHomePageContent = ({ navigation }) => {
    const { t } = useTranslation();
    const { newsListing } = useContext(ApiContext);
    const { defaultLanguage } = useContext(GlobalContext);
    const [topNewsListing, setTopNewsListing] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const newsListingContent = await newsListing();
            setTopNewsListing(newsListingContent);
            setLoading(false);
        })();
    }, []);

    const handleNewsOpen = (id) => {
        navigation.navigate('NewsDetailsPage', { newsId: id });
    };

    const renderSkeleton = () => (
        <View>
            {[1, 2, 3].map((_, index) => (
                <View key={index} style={{ flexDirection: 'row', width: '100%', padding: 15, backgroundColor: '#ffffff', borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginTop: 10 }}>
                    <View style={{ width: '30%', borderRadius: 10, marginRight: 10 }}>
                        <View style={{ height: hp('10%'), width: '100%', backgroundColor: '#f0f0f0', borderRadius: 10 }} />
                    </View>
                    <View className="flex-1">
                        <View className="w-[70%] h-5 bg-gray-100 mb-2 rounded-md" />
                        <View className="w-[70%] h-5 bg-gray-100 mb-2 rounded-md" />
                        <View className="w-[70%] h-5 bg-gray-100 mb-2 rounded-md" />
                    </View>
                </View>
            ))}
        </View>
    );

    return (
        <>
            <View className="px-3">
                <View>
                    <Text className="text-xl font-bold text-rose-700 tracking-wider capitalize w-[40%]">
                        {t("LatestNews")}
                    </Text>
                    <View className="border-b-2 border-red-700 w-[15%] my-2"></View>
                </View>
                {loading ? (
                    renderSkeleton()
                ) : (
                    topNewsListing && topNewsListing.slice(0, 3).map((item, index) => {
                        const truncatedTitleE = useTruncateText(stripHtmlTags(item.titleE), 7);
                        const truncatedTitleG = useTruncateText(stripHtmlTags(item.titleG), 7);
                        const truncatedDescriptionE = useTruncateText(stripHtmlTags(item.descriptionE), 12);
                        const truncatedDescriptionG = useTruncateText(stripHtmlTags(item.descriptionG), 12);
                        const animation = new Animated.Value(0);
                        const inputRange = [0, 1];
                        const outputRange = [1, 0.8];
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

                        return (
                            <Animated.View style={[{ transform: [{ scale }] }]}>
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={1}
                                    onPressIn={onPressIn}
                                    onPressOut={onPressOut}
                                    onPress={() => handleNewsOpen(item._id)}
                                >
                                    <View className={`flex flex-row items-center w-full p-2 bg-white shadow-input shadow-custom-elevation shadow-md rounded-lg mt-4 ${Platform.OS == "ios" ? "shadow-lg" : "shadow-black"}`}>
                                        <View className="w-[30%]">
                                            <Image source={{ uri: process.env.IMAGE_URL + item.image }} resizeMode='cover' style={{ height: hp('12%'), width: '100%', borderRadius: 10 }} />
                                        </View>
                                        <View className="flex-1">
                                            <Text className="text-[16px] font-bold text-black text-justify mx-3">{defaultLanguage && defaultLanguage == "en" ? parseAndRenderText(truncatedTitleE) : parseAndRenderText(truncatedTitleG)}</Text>
                                            <Text className="capitalize text-[14px] text-black font-semibold text-justify m-1 mx-3">{defaultLanguage && defaultLanguage == "en" ? parseAndRenderText(truncatedDescriptionE) : parseAndRenderText(truncatedDescriptionG)}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    })
                )}
            </View>
        </>
    );
};

export default NewsHomePageContent;