import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import VillageByName from "../../../components/VillageByName";
import ApiContext from "../../../context/ApiContext";
import { GlobalContext } from "../../../context/globalState";
import i18n from '../../../context/i18n';

const VillageWisePersons = ({ navigation, route }) => {

    const villageId = route.params?.villageId;
    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [language, setLanguage] = useState("");
    const { resetData, allUserByVillageId } = useContext(ApiContext);
    const { SelectedVillage } = useContext(GlobalContext);
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);

    useEffect(() => {
        if (SelectedVillage || villageId) {
            (async function () {
                await allUserByVillageId(villageId || SelectedVillage._id);
            })();
        }
    }, [SelectedVillage, villageId]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                resetData('allUserByVillage');
            };
        }, [])
    );

    useEffect(() => {
        const getSelectedLanguage = async () => {
            try {
                const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
                if (storedLanguage) {
                    i18n.changeLanguage(storedLanguage).catch((error) => {
                        console.error('Error changing language:', error);
                    });
                    setLanguage(storedLanguage);
                }
            } catch (error) {
                console.error('Error retrieving language:', error);
            }
        };
        getSelectedLanguage();
    }, []);

    return (

        <View className="flex-1 bg-gray-300 w-full" edges={['top']}>
            <View className="relative bg-white px-3 mt-3 mx-3 h-12 rounded-2xl">
                <View className='flex-1 justify-center items-center'>
                    <TouchableOpacity onPress={() => {
                        setSearch("");
                    }}>
                        <View className="w-full flex flex-row bg-white rounded-xl items-center px-3">
                            <TextInput placeholder={t("searchPersonVillage")} className="w-full text-black" placeholderTextColor="grey" value={search} onChangeText={text => setSearch(text)} />
                            {search !== "" ? (
                                <AnimatedFontistoIcon
                                    name="close"
                                    size={25}
                                    color={"black"}
                                />
                            ) : (
                                <AnimatedFeatherIcon
                                    name="search"
                                    size={25}
                                    color={"black"}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text className="font-bold text-2xl tracking-wider text-black ml-6 my-3">{language == 'gu' ? SelectedVillage.villageG : SelectedVillage.villageE} {t('VillagePeople')}</Text>
            </View>
            <VillageByName searchValue={search} navigation={navigation} SelectedVillage={SelectedVillage} />
        </View >
    );
};

export default VillageWisePersons;