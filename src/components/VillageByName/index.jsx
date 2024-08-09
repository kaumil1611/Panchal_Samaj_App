import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ImageViewing from 'react-native-image-viewing';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ApiContext from '../../context/ApiContext';
import NoDataFound from '../NoDataFound/NoDataFound';

const cardHeight = 100;
const padding = 10;

const VillageByName = ({ searchValue, navigation, SelectedVillage }) => {

    const scrollY = useRef(new Animated.Value(0)).current;
    const { state } = useContext(ApiContext);
    const [userByVillageId, setUserVillageId] = useState([]);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const viewImage = (img) => {
        setImage(img);
        setIsVisible(true);
    }

    useEffect(() => {
        if (state.allUserByVillage) {
            setUserVillageId(state.allUserByVillage);
            setLoading(false);
        }
    }, [state.allUserByVillage]);

    const formattedContacts = userByVillageId.map(user => ({
        id: user._id,
        image: user?.photo ? process.env.IMAGE_URL + user?.photo : '',
        name: `${user.firstname} ${user.middlename} ${user.lastname}`,
        city: user.city,
        village: SelectedVillage.villageE,
    }));

    const filteredContacts = formattedContacts.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            {loading ? (
                <FlatList
                    data={Array.from({ length: 10 })}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={() => (
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item
                                flexDirection="row"
                                alignItems="center"
                                marginHorizontal={12}
                                marginVertical={padding / 2}
                                height={cardHeight}
                                borderWidth={1}
                                padding={padding}
                                borderColor={'#f3f3f3'}
                                borderRadius={10}
                            >
                                <SkeletonPlaceholder.Item width={60} height={60} borderRadius={30} />
                                <SkeletonPlaceholder.Item marginLeft={20}>
                                    <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
                                    <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} borderRadius={4} />
                                </SkeletonPlaceholder.Item>
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>
                    )}
                />
            ) : (
                filteredContacts.length === 0 ? (
                    <NoDataFound message={"Currently, no person details are available for this village."} />
                ) : (
                    <FlatList
                        style={styles.container}
                        data={filteredContacts}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                            { useNativeDriver: false }
                        )}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => {

                            const inputRange = [0, 1];
                            const outputRange = [1, 0.8];
                            const animation = new Animated.Value(0);
                            const viewImageAnimation = new Animated.Value(0);
                            const scale = animation.interpolate({ inputRange, outputRange });
                            const viewImageScale = viewImageAnimation.interpolate({ inputRange, outputRange });

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

                            const onPressViewImageIn = () => {
                                Animated.spring(viewImageAnimation, {
                                    toValue: 1,
                                    useNativeDriver: true,
                                }).start();
                            };

                            const onPressViewImageOut = () => {
                                Animated.spring(viewImageAnimation, {
                                    toValue: 0,
                                    useNativeDriver: true,
                                }).start();
                            };


                            return (
                                <Animated.View style={[{ transform: [{ scale }] }]} key={index + "animation card"}>
                                    <Pressable
                                        activeOpacity={1}
                                        onPressIn={onPressIn}
                                        onPressOut={onPressOut}
                                        onPress={() => navigation.navigate('ViewFamilyDetails', { id: item.id })}
                                    >
                                        <View style={styles.card}>
                                            <Animated.View style={[{ transform: [{ scale: viewImageScale }] }]}>
                                                <Pressable
                                                    activeOpacity={1}
                                                    onPressIn={onPressViewImageIn}
                                                    onPressOut={onPressViewImageOut}
                                                    onPress={() => viewImage(item.image)}
                                                    style={styles.imageContainer}
                                                >
                                                    <Image
                                                        source={
                                                            item?.image && item.image !== "null"
                                                                ? { uri: item.image }
                                                                : require("../../assets/PanchalAPPLogo.jpg")
                                                        }
                                                        style={styles.image}
                                                    />
                                                </Pressable>
                                            </Animated.View>
                                            <View className="flex flex-1">
                                                <Text className="text-lg text-black font-bold ml-2">{item.name}</Text>
                                                <Text className="capitalize text-base text-black font-semibold ml-2">{item.city} - {item.village}</Text>
                                            </View>
                                        </View>

                                    </Pressable>
                                </Animated.View>
                            );
                        }}
                    />
                )
            )}
            <ImageViewing
                images={image
                    ? [{ uri: image }]
                    : [{ uri: Image.resolveAssetSource(require("../../assets/PanchalAPPLogo.jpg")).uri }]
                }
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            />
        </>
    );
};

export default VillageByName;

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flexDirection: "row",
        marginHorizontal: 12,
        marginVertical: padding / 2,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: "stretch",
    },
    imageContainer: {
        flexBasis: '25%',
        alignItems: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        objectCover: 'cover',
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        overflow: 'hidden',
    },
});