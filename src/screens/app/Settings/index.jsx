import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Radio } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalContext } from '../../../context/globalState';
import i18n from '../../../context/i18n';
import toastMessage from '../../../utils/toastMessage';

const SettingBottomSheet = () => {

    const { defaultLanguage, setDefaultLanguage } = useContext(GlobalContext);
    const [language, setLanguage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const successMessages = t('successchangeLanguage');

    useEffect(() => {
        setLanguage(defaultLanguage);
    }, [defaultLanguage]);

    const changeLanguage = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        setAlertOpen(true);
    };

    const closeAlertModal = () => {
        setLanguage(defaultLanguage);
        setAlertOpen(false);
    };

    const AlertActionModal = async () => {
        setLoading(true);
        try {
            await AsyncStorage.setItem('selectedLanguage', language);
            await i18n.changeLanguage(language);
            setDefaultLanguage(language);
            toastMessage(t('LanguageChangedSuccessfully'), 'Success');
            setAlertOpen(false);
        } catch (error) {
            toastMessage("Something went wrong", 'error');
            console.error('Error changing language:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getSelectedLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
                if (storedLanguage) {
                    await i18n.changeLanguage(storedLanguage);
                    setLanguage(storedLanguage);
                }
            } catch (error) {
                console.error('Error retrieving language:', error);
            }
        };
        getSelectedLanguage();
    }, []);

    return (
        <View style={styles.container} className="flex-1 p-6 bg-indigo-50">
            <Radio.Group
                name="language"
                value={language}
                onChange={(nextValue) => {
                    changeLanguage(nextValue);
                }}
                accessibilityLabel="Select Language"
            >
                <Box>
                    <Radio
                        value="gu"
                        ml={1}
                        my={1}
                        colorScheme="blue"
                        accessibilityLabel="Gujarati"
                    >
                        <Text className="text-lg text-neutral-700 tracking-wider font-bold">ગુજરાતી</Text>
                    </Radio>
                </Box>
                <Box>
                    <Radio
                        value="en"
                        ml={1}
                        my={1}
                        colorScheme="blue"
                        accessibilityLabel="English"
                    >
                        <Text className="text-lg text-neutral-700 tracking-wider font-bold">English</Text>
                    </Radio>
                </Box>
            </Radio.Group>
            <Modal
                transparent={true}
                visible={alertOpen}
                animationType="slideTop"
                onRequestClose={closeAlertModal}
            >
                <View className="flex-1 justify-top items-center">
                    {alertOpen && (
                        <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
                    )}
                    <View className="w-4/5 bg-white rounded-[15px] p-5 shadow-lg mt-[90%]">
                        <Text className="font-bold text-[16px] text-black mb-5">{successMessages}</Text>
                        <View className="flex flex-row justify-around items-center">
                            <View>
                                {loading ? (
                                    <View className="px-4 py-2 bg-blue-500 flex flex-row items-center rounded-[15px]">
                                        <Text className="text-white text-xs mr-2">{t("Loading")}</Text>
                                        <ActivityIndicator size="small" color="white" />
                                    </View>
                                ) : (
                                    <Pressable disabled={loading} onPress={AlertActionModal} className="px-6 py-2 bg-blue-500 rounded-[15px]">
                                        <Text className="text-white">{t('okay')}</Text>
                                    </Pressable>
                                )}
                            </View>

                            <Pressable onPress={closeAlertModal} className="px-6 py-2 bg-red-500 rounded-[15px]">
                                <Text className="text-white">{t('cancel')}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default SettingBottomSheet;