import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Dimensions, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import ApiContext from '../../../context/ApiContext';

const { width } = Dimensions.get('screen');

export default function Member() {

    const scrollY = useRef(new Animated.Value(0)).current;
    const [height1, setHeight1] = useState(100);
    const [height2, setHeight2] = useState(0);
    const [loading, setLoading] = useState(true);
    const [committeeMembers, setCommitteeMembers] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { allcommitteeMembersListing } = useContext(ApiContext);
    const { t } = useTranslation();
    const translateX = scrollY.interpolate({
        inputRange: [0, Math.max(height1 - height2, 1)],
        outputRange: [-width, 0]
    });

    const handleCallOpenLink = (phoneNumber) => {
        if (phoneNumber) {
            Linking.openURL(`tel:${phoneNumber}`);
        }
    };

    const openProfileImage = (image) => {
        setSelectedImage([{ uri: `${process.env.IMAGE_URL}${image}` }]);
        setIsVisible(true);
    };

    useEffect(() => {
        const fetchCommitteeMembers = async () => {
            try {
                const members = await allcommitteeMembersListing();
                setCommitteeMembers(members);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch committee members", error);
            }
        };
        fetchCommitteeMembers();
    }, []);

    const renderSkeletonItem = () => {
        return (
            <SkeletonPlaceholder>
                {[1, 2, 3].map((_, index) => (
                    <View key={index} style={styles.card}>
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start" marginBottom={10}>
                            <SkeletonPlaceholder.Item width={300} height={20} borderRadius={4} marginRight={10} />
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start" marginBottom={10}>
                            <SkeletonPlaceholder.Item width={300} height={20} borderRadius={4} marginRight={10} />
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start" marginBottom={10}>
                            <SkeletonPlaceholder.Item width={300} height={20} borderRadius={4} marginRight={10} />
                        </SkeletonPlaceholder.Item>
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="flex-start">
                            <SkeletonPlaceholder.Item width={300} height={20} borderRadius={4} marginRight={10} />
                        </SkeletonPlaceholder.Item>
                    </View>
                ))}
            </SkeletonPlaceholder>
        );
    };

    const renderActualItem = ({ item }) => {

        const ImageOfMember = `${process.env.IMAGE_URL}${item.image}`
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

            <View className="bg-white rounded-3xl p-5 mx-5 mb-5" style={styles.shadowOfCard} key={item._id}>
                {ImageOfMember ?
                    <Animated.View style={[{ transform: [{ scale }] }]} key={item?._id}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPressIn={onPressIn}
                            onPressOut={onPressOut}
                            onPress={() => openProfileImage(item.image)}
                        >
                            <Image
                                source={{ uri: ImageOfMember }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    </Animated.View>
                    :
                    <View style={styles.skeleton}>
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item
                                width={styles.image.width}
                                height={styles.image.height}
                                borderRadius={10}
                            />
                        </SkeletonPlaceholder>
                    </View>
                }
                <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                    <Text className="text-base font-bold text-black mr-2">{t('fullName')}: </Text>
                    <Text className="text-base text-black">{item.fullname}</Text>
                </View>

                <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                    <Text className="text-base font-bold text-black mr-2">{t('position')}: </Text>
                    <Text className="text-base text-black">{item.role}</Text>
                </View>

                <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                    <Text className="text-base font-bold text-black mr-2">{t('mobile')}: </Text>
                    <TouchableOpacity onPress={() => handleCallOpenLink("+91" + item.mobile_number)}>
                        <Text className="text-blue-700 text-base">+91 {item.mobile_number}</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex flex-1 flex-row items-start mb-3 flex-wrap">
                    <Text className="text-base font-bold text-black mr-2">{t('village')}: </Text>
                    <Text className="text-base text-black">{item.village}</Text>
                </View>

            </View>
        );
    };

    return (

        <View className="bg-[#E9EDF7]" style={styles.container}>
            <View style={styles.header}>
                <Text className="text-2xl font-bold text-black">{t('committeeMember')}</Text>
            </View>
            {loading ? (
                <FlatList
                    data={[1, 2, 3]}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderSkeletonItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : committeeMembers.length === 0 ? (
                <NoDataFound message={"No committee members found."} />
            ) : (
                <Animated.FlatList
                    data={committeeMembers}
                    renderItem={renderActualItem}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    onContentSizeChange={(_, h) => setHeight1(h)}
                    onLayout={(e) => setHeight2(e.nativeEvent.layout.height)}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                />
            )}
            <Animated.View style={[styles.bar, { transform: [{ translateX }] }]} />
            {selectedImage && (
                <ImageViewing
                    images={selectedImage}
                    imageIndex={0}
                    visible={isVisible}
                    onRequestClose={() => setIsVisible(false)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 80
    },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 20,
        marginBottom: 20,
    },
    bar: {
        height: 10,
        backgroundColor: '#3d59bf',
        width: '100%',
        position: 'absolute',
    },
    card: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#f3f3f3',
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    skeleton: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
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
    }
});