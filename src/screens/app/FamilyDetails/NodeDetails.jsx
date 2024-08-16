import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewing from 'react-native-image-viewing';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
import toastMessage from '../../../utils/toastMessage';

const NodeDetails = ({ navigation, route }) => {

    const { t } = useTranslation();
    var { userId } = route.params;
    const paramsData = route.params;
    const { userDataByParentId, handleDeleteProfileUser, updateUserProfileImage } = useContext(ApiContext);
    const { allUserInfo } = useContext(GlobalContext);
    const [userData, setUserData] = useState(null);
    const [newImage, setImage] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const AnimatedFontAwesomeIcon = Animated.createAnimatedComponent(FontAwesome);
    const images = userData?.photo ? [{ uri: `${process.env.IMAGE_URL}${userData.photo}` }] : [];

    useEffect(() => {
        (async function () {
            setLoading(true);
            const contentUserDataById = await userDataByParentId(userId);
            setUserData(contentUserDataById);
            setLoading(false);
        })();
    }, [userId]);

    const filteredUserData = userData ? Object.keys(userData)
        .filter(
            key =>
                key !== '_id' &&
                key !== 'firstname' &&
                key !== 'lastname' &&
                key !== '__v' &&
                key !== 'created_at' &&
                key !== 'deleted_at' &&
                key !== 'updated_at' &&
                key !== 'device_token' &&
                key !== 'payment_id' &&
                key !== 'photo' && key !== 'address' &&
                key !== 'relationship' &&
                key !== 'parent_id' &&
                key !== "password" &&
                key !== "locations_id" &&
                key !== "personal_id" &&
                key !== "" &&
                key !== "profile_banner"
        ).reduce((obj, key) => {
            obj[key] = userData[key];
            return obj;
        }, {}) : {};

    if (filteredUserData.dob) {
        const dobDate = new Date(filteredUserData.dob);
        filteredUserData.dob = dobDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    const handleAddFamilyDetail = () => {
        if (userData && userData._id) {
            navigation.navigate('AddFamilyDetail', { parent_id: userData._id });
        }
    };

    const handleDelete = async (user_Id) => {
        toastMessage(("User Delete Successfully"), 'Success');
        await handleDeleteProfileUser(user_Id)
        navigation.navigate('ViewFamilyDetails');
    };

    const openDeleteModal = () => {
        setModalVisible(true);
    };

    const openUserEditScreen = () => {
        navigation.navigate('EditUserFamilyDetails', { userId: userId });
    };

    const closeDeleteModal = () => {
        setModalVisible(false);
    };

    const openModal = () => {
        const id = paramsData?.paramsId;
        const userId = allUserInfo?._id;
        if (id === undefined || id === null) {
            if (userId) {
                setIsPopupVisible(true);
            }
        } else if (id === userId) {
            setIsPopupVisible(true);
        }
        else if (!id || typeof id === undefined && userId) {
            setIsPopupVisible(true);
        }
        else {
            setIsPopupVisible(false);;
        }
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const viewProfileImage = () => {
        closePopup();
        setIsVisible(true);
    };

    const selectImage = async () => {

        ImagePicker.openPicker({
            width: 400,
            height: 300,
            cropping: true,
        }).then(async (image) => {
            const filePath = image.path;
            const imageName = filePath.substring(filePath.lastIndexOf('/') + 1);
            const userData = new FormData();
            const imagePath = image.path;
            const fileName = imageName;
            const fileType = image.mime;

            userData.append('image', {
                uri: imagePath,
                type: fileType,
                name: fileName,
            });

            const payload = {
                id: userId,
                userData
            };
            toastMessage(("User Update Successfully"), 'Success');
            const response = await updateUserProfileImage(payload);
            if (response) {
                setImage(response.userData.photo)
                setIsPopupVisible(false);
                navigation.navigate('NodeDetails', { userId: userId });
            } else {
                setIsPopupVisible(false);
                navigation.navigate('NodeDetails', { userId: userId });
            }
        }).catch((error) => {
            toastMessage("Please select image again!")
            console.log(error, "User profile image changing error")
        });
    };

    function visibleEditDetail() {

        const id = paramsData?.paramsId;
        const userId = allUserInfo?._id;
        function renderPressable() {
            console.log("userData?.relationship", userData)
            return (
                <>
                    {allUserInfo?._id == userData?._id ? null :
                        (
                            <Pressable onPress={() => setMenuVisible(!menuVisible)} className="px-4 py-1 bg-white absolute top-2 rounded-[15px] right-2 shadow-green-600" style={{ elevation: 7 }}>
                                <AnimatedFontAwesomeIcon
                                    name="ellipsis-v"
                                    size={27}
                                    color="green"
                                />
                            </Pressable>
                        )
                    }
                    {(userData?.relationship == null || (userData?.marital_status !== "unmarried" && userData?.relationship !== "Wife")) &&
                        <Pressable onPress={handleAddFamilyDetail} className="p-1 bg-white absolute top-2 rounded-[15px] left-2 shadow-green-600" style={{ elevation: 7 }}>
                            <Text className="tracking-wider font-semibold text-[15px] text-neutral-700">
                                <AnimatedFontAwesomeIcon
                                    name="user-plus"
                                    size={27}
                                    color="green"
                                />
                            </Text>
                        </Pressable>
                    }
                </>
            )
        };

        if (id === undefined || id === null) {
            if (userId) {
                return renderPressable();
            }
        } else if (id === userId) {
            return renderPressable();
        }
        else if (!id || typeof id === undefined && userId) {
            return renderPressable();
        }
        return <></>;
    }

    const cancelAnimation = new Animated.Value(0);
    const DeleteAnimation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const cancelScale = cancelAnimation.interpolate({ inputRange, outputRange });
    const DeleteScale = DeleteAnimation.interpolate({ inputRange, outputRange });

    const onPressCancelIn = () => {
        Animated.spring(cancelAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressCancelOut = () => {
        Animated.spring(cancelAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressDeleteIn = () => {
        Animated.spring(DeleteAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressDeleteOut = () => {
        Animated.spring(DeleteAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View className="w-full p-3 bg-white flex-1">
            <View className="w-full bg-[#E9EDF7] flex-1 rounded-[15px] overflow-hidden">

                {loading ? (
                    <SkeletonPlaceholder>
                        <SkeletonPlaceholder.Item height={300} backgroundColor="#F2F8FC" width={'100%'} />
                    </SkeletonPlaceholder>
                ) : (
                    <View className="w-full h-[38%] relative">
                        <Pressable onPress={openModal}>
                            <Image
                                source={newImage ? { uri: `${process.env.IMAGE_URL}${newImage}` } : userData && { uri: `${process.env.IMAGE_URL}${userData.photo}` }}
                                className="w-full h-full object-cover"
                            />
                        </Pressable>
                        <View className="p-4 bg-white absolute bottom-2 rounded-[15px] left-2 shadow-green-700" style={{ elevation: 10 }}>
                            {loading ? (
                                <SkeletonPlaceholder>
                                    <SkeletonPlaceholder.Item height={6} width={"100%"} />
                                    <SkeletonPlaceholder.Item height={6} width={"100%"} />
                                    <SkeletonPlaceholder.Item height={6} width={"100%"} />
                                    <SkeletonPlaceholder.Item height={6} width={"100%"} />
                                    <SkeletonPlaceholder.Item height={6} width={"100%"} />
                                </SkeletonPlaceholder>
                            ) : (
                                userData && (
                                    <Text className="tracking-wider font-semibold text-[15px] text-neutral-700">{userData?.firstname + ' ' + userData?.lastname}</Text>
                                )
                            )}
                        </View>
                        {visibleEditDetail()}
                        {menuVisible && (
                            <View className="absolute top-2 right-14 bg-white rounded-[15px] shadow-lg px-2 py-1">
                                <View className="flex flex-row items-center gap-2">
                                    <Pressable onPress={openUserEditScreen} className="p-1">
                                        <AnimatedFontAwesomeIcon
                                            name="edit"
                                            size={27}
                                            color="blue"
                                        />
                                    </Pressable>
                                    <Pressable onPress={openDeleteModal} className="p-1">
                                        <AnimatedFontAwesomeIcon
                                            name="trash"
                                            size={27}
                                            color="red"
                                        />
                                    </Pressable>
                                </View>
                            </View>
                        )}
                    </View>
                )}

                <View className="mb-8 p-1 flex-1">
                    <View className="w-full">
                        <Text className="font-extrabold tracking-wider text-xl my-2 ml-2 text-rose-700">{t('basicinfo')}</Text>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                            {loading ? (
                                <SkeletonPlaceholder>

                                    <SkeletonPlaceholder.Item display='flex' flexDirection='column' gap={10} padding={12}>
                                        <SkeletonPlaceholder.Item height={50} borderRadius={10} width={'100%'} />
                                        <SkeletonPlaceholder.Item height={50} borderRadius={10} width={'100%'} />
                                        <SkeletonPlaceholder.Item height={50} borderRadius={10} width={'100%'} />
                                        <SkeletonPlaceholder.Item height={50} borderRadius={10} width={'100%'} />
                                        <SkeletonPlaceholder.Item height={50} borderRadius={10} width={'100%'} />
                                        <SkeletonPlaceholder.Item height={50} borderRadius={10} width={'100%'} />
                                    </SkeletonPlaceholder.Item>

                                </SkeletonPlaceholder>
                            ) : (
                                Object.entries(filteredUserData).map(([key, value], index) => {
                                    if (value) { // Check if value exists
                                        return (
                                            <View key={index + "keyyyss"}>
                                                <View className="w-full p-3 rounded-[15px]">
                                                    <View>
                                                        <Text className="font-bold tracking-wider text-lg text-neutral-700 capitalize">
                                                            {key === "middlename" ? "Middle Name" : key.replace(/_/g, " ")}
                                                        </Text>
                                                        <Text className="tracking-wider text-[15px] text-neutral-700">{value}</Text>
                                                    </View>
                                                </View>
                                                <View className="w-full overflow-hidden">
                                                    <View className="h-[1px] bg-[#747272]"></View>
                                                </View>
                                            </View>
                                        );
                                    }
                                    return null; // Return null if value doesn't exist
                                })

                            )}
                        </ScrollView>
                    </View>
                </View>
            </View>
            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slideTop"
                onRequestClose={closeDeleteModal}
            >
                <View className="flex-1 justify-center items-center">
                    {modalVisible && (
                        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                    )}
                    <View className="w-4/5 bg-white rounded-[15px] p-4 shadow-lg mt-14">
                        <Text className="font-bold text-black text-lg mb-4">{t('deleteconfirm')}</Text>
                        <View className="flex-row justify-around items-center">
                            <Animated.View style={[{ transform: [{ scale: cancelScale }] }]}>
                                <Pressable
                                    activeOpacity={1}
                                    onPressIn={onPressCancelIn}
                                    onPressOut={onPressCancelOut}
                                    onPress={closeDeleteModal}
                                    className="px-6 py-2 bg-gray-200 rounded-[15px] mr-2"
                                >
                                    <Text>{t('cancel')}</Text>
                                </Pressable>
                            </Animated.View>
                            <Animated.View style={[{ transform: [{ scale: DeleteScale }] }]}>
                                <Pressable
                                    activeOpacity={1}
                                    onPressIn={onPressDeleteIn}
                                    onPressOut={onPressDeleteOut}
                                    onPress={() => handleDelete(userData?._id)}
                                    className="px-6 py-2 bg-red-500 rounded-[15px]"
                                >
                                    <Text className="text-white">{t('delete')}</Text>
                                </Pressable>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </Modal>
            <ImageViewing
                images={images}
                imageIndex={0}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
            />
            <Modal
                transparent={true}
                visible={isPopupVisible}
                onRequestClose={closePopup}
            >
                <View style={styles.modalBackground}>
                    <View className="bg-white p-2 rounded-xl items-center w-[250px]">
                        <TouchableOpacity onPress={viewProfileImage}>
                            <Text className="text-black text-lg p-1">{t('ViewProfileImage')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={selectImage}>
                            <Text className="text-black text-lg p-1">{t('EditProfileImage')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closePopup}>
                            <Text className="text-black text-lg p-1">{t('cancel')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal >
        </View >
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default NodeDetails;