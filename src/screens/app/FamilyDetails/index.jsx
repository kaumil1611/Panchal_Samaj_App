import { useFocusEffect } from '@react-navigation/native';
import { Popup } from 'popup-ui';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Animated, FlatList, Keyboard, Modal, Platform, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';

const FamilyTree = ({ data: person, navigation, paramsId, parent }) => {

    const [loading, setLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [userProfileDetail, setUserProfileDetail] = useState(null);
    const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
    const { isLoggedIn } = useContext(GlobalContext);
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

    useFocusEffect(
        useCallback(() => {
            return () => {
                setIsProfilePopupVisible(false);
            };
        }, [])
    )

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        };
        loadData();
    }, []);

    const handlePress = () => {
        setIsExpanded(!isExpanded);
    };

    const openProfilePopup = (node) => {
        setUserProfileDetail(node)
        setIsProfilePopupVisible(true);
    };

    const handleNodePress = (node) => {
        if (!isLoggedIn) {
            const popupTimeout = setTimeout(() => {
                Popup.hide();
            }, 4000);
            Popup.show({
                type: 'Danger',
                title: 'Please login',
                button: true,
                textBody: `You need to be logged in to view ${node?.firstname ? node?.firstname.toLowerCase() + " " + node.lastname.toLowerCase() : "This user"}'s profile.`,
                buttonText: 'Register/login',
                autoClose: false,
                callback: () => {
                    clearTimeout(popupTimeout);
                    Popup.hide();
                    navigation.navigate('Welcome');
                },
                cancelButtonText: 'Cancel',
                cancelCallback: () => {
                    clearTimeout(popupTimeout);
                    Popup.hide();
                }
            });
            return;
        }
        if (node?.wife) {
            const nodeProfile = { _id: node._id, firstname: node.firstname, lastname: node.lastname, wife: node.wife };
            openProfilePopup(nodeProfile);
        } else {
            const userId = node._id;
            navigation.navigate('NodeDetails', { userId, node, paramsId });
        }
    };

    const closeProfilePopup = () => {
        setUserProfileDetail(null)
        setIsProfilePopupVisible(false);
    };

    const viewUserProfile = () => {
        const userId = userProfileDetail._id
        navigation.navigate('NodeDetails', { userId, node: userProfileDetail, paramsId });
    };

    const viewUserWifeProfile = () => {
        const userId = userProfileDetail.wife._id
        navigation.navigate('NodeDetails', { userId, node: userProfileDetail, paramsId });
    };

    const renderSkeleton = () => (
        <View className="bg-white border rounded-lg p-2.5 mt-1.25 w-full max-w-lg shadow shadow-black dark:shadow-white">
            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-row items-center gap-3">
                    <View className="w-6 h-6 bg-gray-300 rounded-full" />
                    <View>
                        <View className="w-32 h-4 bg-gray-300 rounded" />
                        <View className="mt-1 w-24 h-3 bg-gray-300 rounded" />
                    </View>
                </View>
                <View className="w-6 h-6 bg-gray-300 rounded" />
            </View>
        </View>
    );

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Animated.View style={[{ transform: [{ scale }] }]}>
                    <TouchableOpacity
                        style={styles.node}
                        onPress={() => handleNodePress(person)}
                        activeOpacity={1}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        className={`bg-white border rounded-lg p-2.5 mt-1.25 w-full max-w-lg ${Platform.OS == "android" ? "shadow shadow-black dark:shadow-white" : "shadow-sm shadow-gray-400"} mb-2`}
                    >
                        <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
                            {loading ? renderSkeleton() : (
                                <View className="flex flex-row justify-between items-center">
                                    <View className="flex flex-row items-center gap-3">
                                        <AppIcon type="Feather" color={"black"} name="user" size={26} />
                                        <View>
                                            <View className="flex flex-row items-center gap-1 w-auto">
                                                <Text className="text-base text-black font-bold capitalize basis-auto">{person?.firstname} {person?.lastname}</Text>
                                            </View>
                                            <View>
                                                {person?.wife && (
                                                    <Text className="italic text-black font-semibold mb-1.25 capitalize">
                                                        Spouse: {person?.wife?.firstname} {person?.wife?.lastname}
                                                    </Text>
                                                )}
                                                {person?.relationship && (
                                                    <Text className="italic text-black font-semibold mb-1.25 capitalize">
                                                        Father: {parent?.firstname} {parent?.lastname}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                    <View className="flex flex-row items-center gap-1.25">
                                        {person?.children && person?.children.length > 0 && (
                                            <TouchableOpacity onPress={handlePress} activeOpacity={0.8} className="p-1">
                                                <AppIcon type="Feather" size={30} color={"black"} name={isExpanded ? 'chevron-up' : 'chevron-down'} />
                                            </TouchableOpacity>
                                        )}
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                    </TouchableOpacity>
                </Animated.View>
            </TouchableWithoutFeedback>
            {isExpanded && person?.children && (
                <FlatList
                    data={person.children}
                    keyExtractor={(item, index) => index.toString() + "childKey"}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View
                            key={index + "childKey"}
                            className="pl-5 mt-2.5 w-full"
                        >
                            <FamilyTree data={item} navigation={navigation} paramsId={paramsId} parent={person} />
                        </View>
                    )}
                />
            )}
            <Modal
                transparent={true}
                visible={isProfilePopupVisible}
                onRequestClose={closeProfilePopup}
            >
                <View className="flex flex-1 flex-row justify-center items-center bg-[#00000080]">
                    <View className="bg-white w-auto px-10 py-2 rounded-lg items-center">
                        <TouchableOpacity onPress={viewUserProfile}>
                            <Text className="text-black text-lg p-1">View {userProfileDetail && userProfileDetail?.firstname} {userProfileDetail && userProfileDetail?.lastname}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={viewUserWifeProfile}>
                            <Text className="text-black text-lg p-1">View {userProfileDetail && userProfileDetail?.wife?.firstname} {userProfileDetail?.wife?.lastname}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closeProfilePopup}>
                            <Text className="text-black text-lg p-1">Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
};

const ViewFamilyTree = ({ navigation, route }) => {

    const paramsData = route.params;
    const [userData, setUserData] = useState("");
    const { allUserInfo } = useContext(GlobalContext);
    const { allDataOfFamilyById, state } = useContext(ApiContext);

    useEffect(() => {
        (async function () {
            try {
                if (paramsData?.id) {
                    const contentOfAllFamilyMembers = await allDataOfFamilyById(paramsData?.id);
                    setUserData(contentOfAllFamilyMembers);
                } else {
                    const contentOfAllFamilyMembers = await allDataOfFamilyById(allUserInfo?._id);
                    setUserData(contentOfAllFamilyMembers);
                }
            } catch (error) {
                console.log(error, "fetching error in family details");
            }
        })();
    }, [state.addFamilyMemberDetails, state.handleDeleteProfileUser, state.updateFamilyDetailsUser, paramsData]);

    return (
        <>
            <View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
                <FamilyTree data={userData} paramsId={paramsData?.id} navigation={navigation} />
            </View>
        </>
    );
};

const styles = {
    parentScrollViewStyle: {
        flex: 1,
    },
    childScrollViewStyle: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
};

export default ViewFamilyTree;