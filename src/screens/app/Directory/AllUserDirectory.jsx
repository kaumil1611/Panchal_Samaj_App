import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import ImageViewing from 'react-native-image-viewing';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import ApiContext from '../../../context/ApiContext';
const { width } = Dimensions.get('screen');
const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);

export default function AllUserDirectory() {

    const { t } = useTranslation();
    const scrollY = useRef(new Animated.Value(0)).current;
    const [height1, setHeight1] = useState(100);
    const [height2, setHeight2] = useState(0);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [userOfDirectory, setUserOfDirectory] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { allUserDirectory } = useContext(ApiContext);

    const translateX = scrollY.interpolate({
        inputRange: [0, Math.max(height1 - height2, 1)],
        outputRange: [-width, 0]
    });

    useEffect(() => {
        (async function () {
            const contentAboutUs = await allUserDirectory(search ? search : "");
            setLoading(false);
            setUserOfDirectory(contentAboutUs);
        })();
    }, [search]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSearch("");
            };
        }, [])
    );

    const openProfileImage = (image) => {
        setSelectedImage([{ uri: `${process.env.IMAGE_URL}${image}` }]);
        setIsVisible(true);
    };

    const renderSkeletonItem = () => {
        return (
            <View className="mt-2 px-3">
                <View className="bg-white rounded-lg p-2 flex flex-row shadow-md">
                    <View className="w-16 h-16 bg-gray-300 text-black font-semibold text-center rounded-lg flex items-center justify-center"></View>
                    <View className="ml-3">
                        <View className="text-lg font-semibold bg-gray-100 w-64 h-5 rounded-md mt-1"></View>
                        <View className="flex flex-row items-center bg-gray-100 rounded-md w-36 h-3 mt-3"></View>
                    </View>
                </View>
            </View>
        );
    };

    const renderActualItem = ({ item }) => {

        const location = item.locationsData && item.locationsData.length > 0 ? item.locationsData[0] : {};
        const animation = new Animated.Value(0);
        const inputRange = [0, 1];
        const outputRange = [1, 0.8];
        const scale = animation.interpolate({ inputRange, outputRange });
        const defaultImage = require('../../../assets/joinNowImage.png');

        const removeTextAfterSlash = (text) => {
            if (!text) return 'N/A';
            return text && text?.split('/')[0].trim();
        };

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
            <>
                <View className="px-3">
                    <View className="bg-white rounded-lg p-2 flex flex-row items-center mt-2 mb-2" style={styles.shadowOfCard}>
                        <View className="mr-3">
                            <Animated.View style={[{ transform: [{ scale }] }]} key={item?._id}>
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPressIn={onPressIn}
                                    onPressOut={onPressOut}
                                    onPress={() => openProfileImage(item.photo)}
                                >
                                    <Image
                                        className="w-16 h-16 text-black font-semibold text-center rounded-lg"
                                        source={item.photo ? { uri: `${process.env.IMAGE_URL}${item.photo}` } : defaultImage}
                                    />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                        <View className="flex-1">
                            <View className="w-full overflow-hidden">
                                <Text className="text-lg font-bold w-full text-black overflow-hidden text-ellipsis break-words">
                                    {item?.lastname} {item?.firstname} {item?.middlename}
                                </Text>
                            </View>
                            <View className="flex flex-row items-center w-full flex-wrap text-black">
                                <Text className="text-sm font-semibold text-black">
                                    Village:{` `}
                                    {removeTextAfterSlash(location?.village)} - {removeTextAfterSlash(item?.city)}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {selectedImage && (
                    <ImageViewing
                        images={selectedImage}
                        imageIndex={0}
                        visible={isVisible}
                        onRequestClose={() => setIsVisible(false)}
                    />
                )}
            </>
        );
    };

    return (
        <View className="bg-[#E9EDF7]" style={styles.container}>
            <View className="w-full px-3 mt-4">
                <View className="bg-white h-20 p-2 rounded-2xl flex items-center">
                    <View className="flex px-5 flex-row h-full items-center justify-between w-full">
                        <View>
                            <AnimatedFeatherIcon
                                name="users"
                                size={32}
                                color="black"
                            />
                        </View>
                        <View>
                            <Text className="text-2xl text-black font-bold">{t("AllUser")}</Text>
                        </View>
                    </View>
                </View>


                <View className="w-full flex flex-row bg-white rounded-xl shadow-custom-elevation shadow-black shadow-2xl items-center mt-5 mb-3" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
                    <TextInput
                        placeholder={t("SearchUser")}
                        placeholderTextColor="grey"
                        className={`basis-[90%] ${Platform.OS == "ios" ? "p-3" : ""} tracking-wider text-neutral-700 pl-2`}
                        value={search}
                        onChangeText={text => setSearch(text)}
                    />
                    <TouchableOpacity onPress={() => setSearch("")}>
                        <View>
                            {search !== "" ? (
                                <AnimatedFontistoIcon name="close" size={25} color={"black"} />
                            ) : (
                                <AnimatedFeatherIcon name="search" size={25} color={"black"} />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {loading ? (
                <FlatList
                    data={Array.from({ length: 10 })}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderSkeletonItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : userOfDirectory && userOfDirectory.length === 0 ? (
                <NoDataFound message={"No User Found"} />
            ) : (
                <Animated.FlatList
                    data={userOfDirectory}
                    renderItem={renderActualItem}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={(_, h) => setHeight1(h)}
                    onLayout={(e) => setHeight2(e.nativeEvent.layout.height)}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                />
            )}
            <Animated.View style={[styles.bar, { transform: [{ translateX }] }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 10
    },
    bar: {
        height: 10,
        backgroundColor: '#3d59bf',
        width: '100%',
        position: 'absolute',
    },
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