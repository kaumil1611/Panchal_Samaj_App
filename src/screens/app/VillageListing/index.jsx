import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CardDetails from '../../../components/CardDetails';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import ApiContext from '../../../context/ApiContext';
import { GlobalContext } from '../../../context/globalState';
import i18n from '../../../context/i18n';

const VillageListing = ({ navigation, route }) => {

    const { t } = useTranslation();
    const [search, setSearch] = useState("");
    const [language, setLanguage] = useState("");
    const [loading, setLoading] = useState(true);
    const AnimatedFeatherIcon = Animated.createAnimatedComponent(Feather);
    const AnimatedFontistoIcon = Animated.createAnimatedComponent(Fontisto);
    const [listingStyle, setListingStyle] = useState(route.params.listingStyle);
    const { villagesListing, allUserByVillageId, resetData } = useContext(ApiContext);
    const { setSelectedVillage, SelectedVillage, allVillagesListing, setAllVillagesListing } = useContext(GlobalContext);

    useFocusEffect(
        useCallback(() => {
            return () => {
                resetData('allUserByVillage');
            };
        }, [])
    );

    useEffect(() => {
        (async function () {
            setLoading(true);
            const allVillages = await villagesListing();
            setAllVillagesListing(allVillages?.village);
            setLoading(false);
        })();
    }, []);

    useFocusEffect(
        useCallback(() => {
            return () => {
                setSearch("");
            };
        }, [])
    );

    useEffect(() => {
        if (SelectedVillage) {
            (async function () {
                await allUserByVillageId(SelectedVillage._id);
            })();
        }
    }, [SelectedVillage]);

    useEffect(() => {
        const loadVillages = async () => {
            setLoading(true);
            const allVillages = await villagesListing(search ? search : "");
            setAllVillagesListing(allVillages.village);
            setLoading(false);
        };
        const timeoutId = setTimeout(loadVillages, 1000);
        return () => clearTimeout(timeoutId);
    }, [search]);

    useEffect(() => {
        const params = route.params;
        if (route.params.listingStyle !== listingStyle) {
            setListingStyle(params.listingStyle);
        }
    }, [route.params.listingStyle]);

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

    const handleVillageSelect = useCallback(async (item) => {
        await setSelectedVillage(item);
        navigation.navigate('VillageWisePersons', { villageId: item._id });
    }, []);

    const renderItem = useCallback(({ item }) => {
        const villageImage = process.env.IMAGE_URL + item.image;
        return (
            <View className={`${listingStyle === 'grid' ? 'flex-1 m-2' : 'flex flex-row w-full'}`}>
                <CardDetails
                    size={listingStyle === 'grid' ? 'lg' : ""}
                    image={villageImage}
                    content={language == 'en' ? item.villageE : language == 'gu' ? item.villageG : item.villageE}
                    navigation={navigation}
                    villageListing={true}
                    allVillagesListing={allVillagesListing}
                    search={search}
                    listingStyle={listingStyle}
                    handleSetSelectedVillage={() => handleVillageSelect(item)}
                />
                {listingStyle === 'list' && (
                    <View className="flex-1 ml-3 justify-center">
                        <Text className="text-lg font-semibold">{language == 'en' ? item.villageE : item.villageG}</Text>
                    </View>
                )}
            </View>
        );
    }, [allVillagesListing, handleVillageSelect, language, listingStyle, navigation, search]);

    const keyExtractor = useCallback((item) => item._id, []);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View className="flex-1 bg-gray-300">
                <View className="bg-white m-3 h-20 p-2 px-4 rounded-2xl flex items-center">
                    <View className="flex flex-row h-full items-center justify-between w-full">
                        <View>
                            <AnimatedFontistoIcon
                                name="holiday-village"
                                size={38}
                                color={"black"}
                            />
                        </View>
                        <View>
                            <Text className="text-3xl text-black font-bold">{t('allvillages')}</Text>
                        </View>
                    </View>
                </View>

                <View className="w-full px-4 mb-3 shadow-custom-elevation shadow-sm">
                    <View className="w-full flex flex-row bg-white rounded-xl items-center">
                        <TextInput
                            placeholder={t("searchVillage")}
                            placeholderTextColor="grey"
                            className="basis-[90%] tracking-wider py-3 text-neutral-700 pl-2 "
                            value={search}
                            onChangeText={text => setSearch(text)}
                        />
                        <TouchableOpacity onPress={() => setSearch("")}>
                            <View>
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

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" className="flex flex-1 justify-center items-center text-center" />
                ) : allVillagesListing.length === 0 ? (
                    <NoDataFound message="No village found." />
                ) : (
                    <FlatList
                        data={allVillagesListing}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        numColumns={listingStyle === 'grid' ? 2 : 1}
                        key={listingStyle}
                        contentContainerStyle={{
                            display: 'flex',
                            overflow: 'hidden',
                            width: '100%',
                            paddingHorizontal: 2,
                            ...(listingStyle === 'grid' && { gap: 2 }),
                        }}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    />
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

export default React.memo(VillageListing);