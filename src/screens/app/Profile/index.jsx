import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Image,
    ImageBackground,
    Modal, Pressable,
    ScrollView,
    Share,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewing from 'react-native-image-viewing';
import { withTiming } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AddBusinessIcon from '../../../assets/addBusiness.svg';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
import toastMessage from '../../../utils/toastMessage';

const ProfilePage = ({ navigation }) => {

    const { t } = useTranslation();
    const { setuserDataInStorage, allUserInfo, progress, setAllUserInfo } = useContext(GlobalContext);
    const { updateUserProfileImage, updateUserBannerProfileImage, resetAllData, } = useContext(ApiContext);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const [isVisible, setIsVisible] = useState(false);
    const [isBannerVisible, setBannerIsVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isBannerPopupVisible, setIsBannerPopupVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const appUrl = 'https://play.google.com/store/apps/details?id=com.panchal_application&pcampaignid=web_share';
    const cancelAnimation = new Animated.Value(0);
    const LogoutAnimation = new Animated.Value(0);
    const myBusinessAnimation = new Animated.Value(0);
    const addFamilyAnimation = new Animated.Value(0);
    const changePasswordAnimation = new Animated.Value(0);
    const logoutCardAnimation = new Animated.Value(0);
    const openProfileAnimation = new Animated.Value(0);
    const shareAppAnimation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, 0.8];
    const cancelScale = cancelAnimation.interpolate({ inputRange, outputRange });
    const LogoutScale = LogoutAnimation.interpolate({ inputRange, outputRange });
    const myBusinessScale = myBusinessAnimation.interpolate({ inputRange, outputRange });
    const addFamilyScale = addFamilyAnimation.interpolate({ inputRange, outputRange });
    const changePasswordScale = changePasswordAnimation.interpolate({ inputRange, outputRange });
    const logoutCardScale = logoutCardAnimation.interpolate({ inputRange, outputRange });
    const openProfileScale = openProfileAnimation.interpolate({ inputRange, outputRange });
    const shareAppScale = shareAppAnimation.interpolate({ inputRange, outputRange });
    const windowHeight = Dimensions.get('window').height;

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

    const onPressLogoutIn = () => {
        Animated.spring(LogoutAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressLogoutOut = () => {
        Animated.spring(LogoutAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressMyBusiness = () => {
        Animated.spring(myBusinessAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressMyBusinessOut = () => {
        Animated.spring(myBusinessAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressAddFamilyIn = () => {
        Animated.spring(addFamilyAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressAddFamilyOut = () => {
        Animated.spring(addFamilyAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressChangePasswordIn = () => {
        Animated.spring(changePasswordAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressChangePasswordOut = () => {
        Animated.spring(changePasswordAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressLogoutCardIn = () => {
        Animated.spring(logoutCardAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressLogoutCardOut = () => {
        Animated.spring(logoutCardAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressOpenProfileIn = () => {
        Animated.spring(openProfileAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressOpenProfileOut = () => {
        Animated.spring(openProfileAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const onPressShareAppIn = () => {
        Animated.spring(shareAppAnimation, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const onPressShareAppOut = () => {
        Animated.spring(shareAppAnimation, {
            toValue: 0,
            useNativeDriver: true,
        }).start();
    };

    const profileImage = [
        { uri: `${process.env.IMAGE_URL}${allUserInfo?.photo}`, },
    ];

    const bannerImages = [
        { uri: `${process.env.IMAGE_URL}${allUserInfo?.profile_banner}`, },
    ];

    const openAddFamilyDetails = () => {
        navigation.navigate('ViewFamilyDetails');
    };

    const openChangePassword = () => {
        navigation.navigate('ChangePassword');
    };

    const navigateToEditProfile = () => {
        navigation.navigate('EditUserProfile');
    };

    const handleLogout = async () => {
        setLoading(true)
        await setuserDataInStorage('user', null);
        await resetAllData();
        setLoading(false)
        setAllUserInfo({})
        progress.value = withTiming("1");
        navigation.navigate("Home");
        toastMessage(t('SuccessfullyLoggedOut'), 'Success');
    };

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

    const openModal = () => {
        setIsPopupVisible(true);
    };

    const openBannerModal = () => {
        setIsBannerPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const closeBannerPopup = () => {
        setIsBannerPopupVisible(false);
    };

    const viewProfileImage = () => {
        closePopup();
        setIsVisible(true);
    };

    const viewBannerImage = () => {
        closeBannerPopup();
        setBannerIsVisible(true);
    };

    const openLogoutModal = async () => {
        setModalVisible(true)
    };

    const closeLogoutModal = async () => {
        setModalVisible(false)
    };

    const selectImage = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
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
                id: allUserInfo?._id,
                userData
            };
            const response = await updateUserProfileImage(payload);
            setIsPopupVisible(false);
            await setuserDataInStorage('user', response.userData);
            navigation.navigate('Profile');
        }).catch((error) => {
            console.log(error, "error Changing Image")
        });
    }

    const selectBannerImage = async () => {
        ImagePicker.openPicker({
            width: 1600,
            height: 900,
            cropping: true,
        }).then(async (image) => {
            const filePath = image.path;
            const imageName = filePath.substring(filePath.lastIndexOf('/') + 1);
            const userData = new FormData();
            const imagePath = image.path;
            const fileName = imageName;
            const fileType = image.mime;

            userData.append('profile_banner', {
                uri: imagePath,
                type: fileType,
                name: fileName,
            });

            const payload = {
                id: allUserInfo?._id,
                userData
            };
            const response = await updateUserBannerProfileImage(payload);
            setIsBannerPopupVisible(false);
            await setuserDataInStorage('user', response.userData);
            navigation.navigate('Profile');
        }).catch((error) => {
            console.log(error, "error Changing Image")
        });
    }

    useFocusEffect(
        useCallback(() => {
            navigation.getParent()?.setOptions({ tabBarStyle: { display: "flex" } });
        }, [])
    );

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: appUrl,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with activity type of:', result.activityType);
                } else {
                    console.log('Shared');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Dismissed');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <View className="flex-1 bg-white space-y-5 w-full pb-20" edges={['top']}>
                <View className="relative basis-[25%] mb-12">

                    <Pressable onPress={openBannerModal}>
                        <View className="overflow-hidden bg-slate-300">
                            <ImageBackground className="h-full w-full transition-all duration-300 overflow-hidden" source={{ uri: `${process.env.IMAGE_URL}${allUserInfo?.profile_banner}` }} alt="bg-image">
                                <View className="h-full bg-[#121a1c50]" />
                            </ImageBackground>
                        </View>
                    </Pressable>

                    <Animated.View
                        className="absolute right-2 top-2 flex w-12 h-12 shadow-lg items-center justify-center rounded-full bg-white"
                        style={[{ transform: [{ scale: shareAppScale }] }]}
                    >
                        <Pressable
                            activeOpacity={1}
                            onPressIn={onPressShareAppIn}
                            onPressOut={onPressShareAppOut}
                            onPress={handleShare}

                        >
                            <AnimatedFontistoIcon name="share" size={30} color={"black"} />
                        </Pressable>
                    </Animated.View>

                    <View className="absolute p-6 flex h-36 top-20 w-full items-center justify-center -space-x-2 overflow-visible">
                        <Animated.View style={[{ transform: [{ scale: openProfileScale }] }]} >
                            <Pressable
                                activeOpacity={1}
                                onPressIn={onPressOpenProfileIn}
                                onPressOut={onPressOpenProfileOut}
                                onPress={openModal}
                            >
                                <View className="h-40 w-40 p-2 rounded-full bg-white">
                                    <Image className="inline-block h-36 w-36 rounded-full ring-2 ring-white" source={{ uri: process.env.IMAGE_URL + allUserInfo?.photo ? process.env.IMAGE_URL + allUserInfo?.photo : 'https://eclatsuperior.com/wp-content/uploads/2021/04/man4.jpg' }} alt='profile-img' />
                                </View>
                            </Pressable>
                        </Animated.View>
                    </View>

                </View>
                <View className="basis-4/5">
                    <View className={`flex ${windowHeight < 670 && "mt-7"} items-center`}>

                        <Text className="text-rose-700 font-bold text-2xl">{allUserInfo?.firstname} {allUserInfo?.lastname}</Text>

                        <View className="flex flex-row items-center justify-center">
                            <Text className="text-neutral-700 font-normal text-xl tracking-wider">{t("MemberId")}: </Text>
                            <Text className="text-rose-700 text-xl font-bold tracking-wider">{allUserInfo?.personal_id}</Text>
                        </View>

                        <View className="flex flex-row items-center justify-center">
                            <Text className="text-neutral-700 font-normal text-xl tracking-wider">{t('StartDate')}: </Text>
                            <Text className="text-rose-700 text-xl font-bold tracking-wider">{formatDate(allUserInfo?.created_at)}</Text>
                        </View>

                        <View className="mt-1">
                            <Pressable hitSlop={20} onPress={navigateToEditProfile}>
                                <Text className="text-blue-600 font-medium text-base">{t('EditProfile')}</Text>
                            </Pressable>
                        </View>

                    </View>

                    <View className="h-full flex-1 bg-[#e7eaf1] overflow-hidden rounded-t-[50px] mt-3">
                        <ScrollView style={{ paddingHorizontal: 20, marginTop: 30, flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
                            <View className="flex-col gap-4">

                                <Animated.View style={[{ transform: [{ scale: addFamilyScale }] }]} >
                                    <Pressable
                                        activeOpacity={1}
                                        onPressIn={onPressAddFamilyIn}
                                        onPressOut={onPressAddFamilyOut}
                                        onPress={openAddFamilyDetails}
                                        className="flex flex-row items-center justify-between bg-white rounded-[15px] shadow-input mx-0.5 shadow-md p-3"
                                    >
                                        <View className="flex-row justify-between gap-2 items-center">
                                            <AnimatedFeatherIcon name="users" size={30} color={"black"} />
                                            <Text className="text-neutral-700 font-normal text-xl tracking-wider">
                                                {t("AddFamilyDetails")}
                                            </Text>
                                        </View>
                                        <AnimatedFontistoIcon name="angle-right" size={15} color={"black"} />
                                    </Pressable>
                                </Animated.View>

                                <Animated.View style={[{ transform: [{ scale: changePasswordScale }] }]} >
                                    <Pressable
                                        activeOpacity={1}
                                        onPressIn={onPressChangePasswordIn}
                                        onPressOut={onPressChangePasswordOut}
                                        onPress={openChangePassword}
                                        className="flex flex-row items-center justify-between bg-white rounded-[15px] shadow-input mx-0.5 shadow-custom-elevation shadow-md p-3"
                                    >
                                        <View className="flex-row justify-between gap-2 items-center">
                                            <AnimatedFontistoIcon name="locked" size={30} color={"black"} />
                                            <Text className="text-neutral-700 font-normal text-xl tracking-wider">{t("changePassword")}</Text>
                                        </View>
                                        <AnimatedFontistoIcon name="angle-right" size={15} color={"black"} />
                                    </Pressable>
                                </Animated.View>

                                <Animated.View style={[{ transform: [{ scale: myBusinessScale }] }]} >
                                    <Pressable
                                        activeOpacity={1}
                                        onPressIn={onPressMyBusiness}
                                        onPressOut={onPressMyBusinessOut}
                                        onPress={() => navigation.navigate('MyBusinessCardScreen')}
                                    >
                                        <View className="flex flex-row items-center justify-between bg-white rounded-[15px]  shadow-input mx-0.5 shadow-custom-elevation shadow-md p-3 ">
                                            <View className="flex-row justify-between gap-2 items-center">
                                                <AddBusinessIcon width={30} height={30} color='black' />
                                                <Text className="text-neutral-700 font-normal text-xl tracking-wider">My Business</Text>
                                            </View>
                                            <AnimatedFontistoIcon name="angle-right" size={15} color={"black"} />
                                        </View>
                                    </Pressable>
                                </Animated.View>

                                <Animated.View style={[{ transform: [{ scale: logoutCardScale }] }]} >
                                    <Pressable
                                        activeOpacity={1}
                                        onPressIn={onPressLogoutCardIn}
                                        onPressOut={onPressLogoutCardOut}
                                        onPress={openLogoutModal}
                                    >
                                        <View className="flex flex-row items-center justify-between bg-white rounded-[15px]  shadow-input mx-0.5 shadow-custom-elevation shadow-md p-3 ">
                                            <View className="flex-row justify-between gap-2 items-center">
                                                <AnimatedFeatherIcon
                                                    name="log-out"
                                                    size={25}
                                                    color="black"
                                                />
                                                <Text className="text-neutral-700 font-normal text-xl tracking-wider">Logout</Text>
                                            </View>
                                            <AnimatedFontistoIcon name="angle-right" size={15} color={"black"} />
                                        </View>
                                    </Pressable>
                                </Animated.View>

                            </View>
                        </ScrollView>
                    </View>
                </View>

                <ImageViewing
                    images={profileImage}
                    imageIndex={0}
                    visible={isVisible}
                    onRequestClose={() => setIsVisible(false)}
                />

                <ImageViewing
                    images={bannerImages}
                    imageIndex={0}
                    visible={isBannerVisible}
                    onRequestClose={() => setBannerIsVisible(false)}
                />

            </View>

            <Modal
                transparent={true}
                visible={isPopupVisible}
                onRequestClose={closePopup}
            >
                <View className="flex flex-1 flex-row justify-center items-center  bg-[#00000080]">
                    <View className="bg-white w-auto px-10 py-2 rounded-lg items-center">

                        <TouchableOpacity onPress={viewProfileImage}>
                            <Text className="text-black text-lg p-2">{t('ViewProfileImage')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={selectImage}>
                            <Text className="text-black text-lg p-1">{t('EditProfileImage')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={closePopup}>
                            <Text className="text-black text-lg p-1">{t('Close')}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slideTop"
                onRequestClose={closeLogoutModal}
            >
                <View className="flex-1 justify-top items-center">
                    {modalVisible && (
                        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                    )}
                    <View className="w-4/5 bg-white rounded-[15px] px-3 py-4 shadow-lg mt-[90%]">
                        <Text className="text-lg text-black mb-4">{t("confirmlogout")}</Text>
                        <View className="flex-row justify-around">
                            <Animated.View style={[{ transform: [{ scale: cancelScale }] }]} >
                                <Pressable
                                    activeOpacity={1}
                                    onPressIn={onPressCancelIn}
                                    onPressOut={onPressCancelOut}
                                    onPress={closeLogoutModal}
                                    className="px-6 py-3 bg-gray-400 rounded-[15px] mr-2"
                                >
                                    <Text className="text-white">{t('cancel')}</Text>
                                </Pressable>
                            </Animated.View>

                            <View>
                                {loading ? (
                                    <View className="px-6 py-3 bg-red-500 rounded-[15px] flex flex-row">
                                        <Text className="text-white mr-4">{t("Loading")}</Text>
                                        <ActivityIndicator size="small" color="white" />
                                    </View>
                                ) : (
                                    <Animated.View style={[{ transform: [{ scale: LogoutScale }] }]} >
                                        <Pressable
                                            activeOpacity={1}
                                            onPressIn={onPressLogoutIn}
                                            onPressOut={onPressLogoutOut}
                                            onPress={() => handleLogout()} disabled={loading}
                                            className="px-6 py-3 bg-red-500 rounded-[15px]"
                                        >
                                            <Text className="text-white ">{t('logout')}</Text>
                                        </Pressable>
                                    </Animated.View>
                                )}
                            </View>

                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                transparent={true}
                visible={isBannerPopupVisible}
                onRequestClose={closeBannerPopup}
            >
                <View className="flex flex-1 flex-row justify-center items-center bg-[#00000080]">
                    <View className="bg-white w-auto px-10 py-2 rounded-lg items-center">

                        <TouchableOpacity onPress={viewBannerImage}>
                            <Text className="text-black text-lg p-1">{t("viewbanner")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={selectBannerImage}>
                            <Text className="text-black text-lg p-1">{t("editbanner")}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={closeBannerPopup}>
                            <Text className="text-black text-lg p-1">{t('Close')}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

        </>
    );
};

export default ProfilePage;