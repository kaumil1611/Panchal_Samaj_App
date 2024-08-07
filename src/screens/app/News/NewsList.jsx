import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { GlobalContext } from '../../../context/globalState';

function NewsList({ navigation, news, loading }) {

    const IMAGE_URL = process.env.IMAGE_URL;
    const { t } = useTranslation();
    const { defaultLanguage } = useContext(GlobalContext);

    const formatDate = (timestamp) => {
        if (!timestamp) {
            return 'Invalid date';
        }
        const date = new Date(Number(timestamp));
        if (isNaN(date)) {
            return 'Invalid date';
        }
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    const openNewsDetailsPage = (id) => {
        navigation.navigate('NewsDetailsPage', { newsId: id });
    };

    const renderItems = ({ item }) => {

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

        const truncateText = (text, wordLimit) => {
            const plainText = text && text.replace(/<[^>]*>?/gm, '');
            const words = plainText && plainText?.split(' ');
            if (words?.length > wordLimit) {
                return words.slice(0, wordLimit).join(' ') + '...';
            }
            return plainText;
        };

        return (
            <Animated.View style={[{ transform: [{ scale }] }]} className="flex justify-center items-center" key={item?._id}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    onPress={() => { openNewsDetailsPage(item?._id); }}
                >
                    <View className="bg-white shadow-2xl rounded-3xl w-[100%] mt-4 p-3 mx-5 mb-3" style={styles.shadowOfCard}>
                        <View className={`overflow-hidden object-cover  ${Platform.OS == "ios" ? "shadow-lg" : "shadow-black shadow-xl"} `}>
                            <View className="relative">
                                <Image
                                    className="object-cover"
                                    source={{ uri: IMAGE_URL + item.image }}
                                    style={{ height: 180, width: '100%', borderRadius: 20 }}
                                />
                                {item.createdBy &&
                                    <View className="rounded-bl-[20px] bg-gray-300 absolute bottom-0 px-2">
                                        <View className="flex flex-row items-center gap-2">
                                            <Text className="font-bold text-black text-base">
                                                Created By
                                            </Text>
                                            <Text className="text-base text-black font-medium">
                                                {item?.createdBy}
                                            </Text>
                                        </View>
                                    </View>
                                }
                            </View>
                            <View className="flex flex-row justify-between flex-wrap items-center p-2">
                                <View>
                                    <Text className='font-bold text-[19px] text-black tracking-tighter text-justify my-2'>
                                        {defaultLanguage == "en" ? item.titleE : item.titleG}
                                    </Text>
                                </View>
                                <View>
                                    <Text className="text-[13px] tracking-wider text-neutral-700 font-bold mb-2">{formatDate(item?.created_at)}</Text>
                                </View>
                            </View>
                            <View className="p-2">
                                <Text className="text-[15px] tracking-wider mb-5 text-neutral-700 text-justify font-semibold">
                                    {defaultLanguage == "en" ? truncateText(item?.descriptionE, 20) : truncateText(item?.descriptionG, 20)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View >
        );
    };

    return (
        <View className="w-full h-full flex flex-row justify-between flex-wrap">
            {loading ? (
                <FlatList
                    data={[1, 2, 3]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={() => (
                        <View style={{ padding: 10, borderWidth: 1, marginHorizontal: 10, marginBottom: 20, borderRadius: 20, borderColor: "#f3f3f3" }}>
                            <SkeletonPlaceholder>
                                <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
                                    <SkeletonPlaceholder.Item width={'100%'} marginBottom={20} height={180} borderRadius={20} />
                                    <SkeletonPlaceholder.Item width={'100%'} marginLeft={5}>
                                        <SkeletonPlaceholder.Item width={320} height={22} borderRadius={4} marginBottom={10} />
                                        <SkeletonPlaceholder.Item width={280} height={22} borderRadius={4} marginBottom={10} />
                                        <SkeletonPlaceholder.Item width={250} height={22} borderRadius={4} marginBottom={10} />
                                        <SkeletonPlaceholder.Item width={180} height={22} borderRadius={4} marginBottom={10} />
                                    </SkeletonPlaceholder.Item>
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder>
                        </View>
                    )}
                />
            ) : (
                <>
                    <View className={`px-5 py-5 ${Platform.OS == "android" ? 'mt-0' : "mt-0"}`}>
                        <Text className="text-2xl font-bold text-black">{t("news")}</Text>
                    </View>
                    <View className="bg-[#E9EDF7] pb-12">
                        <FlatList
                            ListHeaderComponent={() => news && renderItems({ item: news[0] })}
                            data={news && news.slice(1)}
                            renderItem={renderItems}
                            keyExtractor={(item) => item?._id}
                            contentContainerStyle={{ paddingHorizontal: 12 }}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </>
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
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});

export default NewsList;